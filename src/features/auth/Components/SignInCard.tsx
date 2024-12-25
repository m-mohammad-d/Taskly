"use client";
import { z } from "zod";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { signInSchema } from "@/schema/auth";
import { useLogin } from "../api/useLogin";

type FormData = z.infer<typeof signInSchema>;
function SignInCard() {
  const { mutate, isPending } = useLogin();
  const form = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormData) {
    mutate(values);
  }
  return (
    <Card className="h-full w-full border-none shadow-none md:w-[487px]">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text-2xl">خوش آمدی دوباره!</CardTitle>
      </CardHeader>
      <div className="mb-2 px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="ایمیل را وارد کنید" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="رمز عبور را وارد کنید" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} className="w-full rounded-lg" size="lg">
              ورود
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex flex-col gap-y-4 p-7">
        <Button disabled={isPending} variant="secondary" className="w-full rounded-lg" size="lg">
          <FcGoogle className="ml-2 size-5" />
          ورود با گوگل
        </Button>
        <Button disabled={isPending} variant="secondary" className="w-full rounded-lg" size="lg">
          <FaGithub className="ml-2 size-5" />
          ورود با گیت هاب
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex items-center justify-center p-7">
        <p>
          هنوز حساب کاربری ندارید؟
          <Link href="/sign-up" className="px-1 text-blue-600">
            ثبت‌نام کنید
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}

export default SignInCard;
