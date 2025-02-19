import {Component, OnInit, signal, Signal} from '@angular/core'
import {BackendErrorMessagesComponent} from '@shared/components/backend-error-messages/backend-error-messages.component'
import {MatInput} from '@angular/material/input'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {BackendErrorsInterface} from '@shared/types/backendErrors.interface'
import {Store} from '@ngrx/store'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '@app/auth/store/selectors'
import {loginAction} from '@app/auth/store/actions/login.action'
import {LoginRequestInterface} from '@app/auth/types/loginRequest.interface'
import {RouterLink} from '@angular/router'
import {FrontendErrorMessagesComponent} from '@shared/components/frontend-error-messages/frontend-error-messages.component'
import {emailValidation} from '@shared/validations/email.validation'

@Component({
  selector: 'md-login',
  imports: [
    RouterLink,
    BackendErrorMessagesComponent,
    MatInput,
    ReactiveFormsModule,
    FrontendErrorMessagesComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  isSubmitting!: Signal<boolean>
  backendErrors!: Signal<BackendErrorsInterface | null>
  submitted = signal(false)

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValue()
  }

  initializeValue(): void {
    this.isSubmitting = this.store.selectSignal(isSubmittingSelector)
    this.backendErrors = this.store.selectSignal(validationErrorsSelector)
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidation]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit(): void {
    this.submitted.set(true)
    if (this.form.valid) {
      const request: LoginRequestInterface = {
        user: this.form.value,
      }
      this.store.dispatch(loginAction({request}))
    }
  }
}
