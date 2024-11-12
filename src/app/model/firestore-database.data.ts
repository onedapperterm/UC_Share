export type DatabaseCollectionName = 'users' | 'user-routes' | 'user-trips' | 'bookings' | 'user-vehicles';

export interface DatabaseDocument<T> {
  collection: DatabaseCollectionName;
  id: string;
  data: T;
}
