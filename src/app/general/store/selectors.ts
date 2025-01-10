import {createFeature, createSelector} from '@ngrx/store'
import {subscriptionReducer} from '@app/general/store/reducers'
import {SubscriptionStateInterface} from '@app/general/types/subscriptionState.interface'

export const subscriptionFeature = createFeature<string, SubscriptionStateInterface>({
  name: 'subscription',
  reducer: subscriptionReducer,
})

export const {selectIsSubscribed} = subscriptionFeature

export const isUserSubscribedSelector = createSelector(
  selectIsSubscribed,
  (isSubscribed) => isSubscribed
)
