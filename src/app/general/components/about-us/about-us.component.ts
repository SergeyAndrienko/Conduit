import {Component, OnInit, Signal} from '@angular/core'
import {MatInput} from '@angular/material/input'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {PersistenceService} from '@shared/services/persistence.service'
import {Store} from '@ngrx/store'
import {isUserSubscribedSelector} from '@app/auth/store/selectors'
import {
  setSubscriptionStatusAction,
  subscribeAction,
  unsubscribeAction,
} from '@app/auth/store/actions/subscription.action'

@Component({
  selector: 'md-about-us',
  imports: [MatInput, ReactiveFormsModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent implements OnInit {
  form!: FormGroup
  isSubscribed!: Signal<boolean>

  constructor(
    private fb: FormBuilder,
    private persistenceService: PersistenceService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    const existingEmail: String = this.persistenceService.get('subscriptionMail') || ''
    this.store.dispatch(setSubscriptionStatusAction({subscribed: !!existingEmail}))
    this.initializeForm(existingEmail)
  }

  private initializeForm(email: String) {
    this.isSubscribed = this.store.selectSignal(isUserSubscribedSelector)
    this.form = this.fb.group({
      email: [email, [Validators.required, Validators.email]],
    })
  }

  onSubmit(): void {
    if (!this.form.valid && !this.isSubscribed()) {
      // TODO: Why form invalid?
      console.error('Subscription form invalid')
      return
    }

    const email = this.form.value.email
    if (this.isSubscribed()) {
      this.persistenceService.remove('subscriptionMail')
      this.form.controls['email'].enable()
      this.store.dispatch(unsubscribeAction())
      this.form.reset()
      alert('You have unsubscribed!')
    } else {
      this.persistenceService.set('subscriptionMail', email)
      this.form.controls['email'].disable()
      this.store.dispatch(subscribeAction({email}))
      alert(`Thank you for subscribing, ${email}!`)
    }
  }
}
