import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
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

interface HotelListState {
  hotels: IHotelData[];
  loading: boolean;
  selectedCategory: EHotelCategory | null;
  selectedPlace: ILocation;
  selectedDateRange: DateRange | undefined;
  tenantCounts: TenantCounts;
  lastItemKey: string | null;
}

type HotelListAction =
  | { type: "SET_HOTELS"; payload: IHotelData[] }
  | { type: "APPEND_HOTELS"; payload: IHotelData[] }
  | { type: "RESET_HOTELS" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SELECTED_CATEGORY"; payload: EHotelCategory | null }
  | { type: "SET_SELECTED_PLACE"; payload: ILocation }
  | { type: "SET_SELECTED_DATE_RANGE"; payload: DateRange | undefined }
  | { type: "SET_TENANT_COUNTS"; payload: TenantCounts }
  | { type: "SET_LAST_ITEM_KEY"; payload: string | null };

const initialState: HotelListState = {
  hotels: [],
  loading: false,
  selectedCategory: null,
  selectedPlace: { id: 0, name: "Anywhere", image: "", imageWebp: "" },
  selectedDateRange: undefined,
  tenantCounts: { adults: 0, children: 0, infants: 0 },
  lastItemKey: null,
};

const hotelListReducer = (
  state: HotelListState,
  action: HotelListAction,
): HotelListState => {
  switch (action.type) {
    case "SET_HOTELS":
      return { ...state, hotels: action.payload };
    case "APPEND_HOTELS":
      return { ...state, hotels: [...state.hotels, ...action.payload] };
    case "RESET_HOTELS":
      return { ...state, hotels: [], lastItemKey: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_SELECTED_PLACE":
      return { ...state, selectedPlace: action.payload };
    case "SET_SELECTED_DATE_RANGE":
      return { ...state, selectedDateRange: action.payload };
    case "SET_TENANT_COUNTS":
      return { ...state, tenantCounts: action.payload };
    case "SET_LAST_ITEM_KEY":
      return { ...state, lastItemKey: action.payload };
    default:
      return state;
  }
};

interface IHotelListContext extends HotelListState {
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

const HotelListContext = createContext<IHotelListContext>({
  ...initialState,
  loadHotels: () => {},
  setHotels: () => {},
  setLoading: () => {},
  handleSearchSubmit: () => {},
  handleCategorySelect: () => {},
  setSelectedPlace: () => {},
  setSelectedDateRange: () => {},
  setTenantCounts: () => {},
});

const HotelListProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(hotelListReducer, initialState);

  const loadHotels = useCallback(
    ({
      after,
      category,
      locationId,
      totalTenants,
      dateRange,
    }: ILoadHotelsProps = {}) => {
      if (state.loading) return;

      dispatch({ type: "SET_LOADING", payload: true });

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
          dispatch({
            type: "SET_LAST_ITEM_KEY",
            payload: hotelsKey[hotelsKey.length - 1],
          });

          const hotelsData = Object.values(snapshot.val()) as IHotelData[];

          if (dateRange) {
            const filteredHotels = hotelsData.filter((hotel) => {
              return (
                hotel.availableDates.startEpoch <=
                  (dateRange.from?.getTime() || 0) &&
                hotel.availableDates.endEpoch >= (dateRange.to?.getTime() || 0)
              );
            });

            if (after) {
              dispatch({ type: "APPEND_HOTELS", payload: filteredHotels });
            } else {
              dispatch({ type: "SET_HOTELS", payload: filteredHotels });
            }
          } else {
            if (after) {
              dispatch({ type: "APPEND_HOTELS", payload: hotelsData });
            } else {
              dispatch({ type: "SET_HOTELS", payload: hotelsData });
            }
          }
        }

        dispatch({ type: "SET_LOADING", payload: false });
      });
    },
    [state.loading],
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
      category: state.selectedCategory,
      locationId,
      dateRange,
      totalTenants,
    });
  };

  const handleCategorySelect = (category: EHotelCategory | null) => {
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: category });
    dispatch({ type: "RESET_HOTELS" });

    loadHotels({
      category,
      locationId: state.selectedPlace.id,
      totalTenants:
        state.tenantCounts.adults +
        state.tenantCounts.children +
        state.tenantCounts.infants,
      dateRange: state.selectedDateRange,
    });
  };

  const setHotels = (hotels: IHotelData[]) => {
    dispatch({ type: "SET_HOTELS", payload: hotels });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setSelectedPlace = (place: ILocation) => {
    dispatch({ type: "SET_SELECTED_PLACE", payload: place });
  };

  const setSelectedDateRange = (dateRange: DateRange | undefined) => {
    dispatch({ type: "SET_SELECTED_DATE_RANGE", payload: dateRange });
  };

  const setTenantCounts = (tenantCounts: TenantCounts) => {
    dispatch({ type: "SET_TENANT_COUNTS", payload: tenantCounts });
  };

  const contextValue: IHotelListContext = {
    ...state,
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
