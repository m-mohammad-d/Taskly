import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.tasks)[":taskId"]["$patch"], 200>;
type RequestType = InferRequestType<(typeof client.api.tasks)[":taskId"]["$patch"]>;

export function useUpdateTask() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.tasks[":taskId"].$patch({ json, param });

      if (!response.ok) {
        throw new Error("");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success(" وظیفه با موفقیت ویرایش شد");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
    },
    onError: () => {
      toast.error("ویرایش وظیفه با شکست ایجاد شد");
    },
  });

  return mutation;
}
