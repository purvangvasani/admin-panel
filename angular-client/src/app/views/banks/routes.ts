import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./banks.component').then(m => m.BanksComponent),
    data: {
      title: $localize`Banks`
    }
  }
];

