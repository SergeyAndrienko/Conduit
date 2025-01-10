import {Component, OnInit, Signal} from '@angular/core'
import {RouterLink} from '@angular/router'
import {CurrentUserInterface} from '@shared/types/currentUser.interface'
import {Store} from '@ngrx/store'
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from '@app/auth/store/selectors'
import {MatIcon} from '@angular/material/icon'
import {MatCardAvatar} from '@angular/material/card'
import {MatDivider} from '@angular/material/divider'
import {CdkMenuTrigger} from '@angular/cdk/menu'
import {ProfileMenuComponent} from '@app/layout/header/profile-menu/profile-menu.component'

@Component({
  selector: 'md-header',
  imports: [
    RouterLink,
    MatIcon,
    MatCardAvatar,
    MatDivider,
    CdkMenuTrigger,
    ProfileMenuComponent,
  ],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoginIn!: Signal<boolean | null>
  isAnonymous!: Signal<boolean>
  currentUser!: Signal<CurrentUserInterface | null>

  constructor(private store: Store) {}

  ngOnInit() {
    this.initializeValue()
  }

  initializeValue(): void {
    this.isLoginIn = this.store.selectSignal(isLoggedInSelector)
    this.isAnonymous = this.store.selectSignal(isAnonymousSelector)
    this.currentUser = this.store.selectSignal(currentUserSelector)
  }
}
