import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { createSessionClient } from "@/lib/appWrite";

import { getMember } from "../members/utils";
import { Project } from "@/types/projects";

export const getProject = async ({ projectId }: { projectId: string }) => {
  const { account, databases } = await createSessionClient();
  const user = await account.get();

  const project = await databases.getDocument<Project>(DATABASE_ID, PROJECTS_ID, projectId);
  const members = await getMember({ databases, userId: user.$id, workspaceId: project.workspaceId });

  if (members.total === 0) {
    return null;
  }

  return project;
};
