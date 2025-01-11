"use client";
import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../hooks/useCreateTaskModal";
import { useGetTasks } from "../api/useGetTasks";
import { useWorkspaceId } from "@/features/workSpaces/hooks/useWorkspaceId";
import { useQueryState } from "nuqs";
import DataFilters from "./DataFilters";
import { useTaskFilters } from "../hooks/useTaskFilters";

function TaskViewSwitcher() {
  const [{ projectId, assigneeId, dueDate, search, status }] = useTaskFilters();

  const [view, setView] = useQueryState("task-view", { defaultValue: "tabe" });
  const workspaceId = useWorkspaceId();
  const { data: tasks, isLoading } = useGetTasks({ workspaceId, projectId, assigneeId, dueDate, search, status });
  console.log(tasks);

  const { open } = useCreateTaskModal();
  return (
    <Tabs className="w-full flex-1 rounded-lg border" defaultValue={view} onValueChange={setView}>
      <div className="flex h-full flex-col overflow-auto p-4">
        <div className="flex flex-col items-center justify-between gap-y-2 lg:flex-row">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              جدول
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              کانبان
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calender">
              تقویم
            </TabsTrigger>
          </TabsList>
          <Button className="h-8 w-full lg:w-auto" onClick={open}>
            <PlusIcon className="ml-2 size-4" />
            تسک جدید
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters />
        <DottedSeparator className="my-4" />
        {isLoading ? (
          <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-lg border">
            <Loader className="size-6 animate-spin" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              data table
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              data kanban
            </TabsContent>
            <TabsContent value="calender" className="mt-0">
              data calender
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
}

export default TaskViewSwitcher;
