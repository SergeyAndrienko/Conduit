import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '@app/auth/store/actionTypes'

export const setSubscriptionStatusAction = createAction(
  ActionTypes.LOAD_SUBSCRIPTION_STATUS,
  props<{subscribed: boolean}>(),
)

export const subscribeAction = createAction(
  ActionTypes.SUBSCRIBE,
  props<{email: String}>(),
)

export const unsubscribeAction = createAction(ActionTypes.UNSUBSCRIBE)
