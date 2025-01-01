import { Models } from "node-appwrite";

export type workspcae = Models.Document & {
  name: string;
  imageUrl: string;
  inviteCode: string;
  userId: string;
};
