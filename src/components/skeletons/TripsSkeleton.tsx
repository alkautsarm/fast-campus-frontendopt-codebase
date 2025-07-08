import { Calendar } from "lucide-react";
import HotelCardSkeleton from "./HotelCardSkeleton";

const BookingCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4 animate-pulse">
      <div className="relative">
        <HotelCardSkeleton />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
          <div className="h-5 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="text-sm text-gray-500">
          <div className="h-4 bg-gray-300 rounded w-40"></div>
        </div>
      </div>
    </div>
  );
};

const TripsSkeleton = () => {
  return (
    <div className="min-h-screen pt-4 border-l border-r border-gray-100 pb-20">
      <div className="px-6 py-8">
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-5 bg-gray-300 rounded w-24"></div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <BookingCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripsSkeleton;
