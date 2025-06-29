import { Heart } from "lucide-react";

const HotelCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-4 relative">
        <div className="h-[310px] w-full rounded-xl bg-gray-300"></div>
        <div className="absolute top-3 right-3">
          <Heart className="text-gray-400" fill="gray" />
        </div>
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-12"></div>
          </div>
        </div>
        <div className="mb-1 h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="mb-2 h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-5 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default HotelCardSkeleton;
