import { getCurrent } from "@/features/auth/queries";
import JoinWorkspaceCard from "@/features/workSpaces/components/JoinWorkspaceCard";

import { getWorkspaceInfo } from "@/features/workSpaces/queris";
import { redirect } from "next/navigation";

interface inviteCodePageProps {
  params: {
    workspaceId: string;
    inviteCode: string;
  };
}
async function page({ params: { workspaceId, inviteCode } }: inviteCodePageProps) {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }

  const workspace = await getWorkspaceInfo({ workspaceId });

  if (!workspace?.name) {
    return <h2>فضای کاری پیدا نشد </h2>;
  }
  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceCard workspaceName={workspace.name} inviteCode={inviteCode} workspaceId={workspaceId} workspaceImage={workspace.imageUrl} />
    </div>
  );
}

export default page;
