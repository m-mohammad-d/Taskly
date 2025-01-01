import { getCurrent } from "@/features/auth/action";
import { redirect } from "next/navigation";

async function page() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <div></div>;
}

export default page;
