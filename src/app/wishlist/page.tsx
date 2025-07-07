"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { Heart } from "lucide-react";

const WishlistPage = () => {
  const { isAuthenticated, openAuthModal } = useAuth();

  if (!isAuthenticated) {
    openAuthModal();
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-4 border-l border-r border-gray-100">
      <div className="px-6 py-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium mb-2">No saved hotels yet</h2>
          <p className="text-gray-600 mb-6">
            When you find a hotel you like, tap the heart icon to save it here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
