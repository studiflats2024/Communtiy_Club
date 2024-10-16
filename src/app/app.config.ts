import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './services/auth.interceptor.service';


export const appConfig: ApplicationConfig = {
  providers: [
    // Routing configuration
    provideRouter(routes),

    // HttpClient with interceptor support
    provideHttpClient(withInterceptorsFromDi()),

    // Register your AuthInterceptor
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },


    provideAnimations(),

    // Register Service Worker (only for production)
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production
    }),

    // Zone.js Change Detection optimization
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};


















// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
// };
