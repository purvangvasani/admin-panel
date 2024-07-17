import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./bank-details.component').then(m => m.BankDetailsComponent),
    data: {
      title: $localize`Banks Details`
    }
  }
];

