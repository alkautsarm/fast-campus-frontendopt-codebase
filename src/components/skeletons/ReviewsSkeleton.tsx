import { Star } from "lucide-react";

const ReviewsSkeleton = () => {
  return (
    <section className="mb-6 px-6 animate-pulse">
      {/* Rating Header */}
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-4 h-4 text-gray-300" />
        <div className="h-5 bg-gray-300 rounded w-8"></div>
        <span className="text-gray-300">·</span>
        <div className="h-5 bg-gray-300 rounded w-16"></div>
      </div>

      {/* Review Card */}
      <div className="flex mb-6 gap-4">
        <div className="w-full border border-gray-200 rounded-lg p-4">
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Show All Reviews Button */}
      <div className="w-full py-3 border border-gray-300 rounded-lg bg-gray-200">
        <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
      </div>
    </section>
  );
};

export default ReviewsSkeleton;
