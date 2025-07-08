"use client";

import { useState } from "react";
import HotelDetailProvider from "@/contexts/HotelDetailProvider";
import ReserveModal from "./ReserveModal";

const ReserveBottomNavbar = () => {
  const { hotel } = HotelDetailProvider.useHotelDetailContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!hotel) return null;

  const handleReserveClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-4 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-sm bg-white border-t border-l border-r border-gray-100 z-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-semibold">
                ${hotel.pricePerNight}
              </span>
              <span className="text-gray-600">night</span>
            </div>
          </div>
          <button
            onClick={handleReserveClick}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Reserve
          </button>
        </div>
      </div>

      <ReserveModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ReserveBottomNavbar;
