import { createContext, useContext, useEffect, useState } from "react";
import { IHotelDetailData } from "../types";
import { db } from "@/utils";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";

interface HotelDetailContextType {
  hotel: IHotelDetailData | null;
}

const HotelDetailContext = createContext<HotelDetailContextType | null>(null);

export const HotelDetailProvider = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const [hotel, setHotel] = useState<IHotelDetailData | null>(null);

  useEffect(() => {
    const fetchHotelDetail = async () => {
      if (!id) return;

      const hotelRef = query(
        ref(db, "hotels_detail"),
        orderByChild("id"),
        equalTo(id),
      );

      onValue(hotelRef, (snapshot) => {
        if (snapshot.exists()) {
          setHotel(Object.values(snapshot.val())[0] as IHotelDetailData);
        }
      });
    };

    fetchHotelDetail();
  }, [id]);

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
