import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchHotelsWithFilters, fetchLocations, queryClient } from "@/utils";
import HotelList from "@/components/List/HotelList";

const Page = async () => {
  await queryClient.prefetchQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["hotels", null, 0, 0, null, null],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      fetchHotelsWithFilters({
        pageParam,
        category: null,
        locationId: 0,
        totalTenants: 0,
        dateRange: undefined,
      }),
    initialPageParam: undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HotelList />
    </HydrationBoundary>
  );
};

export default Page;
