import { useState } from "react";
import { Search, Settings2 } from "lucide-react";
import { DateRange } from "react-day-picker";
import { EHotelLocation, TenantCounts } from "@/types";
import { formatDateLabel, formatGuestLabel, formatPlaceLabel } from "@/utils";
import SearchModal from "./SearchModal";

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<EHotelLocation>(
    EHotelLocation.All,
  );
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();
  const [tenantCounts, setTenantCounts] = useState<TenantCounts>({
    adults: 0,
    children: 0,
    infants: 0,
  });
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                {`${formatPlaceLabel(selectedPlace)} • ${formatDateLabel(selectedDateRange)} • ${formatGuestLabel(tenantCounts)}`}
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
        selectedPlace={selectedPlace}
        selectedDateRange={selectedDateRange}
        tenantCounts={tenantCounts}
        onClose={handleCloseModal}
        onPlaceChange={setSelectedPlace}
        onDateChange={setSelectedDateRange}
        onCountsChange={setTenantCounts}
      />
    </>
  );
};

export default SearchBar;
