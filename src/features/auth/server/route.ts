import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signInSchema, signUpSchema } from "@/schema/auth";
const app = new Hono()
  .post("/login", zValidator("json", signInSchema), async (c) => {
    const { email, password } = await c.req.json();
    console.log({ email, password });
    return c.json({ status: "ok" });
  })
  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { email, password } = await c.req.json();
    console.log({ email, password });
    return c.json({ status: "ok" });
  });
export default app;
