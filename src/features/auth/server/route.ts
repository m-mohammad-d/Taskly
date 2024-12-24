import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signInSchema, signUpSchema } from "@/schema/auth";
import { createAdminClient } from "@/lib/appWrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
const app = new Hono()
  .post("/login", zValidator("json", signInSchema), async (c) => {
    const { email, password } = await c.req.json();
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });
    return c.json({ status: "ok" });
  })
  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { email, password, name } = await c.req.json();
    const { account } = await createAdminClient();
    account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ status: "ok" });
  })
  .post("/logout", (c) => {
    deleteCookie(c, AUTH_COOKIE);

    return c.json({ status: "ok" });
  });
export default app;
