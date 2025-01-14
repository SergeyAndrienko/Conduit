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
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import {provideEffects} from '@ngrx/effects'
import {TokenInterception} from '@shared/services/token-interception.service'
import {authReducer} from '@app/auth/store/reducers'
import {GetCurrentUserEffect} from '@app/auth/store/effects/getCurrentUser.effect'
import {SpinnerInterceptor} from '@shared/services/spinner-interceptor.service'
import {LogoutEffect} from '@app/auth/store/effects/logout.effect'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter([...routes]),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideStore({auth: authReducer}),
    provideEffects([GetCurrentUserEffect, LogoutEffect]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
    provideHttpClient(
      withInterceptors([TokenInterception, SpinnerInterceptor]),
    ),
  ],
}
