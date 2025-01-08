import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
interface useGetTasksProps {
  workspaceId: string;
}
export const useGetTasks = ({ workspaceId }: useGetTasksProps) => {
  const query = useQuery({
    queryFn: async () => {
      const response = await client.api.tasks.$get({ query: { workspaceId } });

      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();
      return data;
    },

    queryKey: ["tasks", workspaceId],
  });

  return query;
};
