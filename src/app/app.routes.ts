import { Routes } from '@angular/router';
import { authGuard } from '@app_core/auth/guards/auth.guard';
import { languageCheckerGuard } from '@app_core/routing/guards/language-checker.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [ languageCheckerGuard ],
    loadComponent: () => import('@app_pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    canActivate: [ languageCheckerGuard ],
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: '',
    loadComponent: () => import('./pages/authenticated/authenticated.page').then( m => m.AuthenticatedPage),
    canActivate: [ authGuard ],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
      },
      {
        path: 'account',
        loadComponent: () => import('./pages/account/account.page').then( m => m.AccountPage)
      },
      {
        path: 'trips',
        loadComponent: () => import('./pages/trips/trips.page').then( m => m.TripsPage)
      },
      {
        path: 'routes',
        loadComponent: () => import('./pages/routes/routes.page').then( m => m.RoutesPage)
      },
      {
        path: 'routes/route-details/:id',
        loadComponent: () => import('./pages/route-details/route-details.page').then( m => m.RouteDetailsPage)
      },
      {
        path: 'booking/:id',
        loadComponent: () => import('./pages/trip-booking/trip-booking.page').then( m => m.TripBookingPage)
      },
      {
        path: 'vehicles',
        loadComponent: () => import('./pages/vehicles/vehicles.page').then( m => m.VehiclesPage)
      }
    ]
  },
  {
    path: 'trip-booking',
    loadComponent: () => import('./pages/trip-booking/trip-booking.page').then( m => m.TripBookingPage)
  },
];
