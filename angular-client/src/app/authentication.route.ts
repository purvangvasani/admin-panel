import { Routes } from '@angular/router';

export const DEFAULT_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../app/views/pages/authentication.module').then(m => m.AuthenticationModule)
    }
]