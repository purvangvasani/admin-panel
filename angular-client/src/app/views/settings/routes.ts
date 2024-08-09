import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'roles',
                pathMatch: 'full'
            },
            {
                path: 'account-details',
                children: [
                    {
                        path: '',
                        redirectTo: 'account-details',
                        pathMatch: 'full'
                    },
                    {
                        path: '',
                        loadComponent: () => import('./accountDetails/accountDetails.component').then(m => m.AccountDetailsComponent),
                        data: {
                            title: 'Account Details',
                            module: 'setting',
                            subModule: 'accountDetails'
                        },
                    }
                ]
            },
            {
                path: 'roles',
                loadComponent: () => import('./roles/roles.component').then(m => m.RolesComponent),
                data: {
                    title: 'Roles',
                    module: 'setting',
                    subModule: 'role'
                }
            },
            {
                path: 'users',
                // data: {
                //     title: 'Users'
                // },
                children: [
                    {
                        path: '',
                        redirectTo: 'users',
                        pathMatch: 'full'
                    },
                    {
                        path: '',
                        loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
                        data: {
                            title: 'Users',
                            module: 'setting',
                            subModule: 'users'
                        },
                    }
                ]
            },
            {
                path: 'permissions',
                loadComponent: () => import('./permission/permission.component').then(m => m.PermissionComponent),
                data: {
                    title: 'Permissions',
                    module: 'setting',
                    subModule: 'permission'
                }
            },
        ]
    }
];

