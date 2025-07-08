import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchHotelsWithFilters, fetchLocations, queryClient } from "@/utils";
import HotelList from "@/components/List/HotelList";

export const metadata: Metadata = {
  title: "Hotel Booking - Find Your Perfect Stay",
  description:
    "Discover and book unique hotels, cabins, and accommodations worldwide. Browse through thousands of verified properties including islands, cabins, caves, and arctic stays. Find the perfect place for your next adventure.",
  keywords: [
    "hotel booking",
    "accommodation",
    "travel",
    "vacation rental",
    "hotels",
    "cabins",
    "unique stays",
    "island hotels",
    "cave hotels",
    "arctic stays",
  ],
  openGraph: {
    title: "Hotel Booking - Find Your Perfect Stay",
    description:
      "Discover and book unique hotels, cabins, and accommodations worldwide. Browse through thousands of verified properties including islands, cabins, caves, and arctic stays.",
    images: [
      {
        url: "/og-hotel.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel Booking - Discover unique accommodations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Booking - Find Your Perfect Stay",
    description:
      "Discover and book unique hotels, cabins, and accommodations worldwide. Browse through thousands of verified properties.",
    images: ["/og-hotel.jpg"],
  },
};

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
