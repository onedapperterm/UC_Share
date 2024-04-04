export type DatabaseCollectionName = 'users' | 'routes' | 'trips';

export interface DatabaseDocument<T> {
  collection: DatabaseCollectionName;
  id: string;
  data: T;
}
