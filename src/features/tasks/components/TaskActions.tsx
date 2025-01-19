import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/useConfirm";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useDeleteTask } from "../api/useDeleteTask";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workSpaces/hooks/useWorkspaceId";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

function TaskActions({ id, projectId, children }: TaskActionsProps) {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm("تأیید حذف وظیفه", "این عملیات قابل بازگشت نیست. آیا مطمئن هستید که می‌خواهید ادامه دهید؟", "destructive");
  const { mutate, isPending } = useDeleteTask();
  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    mutate({ param: { taskId: id } });
  };
  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };
  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={isPending}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={onOpenTask} disabled={isPending} className="p-[10px]">
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            جزئیات وضعیت
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}} disabled={isPending} className="p-[10px]">
            <PencilIcon className="mr-2 size-4 stroke-2" />
            ویرایش وضعیت
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenProject} disabled={isPending} className="p-[10px]">
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            باز کردن پروژه
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} disabled={isPending} className="p-[10px] text-red-600">
            <TrashIcon className="mr-2 size-4 stroke-2" />
            حذف وضعیت
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TaskActions;
