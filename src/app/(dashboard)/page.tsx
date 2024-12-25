import { getCurrent } from "@/features/auth/action";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  return <div className="">this is home page</div>;
}
