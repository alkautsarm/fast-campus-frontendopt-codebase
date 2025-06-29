import GallerySkeleton from "./GallerySkeleton";
import DescriptionSkeleton from "./DescriptionSkeleton";
import LocationSkeleton from "./LocationSkeleton";
import ReviewsSkeleton from "./ReviewsSkeleton";

const HotelDetailSkeleton = () => {
  return (
    <main>
      <GallerySkeleton />
      <DescriptionSkeleton />
      <LocationSkeleton />
      <ReviewsSkeleton />
    </main>
  );
};

export default HotelDetailSkeleton;
