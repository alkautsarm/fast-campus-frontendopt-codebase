import { HotelCardSkeleton } from "./index";

const WishlistSkeleton = () => {
  return (
    <div className="min-h-screen pt-4 border-l border-r border-gray-100">
      <div className="px-6 py-8">
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-5 bg-gray-300 rounded w-32"></div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <HotelCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistSkeleton;
