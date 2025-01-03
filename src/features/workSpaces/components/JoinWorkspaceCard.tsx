"use client";

import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/useJoinWorkspace";

import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface JoinWorkspaceCardProps {
  workspaceName: string;
  inviteCode: string;
  workspaceId: string;
  workspaceImage: string | null;
}
function JoinWorkspaceCard({ workspaceName, inviteCode, workspaceId, workspaceImage }: JoinWorkspaceCardProps) {
  const { mutate, isPending } = useJoinWorkspace();
  const router = useRouter();

  function handleJoinWorkspace() {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      },
    );
  }
  return (
    <Card className="flex h-full w-full flex-col items-center border-none shadow-none">
      <CardHeader className="flex flex-col items-center p-7">
        <Avatar className="mb-4 size-24">
          <AvatarImage src={workspaceImage || undefined} alt={workspaceName} />
          <AvatarFallback>{workspaceName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-center text-xl font-bold">{workspaceName}</CardTitle>
        <CardDescription className="text-center">شما به عضویت در این فضای کاری دعوت شده‌اید</CardDescription>
      </CardHeader>
      <div className="w-full px-7">
        <DottedSeparator />
      </div>
      <CardContent className="w-full p-7">
        <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
          <Button className="w-full lg:w-fit" variant="secondary" asChild type="button" size="lg" disabled={isPending}>
            <Link href="/">لغو</Link>
          </Button>
          <Button className="w-full lg:w-fit" size="lg" type="button" onClick={handleJoinWorkspace} disabled={isPending}>
            عضویت
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default JoinWorkspaceCard;
