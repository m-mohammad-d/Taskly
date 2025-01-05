"use client";

import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRightIcon, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useConfirm } from "@/hooks/useConfirm";
import { updateProjectSchema } from "@/schema/projects";
import { useUpdateProject } from "../api/useUpdateProject";
import { Project } from "@/types/projects";

interface EditProjectFormProps {
  onCancel?: () => void;
  initialValue: Project;
}
function EditProjectForm({ onCancel, initialValue }: EditProjectFormProps) {
  const router = useRouter();
  const { mutate, isPending } = useUpdateProject();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof updateProjectSchema>>({ resolver: zodResolver(updateProjectSchema), defaultValues: { ...initialValue, image: initialValue.imageUrl ?? "" } });
  const [DeleteDialog, confirmDelete] = useConfirm("حذف فضای کاری", "پس از انجام این عمل، امکان بازگشت وجود ندارد.", "destructive");

  // const { mutate: deleteWorkspace, isPending: isDeleting } = useDeleteWorkspace();
  // const { mutate: resetInviteCode, isPending: isResettingInviteCode } = useResetInviteCode();
  const onSubmit = (data: z.infer<typeof updateProjectSchema>) => {
    const finalValue = {
      ...data,
      image: data.image instanceof File ? data.image : "",
    };
    mutate(
      { form: finalValue, param: { projectId: initialValue.$id } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          // onCancel()
          router.push(`/workspaces/${data.workspaceId}/projects/${data.$id}`);
        },
      },
    );
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

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    // deleteWorkspace(
    //   { param: { projectId: initialValue.$id } },
    //   {
    //     onSuccess: () => {
    //       router.push("/");
    //     },
    //   },
    // );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <Card className="h-full w-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
          <Button className="" size="xs" variant="secondary" onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValue.workspaceId}/projects/${initialValue.$id}`)}>
            برگشت
            <ArrowRightIcon className="ml-2 size-4" />
          </Button>
          <CardTitle className="text-xl font-bold">{initialValue.name}</CardTitle>
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
                  ذخیره تغییرات
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="h-full w-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3>منطقه حساس</h3>
            <p className="text-sm text-muted-foreground">با حذف این پروژه تمامی داده های ان پاک خواهد شد. این اقدام غیرقابل بازگشت است، لطفاً با دقت تصمیم‌گیری کنید.</p>
            <DottedSeparator className="py-7" />
            <Button className="ml-auto w-fit" size="sm" variant="destructive" type="button" disabled={isPending} onClick={handleDelete}>
              حذف پروژه
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditProjectForm;
