import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {PersistenceService} from '@shared/services/persistence.service'
import {Router} from '@angular/router'
import {tap} from 'rxjs'
import {logoutAction} from '@app/auth/store/actions/logout.action'

@Injectable()
export class LogoutEffect {
  constructor(
    private actions$: Actions,
    private persistenceService: PersistenceService,
    private router: Router,
  ) {}

  redirectAfterLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistenceService.remove('accessToken')
          this.router.navigateByUrl('/')
        }),
      ),
    {dispatch: false},
  )
}
