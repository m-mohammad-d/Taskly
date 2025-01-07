import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";

function TaskViewSwitcher() {
  return (
    <Tabs className="w-full flex-1 rounded-lg border">
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
          <Button className="h-8 w-full lg:w-auto">
            <PlusIcon className="ml-2 size-4" />
            تسک جدید
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DottedSeparator className="my-4" />

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
      </div>
    </Tabs>
  );
}

export default TaskViewSwitcher;
