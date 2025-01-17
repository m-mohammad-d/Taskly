"use client";
import { Button } from "@/components/ui/button";
import MemberAvatar from "@/features/members/components/MemberAvatar";
import ProjectAvatar from "@/features/projects/components/ProjectAvatar";
import { Task, TaskStatus } from "@/types/tasks";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import TaskDate from "./TaskDate";
import { Badge } from "@/components/ui/badge";
import TaskActions from "./TaskActions";

export const Columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          نام تسک
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;

      return <p className="line-clamp-1">{name}</p>;
    },
  },
  {
    accessorKey: "project",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          پروژه
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const project = row.original.project;

      return (
        <div className="flex items-center gap-x-2 text-sm">
          <ProjectAvatar name={project.name} className="size-6" image={project.imageUrl} />
          <p className="line-clamp-1">{project.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          مسئول پروژه
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee;
      return (
        <div className="flex items-center gap-x-2 text-sm">
          <MemberAvatar name={assignee.name} className="size-6" fallbackClassName="text-xs" />
          <p className="line-clamp-1">{assignee.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          تاریخ سر رسید
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      return <TaskDate value={dueDate} />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          وضعیت
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      const statusTranslations: Record<TaskStatus, string> = {
        [TaskStatus.BACKLOG]: "وظایف معلق",
        [TaskStatus.TODO]: "وظایف در دست انجام",
        [TaskStatus.IN_PROGRESS]: "در حال انجام",
        [TaskStatus.IN_REVIEW]: "در حال بازبینی",
        [TaskStatus.DONE]: "تمام شده",
      };
      return <Badge variant={status}>{statusTranslations[status]}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.$id;
      const projectId = row.original.projectId;

      return (
        <TaskActions id={id} projectId={projectId}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </TaskActions>
      );
    },
  },
];
