import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../home-shell/home-shell').then((m) => m.HomeShell),
  },
];
