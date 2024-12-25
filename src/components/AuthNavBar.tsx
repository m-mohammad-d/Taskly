"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

function AuthNavbar() {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";
  return (
    <nav className="flex items-center justify-between">
      <Image src="/logo.svg" width={152} height={60} alt="logo" />
      <div className="flex items-center gap-2">
        <Button asChild variant="secondary">
          <Link href={isSignIn ? "/sign-up" : "sign-in"}>{isSignIn ? "ثبت نام" : "ورود"}</Link>
        </Button>
      </div>
    </nav>
  );
}

export default AuthNavbar;
