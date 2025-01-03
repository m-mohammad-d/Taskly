"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceId } from "../hooks/useWorkspaceId";
import { ArrowRightIcon, MoreVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DottedSeparator from "@/components/DottedSeparator";
import { useGetMembers } from "@/features/members/api/useGetMembers";
import { Fragment } from "react";
import MemberAvatar from "@/features/members/components/MemberAvatar";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDeleteMember } from "@/features/members/api/useDeleteMember";
import { useUpdateMember } from "@/features/members/api/useUpdateMember";
import { MemberRole } from "@/features/members/types";
import { useConfirm } from "@/hooks/useConfirm";
interface MembersListProps {
  userId: string;
}
function MembersList({ userId }: MembersListProps) {
  const workspaceId = useWorkspaceId();
  const { data } = useGetMembers({ workspaceId });
  const { mutate: deleteMember, isPending: isDeleting } = useDeleteMember();
  const { mutate: updateMember, isPending: isUpdating } = useUpdateMember();
  const [ConfirmDialog, confirm] = useConfirm("آیا از حذف این عضو مطمئن هستید؟", "این عمل غیرقابل بازگشت است و تمام اطلاعات مرتبط حذف خواهد شد.", "destructive");
  const currentUserMember = data?.documents.find((member) => member.userId === userId);

  async function handleDeleteMember(memberId: string) {
    const ok = await confirm();

    if (!ok) {
      return;
    }

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          window.location.reload();
        },
      },
    );
  }

  function handleUpdateMember(memberId: string, role: MemberRole) {
    updateMember({ json: { role }, param: { memberId } });
  }
  return (
    <Card className="h-full w-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
        <Button asChild className="" size="sm" variant="secondary">
          <Link href={`workspaces/${workspaceId}`}>
            برگشت
            <ArrowRightIcon className="ml-2 size-4" />
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">فهرست اعضا</CardTitle>
      </CardHeader>
      <div className="px-y">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-2">
              <MemberAvatar className="size-10" name={member.name} fallbackClassName="text-lg" />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p>{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              {member.userId !== userId && currentUserMember?.role === MemberRole.admin && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="mr-auto" size="icon">
                      <MoreVerticalIcon className="size-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem className="font-medium" onClick={() => handleUpdateMember(member.$id, MemberRole.admin)} disabled={isUpdating}>
                      تنظیم به عنوان ادمین
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-medium" onClick={() => handleUpdateMember(member.$id, MemberRole.member)} disabled={isUpdating}>
                      تنظیم به عنوان عضو
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-medium text-red-500" onClick={() => handleDeleteMember(member.$id)} disabled={isDeleting}>
                      <MdOutlineDeleteOutline />
                      {member.name} حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            {index < data.documents.length - 1 && <Separator className="my-2.5 text-neutral-300" />}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}

export default MembersList;
