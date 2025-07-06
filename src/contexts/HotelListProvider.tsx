"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  EHotelCategory,
  ESearchModalCard,
  IHotelData,
  ILocation,
  TenantCounts,
} from "@/types";
import { fetchHotelsWithFilters } from "@/utils";

interface ILoadHotelsProps {
  after?: string;
  category?: EHotelCategory | null;
  locationId?: number;
  totalTenants?: number;
  dateRange?: DateRange;
}

// Applied filter state interface
interface IAppliedFilters {
  category: EHotelCategory | null;
  place: ILocation;
  dateRange: DateRange | undefined;
  tenantCounts: TenantCounts;
}

interface IHotelListContext {
  hotels: IHotelData[];
  loading: boolean;
  selectedCategory: EHotelCategory | null;
  selectedPlace: ILocation;
  selectedDateRange: DateRange | undefined;
  tenantCounts: TenantCounts;
  lastItemKey: string | null;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  expandedCard: ESearchModalCard;
  setExpandedCard: (expandedCard: ESearchModalCard) => void;

  loadHotels: (props: ILoadHotelsProps) => void;
  handleSearchSubmit: (props: {
    locationId: number;
    dateRange: DateRange | undefined;
    totalTenants: number;
  }) => void;
  handleCategorySelect: (category: EHotelCategory | null) => void;
  setSelectedPlace: (place: ILocation) => void;
  setSelectedDateRange: (dateRange: DateRange | undefined) => void;
  setTenantCounts: (tenantCounts: TenantCounts) => void;
}

const HotelListContext = createContext<IHotelListContext>({
  hotels: [],
  loading: false,
  selectedCategory: null,
  selectedPlace: { id: 0, name: "Anywhere", image: "", imageWebp: "" },
  selectedDateRange: undefined,
  tenantCounts: { adults: 0, children: 0, infants: 0 },
  lastItemKey: null,
  isModalOpen: false,
  setIsModalOpen: () => {},
  expandedCard: ESearchModalCard.Where,
  setExpandedCard: () => {},

  loadHotels: () => {},
  handleSearchSubmit: () => {},
  handleCategorySelect: () => {},
  setSelectedPlace: () => {},
  setSelectedDateRange: () => {},
  setTenantCounts: () => {},
});

const HotelListProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(ESearchModalCard.Where);

  const [selectedCategory, setSelectedCategory] =
    useState<EHotelCategory | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<ILocation>({
    id: 0,
    name: "Anywhere",
    image: "",
    imageWebp: "",
  });
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [tenantCounts, setTenantCounts] = useState<TenantCounts>({
    adults: 0,
    children: 0,
    infants: 0,
  });

  // Applied filter state (used for actual queries)
  const [appliedFilters, setAppliedFilters] = useState<IAppliedFilters>({
    category: null,
    place: {
      id: 0,
      name: "Anywhere",
      image: "",
      imageWebp: "",
    },
    dateRange: undefined,
    tenantCounts: {
      adults: 0,
      children: 0,
      infants: 0,
    },
  });

  const appliedTotalTenants =
    appliedFilters.tenantCounts.adults +
    appliedFilters.tenantCounts.children +
    appliedFilters.tenantCounts.infants;

  // Create query key that uses applied filters instead of UI state
  const queryKey = useMemo(
    () => [
      "hotels",
      appliedFilters.category,
      appliedFilters.place.id,
      appliedTotalTenants,
      appliedFilters.dateRange?.from?.getTime(),
      appliedFilters.dateRange?.to?.getTime(),
    ],
    [
      appliedFilters.category,
      appliedFilters.place.id,
      appliedTotalTenants,
      appliedFilters.dateRange,
    ],
  );

  // Use infinite query for pagination
  const { data, fetchNextPage, isFetchingNextPage, isLoading, refetch } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }: { pageParam?: string }) =>
        fetchHotelsWithFilters({
          pageParam,
          category: appliedFilters.category,
          locationId: appliedFilters.place.id,
          totalTenants: appliedTotalTenants,
          dateRange: appliedFilters.dateRange,
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.lastItemKey || undefined,
      enabled: true,
    });

  // Flatten the paginated data
  const hotels = useMemo(() => {
    return data?.pages.flatMap((page) => page.hotels) || [];
  }, [data]);

  const lastItemKey = useMemo(() => {
    const lastPage = data?.pages[data.pages.length - 1];
    return lastPage?.lastItemKey || null;
  }, [data]);

  // Legacy loadHotels function for compatibility
  const loadHotels = (props: ILoadHotelsProps = {}) => {
    if (props.after) {
      fetchNextPage();
    } else {
      refetch();
    }
  };

  const handleSearchSubmit = ({
    locationId,
    dateRange,
    totalTenants: searchTotalTenants,
  }: {
    locationId: number;
    dateRange: DateRange | undefined;
    totalTenants: number;
  }) => {
    setAppliedFilters({
      category: selectedCategory,
      place: { ...selectedPlace, id: locationId },
      dateRange,
      tenantCounts: {
        adults: searchTotalTenants,
        children: 0,
        infants: 0,
      },
    });
  };

  const handleCategorySelect = (category: EHotelCategory | null) => {
    setSelectedCategory(category);
    setAppliedFilters((prev) => ({ ...prev, category }));
  };

  const contextValue: IHotelListContext = {
    hotels,
    loading: isLoading || isFetchingNextPage,
    selectedCategory,
    selectedPlace,
    selectedDateRange,
    tenantCounts,
    lastItemKey,
    isModalOpen,
    setIsModalOpen,
    expandedCard,
    setExpandedCard,
    loadHotels,
    handleSearchSubmit,
    handleCategorySelect,
    setSelectedPlace,
    setSelectedDateRange,
    setTenantCounts,
  };

  return (
    <HotelListContext.Provider value={contextValue}>
      {children}
    </HotelListContext.Provider>
  );
};

HotelListProvider.useHotelListContext = () => {
  const context = useContext(HotelListContext);
  if (!context) {
    throw new Error(
      "useHotelListContext must be used within a HotelListProvider",
    );
  }
  return context;
};

export default HotelListProvider;
