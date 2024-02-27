import { Routes } from '@angular/router';
import { languageCheckerGuard } from '@app_core/routing/guards/language-checker.guard';

export const routes: Routes = [
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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
];
