import { getCurrent } from "@/features/auth/action";
import SignInCard from "@/features/auth/Components/SignInCard";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const user = await getCurrent();

  if (user) redirect("/");
  return <SignInCard />;
};

export default SignInPage;
