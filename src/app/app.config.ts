import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core'
import {provideRouter} from '@angular/router'

import {routes} from './app.routes'
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser'
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import {provideStore} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {environment} from '../environments/environment'
import {authRoutes} from './auth/routes/auth.routes'
import {provideHttpClient} from '@angular/common/http'
import {provideEffects} from '@ngrx/effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter([...routes, ...authRoutes]),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideStore({}),
    provideEffects([]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
    provideHttpClient(),
  ],
}
