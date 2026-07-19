import { Routes } from '@angular/router';
import { ProductStore } from '@shared/data-access';
import { ProductService } from '@shared/data-access';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../admin-shell/admin-shell').then((m) => m.AdminShell),
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      {
        path: 'products',
        providers: [ProductService, ProductStore],
        loadComponent: () =>
          import('../product-view-shell/admin-product-view-shell').then(
            (m) => m.AdminProductViewShell,
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../user-view-shell/admin-user-view-shell').then((m) => m.AdminUserViewShell),
      },
    ],
  },
];
