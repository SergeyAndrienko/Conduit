import {createAction} from '@ngrx/store'
import {ActionTypes} from '@app/auth/store/actionTypes'

export const logoutAction = createAction(ActionTypes.LOGOUT)
