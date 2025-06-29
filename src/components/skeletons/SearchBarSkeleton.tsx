import { Search, Settings2 } from "lucide-react";

const SearchBarSkeleton = () => {
  return (
    <div className="mb-6 px-4 animate-pulse">
      <div className="flex items-center justify-between bg-gray-200 border border-gray-300 rounded-full px-6 py-4">
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-gray-400" />
          <div>
            <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-40"></div>
          </div>
        </div>
        <div className="p-2 rounded-full border border-gray-300 bg-gray-200">
          <Settings2 className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SearchBarSkeleton;
