import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./form/form.component').then(m => m.FormComponent)
    },
    {
        path:'detail',
        loadComponent: () => import('./detail/detail.component').then(m => m.DetailComponent)
    }
];
