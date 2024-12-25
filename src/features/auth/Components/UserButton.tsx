"use client";
import DottedSeparator from "@/components/DottedSeparator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLogout } from "../api/useLogout";
import { useCurrent } from "../api/useCurrent";
import { Loader, LogOut } from "lucide-react";
function UserButton() {
  const { data: user, isLoading } = useCurrent();
  const { mutate: logout } = useLogout();

  if (isLoading) {
    return (
      <div className="flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-200">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!user) {
    return null;
  }
  const { name, email } = user;

  const avatar = name ? name.charAt(0).toUpperCase() : (email.charAt(0).toUpperCase() ?? "U");
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 border border-neutral-300 transition-all duration-500 hover:opacity-70">
          <AvatarFallback className="flex items-center justify-center bg-neutral-200 font-medium text-neutral-500">{avatar}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
        <div className="flex flex-col items-center justify-center gap-2.5 px-2.5 py-4">
          <Avatar className="size-[52px] border border-neutral-300">
            <AvatarFallback className="flex items-center justify-center bg-neutral-200 text-xl font-medium text-neutral-500">{avatar}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">{name || "user"}</p>
            <p className="text-xs font-medium text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem className="flex h-10 cursor-pointer items-center justify-center text-amber-700" onClick={() => logout()}>
          <LogOut className="mr-2 size-4" />
          خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
