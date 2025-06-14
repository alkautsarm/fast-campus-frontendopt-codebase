import { useState } from "react";
import { DateRange } from "react-day-picker";
import { EHotelLocation, TenantCounts } from "@/types";
import { formatDateLabel, formatGuestLabel, formatPlaceLabel } from "@/utils";

import PlaceSearchCard from "./PlaceSearchCard";
import TenantSearchCard from "./TenantSearchCard";
import DateSearchCard from "./DateSearchCard";
import SearchModalFooter from "./SearchModalFooter";
import SearchModalHeader from "./SearchModalHeader";

interface SearchModalCard {
  id: ESearchModalCard;
  title: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;

  selectedPlace: EHotelLocation;
  selectedDateRange: DateRange | undefined;
  tenantCounts: TenantCounts;
  onPlaceChange: (place: EHotelLocation) => void;
  onDateChange: (date: DateRange | undefined) => void;
  onCountsChange: (counts: TenantCounts) => void;
}

enum ESearchModalCard {
  Where = 1,
  When = 2,
  Who = 3,
}

const SearchModalCards: SearchModalCard[] = [
  {
    id: ESearchModalCard.Where,
    title: "Where",
  },
  {
    id: ESearchModalCard.When,
    title: "When",
  },
  {
    id: ESearchModalCard.Who,
    title: "Who",
  },
];

const CollapsedCard = ({
  card,
  value,
}: {
  card: SearchModalCard;
  value: string;
}) => (
  <div className="flex justify-between items-center">
    <div className="text-sm text-gray-500">{card.title}</div>
    <div className="text-sm">{value}</div>
  </div>
);

const SearchModal = ({
  isOpen,
  onClose,
  onSubmit,

  selectedPlace,
  selectedDateRange,
  tenantCounts,
  onPlaceChange,
  onDateChange,
  onCountsChange,
}: SearchModalProps) => {
  const [expandedCard, setExpandedCard] = useState<ESearchModalCard>(
    ESearchModalCard.Where,
  );

  const getCardContent = (card: SearchModalCard) => {
    if (expandedCard !== card.id) {
      if (card.id === ESearchModalCard.Where) {
        return (
          <CollapsedCard value={formatPlaceLabel(selectedPlace)} card={card} />
        );
      }

      if (card.id === ESearchModalCard.When) {
        return (
          <CollapsedCard
            value={formatDateLabel(selectedDateRange)}
            card={card}
          />
        );
      }

      if (card.id === ESearchModalCard.Who) {
        return (
          <CollapsedCard value={formatGuestLabel(tenantCounts)} card={card} />
        );
      }
    }

    switch (card.id) {
      case ESearchModalCard.Where:
        return (
          <PlaceSearchCard
            onPlaceChange={onPlaceChange}
            selectedPlace={selectedPlace}
          />
        );
      case ESearchModalCard.When:
        return (
          <DateSearchCard
            onDateChange={onDateChange}
            selectedDateRange={selectedDateRange}
          />
        );
      case ESearchModalCard.Who:
        return (
          <TenantSearchCard
            onCountsChange={onCountsChange}
            counts={tenantCounts}
          />
        );
      default:
        return null;
    }
  };

  const handleClose = () => {
    setExpandedCard(ESearchModalCard.Where);
    onClose();
  };

  const handleClearAll = () => {
    onPlaceChange(EHotelLocation.All);
    onDateChange(undefined);
    onCountsChange({ adults: 0, children: 0, infants: 0 });
  };

  const handleSearch = () => {
    onSubmit();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-2 bg-white/50 backdrop-blur-3xl overflow-hidden">
      <div className="h-full flex flex-col">
        <SearchModalHeader onClose={handleClose} />

        <div className="flex-1 px-6 py-8 overflow-y-auto space-y-4">
          {SearchModalCards.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-gray-300 rounded-3xl px-6 py-8 shadow-sm hover:shadow-md cursor-pointer"
              onClick={() => setExpandedCard(card.id)}
            >
              {getCardContent(card)}
            </div>
          ))}
        </div>

        <SearchModalFooter
          onClearAll={handleClearAll}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchModal;
