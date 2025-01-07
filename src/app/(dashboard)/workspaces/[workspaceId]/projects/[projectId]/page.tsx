import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/queries";
import ProjectAvatar from "@/features/projects/components/ProjectAvatar";
import { getProject } from "@/features/projects/queris";
import TaskViewSwitcher from "@/features/tasks/components/TaskViewSwitcher";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
interface ProjectIdPageProps {
  params: { projectId: string };
}
async function page({ params: { projectId } }: ProjectIdPageProps) {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const initialValues = await getProject({ projectId });
  if (!initialValues) {
    throw new Error("پروژه پیدا نشد");
  }
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar name={initialValues.name} image={initialValues.imageUrl} className="size-8" />
          <p className="text-lg">{initialValues.name}</p>
        </div>
        <div>
          <Button variant="secondary" asChild>
            <Link href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}>
              <PencilIcon />
              ویرایش پروژه
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher />
    </div>
  );
}

export default page;
