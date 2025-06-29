import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";
import { db } from "./db";
import { IHotelDetailData } from "@/types";

export const fetchHotelDetail = (id: string) => {
  return new Promise<IHotelDetailData>((res) => {
    if (!id) return;

    const hotelRef = query(
      ref(db, "hotels_detail"),
      orderByChild("id"),
      equalTo(id),
    );

    onValue(hotelRef, (snapshot) => {
      if (snapshot.exists()) {
        res(Object.values(snapshot.val())[0] as IHotelDetailData);
      }
    });
  });
};
