export const DAYS_OF_WEEK = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

export type WeekDay = keyof typeof DAYS_OF_WEEK;

export type RouteDaysSchedule = {
  [key in keyof typeof DAYS_OF_WEEK]?: string;
};

export interface UserRoute {
  id: string;
  userId: string;
  district: string;
  neighborhood: string;
  from: DepartureLocation | string;
  checkpoints: string[];
  status: 'active' | 'inactive';
  schedule: RouteDaysSchedule;
  comments?: string;
}

export interface CreateUserRouteDto extends Omit<UserRoute, 'id'> {}

export type DepartureLocation = 'central' | 'norte' | 'candelaria';
