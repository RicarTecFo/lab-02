import { Routes } from '@angular/router';
import { LogIn } from './log-in/log-in';
import { Register } from './register/register';
import { Dashboard } from './dashboard/dashboard';
import { Productos } from './productos/productos'
import { Categorias } from './categorias/categorias';
import { Usuarios } from './usuarios/usuarios';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'products',
        component: Productos
    },
    {
        path: 'categories',
        component: Categorias
    },
    {
        path: 'log-in',
        component: LogIn
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: '',
        redirectTo: 'log-in',
        pathMatch: 'full'
    },
    {
        path: 'usuarios',
        component: Usuarios,
        canActivate: [adminGuard]
    }
];
