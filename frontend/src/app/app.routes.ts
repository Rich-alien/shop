import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../layouts/public/shell').then((m) => m.PublicShell),
    children: [
      {
        path: '',
        loadChildren: () => import('../home/shell').then((m) => m.HOME_ROUTES),
      },
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/shell').then((m) => m.ADMIN_ROUTES),
  },
];
