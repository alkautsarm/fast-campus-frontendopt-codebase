import arcticIcon from "~/assets/icons/arctic.svg";
import cabinIcon from "~/assets/icons/cabin.svg";
import cavesIcon from "~/assets/icons/caves.svg";
import islandIcon from "~/assets/icons/island.svg";
import { EHotelCategory } from "@/types";

export const CategoryOptions = [
  { id: EHotelCategory.Island, icon: islandIcon, label: "Island" },
  { id: EHotelCategory.Cabin, icon: cabinIcon, label: "Cabin" },
  { id: EHotelCategory.Caves, icon: cavesIcon, label: "Caves" },
  { id: EHotelCategory.Arctic, icon: arcticIcon, label: "Arctic" },
];

export const HotelListLimit = 5;
export const DbPath = {
  default: "hotels",
  category: "hotels_type",
  location: "hotels_location",
  categoryLocation: "hotels_type_location",
  detail: "hotels_detail",
};

export const TenantOptions = [
  {
    title: "Adults",
    description: "Ages 13 or above",
    id: "adults",
  },
  {
    title: "Children",
    description: "Ages 2-12",
    id: "children",
  },

  {
    title: "Infants",
    description: "Under 2",
    id: "infants",
  },
];
