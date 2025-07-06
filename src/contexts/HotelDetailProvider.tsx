"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchHotelDetail } from "@/utils";
import { IHotelDetailData } from "../types";

interface HotelDetailContextType {
  hotel: IHotelDetailData | null;
  loading: boolean;
}

const HotelDetailContext = createContext<HotelDetailContextType | null>(null);

export const HotelDetailProvider = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { data: hotel, isLoading } = useQuery({
    queryKey: ["hotel", id],
    queryFn: () => fetchHotelDetail(id),
  });

  const contextValue = {
    hotel: hotel || null,
    loading: isLoading,
  };

  return (
    <HotelDetailContext.Provider value={contextValue}>
      {children}
    </HotelDetailContext.Provider>
  );
};

HotelDetailProvider.useHotelDetailContext = () => {
  const context = useContext(HotelDetailContext);
  if (!context) {
    throw new Error(
      "useHotelDetailContext must be used within a HotelDetailProvider",
    );
  }
  return context;
};

export default HotelDetailProvider;
