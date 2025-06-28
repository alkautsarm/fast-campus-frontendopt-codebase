import { Route, Routes, useParams } from "react-router-dom";
import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";
import Gallery from "@/components/Detail/Gallery";
import Description from "@/components/Detail/Description";
import Reviews from "@/components/Detail/Reviews";
import Location from "@/components/Detail/Location";
import ReviewsPage from "./ReviewsPage";

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
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
    </HotelDetailProvider>
  );
};

export default HotelDetail;
