import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from './environments/environment';

/////////////////////////////////////////////////////////////start firbase

 // Register the service worker for production
if (environment.production && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('ngsw-worker.js').then(registration => {
    console.log('Service Worker registered with scope:', registration.scope);
  }).catch(error => {
    console.error('Service Worker registration failed:', error);
  });
}

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/firebase-messaging-sw.js')
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch((error) => {
//       console.error('Service Worker registration failed:', error);
//     });
// }

///////////////////////////////////////////////////////////////end firebase

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
