import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from '../app/util/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'banks',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
        canActivate: [AuthGuard], canActivateChild: [AuthGuard],
      },
      {
        path: 'settings',
        loadChildren: () => import('./views/settings/routes').then((m) => m.routes),
        canActivate: [AuthGuard], canActivateChild: [AuthGuard],
      },
      {
        path: 'banks',
        loadChildren: () => import('./views/banks/routes').then((m) => m.routes),
        canActivate: [AuthGuard], canActivateChild: [AuthGuard],
      },
      {
        path: 'merchant',
        loadChildren: () => import('./views/merchant/routes').then((m) => m.routes),
        canActivate: [AuthGuard], canActivateChild: [AuthGuard],
      },
      {
        path: 'deposit',
        loadChildren: () => import('./views/deposite/routes').then((m) => m.routes),
        canActivate: [AuthGuard], canActivateChild: [AuthGuard],
      },
      {
        path: 'payouts',
        loadChildren: () => import('./views/payouts/routes').then((m) => m.routes),
        canActivate: [AuthGuard], canActivateChild: [AuthGuard],
      },
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./views/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    data: {
      title: 'Forgot Password'
    }
  },
  {
    path: 'deposit-add',
    loadComponent: () => import('./views/deposite/add/deposit-add.component').then((m) => m.DepositAddComponent),
  },
  {
    path: 'withdrawal-add',
    loadComponent: () => import('./views/payouts/add/withdrawal-add.component').then((m) => m.WithdrawalAddComponent),
  },
  {
    path: 'scripts',
    loadComponent: () => import('./views/scripts/scripts.component').then((m) => m.ScriptsComponent),
  },
  { path: '**', redirectTo: '404' }
];
