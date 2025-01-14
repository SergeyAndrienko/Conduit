import {Routes} from '@angular/router'
import {provideEffects} from '@ngrx/effects'
import {RegisterEffect} from '@app/auth/store/effects/register.effect'
import {AuthGuard} from '@app/auth/guard/auth.guard'
import {LoginEffect} from '@app/auth/store/effects/login.effect'

export const authRoutes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('../components/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
    providers: [provideEffects(RegisterEffect), AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../components/login/login.component').then(
        (m) => m.LoginComponent,
      ),
    providers: [provideEffects(LoginEffect), AuthGuard],
    canActivate: [AuthGuard],
  },
]
