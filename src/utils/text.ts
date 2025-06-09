import { DateRange } from "react-day-picker";
import { EHotelLocation, TenantCounts } from "@/types";
import { LocationOptions } from "@/constants";
import { formatDate } from "./date";

export const formatPlaceLabel = (place: EHotelLocation) => {
  if (!place) return "Anywhere";

  const location = LocationOptions.find((location) => location.id === place);

  return location ? location.name : "Anywhere";
};

export const formatDateLabel = (date: DateRange | undefined) => {
  return date
    ? formatDate(date.from?.toISOString() || "", date.to?.toISOString() || "")
    : "Any week";
};

export const formatGuestLabel = (counts: TenantCounts) => {
  const totalGuests = counts.adults + counts.children + counts.infants;

  return totalGuests ? `${totalGuests} guests` : "Add guests";
};
