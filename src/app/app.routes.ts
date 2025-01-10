import {Routes} from '@angular/router'
import {AboutUsComponent} from '@app/general/components/about-us/about-us.component'
import {provideState} from '@ngrx/store'
import {provideEffects} from '@ngrx/effects'
import {SubscriptionEffect} from '@app/general/store/effects/subscription.effect'
import {subscriptionReducer} from '@app/general/store/reducers'

export const routes: Routes = [
  {
    path: 'about-us',
    component: AboutUsComponent,
    providers: [
      provideState({
        reducer: subscriptionReducer,
      }),
      provideEffects([SubscriptionEffect]),
    ],
  },
]
