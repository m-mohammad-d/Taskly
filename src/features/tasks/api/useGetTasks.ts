import { client } from "@/lib/rpc";
import { TaskStatus } from "@/types/tasks";
import { useQuery } from "@tanstack/react-query";
interface useGetTasksProps {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatus | null;
  assigneeId?: string | null;
  dueDate?: string | null;
  search?: string | null;
}
export const useGetTasks = ({ workspaceId, projectId, status, assigneeId, dueDate, search }: useGetTasksProps) => {
  const query = useQuery({
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: { workspaceId, projectId: projectId ?? undefined, search: search ?? undefined, assigneeId: assigneeId ?? undefined, status: status ?? undefined, dueDate: dueDate ?? undefined },
      });

      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();
      return data;
    },

    queryKey: ["tasks", workspaceId, projectId, status, dueDate, assigneeId, search],
  });

  return query;
};
