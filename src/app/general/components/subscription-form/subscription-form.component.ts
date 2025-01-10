import {Component, input, OnInit, output, signal} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import {MatInput} from '@angular/material/input'
import {PersistenceService} from '@shared/services/persistence.service'
import {Store} from '@ngrx/store'
import {
  setSubscriptionStatusAction,
  subscribeAction,
  unsubscribeAction,
} from '@app/general/store/actions/subscription.action'
import {DisableInputDirective} from '@shared/directives/disable-input.directive'
import {emailValidation} from '@shared/validations/email.validation'
import {FrontendErrorMessagesComponent} from '@shared/components/frontend-error-messages/frontend-error-messages.component'

@Component({
  selector: 'md-subscription-form',
  imports: [
    FormsModule,
    MatInput,
    ReactiveFormsModule,
    DisableInputDirective,
    FrontendErrorMessagesComponent,
  ],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.scss',
})
export class SubscriptionFormComponent implements OnInit {
  form!: FormGroup
  isSubscribed = input.required<boolean>()
  notifyOnSubscribe = output<string>()
  notifyOnUnsubscribe = output<string>()
  validate = signal(false)

  constructor(
    private fb: FormBuilder,
    private persistenceService: PersistenceService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    const email = this.initializeSubscriptionState()
    this.initializeForm(email)
  }

  private initializeForm(email: String | null) {
    this.form = this.fb.group({
      email: [email, [emailValidation]],
    })
  }

  onSubmit(): void {
    if (!this.form.valid) {
      console.error('Subscription form invalid')
      return
    }
    const email = this.form.value.email
    if (this.isSubscribed()) {
      this.store.dispatch(unsubscribeAction())
      this.form.reset()
      this.notifyOnUnsubscribe.emit(email)
    } else {
      this.store.dispatch(subscribeAction({email}))
      this.notifyOnSubscribe.emit(email)
    }
    this.validate.set(false)
  }

  private initializeSubscriptionState(): String | null {
    const existingEmail: String =
      this.persistenceService.get('subscriptionMail') || ''
    this.store.dispatch(
      setSubscriptionStatusAction({subscribed: !!existingEmail}),
    )
    return existingEmail
  }
}
