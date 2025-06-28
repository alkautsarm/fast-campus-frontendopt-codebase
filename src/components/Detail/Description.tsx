import { Star, MapPin, Calendar, DoorOpen } from "lucide-react";
import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";

const Description = () => {
  const { hotel } = HotelDetailProvider.useHotelDetailContext();

  if (!hotel) return null;

  const averageRating = hotel.rating;
  const reviewCount = hotel.reviews.length;
  const hostInitial = hotel.host.name.charAt(0).toUpperCase();

  const features = [
    {
      Icon: DoorOpen,
      title: "Self check-in",
      description: "Check yourself in with the keypad.",
    },
    {
      Icon: MapPin,
      title: "Great location",
      description: "100% of recent guests gave the location a 5-star rating.",
    },
    {
      Icon: Calendar,
      title: "Free cancellation",
    },
  ];

  return (
    <section className="mt-4 mb-6 px-6">
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {hotel.name}
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-black" />
            <span className="font-medium">{averageRating}</span>
            <span className="text-gray-600">·</span>
            <span className="font-medium underline">{reviewCount} reviews</span>
          </div>
        </div>
        <div className="flex items-center font-light gap-1 mt-1 text-sm text-gray-600">
          <span>Room in {hotel.location.name}</span>
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-800 text-white rounded-full flex-shrink-0 flex items-center justify-center font-medium">
            {hostInitial}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">
              {hotel.type.name} theme hotel hosted by {hotel.host.name}
            </h3>
            <p className="text-sm font-light text-gray-600">Superhost</p>
          </div>
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="space-y-4">
          {features.map(({ Icon, title, description }) => (
            <div key={title} className="flex items-start gap-4">
              <Icon className="w-6 h-6 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
                {description && (
                  <p className="text-sm font-light text-gray-400">
                    {description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-start gap-3">
          <div className="font-bold text-xl">
            <span className="text-red-500">hotel</span>
            <span>cover</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-gray-600 mt-2">
          Every booking includes free protection from Host cancellations,
          listing inaccuracies, and other issues like trouble checking in.
        </p>
      </div>

      <div className="pb-6 border-b border-gray-200">
        <p className="text-gray-600 leading-relaxed text-sm">
          {hotel.description}
        </p>
      </div>
    </section>
  );
};

export default Description;
