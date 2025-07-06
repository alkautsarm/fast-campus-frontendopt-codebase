import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchHotelDetail, queryClient } from "@/utils";
import HotelDetail from "@/components/Detail/HotelDetail";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
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
