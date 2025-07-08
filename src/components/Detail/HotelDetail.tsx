"use client";

import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";
import Gallery from "@/components/Detail/Gallery";
import Description from "@/components/Detail/Description";
import Reviews from "@/components/Detail/Reviews";
import Location from "@/components/Detail/Location";
import ReserveBottomNavbar from "./Reserve/ReserveBottomNavbar";

const Content = () => {
  return (
    <main className="border-l border-r border-gray-100 pb-20">
      <Gallery />
      <Description />
      <Location />
      <Reviews />
      <ReserveBottomNavbar />
    </main>
  );
};

interface HotelDetailProps {
  id: string;
}

const HotelDetail = ({ id }: HotelDetailProps) => {
  return (
    <HotelDetailProvider id={id}>
      <Content />
    </HotelDetailProvider>
  );
};

export default HotelDetail;
