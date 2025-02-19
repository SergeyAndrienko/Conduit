import {createFeature, createSelector} from '@ngrx/store'
import {AuthStateInterface} from '../types/authState.interface'
import {authReducer} from './reducers'

export const authFeature = createFeature<string, AuthStateInterface>({
  name: 'auth',
  reducer: authReducer,
})

export const {selectAuthState} = authFeature

export const isSubmittingSelector = createSelector(
  selectAuthState,
  (authState) => authState.isSubmitting,
)

export const validationErrorsSelector = createSelector(
  selectAuthState,
  (authState) => authState.validationErrors,
)

export const isLoggedInSelector = createSelector(
  selectAuthState,
  (authState) => authState.isLoggedIn,
)

export const isAnonymousSelector = createSelector(
  selectAuthState,
  (authState: AuthStateInterface) => authState.isLoggedIn === false,
)

export const currentUserSelector = createSelector(
  selectAuthState,
  (authState) => authState.currentUser,
)
