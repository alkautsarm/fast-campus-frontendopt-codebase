"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthProvider";
import { addToBooking } from "@/utils";
import { IHotelData } from "@/types";
import HotelDetailProvider from "@/contexts/HotelDetailProvider";
import ReserveDateCard from "./ReserveDateCard";

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReserveModal = ({ isOpen, onClose }: ReserveModalProps) => {
  const { hotel } = HotelDetailProvider.useHotelDetailContext();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [errors, setErrors] = useState<string[]>([]);

  // Mutation for booking
  const bookingMutation = useMutation({
    mutationFn: ({
      userId,
      hotelData,
      reservedDates,
      totalNights,
      totalPrice,
    }: {
      userId: string;
      hotelData: IHotelData;
      reservedDates: { from: number; to: number };
      totalNights: number;
      totalPrice: number;
    }) =>
      addToBooking(userId, hotelData, reservedDates, totalNights, totalPrice),
    onSuccess: () => {
      // Invalidate the bookings query to refetch trips
      queryClient.invalidateQueries({
        queryKey: ["bookings", user?.uid],
      });
      onClose();
    },
    onError: (error) => {
      console.error("Error confirming reservation:", error);
      setErrors(["Failed to confirm reservation. Please try again."]);
    },
  });

  if (!hotel || !isOpen) return null;

  const validateSelection = () => {
    const newErrors: string[] = [];

    // Validate date selection
    if (
      !selectedDateRange ||
      !selectedDateRange.from ||
      !selectedDateRange.to
    ) {
      newErrors.push("Please select check-in and check-out dates");
    } else {
      // Check if dates are within hotel's available dates
      const startTime = selectedDateRange.from.getTime();
      const endTime = selectedDateRange.to.getTime();
      const hotelStartTime = hotel.availableDates.startEpoch;
      const hotelEndTime = hotel.availableDates.endEpoch;

      if (startTime < hotelStartTime || endTime > hotelEndTime) {
        newErrors.push(
          "Selected dates are outside the hotel's available period",
        );
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleConfirm = () => {
    if (!user || !validateSelection()) return;

    const nights = calculateNights();
    const totalPrice = calculateTotal();

    const hotelData = {
      id: hotel.id,
      name: hotel.name,
      type: hotel.type,
      location: hotel.location,
      distance: hotel.distance,
      capacity: hotel.capacity,
      availableDates: hotel.availableDates,
      pricePerNight: hotel.pricePerNight,
      rating: hotel.rating,
      reviews: hotel.reviews.length,
      imageUrl: hotel.imageUrl,
      imageUrlWebp: hotel.imageUrlWebp || "",
    };

    bookingMutation.mutate({
      userId: user.uid,
      hotelData,
      reservedDates: {
        from: selectedDateRange!.from!.getTime(),
        to: selectedDateRange!.to!.getTime(),
      },
      totalNights: nights,
      totalPrice,
    });
  };

  const calculateNights = () => {
    if (
      !selectedDateRange ||
      !selectedDateRange.from ||
      !selectedDateRange.to
    ) {
      return 0;
    }

    if (selectedDateRange.from === selectedDateRange.to) return 1;

    const timeDiff =
      selectedDateRange.to.getTime() - selectedDateRange.from.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * hotel.pricePerNight;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Reserve</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[60vh]">
          <ReserveDateCard
            selectedDateRange={selectedDateRange}
            onDateChange={setSelectedDateRange}
          />

          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <ul className="text-sm text-red-600 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-semibold">
                  ${hotel.pricePerNight}
                </span>
                <span className="text-gray-600">
                  x {calculateNights()} nights
                </span>
              </div>
              <div className="text-xl font-bold">${calculateTotal()} total</div>
            </div>
          </div>
          <button
            onClick={handleConfirm}
            disabled={bookingMutation.isPending}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium"
          >
            {bookingMutation.isPending
              ? "Confirming..."
              : "Confirm Reservation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveModal;
