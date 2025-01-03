import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.members)[":memberId"]["$patch"], 200>;
type RequestType = InferRequestType<(typeof client.api.members)[":memberId"]["$patch"]>;

export function useUpdateMember() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[":memberId"]["$patch"]({ param, json: { role: json.role } });
      if (!response.ok) {
        throw new Error("Failed to update member");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("نقش کاربر با موفقیت به‌روزرسانی شد.");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: () => {
      toast.error("خطا در به‌روزرسانی کاربر. لطفاً دوباره تلاش کنید.");
    },
  });

  return mutation;
}
