import { UserRoute } from "./route.data";

export type TripStatus = 'active' | 'canceled' | 'completed' | 'on-route' | 'pending';

export interface UserTrip extends Omit<UserRoute, 'schedule' | 'status'>{
  status: TripStatus;
  seats: number;
  vehicle: string;
  plates: string;
  passengersIds: string[];
  date: string;
  hour: string;
  price: number;
}

export interface CreateUserTripDto extends Omit<UserTrip, 'id'> {}
