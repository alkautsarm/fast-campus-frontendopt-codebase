import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ERatingCategory } from "@/types";
import { ChevronLeft, Star, Search } from "lucide-react";
import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";
import { formatReviewDate } from "@/utils/date";

const ReviewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hotel } = HotelDetailProvider.useHotelDetailContext();
  const [searchQuery, setSearchQuery] = useState("");

  if (!hotel) return null;

  const reviewCount = hotel.reviews.length;

  const calculateAverageRating = (category: ERatingCategory) => {
    const sum = hotel.reviews.reduce(
      (acc, review) => acc + review.ratings[category],
      0,
    );

    return Number((sum / reviewCount).toFixed(1));
  };

  const filteredReviews = hotel.reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleBack = () => {
    navigate(`/hotel/${id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Rating Summary */}
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 fill-current text-black" />
          <span className="text-lg font-semibold">{hotel.rating}</span>
          <span className="text-gray-600">·</span>
          <span className="text-lg font-semibold">{reviewCount} reviews</span>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />
        </div>

        <div className="grid grid-cols-1 gap-y-4 mb-8">
          {Object.values(ERatingCategory).map((category) => (
            <div key={category} className="flex justify-between gap-2">
              <span>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>

              <div className="flex w-[50%] items-center gap-2">
                <div className="flex-1 h-1 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-black rounded-full"
                    style={{
                      width: `${(calculateAverageRating(category) / 5) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {calculateAverageRating(category)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {filteredReviews.map((review, index) => (
            <div key={index}>
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-gray-600 text-white rounded-full flex-shrink-0 flex items-center justify-center font-medium">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{review.name}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    {formatReviewDate(review.submitted_date)}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && searchQuery && (
          <div className="text-center py-8 text-gray-500">
            No reviews found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
