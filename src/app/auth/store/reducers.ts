import {AuthStateInterface} from '../types/authState.interface'
import {createReducer, on} from '@ngrx/store'
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './actions/register.action'
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '@app/auth/store/actions/login.action'
import {
  setSubscriptionStatusAction,
  subscribeAction,
  unsubscribeAction
} from '@app/auth/store/actions/subscription.action'

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
  isSubscribed: false
}

export const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    }),
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    }),
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    }),
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    }),
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),
  on(
    setSubscriptionStatusAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubscribed: action.subscribed
    }),
  ),
  on(
    subscribeAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubscribed: true,
    }),
  ),
  on(
    unsubscribeAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubscribed: false,
    }),
  ),
)
