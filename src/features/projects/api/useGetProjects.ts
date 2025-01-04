import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
interface useGetProjectsProps {
  workspaceId: string;
}
export const useGetProjects = ({ workspaceId }: useGetProjectsProps) => {
  const query = useQuery({
    queryFn: async () => {
      const response = await client.api.projects.$get({ query: { workspaceId } });

      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();
      return data;
    },

    queryKey: ["projects", workspaceId],
  });

  return query;
};
