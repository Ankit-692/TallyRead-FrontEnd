import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { catchError, map,of, Observable } from 'rxjs';

export const authGuard: CanActivateFn = ():Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router)

  return authService.checkAuthStatus().pipe(
    map((isLoggedIn)=>{
      if(isLoggedIn){  
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    }),
    catchError(()=>{
      return of(router.createUrlTree(['/login']));
    })
  );
}
