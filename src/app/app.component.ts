import {Component, OnInit} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {HeaderComponent} from '@app/layout/header/header.component'
import {Store} from '@ngrx/store'
import {getCurrentUserAction} from '@app/auth/store/actions/getCurrentUser.action'
import {SpinnerComponent} from '@shared/components/spinner/spinner.component'
import {SpinnerService} from '@shared/services/spinner.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, SpinnerComponent],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private spinnerService: SpinnerService,
  ) {}

  isLoading = this.spinnerService.getIsLoading()

  ngOnInit() {
    this.store.dispatch(getCurrentUserAction())
  }
}
