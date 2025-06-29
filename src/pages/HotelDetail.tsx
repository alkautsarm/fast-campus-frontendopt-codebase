import { lazy, Suspense, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";
import Gallery from "@/components/Detail/Gallery";
import Description from "@/components/Detail/Description";
import Reviews from "@/components/Detail/Reviews";
import Location from "@/components/Detail/Location";
import DynamicSuspenseFallback from "@/components/DynamicSuspenseFallback";
import { fetchHotelDetail } from "@/utils";

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
  const [fetchData] = useState(() => fetchHotelDetail(id || ""));

  return (
    <Suspense fallback={<DynamicSuspenseFallback />}>
      <HotelDetailProvider fetchData={fetchData}>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>
      </HotelDetailProvider>
    </Suspense>
  );
};

export default HotelDetail;
