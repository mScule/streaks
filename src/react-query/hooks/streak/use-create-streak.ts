import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEntry } from "@/storage/entry/createEntry";
import type { Streak } from "@/types/streak";

type Payload = {
  streak: Streak;
};

export function useCreateStreak() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ streak }: Payload) => {
      return await createEntry("streak", streak);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streak"] });
    },
  });
}
