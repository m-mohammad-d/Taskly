import ResponsiveModal from "@/components/ResponsiveModal";
import { Button, ButtonProps } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";

export function useConfirm(title: string, message: string, variant: ButtonProps["variant"] = "primary"): [() => JSX.Element, () => Promise<unknown>] {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => setPromise({ resolve }));
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const confirmtionDialog = () => (
    <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
      <Card className="h-full w-full border-none shadow-none">
        <CardContent className="pt-8">
          <CardHeader className="p-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <div className="gax-x-2 flex w-full flex-col items-center justify-end gap-y-2 pt-4 lg:flex-row">
            <Button variant="outline" onClick={handleCancel} className="w-full lg:w-auto">
              لغو
            </Button>
            <Button variant={variant} onClick={handleConfirm} className="w-full lg:w-auto">
              تایید
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );

  return [confirmtionDialog, confirm];
}
