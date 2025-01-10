export enum ActionTypes {
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',

  // TODO: Should it be in this file or separate?
  LOAD_SUBSCRIPTION_STATUS = '[Subscribe] Load isSubscribed to state', // What is the naming convention?
  SUBSCRIBE = '[Subscribe] Subscription completed',
  UNSUBSCRIBE = '[Subscribe] Unubscription completed'
}
