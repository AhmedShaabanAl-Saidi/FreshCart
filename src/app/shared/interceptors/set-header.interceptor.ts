import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      const userTokenHeader = { token: userToken };

      if (
        req.url.includes('cart') ||
        req.url.includes('orders') ||
        req.url.includes('wishlist')
      ) {
        req = req.clone({
          setHeaders: userTokenHeader,
        });
      }
    }
  }

  return next(req);
};
