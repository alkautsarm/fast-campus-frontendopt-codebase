import { LocationOptions } from "~/src/constants";
import HotelDataProvider from "@/contexts/HotelDataProvider";

const defaultImageWrapper =
  "relative aspect-square rounded-2xl overflow-hidden mb-2";

const PlaceSearchExpandedCard = () => {
  const { setSelectedPlace, selectedPlace } =
    HotelDataProvider.useHotelDataContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-10">Where to?</h2>

      <div className="grid grid-cols-4 gap-4">
        {LocationOptions.map((location) => (
          <button
            key={location.id}
            onClick={() => setSelectedPlace(location.id)}
          >
            <div
              className={`${defaultImageWrapper} ${selectedPlace === location.id ? "ring-2 ring-black" : ""}`}
            >
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
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
