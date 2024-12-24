import { AUTH_COOKIE } from "@/features/auth/constants";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { Databases, Account, Models, Client, Storage, type Account as AccountType, type Databases as DatabasesType, type Storage as StorageType, type Users as UsersType } from "node-appwrite";
type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    users: UsersType;
    storage: StorageType;
    user: Models.User<Models.Preferences>;
  };
};
export const sessionMiddleware = createMiddleware<AdditionalContext>(async (c, next) => {
  const client = new Client().setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = getCookie(c, AUTH_COOKIE);

  if (!session) {
    return c.json({ error: "unauthorized" }, 401);
  }
  client.setSession(session);

  const account = new Account(client);
  const storage = new Storage(client);
  const databases = new Databases(client);

  const user = await account.get();

  c.set("storage", storage);
  c.set("databases", databases);
  c.set("account", account);
  c.set("user", user);

  await next();
});
