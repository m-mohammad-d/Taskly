import { getCurrent } from "@/features/auth/queries";
import CreateWorkspaceForm from "@/features/workSpaces/components/CreateWorkspaceForm";
import { redirect } from "next/navigation";

async function page() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
}

export default page;
