import { Search } from "lucide-react";

interface SearchModalFooterProps {
  onClearAll: () => void;
  onSearch: () => void;
}

const SearchModalFooter = ({
  onClearAll,
  onSearch,
}: SearchModalFooterProps) => {
  return (
    <div className="bg-white border-t border-gray-300 p-6">
      <div className="flex items-center justify-between mx-auto">
        <button className="underline hover:text-gray-500" onClick={onClearAll}>
          Clear all
        </button>

        <button
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium"
          onClick={onSearch}
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchModalFooter;
