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
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  where,
  query as firestoreQuery,
} from "firebase/firestore";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
} from "firebase/auth";
import { DateRange } from "react-day-picker";
import { db, firestore } from "./db";
import {
  IHotelData,
  IHotelDetailData,
  ILocation,
  EHotelCategory,
  IWishlist,
  IBooking,
  IArticle,
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

export const addToWishlist = async (
  userId: string,
  hotelData: IHotelData,
): Promise<void> => {
  const wishlistRef = doc(
    firestore,
    "user_wishlist",
    `${userId}_${hotelData.id}`,
  );
  const wishlistItem: IWishlist = {
    id: `${userId}_${hotelData.id}`,
    userId,
    hotelData,
    createdAt: new Date(),
  };

  await setDoc(wishlistRef, wishlistItem);
};

export const removeFromWishlist = async (
  userId: string,
  hotelId: string,
): Promise<void> => {
  const wishlistRef = doc(firestore, "user_wishlist", `${userId}_${hotelId}`);
  await deleteDoc(wishlistRef);
};

export const isInWishlist = async (
  userId: string,
  hotelId: string,
): Promise<boolean> => {
  const wishlistRef = doc(firestore, "user_wishlist", `${userId}_${hotelId}`);
  const docSnap = await getDoc(wishlistRef);
  return docSnap.exists();
};

export const fetchUserWishlist = async (
  userId: string,
): Promise<IWishlist[]> => {
  const wishlistCollection = collection(firestore, "user_wishlist");
  const q = firestoreQuery(wishlistCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data() as IWishlist;
    return data;
  });
};

export const addToBooking = async (
  userId: string,
  hotelData: IHotelData,
  reservedDates: { from: number; to: number },
  totalNights: number,
  totalPrice: number,
): Promise<void> => {
  const bookingId = `${userId}_${hotelData.id}_${Date.now()}`;
  const bookingRef = doc(firestore, "user_booking", bookingId);
  const bookingItem: IBooking = {
    id: bookingId,
    userId,
    hotelData,
    reservedDates,
    totalNights,
    totalPrice,
    createdAt: new Date().getTime(),
  };

  await setDoc(bookingRef, bookingItem);
};

export const fetchUserBookings = async (
  userId: string,
): Promise<IBooking[]> => {
  const bookingCollection = collection(firestore, "user_booking");
  const q = firestoreQuery(bookingCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data() as IBooking;

    return data;
  });
};

export const changeUserPassword = async (
  user: User,
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  try {
    if (!user.email) {
      throw new Error("User email is required");
    }

    // Re-authenticate the user with current password
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    await reauthenticateWithCredential(user, credential);

    // Update password
    await updatePassword(user, newPassword);
  } catch (error) {
    throw error;
  }
};

export const fetchArticles = () => {
  return new Promise<IArticle[]>((resolve) => {
    const articlesRef = ref(db, DbPath.articles);

    onValue(articlesRef, (snapshot) => {
      if (!snapshot.exists()) {
        resolve([]);
        return;
      }

      const articles = snapshot.val() as Record<string, IArticle>;
      const articlesData = Object.values(articles);

      resolve(articlesData);
    });
  });
};

export const fetchArticleById = (id: string) => {
  return new Promise<IArticle>((res) => {
    if (!id) return;

    const articleRef = query(
      ref(db, DbPath.articles),
      orderByChild("id"),
      equalTo(id),
    );

    onValue(articleRef, (snapshot) => {
      if (snapshot.exists()) {
        res(Object.values(snapshot.val())[0] as IArticle);
      }
    });
  });
};
