import { Routes } from '@angular/router';
import { Login } from './core/features/auth/components/login/login';
import { Signup } from './core/features/auth/components/signup/signup';
import { Home } from './core/features/books/components/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login, pathMatch: 'full' },
  { path: 'signup', component: Signup, pathMatch: 'full' },
  { path: 'home', component: Home, pathMatch: 'full' },
];
