import { getCurrent } from "@/features/auth/queries";
import EditProjectForm from "@/features/projects/components/EditProjectForm";
import { getProject } from "@/features/projects/queris";
import { redirect } from "next/navigation";
interface ProjectIdSettingsPageProps {
  params: { projectId: string };
}
async function page({ params: { projectId } }: ProjectIdSettingsPageProps) {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const initialValues = await getProject({ projectId });
  if (!initialValues) {
    throw new Error("پروژه پیدا نشد");
  }
  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValue={initialValues} />
    </div>
  );
}

export default page;
