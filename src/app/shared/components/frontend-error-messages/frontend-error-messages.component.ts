import {Component, Input} from '@angular/core'
import {AbstractControl, ValidationErrors} from '@angular/forms'

@Component({
  selector: 'md-frontend-error-messages',
  imports: [],
  templateUrl: './frontend-error-messages.component.html',
  styleUrl: './frontend-error-messages.component.scss',
})
export class FrontendErrorMessagesComponent {
  @Input() control!: AbstractControl | null
  @Input() submitted!: boolean

  get errorMessages(): string[] {
    if (!this.control || !this.control.errors) return []

    const errors: ValidationErrors = this.control.errors
    const messages: string[] = []
    for (const [key, value] of Object.entries(errors)) {
      switch (key) {
        case 'required':
          messages.push('This field is required')
          break
        case 'invalidEmail':
          messages.push('Invalid email format')
          break
        case 'minlength':
          messages.push(`Minimum length is ${value.requiredLength} characters`)
          break
        case 'maxlength':
          messages.push(`Maximum length is ${value.requiredLength} characters`)
          break
        case 'pattern':
          messages.push('Invalid format')
          break
        default:
          messages.push('Invalid field')
      }
    }
    return messages
  }
}
