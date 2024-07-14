import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./deposite.component').then(m => m.DepositeComponent),
    data: {
      title: $localize`Deposit`
    }
  }
];

