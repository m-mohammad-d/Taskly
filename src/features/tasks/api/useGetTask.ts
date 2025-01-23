import { client } from "@/lib/rpc";

import { useQuery } from "@tanstack/react-query";
interface useGetTaskProps {
  taskId: string;
}
export const useGetTask = ({ taskId }: useGetTaskProps) => {
  const query = useQuery({
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"].$get({
        param: { taskId },
      });

      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();
      return data;
    },

    queryKey: ["task", taskId],
  });

  return query;
};
