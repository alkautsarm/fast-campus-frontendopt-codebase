import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { queryClient } from "@/utils";
import { fetchLocations } from "@/utils/api";
import HotelList from "@/components/List/HotelList";

const Page = async () => {
  await queryClient.prefetchQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HotelList />
    </HydrationBoundary>
  );
};

export default Page;
