import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Merchant'
        },
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                loadComponent: () => import('./merchant.component').then(m => m.MerchantComponent),
                data: {
                    title: `List`,
                    module: 'merchant',
                }
            }
        ]
    }
];

