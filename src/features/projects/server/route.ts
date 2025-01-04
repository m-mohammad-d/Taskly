import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECTS_ID } from "@/config";
import { getMember } from "@/features/members/utils";
import { sessionMiddleware } from "@/lib/sessionMiddleware";
import { createProjectSchema } from "@/schema/projects";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";

const app = new Hono()
  .get("/", sessionMiddleware, zValidator("query", z.object({ workspaceId: z.string() })), async (c) => {
    const { workspaceId } = c.req.valid("query");
    const databases = c.get("databases");
    const user = c.get("user");

    if (!workspaceId) {
      return c.json({ error: "ورک اسپیس ایدی پیدا نشد" }, 400);
    }

    const member = await getMember({ databases, workspaceId, userId: user.$id });

    if (!member) {
      return c.json({ error: "احراز هویت نشده" }, 401);
    }

    const projects = await databases.listDocuments(DATABASE_ID, PROJECTS_ID, [Query.equal("workspaceId", workspaceId)]);

    return c.json({ data: projects });
  })
  .post("/", zValidator("form", createProjectSchema), sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const storage = c.get("storage");
    const user = c.get("user");

    const { name, image, workspaceId } = c.req.valid("form");
    const member = await getMember({ databases, workspaceId, userId: user.$id });

    if (!member) {
      return c.json({ error: "احراز هویت نشده" }, 401);
    }
    let uploadedImageUrl: string | undefined;
    if (image instanceof File) {
      const file = await storage.createFile(IMAGES_BUCKET_ID, ID.unique(), image);

      const arrayBuffer = await storage.getFilePreview(IMAGES_BUCKET_ID, file.$id);

      uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
    }

    const project = await databases.createDocument(DATABASE_ID, PROJECTS_ID, ID.unique(), {
      name,
      imageUrl: uploadedImageUrl,
      workspaceId,
    });
    return c.json({ data: project });
  });

export default app;
