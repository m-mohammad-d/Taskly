import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CreateProjectModal from "@/features/projects/components/CreateProjectModal";
import CreateWorkspaceModal from "@/features/workSpaces/components/CreateWorkspaceModal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <div className="flex h-full w-full">
        <div className="fixed right-0 top-0 hidden h-full overflow-y-auto lg:block lg:w-[264px]">
          <Sidebar />
        </div>
        <div className="w-full lg:pr-[264px]">
          <div className="mx-auto h-full max-w-screen-2xl">
            <Navbar />
            <main className="flex h-full flex-col px-6 py-8">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
