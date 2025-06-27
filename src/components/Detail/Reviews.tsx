import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";
import { formatReviewDate } from "@/utils/date";

const Reviews = () => {
  const navigate = useNavigate();
  const { hotel } = HotelDetailProvider.useHotelDetailContext();

  if (!hotel) return null;

  const reviewCount = hotel.reviews.length;

  const handleShowAllReviews = () => {
    navigate(`/hotel/${hotel.id}/reviews`);
  };

  return (
    <div className="mb-6 px-6">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-4 h-4 fill-current" />
        <span className="text-lg font-semibold">{hotel.rating}</span>
        <span className="text-gray-600">·</span>
        <span className="text-lg font-semibold">{reviewCount} reviews</span>
      </div>

      <div className="flex mb-6 gap-4">
        <div className="w-full border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {hotel.reviews[0].comment}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-600 text-white rounded-full flex-shrink-0 flex items-center justify-center font-medium text-sm">
              {hotel.reviews[0].name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="mb-1">
                <span className="font-medium text-sm">
                  {hotel.reviews[0].name}
                </span>
              </div>
              <div className="text-xs font-light text-gray-400">
                {formatReviewDate(hotel.reviews[0].submitted_date)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleShowAllReviews}
        className="w-full py-3 border border-black rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
      >
        Show all {reviewCount} reviews
      </button>
    </div>
  );
};

export default Reviews;
