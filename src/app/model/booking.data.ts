import { UserTrip } from "./trip.data";

export type BookingStatus =
  | 'confirmed'
  | 'canceled-by-driver'
  | 'canceled-by-passenger'
  | 'completed';

export interface TripBooking {
  id: string;
  status: BookingStatus;
  passengerId: string;
  tripId: string;
}

export interface DetailedTripBooking {
  details: TripBooking;
  trip: UserTrip;
}

export interface CreateTripBookingDto extends Omit<TripBooking, 'id'> {}
