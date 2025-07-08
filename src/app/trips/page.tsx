"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { MapPin, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserBookings } from "@/utils";
import HotelCard from "@/components/List/HotelCard";
import { IBooking } from "@/types";

const BookingCard = ({ booking }: { booking: IBooking }) => {
  const { hotelData, reservedDates, totalNights, totalPrice } = booking;

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4">
      <div className="relative">
        <HotelCard data={hotelData} />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-sm font-medium text-gray-700">
            ${totalPrice} total
          </span>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Calendar className="w-4 h-4" />
          <span>
            {formatDateDisplay(new Date(reservedDates.from))} -{" "}
            {formatDateDisplay(new Date(reservedDates.to))}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {totalNights} {totalNights === 1 ? "night" : "nights"} • Booked on{" "}
          {formatDateDisplay(new Date(booking.createdAt))}
        </div>
      </div>
    </div>
  );
};

const TripsPage = () => {
  const { isAuthenticated, loading, user } = useAuth();

  const { data: bookings = [], error } = useQuery({
    queryKey: ["bookings", user?.uid],
    queryFn: () => fetchUserBookings(user!.uid),
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
              <MapPin className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Error loading trips</h2>
            <p className="text-gray-600 mb-6">
              Something went wrong. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-4 border-l border-r border-gray-100">
        <div className="px-6 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">No trips yet</h2>
            <p className="text-gray-600 mb-6">
              When you book a hotel, your trips will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 border-l border-r border-gray-100 pb-20">
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Your Trips</h1>
          <p className="text-gray-600">
            {bookings.length} {bookings.length === 1 ? "trip" : "trips"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
