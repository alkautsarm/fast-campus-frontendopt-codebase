import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import HotelDataProvider from "@/contexts/HotelDataProvider";

const DateSearchCard = () => {
  const { setSelectedDateRange, selectedDateRange } =
    HotelDataProvider.useHotelDataContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-10">When's your trip?</h2>
      <DayPicker
        mode="range"
        selected={selectedDateRange}
        onSelect={(range) => setSelectedDateRange(range)}
        disabled={{ before: new Date() }}
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
    </div>
  );
};

export default DateSearchCard;
