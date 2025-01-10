import {Component, input, OnInit, output} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {MatInput} from '@angular/material/input'
import {PersistenceService} from '@shared/services/persistence.service'
import {Store} from '@ngrx/store'
import {
  setSubscriptionStatusAction,
  subscribeAction,
  unsubscribeAction,
} from '@app/auth/store/actions/subscription.action'
import {DisableInputDirective} from '@shared/directives/disable-input.directive'
import {emailValidation} from '@shared/validations/email.validation'

@Component({
  selector: 'md-subscription-form',
  imports: [FormsModule, MatInput, ReactiveFormsModule, DisableInputDirective],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.scss',
})
export class SubscriptionFormComponent implements OnInit {
  form!: FormGroup
  isSubscribed = input.required<boolean>()
  notifyOnSubscribe = output<string>()
  notifyOnUnsubscribe = output<string>()

  constructor(
    private fb: FormBuilder,
    private persistenceService: PersistenceService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    const existingEmail: String =
      this.persistenceService.get('subscriptionMail') || ''
    this.store.dispatch(setSubscriptionStatusAction({subscribed: !!existingEmail}))
    this.initializeForm(existingEmail)
  }

  private initializeForm(email: String) {
    this.form = this.fb.group({
      email: [email, [Validators.required, emailValidation]],
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
  }
}
