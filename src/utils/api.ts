import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";
import { db, firestore } from "./db";
import { IHotelDetailData, ILocation } from "@/types";
import { collection, getDocs } from "firebase/firestore";

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

export const fetchLocations = async (): Promise<ILocation[]> => {
  const locationCollection = collection(firestore, "location");
  const querySnapshot = await getDocs(locationCollection);

  return querySnapshot.docs.map((doc) => doc.data() as ILocation);
};
