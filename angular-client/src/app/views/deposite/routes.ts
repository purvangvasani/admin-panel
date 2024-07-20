import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Deposit'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./deposite.component').then(m => m.DepositeComponent),
        data: {
          title: $localize`List`
        }
      },
      {
        path: 'add',
        loadComponent: () => import('./add/deposit-add.component').then(m => m.DepositAddComponent),
        data: {
          title: $localize`Add`
        }
      }
    ]
  }
];

