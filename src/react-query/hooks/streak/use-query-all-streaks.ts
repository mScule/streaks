import { useQuery } from "@tanstack/react-query";
import { getCollection } from "@/storage/collection/getCollection";

import type { Streak } from "@/types/streak";

export function useQueryAllStreaks() {
  return useQuery({
    queryKey: ["streak"],
    queryFn: async () => {
      const collection = await getCollection<Streak>("streak");

      return Object.entries(collection).map(([key, value]) => ({
        id: key,
        ...value,
      }));
    },
  });
}
