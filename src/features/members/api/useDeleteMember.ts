import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.members)[":memberId"]["$delete"], 200>;
type RequestType = InferRequestType<(typeof client.api.members)[":memberId"]["$delete"]>;

export function useDeleteMember() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.members[":memberId"]["$delete"]({ param });
      if (!response.ok) {
        throw new Error("Failed to delete member");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("کاربر با موفقیت از تیم حذف شد.");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: () => {
      toast.error("خطا در حذف عضو. لطفاً دوباره تلاش کنید.");
    },
  });

  return mutation;
}
