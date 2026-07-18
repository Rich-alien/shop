import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { URL_API } from '../shared/data-access/shared';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: URL_API,
      useValue: 'http://localhost:3000/',
    },
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
  ],
};
