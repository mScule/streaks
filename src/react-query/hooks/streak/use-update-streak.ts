import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateEntry} from "@/storage/entry/updateEntry";
import type {Streak} from "@/types/streak";

type Payload = {
  id: string;
  streak: Partial<Streak>;
};

export function useUpdateStreak() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, streak}: Payload) => {
      return await updateEntry<Streak>("streak", id, streak);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["streak"]});
    }
  });
}
