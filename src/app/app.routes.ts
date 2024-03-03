import { Routes } from '@angular/router';
import { languageCheckerGuard } from '@app_core/routing/guards/language-checker.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [ languageCheckerGuard ],
    loadComponent: () => import('@app_pages/home/home.page').then((m) => m.HomePage),
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
];
