"use client";

import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { createTaskSchema } from "@/schema/task";
import { useCreateTask } from "../api/useCreateTask";
import { useWorkspaceId } from "@/features/workSpaces/hooks/useWorkspaceId";
import DatePicker from "@/components/DatePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MemberAvatar from "@/features/members/components/MemberAvatar";
import { TaskStatus } from "@/types/tasks";
import ProjectAvatar from "@/features/projects/components/ProjectAvatar";

interface CreateTaskFormProps {
  onCancel?: () => void;
  projectOptions: { id: string; name: string; imageUrl: string }[];
  memberOptions: { id: string; name: string }[];
}
function CreateTaskForm({ onCancel, projectOptions, memberOptions }: CreateTaskFormProps) {
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useCreateTask();
  const form = useForm<z.infer<typeof createTaskSchema>>({ resolver: zodResolver(createTaskSchema.omit({ workspaceId: true })), defaultValues: { workspaceId } });

  const onSubmit = (data: z.infer<typeof createTaskSchema>) => {
    mutate(
      { ...data, workspaceId },
      {
        onSuccess: () => {
          form.reset();
          onCancel?.();
        },
      },
    );
  };
  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">ایجاد تسک جدید</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام تسک</FormLabel>
                    <FormControl>
                      <Input placeholder="نام  تسک را وارد کنید" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="dueDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاریخ سررسید</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="assigneeId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مسئول</FormLabel>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب مسئول" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {memberOptions.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            <div className="flex items-center gap-x-2">
                              <MemberAvatar name={member.name} className="size-6" />
                              {member.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وضعیت</FormLabel>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب وضعیت" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <SelectContent>
                          <SelectItem value={TaskStatus.BACKLOG}>{TaskStatus.BACKLOG}</SelectItem>
                          <SelectItem value={TaskStatus.TODO}>{TaskStatus.TODO}</SelectItem>
                          <SelectItem value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</SelectItem>
                          <SelectItem value={TaskStatus.IN_REVIEW}>{TaskStatus.IN_REVIEW}</SelectItem>
                          <SelectItem value={TaskStatus.DONE}>{TaskStatus.DONE}</SelectItem>
                        </SelectContent>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                name="projectId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>پروژه</FormLabel>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب پروژه" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {projectOptions.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            <div className="flex items-center gap-x-2">
                              <ProjectAvatar name={project.name} className="size-6" image={project.imageUrl} />
                              {project.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button disabled={isPending} className={cn("w-full rounded-lg", !onCancel && "invisible")} size="lg" type="button" variant="secondary" onClick={() => onCancel?.()}>
                لغو
              </Button>
              <Button disabled={isPending} className="w-full rounded-lg" size="lg" type="submit">
                ایجاد تسک
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CreateTaskForm;
