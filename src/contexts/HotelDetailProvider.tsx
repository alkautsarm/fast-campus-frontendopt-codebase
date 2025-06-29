import { createContext, use, useContext } from "react";
import { IHotelDetailData } from "../types";

interface HotelDetailContextType {
  hotel: IHotelDetailData | null;
}

const HotelDetailContext = createContext<HotelDetailContextType | null>(null);

export const HotelDetailProvider = ({
  fetchData,
  children,
}: {
  fetchData: Promise<IHotelDetailData>;
  children: React.ReactNode;
}) => {
  const hotel = use(fetchData);
  const contextValue = { hotel };

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
