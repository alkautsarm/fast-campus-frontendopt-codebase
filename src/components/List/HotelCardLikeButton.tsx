"use client";

import { Heart } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthProvider";
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/utils";
import { IHotelData } from "@/types";

interface HotelCardLikeButtonProps {
  hotelData: IHotelData;
}

const HotelCardLikeButton = ({ hotelData }: HotelCardLikeButtonProps) => {
  const { isAuthenticated, openAuthModal, user } = useAuth();
  const queryClient = useQueryClient();

  // Query to check if hotel is in wishlist
  const { data: isLiked = false, isLoading: isCheckingWishlist } = useQuery({
    queryKey: ["wishlist", user?.uid, hotelData.id],
    queryFn: () => isInWishlist(user!.uid, hotelData.id),
    enabled: isAuthenticated && !!user,
  });

  // Mutation to add hotel to wishlist
  const addToWishlistMutation = useMutation({
    mutationFn: () => addToWishlist(user!.uid, hotelData),
    onSuccess: () => {
      // Invalidate the wishlist query to refetch the status
      queryClient.invalidateQueries({
        queryKey: ["wishlist", user?.uid, hotelData.id],
      });
    },
  });

  // Mutation to remove hotel from wishlist
  const removeFromWishlistMutation = useMutation({
    mutationFn: () => removeFromWishlist(user!.uid, hotelData.id),
    onSuccess: () => {
      // Invalidate the wishlist query to refetch the status
      queryClient.invalidateQueries({
        queryKey: ["wishlist", user?.uid, hotelData.id],
      });
    },
  });

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    if (!user) {
      return;
    }

    if (isLiked) {
      removeFromWishlistMutation.mutate();
    } else {
      addToWishlistMutation.mutate();
    }
  };

  const isLoading =
    isCheckingWishlist ||
    addToWishlistMutation.isPending ||
    removeFromWishlistMutation.isPending;

  return (
    <button
      className="absolute top-3 right-3 disabled:opacity-50"
      onClick={handleLike}
      disabled={isLoading}
    >
      <Heart
        className={`text-white transition-colors ${isLoading ? "opacity-50" : ""}`}
        fill={isLiked ? "white" : "gray"}
      />
    </button>
  );
};

export default HotelCardLikeButton;
