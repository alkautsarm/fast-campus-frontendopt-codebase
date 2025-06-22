import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateRange } from "react-day-picker";
import { EHotelCategory, IHotelData, ILocation, TenantCounts } from "@/types";
import {
  query,
  startAfter,
  limitToFirst,
  orderByKey,
  onValue,
  ref,
  orderByChild,
  startAt,
} from "firebase/database";
import { db } from "@/utils";

const limit = 5;
const dbPath = {
  default: "hotels",
  category: "hotels_type",
  location: "hotels_location",
  categoryLocation: "hotels_type_location",
};

interface ILoadHotelsProps {
  after?: string;
  category?: EHotelCategory | null;
  locationId?: number;
  totalTenants?: number;
  dateRange?: DateRange;
}

interface IHotelDataContext {
  hotels: IHotelData[];
  loading: boolean;
  selectedCategory: EHotelCategory | null;
  selectedPlace: ILocation;
  selectedDateRange: DateRange | undefined;
  tenantCounts: TenantCounts;
  lastItemKey: string | null;

  loadHotels: (props: ILoadHotelsProps) => void;
  setHotels: (hotels: IHotelData[]) => void;
  setLoading: (loading: boolean) => void;
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

const HotelDataContext = createContext<IHotelDataContext>({
  hotels: [],
  loading: false,
  selectedCategory: null,
  selectedPlace: { id: 0, name: "Anywhere", image: "" },
  selectedDateRange: undefined,
  tenantCounts: { adults: 0, children: 0, infants: 0 },
  lastItemKey: null,

  loadHotels: () => {},
  setHotels: () => {},
  setLoading: () => {},
  handleSearchSubmit: () => {},
  handleCategorySelect: () => {},
  setSelectedPlace: () => {},
  setSelectedDateRange: () => {},
  setTenantCounts: () => {},
});

const HotelDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [hotels, setHotels] = useState<IHotelData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<EHotelCategory | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<ILocation>({
    id: 0,
    name: "Anywhere",
    image: "",
  });
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [tenantCounts, setTenantCounts] = useState<TenantCounts>({
    adults: 0,
    children: 0,
    infants: 0,
  });
  const [lastItemKey, setLastItemKey] = useState<string | null>(null);

  const loadHotels = useCallback(
    ({
      after,
      category,
      locationId,
      totalTenants,
      dateRange,
    }: ILoadHotelsProps = {}) => {
      if (loading) return;

      setLoading(true);

      let selectedDbPath = dbPath.default;
      if (category) selectedDbPath = `${dbPath.category}/${category}`;
      if (locationId) selectedDbPath = `${dbPath.location}/${locationId}`;
      if (category && locationId) {
        selectedDbPath = `${dbPath.categoryLocation}/${category}_${locationId}`;
      }

      let queryConstraints = [orderByKey()];
      if (after) {
        queryConstraints.push(startAfter(after));
      }
      if (totalTenants) {
        queryConstraints = [orderByChild("capacity"), startAt(totalTenants)];
      }
      if (!totalTenants && !dateRange) {
        queryConstraints.push(limitToFirst(limit));
      }

      const hotelsQuery = query(ref(db, selectedDbPath), ...queryConstraints);
      onValue(hotelsQuery, (snapshot) => {
        if (snapshot.exists()) {
          const hotelsKey = Object.keys(snapshot.val());
          setLastItemKey(hotelsKey[hotelsKey.length - 1]);

          const hotelsData = Object.values(snapshot.val()) as IHotelData[];

          if (dateRange) {
            const filteredHotels = hotelsData.filter((hotel) => {
              return (
                hotel.availableDates.startEpoch <=
                  (dateRange.from?.getTime() || 0) &&
                hotel.availableDates.endEpoch >= (dateRange.to?.getTime() || 0)
              );
            });

            setHotels((prev) =>
              after ? [...prev, ...filteredHotels] : [...filteredHotels],
            );
          } else {
            setHotels((prev) =>
              after ? [...prev, ...hotelsData] : [...hotelsData],
            );
          }
        }

        setLoading(false);
      });
    },
    [loading],
  );

  useEffect(() => {
    loadHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = ({
    locationId,
    dateRange,
    totalTenants,
  }: {
    locationId: number;
    dateRange: DateRange | undefined;
    totalTenants: number;
  }) => {
    loadHotels({
      after: undefined,
      category: selectedCategory,
      locationId,
      dateRange,
      totalTenants,
    });
  };

  const handleCategorySelect = (category: EHotelCategory | null) => {
    setSelectedCategory(category);

    setHotels([]);
    setLastItemKey(null);
    loadHotels({
      category,
      locationId: selectedPlace.id,
      totalTenants:
        tenantCounts.adults + tenantCounts.children + tenantCounts.infants,
      dateRange: selectedDateRange,
    });
  };

  const contextValue: IHotelDataContext = {
    hotels,
    loading,
    selectedCategory,
    selectedPlace,
    selectedDateRange,
    tenantCounts,
    lastItemKey,

    handleSearchSubmit,
    handleCategorySelect,
    loadHotels,
    setHotels,
    setLoading,
    setSelectedPlace,
    setSelectedDateRange,
    setTenantCounts,
  };

  return (
    <HotelDataContext.Provider value={contextValue}>
      {children}
    </HotelDataContext.Provider>
  );
};

HotelDataProvider.useHotelDataContext = () => {
  const context = useContext(HotelDataContext);
  if (!context) {
    throw new Error(
      "useHotelDataContext must be used within a HotelDataProvider",
    );
  }
  return context;
};

export default HotelDataProvider;
