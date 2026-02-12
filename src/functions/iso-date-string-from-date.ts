import {format} from "date-fns";

export const isoDateStringFromDate = (date: Date) => format(date, "yyyy-MM-dd");
