"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserWishlist } from "@/utils";
import HotelCard from "@/components/List/HotelCard";

const WishlistPage = () => {
  const { isAuthenticated, loading, user } = useAuth();

  const { data: wishlistItems = [], error } = useQuery({
    queryKey: ["wishlist", user?.uid],
    queryFn: () => fetchUserWishlist(user!.uid),
    enabled: isAuthenticated && !!user,
  });

  if (!isAuthenticated && !loading) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-4 border-l border-r border-gray-100">
        <div className="px-6 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Error loading wishlist</h2>
            <p className="text-gray-600 mb-6">
              Something went wrong. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-4 border-l border-r border-gray-100">
        <div className="px-6 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">No saved hotels yet</h2>
            <p className="text-gray-600 mb-6">
              When you find a hotel you like, tap the heart icon to save it
              here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 border-l border-r border-gray-100">
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Your Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length} saved{" "}
            {wishlistItems.length === 1 ? "hotel" : "hotels"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((wishlistItem) => (
            <div key={wishlistItem.id}>
              <HotelCard data={wishlistItem.hotelData} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
