import {Component, OnInit, Signal} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {Store} from '@ngrx/store'
import {isUserSubscribedSelector} from '@app/auth/store/selectors'
import {SubscriptionFormComponent} from '@app/general/components/subscription-form/subscription-form.component'

@Component({
  selector: 'md-about-us',
  imports: [ReactiveFormsModule, SubscriptionFormComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent implements OnInit {
  isSubscribed!: Signal<boolean>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isSubscribed = this.store.selectSignal(isUserSubscribedSelector)
  }

  handleSubscription(email: string) {
    alert(`Thank you for subscribing, ${email}!`)
  }

  handleUnsubscription(email: string) {
    alert(`You have unsubscribed for email ${email}!`)
  }
}
