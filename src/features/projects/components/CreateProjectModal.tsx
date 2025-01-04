"use client";
import ResponsiveModal from "@/components/ResponsiveModal";
import CreateProjectForm from "./CreateProjectForm";
import { useCreateProjectModal } from "../hooks/useCreateProjectModal";

function CreateProjectModal() {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  );
}

export default CreateProjectModal;
