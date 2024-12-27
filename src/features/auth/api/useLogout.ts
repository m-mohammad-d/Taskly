import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.auth.logout["$post"]({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("شما با موفقیت از حساب کاربری خود خارج شدید. امیدواریم دوباره شما را ببینیم!");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("متأسفیم، مشکلی در خروج از حساب کاربری رخ داده است. لطفاً دوباره تلاش کنید.");
    },
  });

  return mutation;
}
