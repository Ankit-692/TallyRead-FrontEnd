import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isGoogleApi = req.url.includes('googleapis.com');
  if (isGoogleApi) {
    return next(req);
  }
  const clonedRequest = req.clone({
    withCredentials: true,
  });
  console.log(clonedRequest);
  return next(clonedRequest);
};
