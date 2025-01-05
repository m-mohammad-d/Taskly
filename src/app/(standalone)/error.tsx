"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

function ErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-4">
      <AlertTriangle className="size-8 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.</p>
      <Button variant="secondary" asChild size="sm">
        <Link href="/">بازگشت به خونه</Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
