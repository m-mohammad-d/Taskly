import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";

interface ProjectAvatarProps {
  image?: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
}
function ProjectAvatar({ name, image, className, fallbackClassName }: ProjectAvatarProps) {
  if (image) {
    return (
      <div className={cn("relative size-5 overflow-hidden rounded-md", className)}>
        <Image src={image} fill alt={name} className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-5 rounded-md", className)}>
      <AvatarFallback className={cn("size-10 rounded-md bg-blue-600 text-center text-sm font-medium uppercase text-white", fallbackClassName)}>{name[0]}</AvatarFallback>
    </Avatar>
  );
}

export default ProjectAvatar;
