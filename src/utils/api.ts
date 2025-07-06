import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  QueryConstraint,
  startAfter,
  limitToFirst,
  orderByKey,
  startAt,
} from "firebase/database";
import { collection, getDocs } from "firebase/firestore";
import { DateRange } from "react-day-picker";
import { db, firestore } from "./db";
import {
  IHotelData,
  IHotelDetailData,
  ILocation,
  EHotelCategory,
} from "@/types";
import { DbPath, HotelListLimit } from "@/constants";

interface IFetchHotelsWithFiltersParams {
  pageParam?: string;
  category?: EHotelCategory | null;
  locationId?: number;
  totalTenants?: number;
  dateRange?: DateRange;
}

export const fetchHotelsWithFilters = ({
  pageParam,
  category = null,
  locationId = 0,
  totalTenants = 0,
  dateRange,
}: IFetchHotelsWithFiltersParams) => {
  return new Promise<{ hotels: IHotelData[]; lastItemKey: string | null }>(
    (resolve) => {
      let selectedDbPath = DbPath.default;
      if (category) selectedDbPath = `${DbPath.category}/${category}`;
      if (locationId) selectedDbPath = `${DbPath.location}/${locationId}`;
      if (category && locationId) {
        selectedDbPath = `${DbPath.categoryLocation}/${category}_${locationId}`;
      }

      let queryConstraints: QueryConstraint[] = [orderByKey()];
      if (pageParam) {
        queryConstraints.push(startAfter(pageParam));
      }
      if (totalTenants) {
        queryConstraints = [orderByChild("capacity"), startAt(totalTenants)];
      }
      if (!totalTenants && !dateRange) {
        queryConstraints.push(limitToFirst(HotelListLimit));
      }

      const hotelsRef = query(ref(db, selectedDbPath), ...queryConstraints);

      onValue(hotelsRef, (snapshot) => {
        if (!snapshot.exists()) {
          resolve({ hotels: [], lastItemKey: null });
          return;
        }

        const hotels = snapshot.val() as Record<string, IHotelData>;
        const hotelsKey = Object.keys(hotels);
        const lastItemKey = hotelsKey[hotelsKey.length - 1];
        let hotelsData = Object.values(hotels);

        if (dateRange) {
          hotelsData = hotelsData.filter((hotel) => {
            return (
              hotel.availableDates.startEpoch <=
                (dateRange.from?.getTime() || 0) &&
              hotel.availableDates.endEpoch >= (dateRange.to?.getTime() || 0)
            );
          });
        }

        resolve({ hotels: hotelsData, lastItemKey });
      });
    },
  );
};

export const fetchHotelDetail = (id: string) => {
  return new Promise<IHotelDetailData>((res) => {
    if (!id) return;

    const hotelRef = query(
      ref(db, DbPath.detail),
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
