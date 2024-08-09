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
            },
            {
                path: 'merchant-summary',
                loadComponent: () => import('./merchant-summary/merchant-summary.component').then(m => m.MerchantSummaryComponent),
                data: {
                    title: $localize`Merchant-Summary`
                }
            }
        ]
    }
];

