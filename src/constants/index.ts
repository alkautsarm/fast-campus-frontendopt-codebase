import BandungImage from "~/assets/images/bandung.jpg";
import JakartaImage from "~/assets/images/jakarta.jpg";
import SurabayaImage from "~/assets/images/surabaya.jpg";
import AllLocationImage from "~/assets/images/all-location.jpg";
import { EHotelLocation } from "@/types";

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

export const LocationOptions = [
  {
    id: EHotelLocation.All,
    name: "All",
    image: AllLocationImage,
  },
  {
    id: EHotelLocation.Jakarta,
    name: "Jakarta",
    image: JakartaImage,
  },
  {
    id: EHotelLocation.Bandung,
    name: "Bandung",
    image: BandungImage,
  },
  {
    id: EHotelLocation.Surabaya,
    name: "Surabaya",
    image: SurabayaImage,
  },
];
