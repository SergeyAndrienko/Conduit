import {Component} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {HeaderComponent} from '@app/layout/header/header.component'
import {FooterComponent} from '@app/layout/footer/footer.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent {}
