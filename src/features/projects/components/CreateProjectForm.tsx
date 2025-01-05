"use client";

import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateProjects } from "../api/useCreateProjects";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { createProjectSchema } from "@/schema/projects";
import { useWorkspaceId } from "@/features/workSpaces/hooks/useWorkspaceId";
import { useRouter } from "next/navigation";
interface CreateProjectFormProps {
  onCancel?: () => void;
}
function CreateProjectForm({ onCancel }: CreateProjectFormProps) {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useCreateProjects();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof createProjectSchema>>({ resolver: zodResolver(createProjectSchema.omit({ workspaceId: true })), defaultValues: { name: "" } });

  const onSubmit = (data: z.infer<typeof createProjectSchema>) => {
    const finalValue = {
      ...data,
      workspaceId,
      image: data.image instanceof File ? data.image : "",
    };
    mutate(finalValue, {
      onSuccess: ({ data }) => {
        form.reset();
        router.push(`/workspaces/${workspaceId}/projects/${data.$id}`);
      },
    });
  };
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      const validFormatsRegex = /\.(jpeg|jpg|png|svg)$/i;
      const maxSize = 5 * 1024 * 1024;

      if (!validFormatsRegex.test(file.name)) {
        toast.error("فایل انتخابی باید از نوع JPG, PNG, SVG یا JPEG باشد.");
        return;
      }

      if (file.size > maxSize) {
        toast.error("حجم فایل نباید بیشتر از 5 مگابایت باشد.");
        return;
      }

      form.setValue("image", file);
    }
  }

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">ایجاد پروژه جدید</CardTitle>
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
                    <FormLabel>نام پروژه</FormLabel>
                    <FormControl>
                      <Input placeholder="نام پروژه را وارد کنید" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                      {field.value ? (
                        <div className="relative size-[72px] overflow-hidden rounded-md">
                          <Image alt="logo" fill className="object-cover" src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value} />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-10 text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className="text-sm">ایکون پروژه</p>
                        <p className="text-sm text-muted-foreground">JPG , PNG , SVG or JPEG , max 5mb</p>
                        <input type="file" className="hidden" accept=".jpg,.jpeg,.png, .svg" ref={inputRef} onChange={handleImageChange} disabled={isPending} />
                        {field.value ? (
                          <Button
                            type="button"
                            disabled={isPending}
                            variant="destructive"
                            size="xs"
                            className="mt-2 w-fit"
                            onClick={() => {
                              field.onChange(null);
                              if (inputRef.current) {
                                inputRef.current.value = "";
                              }
                            }}
                          >
                            حذف عکس
                          </Button>
                        ) : (
                          <Button type="button" disabled={isPending} variant="teritary" size="xs" className="mt-2 w-fit" onClick={() => inputRef.current?.click()}>
                            اپلود عکس
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button disabled={isPending} className={cn("w-full rounded-lg", !onCancel && "invisible")} size="lg" type="button" variant="secondary" onClick={() => onCancel?.()}>
                لغو
              </Button>
              <Button disabled={isPending} className="w-full rounded-lg" size="lg" type="submit">
                ایجاد پروژه
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CreateProjectForm;
