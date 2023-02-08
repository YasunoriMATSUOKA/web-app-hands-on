import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./app/home/home.component').then((x) => x.HomeComponent) },
];
