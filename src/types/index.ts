export enum ESearchModalCard {
  Where = 1,
  When = 2,
  Who = 3,
}
export interface ILocation {
  id: number;
  name: string;
  image: string;
  imageWebp: string;
}

export enum EHotelCategory {
  Island = 1,
  Cabin = 2,
  Caves = 3,
  Arctic = 4,
}

export interface TenantCounts {
  adults: number;
  children: number;
  infants: number;
}

export interface IHotelData {
  id: string;
  name: string;
  type: {
    id: number;
    name: string;
  };
  location: {
    id: number;
    name: string;
  };
  distance: string;
  capacity: number;
  availableDates: {
    start: string;
    end: string;
    startEpoch: number;
    endEpoch: number;
  };
  pricePerNight: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  imageUrlWebp: string;
}

export enum ERatingCategory {
  Cleanliness = "cleanliness",
  Location = "location",
  Communication = "communication",
}

export interface IReview {
  name: string;
  submitted_date: string;
  comment: string;
  ratings: {
    [key in ERatingCategory]: number;
  };
}

export interface IHost {
  id: string;
  name: string;
}

export interface IHotelDetailData {
  id: string;
  name: string;
  type: {
    id: number;
    name: string;
  };
  location: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
  };
  distance: string;
  capacity: number;
  availableDates: {
    start: string;
    end: string;
    startEpoch: number;
    endEpoch: number;
  };
  pricePerNight: number;
  rating: number;
  reviews: IReview[];
  imageUrl: string;
  imageUrlWebp: string;
  photos: string[];
  photosWebp: string[];
  host: IHost;
  description: string;
}

export interface IWishlist {
  id: string;
  userId: string;
  hotelData: IHotelData;
  createdAt: Date;
}

export interface IBooking {
  id: string;
  userId: string;
  hotelData: IHotelData;
  reservedDates: {
    from: number;
    to: number;
  };
  totalNights: number;
  totalPrice: number;
  createdAt: number;
}
