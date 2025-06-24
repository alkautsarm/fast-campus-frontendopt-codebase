import { CSSProperties, memo } from "react";

import HotelCard from "@/components/HotelCard";
import CategoryMenu from "@/components/CategoryMenu";
import SearchBar from "@/components/Search/SearchBar";
import HotelDataProvider from "@/contexts/HotelDataProvider";
import { IHotelData } from "@/types";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList } from "react-window";
import { CircleX } from "lucide-react";

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

const Content = () => {
  const {
    selectedCategory,
    selectedPlace,
    selectedDateRange,
    tenantCounts,
    loadHotels,
    hotels,
    loading,
    lastItemKey,
  } = HotelDataProvider.useHotelDataContext();

  return (
    <main className="pt-4 border-l border-r border-gray-100">
      <h1 className="text-2xl font-bold mb-4 px-4">Explore</h1>
      <SearchBar />
      <CategoryMenu />

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
                locationId: selectedPlace.id,
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
};

const HotelList = () => {
  return (
    <HotelDataProvider>
      <Content />
    </HotelDataProvider>
  );
};

export default HotelList;
