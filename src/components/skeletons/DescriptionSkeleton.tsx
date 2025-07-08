import { Star, MapPin, Calendar, DoorOpen } from "lucide-react";

const DescriptionSkeleton = () => {
  const iconComponents = [DoorOpen, MapPin, Calendar];

  return (
    <section className="mt-4 mb-6 px-6 animate-pulse">
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="h-4 bg-gray-300 rounded w-8"></div>
            <span className="text-gray-300">·</span>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-32 mt-1"></div>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-300 rounded w-2/3 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="space-y-4">
          {iconComponents.map((IconComponent, index) => (
            <div key={index} className="flex items-start gap-4">
              <IconComponent className="w-6 h-6 text-gray-300" />
              <div className="flex-1">
                <div className="h-5 bg-gray-300 rounded w-1/3 mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-start gap-3">
          <div className="h-6 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="space-y-2 mt-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-4/5"></div>
        </div>
      </div>

      <div className="pb-6 border-b border-gray-200">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSkeleton;
