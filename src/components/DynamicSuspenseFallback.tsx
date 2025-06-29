import { useLocation } from "react-router-dom";
import {
  HotelDetailSkeleton,
  HotelListSkeleton,
  ReviewsPageSkeleton,
} from "./skeletons";

const DynamicSuspenseFallback = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return <HotelListSkeleton />;
  }

  if (location.pathname.match(/^\/hotel\/[^/]+$/)) {
    return <HotelDetailSkeleton />;
  }

  if (location.pathname.match(/^\/hotel\/[^/]+\/reviews$/)) {
    return <ReviewsPageSkeleton />;
  }

  return (
    <section className="flex justify-center items-center min-h-screen">
      Loading...
    </section>
  );
};

export default DynamicSuspenseFallback;
