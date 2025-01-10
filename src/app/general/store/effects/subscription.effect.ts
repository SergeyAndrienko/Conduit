import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {tap} from 'rxjs'
import {PersistenceService} from '@shared/services/persistence.service'
import {
  subscribeAction,
  unsubscribeAction,
} from '@app/general/store/actions/subscription.action'

@Injectable()
export class SubscriptionEffect {
  constructor(
    private actions$: Actions,
    private persistenceService: PersistenceService,
  ) {}

  subscribe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(subscribeAction),
        tap(({email}) =>
          this.persistenceService.set('subscriptionMail', email),
        ),
      ),
    {dispatch: false},
  )

  unsubscribe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(unsubscribeAction),
        tap(() => this.persistenceService.remove('subscriptionMail')),
      ),
    {dispatch: false},
  )
}
