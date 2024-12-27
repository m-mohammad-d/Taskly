import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>["json"];

export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.workspaces["$post"]({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("فضای کاری با موفقیت ایجاد شد");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: () => {
      toast.error("ایجاد فضای کاری با شکست ایجاد شد");
    },
  });

  return mutation;
}
