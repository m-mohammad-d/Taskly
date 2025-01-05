"use server";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "../members/utils";
import { workspcae } from "@/types/workspace";
import { createSessionClient } from "@/lib/appWrite";
import { Query } from "node-appwrite";

export const getWorkspaces = async () => {
  const { account, databases } = await createSessionClient();

  const user = await account.get();

  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [Query.equal("userId", user.$id)]);

  if (members.total === 0) {
    return { documents: [], total: 0 };
  }

  const workspaceIds = members.documents.map((member) => member.workspaceId);
  const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACES_ID, [Query.contains("$id", workspaceIds)]);
  return workspaces;
};

export const getWorkspace = async ({ workspaceId }: { workspaceId: string }) => {
  const { account, databases } = await createSessionClient();
  const user = await account.get();

  const members = await getMember({ databases, workspaceId, userId: user.$id });

  if (members.total === 0) {
    throw new Error("احراز هویت نشده");
  }

  const workspace = await databases.getDocument<workspcae>(DATABASE_ID, WORKSPACES_ID, workspaceId);

  return workspace;
};

export const getWorkspaceInfo = async ({ workspaceId }: { workspaceId: string }) => {
  const { databases } = await createSessionClient();

  const workspace = await databases.getDocument<workspcae>(DATABASE_ID, WORKSPACES_ID, workspaceId);

  return { name: workspace.name, imageUrl: workspace.imageUrl };
};
