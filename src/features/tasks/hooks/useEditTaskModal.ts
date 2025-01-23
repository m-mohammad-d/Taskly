import { parseAsString, useQueryState } from "nuqs";

export const useEditTaskModal = () => {
  const [taskId, setTaskId] = useQueryState("edit-modal", parseAsString);
  const open = (id: string) => setTaskId(id);
  const close = () => setTaskId(null);
  return {
    taskId,
    setTaskId,
    open,
    close,
  };
};
