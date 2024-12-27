"use client";

import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createWorkspaceSchema } from "@/schema/workspaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateWorkspace } from "../api/useCreateWorkspace";

interface CreateWorkspaceFormProps {
  onCancel: () => void;
}
function CreateWorkspaceForm({ onCancel }: CreateWorkspaceFormProps) {
  const { mutate, isPending } = useCreateWorkspace();
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({ resolver: zodResolver(createWorkspaceSchema), defaultValues: { name: "" } });

  const onSubmit = (data: z.infer<typeof createWorkspaceSchema>) => {
    mutate(data);
  };
  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">ایجاد فضای کاری جدید</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام فضای کاری</FormLabel>
                    <FormControl>
                      <Input placeholder="نام فضای کاری را وارد کنید" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button disabled={isPending} className="w-full rounded-lg" size="lg" type="button" variant="secondary" onClick={() => onCancel()}>
                لغو
              </Button>
              <Button disabled={isPending} className="w-full rounded-lg" size="lg" type="submit">
                ایجاد فضای کاری
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CreateWorkspaceForm;
