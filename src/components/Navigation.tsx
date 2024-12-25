"use client";

import { GoHomeFill, GoHome, GoCheckCircle, GoCheckCircleFill } from "react-icons/go";
import { MdOutlineSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "خانه",
    href: "/",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "وظایف من",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "تنظیمات",
    href: "/settings",
    icon: MdOutlineSettings,
    activeIcon: MdOutlineSettings,
  },
  {
    label: "اعضا",
    href: "/members",
    icon: FaUsers,
    activeIcon: FaUsers,
  },
];

function Navigation() {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col">
      {routes.map((route) => {
        const isActive = pathname === route.href;
        const Icon = isActive ? route.activeIcon : route.icon;

        return (
          <Link href={route.href} key={route.href}>
            <div className={cn("flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition hover:text-primary", isActive && "bg-white text-primary shadow-sm")}>
              <Icon className="size-5 text-neutral-500" />
              {route.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
}

export default Navigation;
