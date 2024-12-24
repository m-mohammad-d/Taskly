import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().trim().min(3, "نام نباید کمتر از سه حرف باشد"),
  email: z
    .string()
    .trim()
    .min(1, "لطفاً ایمیل خود را وارد کنید.")
    .email("فرمت ایمیل وارد شده نادرست است."),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد.")
    .max(256, "رمز عبور نمی‌تواند بیش از 256 کاراکتر باشد."),
});

type FormData = z.infer<typeof formSchema>;

function SignUpCard() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormData) {
    console.log(values);
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex justify-center items-center text-center p-7">
        <CardTitle className="text-2xl">ثبت نام</CardTitle>
        <CardDescription>
          با ثبت‌نام، شما با{" "}
          <Link href="/privacy">
            <span className="text-blue-700">سیاست حفظ حریم خصوصی</span>
          </Link>{" "}
          و {""}
          <Link href="/terms">
            <span className="text-blue-700">شرایط خدمات</span>
          </Link>{" "}
          ما موافقت می‌کنید.
        </CardDescription>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="نام خود را وارد کنید"
                      disabled={false}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ایمیل را وارد کنید"
                      disabled={false}
                      {...field}
                    />
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
                    <Input
                      type="password"
                      placeholder="رمز عبور را وارد کنید"
                      disabled={false}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={false} className="w-full rounded-lg" size="lg">
              ورود
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={false}
          variant="secondary"
          className="w-full rounded-lg"
          size="lg"
        >
          <FcGoogle className="ml-2 size-5" />
          ورود با گوگل
        </Button>
        <Button
          disabled={false}
          variant="secondary"
          className="w-full rounded-lg"
          size="lg"
        >
          <FaGithub className="ml-2 size-5" />
          ورود با گیت هاب
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          حساب کاربری دارید؟
          <Link href="/sign-in" className="text-blue-600 px-1">
            وارد شوید
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}

export default SignUpCard;
