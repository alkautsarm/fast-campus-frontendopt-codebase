import { useState } from "react";
import { Search, Settings2 } from "lucide-react";
import { formatDateLabel, formatGuestLabel } from "@/utils";
import SearchModal from "./SearchModal";
import HotelDataProvider from "@/contexts/HotelDataProvider";

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedPlace, selectedDateRange, tenantCounts, handleSearchSubmit } =
    HotelDataProvider.useHotelDataContext();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = () => {
    handleSearchSubmit({
      locationId: selectedPlace.id,
      dateRange: selectedDateRange,
      totalTenants:
        tenantCounts.adults + tenantCounts.children + tenantCounts.infants,
    });
  };

  return (
    <>
      <div className="mb-6 px-4">
        <div
          className="flex items-center justify-between bg-white border border-gray-300 rounded-full px-6 py-4 shadow-sm hover:shadow-md cursor-pointer"
          onClick={handleOpenModal}
        >
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5" />
            <div>
              <div className="text-sm font-semibold">Where to?</div>
              <div className="text-sm font-light text-gray-400">
                {`${selectedPlace.name} • ${formatDateLabel(selectedDateRange)} • ${formatGuestLabel(tenantCounts)}`}
              </div>
            </div>
          </div>
          <button className="p-2 rounded-full border border-gray-300">
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <SearchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default SearchBar;
