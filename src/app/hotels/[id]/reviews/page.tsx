import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchHotelDetail, queryClient } from "@/utils";
import ReviewsPage from "@/components/Reviews/HotelReviews";

type Params = Promise<{ id: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["hotel", id],
    queryFn: () => fetchHotelDetail(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReviewsPage id={id} />
    </HydrationBoundary>
  );
};

export default Page;
