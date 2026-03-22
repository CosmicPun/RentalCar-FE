export interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  telephone: string;
  createdAt: string;
}

export interface ProviderItem {
  _id: string;
  id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  region: string;
  picture: string;
  dailyrate: number;
}

export interface ProviderJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: ProviderItem[];
}

export interface SingleProviderJson {
  success: boolean;
  data: ProviderItem;
}

export interface CarItem {
  _id: string;
  id: string;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  available: boolean;
  provider: string | ProviderItem;
  rentPrice: number;
}

export interface CarJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CarItem[];
}

export interface SingleCarJson {
  success: boolean;
  data: CarItem;
}

export interface BookingItem {
  _id: string;
  bookingDate: string;
  returnDate: string;
  totalCost: number;
  user: string | UserItem;
  car: string | CarItem;
  provider: string | ProviderItem;
  createdAt: string;
}

export interface BookingJson {
  success: boolean;
  count: number;
  data: BookingItem[];
}

export interface SingleBookingJson {
  success: boolean;
  data: BookingItem;
}

export interface LocalBookingItem {
  nameLastname: string;
  tel: string;
  provider: string;
  bookDate: string;
}
