export interface ILocation {
  id: number;
  name: string;
  image: string;
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
}

export interface IReview {
  name: string;
  submitted_date: string;
  comment: string;
  ratings: {
    cleanliness: number;
    location: number;
    communication: number;
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
  photos: string[];
  host: IHost;
  description: string;
}
