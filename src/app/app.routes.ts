import { Routes } from '@angular/router';
import { Login } from './core/features/auth/components/login/login';
import { Signup } from './core/features/auth/components/signup/signup';
import { Home } from './core/features/books/components/home/home';
import { authGuard } from './core/guard/auth-guard';
import { noAuthGuard } from './core/guard/no-auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', canActivate: [noAuthGuard], component: Login, pathMatch: 'full' },
  { path: 'signup', canActivate: [noAuthGuard], component: Signup, pathMatch: 'full' },
  { path: 'home', canActivate: [authGuard], component: Home, pathMatch: 'full' },
];
