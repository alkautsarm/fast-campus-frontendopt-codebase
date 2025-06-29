import { Route, Routes, useParams } from "react-router-dom";
import { lazy } from "react";
import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";
import Gallery from "@/components/Detail/Gallery";
import Description from "@/components/Detail/Description";
import Reviews from "@/components/Detail/Reviews";
import Location from "@/components/Detail/Location";

// Lazy load the ReviewsPage component
const ReviewsPage = lazy(() => import("./ReviewsPage"));

const Content = () => {
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
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
    </HotelDetailProvider>
  );
};

export default HotelDetail;
