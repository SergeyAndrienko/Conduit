import {Component, Input, OnInit} from '@angular/core'
import {BackendErrorsInterface} from '@shared/types/backendErrors.interface'

const changeErrorsTitle: {[key: string]: string} = {
  usernameisNotEmpty: 'User name:',
  emailisNotEmpty: 'Email:',
  passwordisNotEmpty: 'Password:',
}

@Component({
  selector: 'md-backend-error-messages',
  standalone: true,
  imports: [],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss',
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps!: BackendErrorsInterface | null
  errorMessages: string[] = []

  ngOnInit(): void {
    if (this.backendErrorsProps) {
      this.errorMessages = Object.keys(this.backendErrorsProps.errors).map(
        (name: string) => {
          const messages = this.backendErrorsProps?.['errors']
          return `${changeErrorsTitle[name]} ${messages && messages[name]}`
        },
      )
    }
  }
}
