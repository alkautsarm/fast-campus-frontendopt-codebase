import { Heart, Star } from "lucide-react";
import { IHotelData } from "../types";
import { memo, useState } from "react";

interface IHotelCardProps {
  data: IHotelData;
}

const formatDate = (s: string, e: string) => {
  const start = new Date(s);
  const end = new Date(e);

  const startMonth = start.toLocaleString("en-US", { month: "short" });
  const endMonth = end.toLocaleString("en-US", { month: "short" });

  const startDate = start.getDate();
  const endDate = end.getDate();

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startDate} - ${endDate}`;
  }

  if (startYear === endYear) {
    return `${startMonth} ${startDate} - ${endMonth} ${endDate}`;
  }

  return `${startMonth} ${startDate}, ${startYear} - ${endMonth} ${endDate}, ${endYear}`;
};

function HotelCard({ data }: IHotelCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <div className="mb-4 relative">
        <img
          className="h-[310px] w-full rounded-xl object-cover"
          src={data.imageUrl}
        />
        <button className="absolute top-3 right-3" onClick={handleLike}>
          <Heart className="text-white" fill={isLiked ? "white" : "gray"} />
        </button>
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <div className="font-medium">{data.location}</div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5" />
            <span>
              {data.rating} ({data.reviews})
            </span>
          </div>
        </div>
        <div className="mb-1 text-sm text-gray-400">
          {data.distance} kilometers
        </div>
        <div className="mb-2 text-sm text-gray-400">
          {formatDate(data.availableDates.start, data.availableDates.end)}
        </div>
        <div>
          <span className="font-semibold">${data.pricePerNight}</span> night
        </div>
      </div>
    </div>
  );
}

export default memo(HotelCard);
