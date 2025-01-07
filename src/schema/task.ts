import { TaskStatus } from "@/types/tasks";
import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, "وارد کردن نام تسک اجباری هست"),
  status: z.nativeEnum(TaskStatus),
  workspaceId: z.string().trim().min(1, "شناسه فضای کاری اجباری هست"),
  projectId: z.string().trim().min(1, "شناسه پروژه اجباری هست"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "اجباری"),
  description: z.string().optional(),
});
