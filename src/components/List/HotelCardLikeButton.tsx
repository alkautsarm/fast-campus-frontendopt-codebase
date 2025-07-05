"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

const HotelCardLikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <button className="absolute top-3 right-3" onClick={handleLike}>
      <Heart className="text-white" fill={isLiked ? "white" : "gray"} />
    </button>
  );
};

export default HotelCardLikeButton;
