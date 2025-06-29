import { ChevronLeft, Star, Search } from "lucide-react";

const ReviewsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gray-200 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-300" />
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Rating Summary */}
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-gray-300" />
          <div className="h-7 bg-gray-300 rounded w-12"></div>
          <span className="text-gray-300">·</span>
          <div className="h-7 bg-gray-300 rounded w-20"></div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
          <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Rating Categories */}
        <div className="grid grid-cols-1 gap-y-4 mb-8">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex justify-between gap-2">
              <div className="h-5 bg-gray-300 rounded w-24"></div>
              <div className="flex w-[50%] items-center gap-2">
                <div className="flex-1 h-1 bg-gray-200 rounded-full">
                  <div className="h-full bg-gray-300 rounded-full w-4/5"></div>
                </div>
                <div className="h-5 bg-gray-300 rounded w-8"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {[1, 2, 3].map((index) => (
            <div key={index}>
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-5 bg-gray-300 rounded w-28"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPageSkeleton;
