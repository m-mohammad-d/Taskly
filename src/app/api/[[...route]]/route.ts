import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({ hello: "world" });
});
app.get("/project/:projectID", (c) => {
  return c.json({ hello: c.req.param("projectID") });
});

export const routes = app.route("/auth", auth);
export const GET = handle(app);
export const POST = handle(app);

export type Apptype = typeof routes;
