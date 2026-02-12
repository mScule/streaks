import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEntry } from "@/storage/entry/deleteEntry";

type Payload = {
  id: string;
};

export function useDeleteStreak() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: Payload) => {
      return await deleteEntry("streak", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streak"] });
    },
  });
}
