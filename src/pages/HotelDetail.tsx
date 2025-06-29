import { Route, Routes, useParams } from "react-router-dom";
import { Suspense, lazy } from "react";
import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";
import Gallery from "@/components/Detail/Gallery";
import Description from "@/components/Detail/Description";
import Reviews from "@/components/Detail/Reviews";
import Location from "@/components/Detail/Location";

// Lazy load the ReviewsPage component
const ReviewsPage = lazy(() => import("./ReviewsPage"));

const Content = () => {
  const { hotel } = HotelDetailProvider.useHotelDetailContext();

  if (!hotel) return <div>Loading...</div>;

  return (
    <main>
      <Gallery />
      <Description />
      <Location />
      <Reviews />
    </main>
  );
};

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <HotelDetailProvider id={id || ""}>
      <Suspense
        fallback={
          <div className="flex justify-center items-center p-4">Loading...</div>
        }
      >
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>
      </Suspense>
    </HotelDetailProvider>
  );
};

export default HotelDetail;
