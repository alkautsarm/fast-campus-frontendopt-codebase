export enum EHotelLocation {
  All = 0,
  Jakarta = 1,
  Bandung = 2,
  Surabaya = 3,
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
