import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from './loading-service';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const isGoogleApi = req.url.includes('googleapis.com');

  loadingService.show();

  const requestToProcess = isGoogleApi ? req : req.clone({ withCredentials: true });

  return next(requestToProcess).pipe(
    finalize(()=>{
      loadingService.hide();
    })
  )
};
