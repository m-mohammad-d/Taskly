import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.tasks)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.tasks)["$post"]>["json"];

export function useCreateTask() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.tasks["$post"]({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success(" تسک با موفقیت ایجاد شد");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("ایجاد تسک با شکست ایجاد شد");
    },
  });

  return mutation;
}
