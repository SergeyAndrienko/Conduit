import {AuthStateInterface} from '../../auth/types/authState.interface'
import {SubscriptionStateInterface} from '@app/general/types/subscriptionState.interface'

export interface AppStateInterface {
  auth: AuthStateInterface,
  subscription: SubscriptionStateInterface
}
