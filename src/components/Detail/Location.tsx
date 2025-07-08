import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import HotelDetailContext from "@/contexts/HotelDetailProvider";

const Location = () => {
  const { hotel } = HotelDetailContext.useHotelDetailContext();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });

  const center = {
    lat: hotel?.location.latitude ?? 0,
    lng: hotel?.location.longitude ?? 0,
  };

  if (!hotel) return null;

  return (
    <section className="mb-6 px-6">
      <div className="pb-6 h-[400px] border-b border-gray-200">
        {isLoaded && (
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
          >
            <Marker position={center} />
          </GoogleMap>
        )}
      </div>
    </section>
  );
};

export default Location;
