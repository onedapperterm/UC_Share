import { DAYS_OF_WEEK, UserRoute, WeekDay } from "../model/route.data"
import { UserTrip } from "../model/trip.data"

export function getNearestTripFromRoutes(routes?: UserRoute[] | null): UserTrip | null {
  if (!routes || !routes.length) {
    return null;
  }

  const dayOfWeek = new Date().getDay();
  const today: WeekDay = (Object.keys(DAYS_OF_WEEK) as WeekDay[]).find(
    key => DAYS_OF_WEEK[key] === dayOfWeek
  ) as WeekDay;

  const todayRoutes = routes.filter(route => route.schedule[today]);

  if (!todayRoutes.length) {
    return null;
  }

  //TODO: check this shit from here
  let nearestRoute: UserRoute | null = null;
  const now = new Date();
  let minTimeDifference = Infinity;

  for (const route of todayRoutes) {
    const tripTimeStr = route.schedule[today];
    if (tripTimeStr) {
      const tripTime = new Date(tripTimeStr);
      const timeDifference = tripTime.getTime() - now.getTime();

      if (timeDifference > 0 && timeDifference < minTimeDifference) {
        minTimeDifference = timeDifference;
        nearestRoute = route;
      }
    }
  }

  return nearestRoute ? convertRouteToTrip(nearestRoute, today) : null;
}

export function convertRouteToTrip(route: UserRoute, dayScheduled: WeekDay): UserTrip {
  const hour = route.schedule[dayScheduled] || '';
  delete (route as any).schedule;
  return {
    ...route,
    status: 'pending',
    seats: 0,
    vehicle: '',
    plates: '',
    passengersIds: [],
    date: new Date().toISOString(),
    hour: new Date(hour).toISOString(),
    price: 0
  }
}

export function validateTrip(trip: UserTrip): boolean {
  let isValid = true;

  for (const key in trip) {
    let value = trip[key as keyof UserTrip];
    if (!value) {
      isValid = false;
      break;
    }
  }

  return isValid;
}
