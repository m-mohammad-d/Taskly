import { getCurrent } from "@/features/auth/action";
import { getWorkspace } from "@/features/workSpaces/action";
import EditWorkspaceForm from "@/features/workSpaces/components/EditWorkspaceForm";
import { redirect } from "next/navigation";
interface workspaceIdSettingPageProps {
  params: {
    workspaceId: string;
  };
}
async function page({ params }: workspaceIdSettingPageProps) {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const initialValue = await getWorkspace({ workspaceId: params.workspaceId });

  if (!initialValue) redirect(`/workspaces/${params.workspaceId}`);
  return (
    <div className="w-full lg:max-w-lg">
      <EditWorkspaceForm initialValue={initialValue} />
    </div>
  );
}

export default page;
