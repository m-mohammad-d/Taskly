"use client";

import ResponsiveModal from "@/components/ResponsiveModal";
import { useEditTaskModal } from "../hooks/useEditTaskModal";
import EditTaskFormWrapper from "./EditTaskFormWrapper";

function EditTaskModal() {
  const { taskId, close } = useEditTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFormWrapper onCancel={close} id={taskId} />}
    </ResponsiveModal>
  );
}

export default EditTaskModal;
