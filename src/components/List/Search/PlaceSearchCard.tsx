import { useQuery } from "@tanstack/react-query";
import HotelListProvider from "@/contexts/HotelListProvider";
import { fetchLocations } from "@/utils";
import Image from "next/image";

const defaultImageWrapper =
  "relative aspect-square rounded-2xl overflow-hidden mb-2";
const imageClass =
  "w-full h-full object-cover hover:scale-110 transition-transform duration-200";

const PlaceSearchExpandedCard = () => {
  const { setSelectedPlace, selectedPlace } =
    HotelListProvider.useHotelListContext();

  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-10">Where to?</h2>

      <div className="grid grid-cols-4 gap-4">
        {locations.map((location) => (
          <button key={location.id} onClick={() => setSelectedPlace(location)}>
            <div
              className={`${defaultImageWrapper} ${selectedPlace.id === location.id ? "ring-2 ring-black" : ""}`}
            >
              <Image
                className={imageClass}
                src={location.image}
                alt={location.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              />
            </div>
            <p className="text-sm font-medium text-center">{location.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlaceSearchExpandedCard;
