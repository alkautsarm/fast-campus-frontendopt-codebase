"use client";

import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";
import { DateRange } from "react-day-picker";
import HotelDetailProvider from "@/contexts/HotelDetailProvider";

interface ReserveDateCardProps {
  selectedDateRange: DateRange | undefined;
  onDateChange: (range: DateRange | undefined) => void;
}

const ReserveDateCard = ({
  selectedDateRange,
  onDateChange,
}: ReserveDateCardProps) => {
  const { hotel } = HotelDetailProvider.useHotelDetailContext();

  if (!hotel) return null;

  const today = new Date();
  const hotelStartDate = new Date(hotel.availableDates.startEpoch);
  const hotelEndDate = new Date(hotel.availableDates.endEpoch);

  // Disable dates outside of hotel availability
  const isDateDisabled = (date: Date) => {
    return date < today || date < hotelStartDate || date > hotelEndDate;
  };

  return (
    <DayPicker
      mode="range"
      selected={selectedDateRange}
      onSelect={onDateChange}
      disabled={isDateDisabled}
      className="flex justify-center w-full text-sm"
      classNames={{
        months: "w-full",
        month_grid:
          "w-full border-separate border-spacing-y-1 border-spacing-x-1",
        day_button: "flex justify-center w-full",
        today: "text-red-500 font-bold",
        selected: "rounded-xl",
        range_start: "bg-black text-white",
        range_middle: "bg-gray-100",
        range_end: "bg-black text-white",
      }}
    />
  );
};

export default ReserveDateCard;
