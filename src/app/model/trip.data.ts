import { UserRoute } from "./route.data";

export interface UserTrip extends Omit<UserRoute, 'schedule' | 'status'>{
  status: 'active' | 'canceled' | 'completed' | 'on-route' | 'pending';
  seats: number;
  vehicle: string;
  plates: string;
  passengersIds: string[];
  date: string;
  hour: string;
  price: number;
}

export interface CreateUserTripDto extends Omit<UserTrip, 'id'> {}
