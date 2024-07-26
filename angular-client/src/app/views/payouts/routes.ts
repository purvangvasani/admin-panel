import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Withdrawal'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./payouts.component').then(m => m.PayoutsComponent),
        data: {
          title: $localize`List`,
          module: 'payouts',
        }
      },
      {
        path: 'add',
        loadComponent: () => import('./add/withdrawal-add.component').then(m => m.WithdrawalAddComponent),
        data: {
          title: $localize`Add`
        }
      }
    ]
  }
];

