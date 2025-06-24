import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import HotelListProvider from "@/contexts/HotelListProvider";
import { ILocation } from "~/src/types";
import { firestore } from "~/src/utils";

const defaultImageWrapper =
  "relative aspect-square rounded-2xl overflow-hidden mb-2";

const fetchLocations = async (): Promise<ILocation[]> => {
  const locationCollection = collection(firestore, "location");
  const querySnapshot = await getDocs(locationCollection);

  return querySnapshot.docs.map((doc) => doc.data() as ILocation);
};

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
