import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  RouterModule,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { setHeaderInterceptor } from './shared/interceptors/set-header.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([setHeaderInterceptor , errorInterceptor])),
    importProvidersFrom(RouterModule, BrowserAnimationsModule, ToastrModule),
  ],
};
