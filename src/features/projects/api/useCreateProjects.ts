import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.projects)["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.projects)["$post"]>["form"];

export function useCreateProjects() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (form) => {
      const response = await client.api.projects["$post"]({ form });

      if (!response.ok) {
        throw new Error("");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success(" پروژه با موفقیت ایجاد شد");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("ایجاد پروژه با شکست ایجاد شد");
    },
  });

  return mutation;
}
