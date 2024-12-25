import Image from "next/image";
import Link from "next/link";
import DottedSeparator from "./DottedSeparator";
import Navigation from "./Navigation";

function Sidebar() {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <Link href="/">
        <Image src="/logo.svg" width={164} height={68} alt="logo" />
      </Link>
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
}

export default Sidebar;
