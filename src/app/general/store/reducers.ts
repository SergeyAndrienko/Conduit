import {createReducer, on} from '@ngrx/store'
import {
  setSubscriptionStatusAction,
  subscribeAction,
  unsubscribeAction,
} from '@app/general/store/actions/subscription.action'
import {SubscriptionStateInterface} from '@app/general/types/subscriptionState.interface'

const initialState: SubscriptionStateInterface = {
  isSubscribed: false,
}

export const subscriptionReducer = createReducer(
  initialState,
  on(
    setSubscriptionStatusAction,
    (state, action): SubscriptionStateInterface => ({
      ...state,
      isSubscribed: action.subscribed,
    }),
  ),
  on(
    subscribeAction,
    (state): SubscriptionStateInterface => ({
      ...state,
      isSubscribed: true,
    }),
  ),
  on(
    unsubscribeAction,
    (state): SubscriptionStateInterface => ({
      ...state,
      isSubscribed: false,
    }),
  ),
)
