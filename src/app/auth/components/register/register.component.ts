import {Component, OnInit, signal, Signal} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MatInput} from '@angular/material/input'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {Store} from '@ngrx/store'
import {registerAction} from '../../store/actions/register.action'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import {RegisterRequestInterface} from '../../types/registerRequest.interface'
import {BackendErrorsInterface} from '@shared/types/backendErrors.interface'
import {BackendErrorMessagesComponent} from '@shared/components/backend-error-messages/backend-error-messages.component'
import {FrontendErrorMessagesComponent} from '@shared/components/frontend-error-messages/frontend-error-messages.component'
import {emailValidation} from '@shared/validations/email.validation'

@Component({
  selector: 'md-register',
  imports: [
    RouterLink,
    MatInput,
    ReactiveFormsModule,
    BackendErrorMessagesComponent,
    FrontendErrorMessagesComponent,
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
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
      username: ['', Validators.required],
      email: ['', [Validators.required, emailValidation]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit(): void {
    this.submitted.set(true)
    if (this.form.valid) {
      const request: RegisterRequestInterface = {
        user: this.form.value,
      }
      this.store.dispatch(registerAction({request}))
    }
  }
}
