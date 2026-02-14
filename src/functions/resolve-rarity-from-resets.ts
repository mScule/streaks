import {differenceInDays} from "date-fns";
import {last} from "lodash";

export function resolveDaysFromResets(resets: string[]): number {
  const latestReset = last(resets);

  if (!latestReset) {
    return 0;
  }

  const currentDate = new Date();
  const latestResetDate = new Date(latestReset);

  return differenceInDays(currentDate, latestResetDate);
}
