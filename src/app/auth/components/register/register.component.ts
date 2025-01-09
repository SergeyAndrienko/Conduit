import {Component, OnInit, Signal} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MatInput} from '@angular/material/input'
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {Store} from '@ngrx/store'
import {registerAction} from '../../store/actions/register.action'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import {RegisterRequestInterface} from '../../types/registerRequest.interface'
import {BackendErrorsInterface} from '@shared/types/backendErrors.interface'
import {BackendErrorMessagesComponent} from '@shared/components/backend-error-messages/backend-error-messages.component'

@Component({
  selector: 'md-register',
  imports: [
    RouterLink,
    MatInput,
    ReactiveFormsModule,
    BackendErrorMessagesComponent,
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup
  isSubmitting!: Signal<boolean>
  backendErrors!: Signal<BackendErrorsInterface | null>

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
      username: '',
      email: '',
      password: '',
    })
  }

  onSubmit(): void {
    console.log('Form submitted', this.form.valid)
    const request: RegisterRequestInterface = {
      user: this.form.value,
    }
    this.store.dispatch(registerAction({request}))
  }
}
