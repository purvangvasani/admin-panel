import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Banks',
    url: '/banks',
    iconComponent: { name: 'cil-dollar' },
  },
  {
    name: 'Merchants',
    url: '/merchant',
    iconComponent: { name: 'cil-notes' },
  },
  {
    name: 'Deposit',
    url: '/deposit',
    iconComponent: { name: 'cil-dollar' },
  },
  {
    name: 'Payouts',
    url: '/payouts',
    iconComponent: { name: 'cil-dollar' },
  },
  {
    name: 'Settings',
    url: '/settings',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Roles',
        url: '/settings/roles',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Users',
        url: '/settings/users',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Permissions',
        url: '/settings/permissions',
        icon: 'nav-icon-bullet'
      },
    ]
  },
];
