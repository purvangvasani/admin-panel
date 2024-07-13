import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        // loadComponent: () => import('./settings.component').then(m => m.SettingsComponent),
        // data: {
        //     title: 'Settings'
        // },
        children: [
            {
                path: '',
                redirectTo: 'roles',
                pathMatch: 'full'
            },
            {
                path: 'roles',
                loadComponent: () => import('./roles/roles.component').then(m => m.RolesComponent),
                data: {
                    title: 'Roles'
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
                            title: 'Users'
                        },
                    },
                    {
                        path: 'view',
                        loadComponent: () => import('./users/view/view-user.component').then(m => m.ViewUserComponent),
                        data: {
                            title: 'View User'
                        },      
                    }
                ]
            },
            {
                path: 'permissions',
                loadComponent: () => import('./permission/permission.component').then(m => m.PermissionComponent),
                data: {
                    title: 'Permissions'
                }
            },
        ]
    }
];

