import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthUserGuard } from './guards/auth-user.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.component').then((x) => x.HomeComponent),
  },
  {
    path: 'users/:userId',
    loadComponent: () => import('./pages/users/user/user.component').then((x) => x.UserComponent),
    canActivate: [AuthGuard, AuthUserGuard],
  },
  {
    path: 'users/:userId/accounts/create',
    loadComponent: () => import('./pages/users/user/accounts/create/create.component').then((x) => x.CreateComponent),
    canActivate: [AuthGuard, AuthUserGuard],
  },
  {
    path: 'users/:userId/accounts/:accountId',
    loadComponent: () =>
      import('./pages/users/user/accounts/account/account.component').then((x) => x.AccountComponent),
    canActivate: [AuthGuard, AuthUserGuard],
  },
];
