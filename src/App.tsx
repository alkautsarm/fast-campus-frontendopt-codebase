import {
  query,
  startAfter,
  limitToFirst,
  orderByKey,
  onValue,
  ref,
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

interface ILoadHotelsProps {
  after?: string;
  category?: EHotelCategory | null;
  location?: EHotelLocation;
}

const limit = 5;

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
    ({ after, category, location }: ILoadHotelsProps = {}) => {
      if (loading) return;

      setLoading(true);

      const queryConstraints = [limitToFirst(limit), orderByKey()];

      if (after) {
        queryConstraints.push(startAfter(after));
      }

      let hotelsQuery = query(ref(db, "hotels"), ...queryConstraints);

      if (category) {
        hotelsQuery = query(
          ref(db, `hotels_type/${category}`),
          ...queryConstraints,
        );
      }

      if (location) {
        hotelsQuery = query(
          ref(db, `hotels_location/${location}`),
          ...queryConstraints,
        );
      }

      if (category && location) {
        hotelsQuery = query(
          ref(db, `hotels_type_location/${category}_${location}`),
          ...queryConstraints,
        );
      }

      onValue(hotelsQuery, (snapshot) => {
        if (snapshot.exists()) {
          const hotelsKey = Object.keys(snapshot.val());
          setLastItemKey(hotelsKey[hotelsKey.length - 1]);

          const hotelsData = Object.values(snapshot.val()) as IHotelData[];
          setHotels((prev) =>
            after ? [...prev, ...hotelsData] : [...hotelsData],
          );
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
    loadHotels({ category });
  };

  const handleSearchSubmit = ({
    locationId,
  }: {
    locationId: EHotelLocation;
  }) => {
    loadHotels({
      after: undefined,
      category: selectedCategory,
      location: locationId,
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
        <InfiniteLoader
          isItemLoaded={(index) => !loading && !!hotels[index]}
          itemCount={1000}
          loadMoreItems={() => {
            loadHotels({
              after: lastItemKey || undefined,
              category: selectedCategory,
              location: selectedPlace,
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
      </section>
    </main>
  );
}

export default App;
