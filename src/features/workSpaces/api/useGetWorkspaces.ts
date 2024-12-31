import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryFn: async () => {
      const response = await client.api.workspaces.$get();

      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();
      return data;
    },

    queryKey: ["workspaces"],
  });

  return query;
};
