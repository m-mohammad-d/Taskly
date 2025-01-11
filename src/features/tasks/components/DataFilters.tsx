import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetMembers } from "@/features/members/api/useGetMembers";
import { useGetProjects } from "@/features/projects/api/useGetProjects";
import { useWorkspaceId } from "@/features/workSpaces/hooks/useWorkspaceId";
import { TaskStatus } from "@/types/tasks";
import { FolderIcon, ListCheckIcon, UserIcon } from "lucide-react";
import { useTaskFilters } from "../hooks/useTaskFilters";
import DatePicker from "@/components/DatePicker";
import { undefined } from "zod";

interface DataFiltersProps {
  hideProjectFilter?: boolean;
}
function DataFilters({ hideProjectFilter }: DataFiltersProps) {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

  const isLoading = isLoadingMembers || isLoadingProjects;

  const projectOptions = projects?.documents.map((project) => ({ value: project.$id, label: project.name }));

  const memberOptions = members?.documents.map((member) => ({ value: member.$id, label: member.name }));
  const [{ projectId, assigneeId, dueDate, search, status }, setFilters] = useTaskFilters();
  console.log(hideProjectFilter, search);

  const onStatusChange = (value: string) => {
    setFilters({ status: value === "all" ? null : (value as TaskStatus) });
  };
  const onAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value === "all" ? null : (value as string) });
  };
  const onProjectChange = (value: string) => {
    setFilters({ projectId: value === "all" ? null : (value as string) });
  };

  if (isLoading) return null;
  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <Select defaultValue={(status as TaskStatus) ?? undefined} onValueChange={(value) => onStatusChange(value)}>
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pl-2">
            <ListCheckIcon className="ml-2 size-4" />
            <SelectValue placeholder="تمام وضعیت ها" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">تمام وضعیت ها</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>وظایف معلق</SelectItem>
          <SelectItem value={TaskStatus.TODO}>وظایف در دست انجام</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>در حال انجام</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>در حال بازبینی</SelectItem>
          <SelectItem value={TaskStatus.DONE}>تمام شده</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue={(assigneeId as string) ?? undefined} onValueChange={(value) => onAssigneeChange(value)}>
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pl-2">
            <UserIcon className="ml-2 size-4" />
            <SelectValue placeholder="تمام مسئولین وظیفه" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">تمام مسئولین وظیفه</SelectItem>
          <SelectSeparator />
          {memberOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select defaultValue={(projectId as string) ?? undefined} onValueChange={(value) => onProjectChange(value)}>
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pl-2">
            <FolderIcon className="ml-2 size-4" />
            <SelectValue placeholder="تمام پروژه" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">تمام پروژه</SelectItem>
          <SelectSeparator />
          {projectOptions?.map((project) => (
            <SelectItem key={project.value} value={project.value}>
              {project.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DatePicker
        placeholder="تاریخ سر رسید"
        className="h-8 w-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : new Date()}
        onChange={(value) => setFilters({ dueDate: value ? value.toISOString() : null })}
      />
    </div>
  );
}

export default DataFilters;
