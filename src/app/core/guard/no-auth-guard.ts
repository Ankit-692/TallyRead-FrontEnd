import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, catchError, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const noAuthGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus().pipe(
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return router.createUrlTree(['/home']);
      } else {
        return true;
      }
    }),
    catchError(() => {
      return of(true);
    })
  );
};
