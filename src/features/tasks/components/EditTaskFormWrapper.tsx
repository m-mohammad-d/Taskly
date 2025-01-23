import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/useGetMembers";
import { useGetProjects } from "@/features/projects/api/useGetProjects";
import { useWorkspaceId } from "@/features/workSpaces/hooks/useWorkspaceId";
import { Loader } from "lucide-react";
import { useGetTask } from "../api/useGetTask";
import EditTaskForm from "./EditTaskForm";

interface EditTaskFormWrapperProps {
  onCancel: () => void;
  id: string;
}
function EditTaskFormWrapper({ onCancel, id }: EditTaskFormWrapperProps) {
  const workspaceId = useWorkspaceId();
  const { data: initialValue, isLoading: isLoadingTask } = useGetTask({ taskId: id });

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));
  const memberOptions = members?.documents.map((member) => ({
    id: member.userId,
    name: member.name,
  }));

  const isLoading = isLoadingMembers || isLoadingProjects || isLoadingTask;

  if (isLoading) {
    return (
      <Card className="h-[714px] w-full border-none shadow-none">
        <CardContent className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!initialValue) return null;
  return (
    <div>
      <EditTaskForm onCancel={onCancel} projectOptions={projectOptions ?? []} memberOptions={memberOptions ?? []} initialValue={initialValue} />
    </div>
  );
}

export default EditTaskFormWrapper;
