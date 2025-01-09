import {Routes} from '@angular/router'
import {AboutUsComponent} from '@app/general/components/about-us/about-us.component'
import {authReducer} from '@app/auth/store/reducers'
import {provideState} from '@ngrx/store'
import {provideEffects} from '@ngrx/effects'
import {SubscriptionEffect} from '@app/auth/store/effects/subscription.effect'

export const routes: Routes = [
  {
    path: 'about-us',
    component: AboutUsComponent,
    providers: [
      provideState({
        name: 'auth', // TODO: Probably need to give another name
        reducer: authReducer,
      }),
      provideEffects([SubscriptionEffect])
    ],
  },
]
