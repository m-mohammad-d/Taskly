import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

function TaskActions({ id, projectId, children }: TaskActionsProps) {
  console.log(id, projectId);

  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => {}} disabled={false} className="p-[10px]">
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            جزئیات وضعیت
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}} disabled={false} className="p-[10px]">
            <PencilIcon className="mr-2 size-4 stroke-2" />
            ویرایش وضعیت
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}} disabled={false} className="p-[10px]">
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            باز کردن پروژه
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}} disabled={false} className="p-[10px] text-red-600">
            <TrashIcon className="mr-2 size-4 stroke-2" />
            حذف وضعیت
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TaskActions;
