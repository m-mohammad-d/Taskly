import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
interface useGetMembersProps {
  workspaceId: string;
}
export const useGetMembers = ({ workspaceId }: useGetMembersProps) => {
  const query = useQuery({
    queryFn: async () => {
      const response = await client.api.members.$get({ query: { workspaceId } });

      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();
      return data;
    },

    queryKey: ["members", workspaceId],
  });

  return query;
};
