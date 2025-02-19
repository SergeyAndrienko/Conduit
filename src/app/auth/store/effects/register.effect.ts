import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {AuthService} from '../../services/auth.service'
import {CurrentUserInterface} from '@shared/types/currentUser.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {PersistenceService} from '@shared/services/persistence.service'
import {Router} from '@angular/router'

@Injectable()
export class RegisterEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router,
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) =>
        this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistenceService.set('accessToken', currentUser.token)
            return registerSuccessAction({currentUser})
          }),
          catchError((error: HttpErrorResponse) =>
            of(registerFailureAction({errors: error.error})),
          ),
        ),
      ),
    ),
  )
  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => this.router.navigateByUrl('/')),
      ),
    {dispatch: false},
  )
}
