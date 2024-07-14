import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./payouts.component').then(m => m.PayoutsComponent),
    data: {
      title: $localize`Payouts`
    }
  }
];

