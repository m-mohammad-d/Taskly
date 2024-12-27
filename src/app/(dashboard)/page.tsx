import { getCurrent } from "@/features/auth/action";
import CreateWorkspaceForm from "@/features/workSpaces/components/CreateWorkspaceForm";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  return (
    <div className="">
      <CreateWorkspaceForm />
    </div>
  );
}
