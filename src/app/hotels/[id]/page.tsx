import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchHotelDetail, queryClient } from "@/utils";
import HotelDetail from "@/components/Detail/HotelDetail";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const hotel = await fetchHotelDetail(id);

    if (!hotel) {
      return {
        title: "Hotel Not Found",
        description: "The hotel you're looking for could not be found.",
      };
    }

    const title = `${hotel.name} in ${hotel.location.name}`;
    const description = hotel.description
      ? `${hotel.description.substring(0, 150)}${hotel.description.length > 150 ? "..." : ""}`
      : `Experience ${hotel.name} in ${hotel.location.name}. Rated ${hotel.rating}/5 with ${hotel.reviews.length} reviews. From $${hotel.pricePerNight} per night.`;

    return {
      title,
      description,
      keywords: [
        hotel.name,
        hotel.location.name,
        hotel.type.name,
        "hotel booking",
        "accommodation",
        "travel",
        "vacation rental",
        `${hotel.location.name} hotels`,
        `${hotel.type.name} accommodation`,
      ],
      other: {
        "hotel:name": hotel.name,
        "hotel:location": hotel.location.name,
        "hotel:rating": hotel.rating.toString(),
        "hotel:price": hotel.pricePerNight.toString(),
        "hotel:capacity": hotel.capacity.toString(),
        "hotel:reviews": hotel.reviews.length.toString(),
        "hotel:type": hotel.type.name,
        "hotel:host": hotel.host.name,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Hotel Details",
      description: "View hotel details and make a reservation.",
    };
  }
}

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["hotel", id],
    queryFn: () => fetchHotelDetail(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HotelDetail id={id} />
    </HydrationBoundary>
  );
};

export default Page;
