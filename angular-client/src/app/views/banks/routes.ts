import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Banks'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./banks.component').then(m => m.BanksComponent),
        data: {
          title: $localize`List`
        }
      },
      {
        path: 'add',
        loadComponent: () => import('../bank-details/bank-details.component').then(m => m.BankDetailsComponent),
        data: {
          title: $localize`Add`
        }
      }
    ]
  }
];

