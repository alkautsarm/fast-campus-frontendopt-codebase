import { Star } from "lucide-react";
import { IHotelData } from "@/types";
import { memo } from "react";
import { formatDate } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import HotelCardLikeButton from "./HotelCardLikeButton";

interface IHotelCardProps {
  data: IHotelData;
}

function HotelCard({ data }: IHotelCardProps) {
  return (
    <Link href={`/hotels/${data.id}`}>
      <div className="mb-4 relative">
        <div className="relative h-[310px] w-full rounded-xl overflow-hidden">
          <Image
            className="object-cover"
            src={data.imageUrl}
            alt={data.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <HotelCardLikeButton />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <div className="font-medium">
            {data.name}, {data.location.name}
          </div>
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
    </Link>
  );
}

export default memo(HotelCard);
