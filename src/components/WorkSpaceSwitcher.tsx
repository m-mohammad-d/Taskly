"use client";
import { RiAddCircleFill } from "react-icons/ri";
import { useGetWorkspaces } from "@/features/workSpaces/api/useGetWorkspaces";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import WorkspaceAvatar from "@/features/workSpaces/components/WorkspaceAvatar";

function WorkSpaceSwitcher() {
  const { data: workspaces } = useGetWorkspaces();
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-center">
        <p className="text-xs uppercase text-neutral-500">فضاهای کاری</p>
        <RiAddCircleFill className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-70" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 p-1">
          <SelectValue placeholder="هیچ فضای کاری انتخاب نشده" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex items-center justify-start gap-3">
                <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl} />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default WorkSpaceSwitcher;
