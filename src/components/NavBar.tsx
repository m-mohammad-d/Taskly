import UserButton from "@/features/auth/Components/UserButton";
import MobileSidebar from "./MobileSidebar";

function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between px-6 pt-4">
      <div className="hidden flex-col lg:flex">
        <h1 className="text-2xl font-semibold">خونه</h1>
        <p className="text-muted-foreground">تمام پروژه‌ها و وظایف خود را اینجا مدیریت کنید.</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
}

export default Navbar;
