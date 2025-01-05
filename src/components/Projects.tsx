"use client";
import { useGetProjects } from "@/features/projects/api/useGetProjects";
import ProjectAvatar from "@/features/projects/components/ProjectAvatar";
import { useCreateProjectModal } from "@/features/projects/hooks/useCreateProjectModal";
import { useWorkspaceId } from "@/features/workSpaces/hooks/useWorkspaceId";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

function Projects() {
  const pathName = usePathname();
  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({ workspaceId });
  const { open } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-center">
        <p className="text-xs uppercase text-neutral-500">پروژه ها</p>
        <RiAddCircleFill onClick={open} className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-70" />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathName === href;

        return (
          <Link href={href} key={project.id}>
            <div
              className={cn("flex cursor-pointer items-center gap-2.5 rounded-md p-2.5 text-neutral-500 transition hover:opacity-75", isActive && "bg-white text-primary shadow-sm hover:opacity-100")}
            >
              <ProjectAvatar image={project.imageUrl} name={project.name} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Projects;
