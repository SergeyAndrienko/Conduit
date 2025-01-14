import {Component, Input, Signal} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MatIcon} from '@angular/material/icon'
import {MatCardAvatar} from '@angular/material/card'
import {MatDivider} from '@angular/material/divider'
import {CdkMenu} from '@angular/cdk/menu'
import {CurrentUserInterface} from '@shared/types/currentUser.interface'
import {logoutAction} from '@app/auth/store/actions/logout.action'
import {Store} from '@ngrx/store'

@Component({
  selector: 'md-profile-menu',
  imports: [RouterLink, MatIcon, MatCardAvatar, MatDivider, CdkMenu],
  standalone: true,
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
})
export class ProfileMenuComponent {
  @Input('currentUser') currentUserProps!: Signal<CurrentUserInterface | null>

  constructor(private store: Store) {}

  logout(): void {
    this.store.dispatch(logoutAction())
  }
}
