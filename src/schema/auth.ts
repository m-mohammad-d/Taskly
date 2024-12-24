import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().min(1, "لطفاً ایمیل خود را وارد کنید.").email("فرمت ایمیل وارد شده نادرست است."),
  password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد.").max(256, "رمز عبور نمی‌تواند بیش از 256 کاراکتر باشد."),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(3, "نام نباید کمتر از سه حرف باشد"),
  email: z.string().trim().min(1, "لطفاً ایمیل خود را وارد کنید.").email("فرمت ایمیل وارد شده نادرست است."),
  password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد.").max(256, "رمز عبور نمی‌تواند بیش از 256 کاراکتر باشد."),
});
