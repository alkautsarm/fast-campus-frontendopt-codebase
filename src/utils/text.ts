import { DateRange } from "react-day-picker";
import { TenantCounts } from "@/types";
import { formatDate } from "./date";

export const formatDateLabel = (date: DateRange | undefined) => {
  return date
    ? formatDate(date.from?.toISOString() || "", date.to?.toISOString() || "")
    : "Any week";
};

export const formatGuestLabel = (counts: TenantCounts) => {
  const totalGuests = counts.adults + counts.children + counts.infants;

  return totalGuests ? `${totalGuests} guests` : "Add guests";
};
