import { Routes } from '@angular/router';
import { Login } from './core/features/auth/components/login/login';
import { Signup } from './core/features/auth/components/signup/signup';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login, pathMatch: 'full' },
  { path: 'signup', component: Signup, pathMatch: 'full' },
];
