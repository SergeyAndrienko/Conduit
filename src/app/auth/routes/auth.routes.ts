import {Routes} from '@angular/router'
import {provideState} from '@ngrx/store'
import {authReducer} from '../store/reducers'
import {AuthService} from '../services/auth.service'
import {RegisterEffect} from '../store/effects/register.effect'
import {provideEffects} from '@ngrx/effects'
import {LoginEffect} from '@app/auth/store/effects/login.effect'

export const authRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState({
        name: 'auth',
        reducer: authReducer,
      }),
      AuthService,
    ],
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('../components/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
        providers: [provideEffects(RegisterEffect)],
      },
      {
        path: 'login',
        loadComponent: () =>
          import('../components/login/login.component').then(
            (m) => m.LoginComponent,
          ),
        providers: [provideEffects(LoginEffect)],
      },
    ],
  },
]
