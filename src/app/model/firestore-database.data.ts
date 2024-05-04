export type DatabaseCollectionName = 'users' | 'user-routes' | 'user-trips';

export interface DatabaseDocument<T> {
  collection: DatabaseCollectionName;
  id: string;
  data: T;
}
