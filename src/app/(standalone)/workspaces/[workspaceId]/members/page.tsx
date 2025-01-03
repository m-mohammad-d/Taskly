import { getCurrent } from "@/features/auth/queries";
import MembersList from "@/features/workSpaces/components/MembersList";
import { redirect } from "next/navigation";

async function page() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  return (
    <div className="w-full lg:max-w-xl">
      <MembersList userId={user.$id} />
    </div>
  );
}

export default page;
