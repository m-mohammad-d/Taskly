"use client";
import { useCurrent } from "@/features/auth/api/useCurrent";
import { useLogout } from "@/features/auth/api/useLogout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  const { mutate } = useLogout();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [isLoading, data]);

  return (
    <div className="">
      <Button onClick={() => mutate()}>logout</Button>
    </div>
  );
}
