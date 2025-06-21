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
import { CSSProperties, memo, useCallback, useEffect, useState } from "react";
import { db } from "./utils";
import HotelCard from "./components/HotelCard";
import CategoryMenu from "./components/CategoryMenu";
import SearchBar from "./components/Search/SearchBar";
import {
  EHotelCategory,
  EHotelLocation,
  IHotelData,
  TenantCounts,
} from "./types";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList } from "react-window";
import { DateRange } from "react-day-picker";
import { CircleX } from "lucide-react";

interface ILoadHotelsProps {
  after?: string;
  category?: EHotelCategory | null;
  locationId?: EHotelLocation;
  totalTenants?: number;
  dateRange?: DateRange;
}

const limit = 5;
const dbPath = {
  default: "hotels",
  category: "hotels_type",
  location: "hotels_location",
  categoryLocation: "hotels_type_location",
};

const HotelRow = memo(
  ({
    data,
    index,
    style,
  }: {
    data: IHotelData[];
    index: number;
    style: CSSProperties;
  }) => (
    <div style={{ ...style, top: +(style.top || 0) + 24 }} className="px-4">
      <HotelCard data={data[index]} />
    </div>
  ),
);

function App() {
  const [hotels, setHotels] = useState<IHotelData[]>([]);
  const [lastItemKey, setLastItemKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<EHotelCategory | null>(null);
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

  const handleCategorySelect = (category: EHotelCategory | null) => {
    setSelectedCategory(category);

    setHotels([]);
    setLastItemKey(null);
    loadHotels({
      category,
      locationId: selectedPlace,
      totalTenants:
        tenantCounts.adults + tenantCounts.children + tenantCounts.infants,
      dateRange: selectedDateRange,
    });
  };

  const handleSearchSubmit = ({
    locationId,
    dateRange,
    totalTenants,
  }: {
    locationId: EHotelLocation;
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

  return (
    <main className="pt-4">
      <h1 className="text-2xl font-bold mb-4 px-4">Explore</h1>

      <SearchBar
        handleSearchSubmit={handleSearchSubmit}
        selectedPlace={selectedPlace}
        selectedDateRange={selectedDateRange}
        tenantCounts={tenantCounts}
        setSelectedPlace={setSelectedPlace}
        setSelectedDateRange={setSelectedDateRange}
        setTenantCounts={setTenantCounts}
      />

      <CategoryMenu
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <section className="flex flex-col gap-6">
        {!hotels.length && !loading && (
          <div className="text-gray-400 flex flex-col justify-center items-center gap-4 py-10">
            <CircleX className="w-10 h-10" />
            <p className="text-lg font-bold">No hotels found</p>
          </div>
        )}

        {!!hotels.length && (
          <InfiniteLoader
            isItemLoaded={(index) => {
              if (
                tenantCounts.adults +
                tenantCounts.children +
                tenantCounts.infants
              ) {
                return true;
              }

              return !loading && !!hotels[index];
            }}
            itemCount={1000}
            loadMoreItems={() => {
              loadHotels({
                after: lastItemKey || undefined,
                category: selectedCategory,
                locationId: selectedPlace,
                totalTenants:
                  tenantCounts.adults +
                  tenantCounts.children +
                  tenantCounts.infants,
                dateRange: selectedDateRange,
              });
            }}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                itemSize={450}
                itemCount={hotels.length}
                itemData={hotels}
                onItemsRendered={onItemsRendered}
                ref={ref}
                width="100%"
                height={window.innerHeight - 226}
              >
                {HotelRow}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </section>
    </main>
  );
}

export default App;
