import { X } from "lucide-react";

interface SearchModalHeaderProps {
  onClose: () => void;
}

const SearchModalHeader = ({ onClose }: SearchModalHeaderProps) => (
  <div className="relative px-6 py-4">
    <button
      onClick={onClose}
      className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full border border-gray-200"
    >
      <X className="w-4 h-4" />
    </button>
    <div className="w-fit mx-auto text-sm font-semibold border-b-2 border-black pb-2">
      Stays
    </div>
  </div>
);

export default SearchModalHeader;
