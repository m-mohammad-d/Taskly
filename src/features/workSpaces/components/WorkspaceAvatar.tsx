import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";

interface WorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}
function WorkspaceAvatar({ name, image, className }: WorkspaceAvatarProps) {
  if (image) {
    return (
      <div className={cn("relative size-10 overflow-hidden rounded-md", className)}>
        <Image src={image} fill alt={name} className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-10 rounded-md", className)}>
      <AvatarFallback className="size-10 rounded-md bg-blue-600 text-center text-lg font-medium uppercase text-white">{name[0]}</AvatarFallback>
    </Avatar>
  );
}

export default WorkspaceAvatar;
