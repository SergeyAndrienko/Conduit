import {Component, EventEmitter, input, Input, Output} from '@angular/core'
import {FrontendErrorMessagesComponent} from '@shared/components/frontend-error-messages/frontend-error-messages.component'
import {AbstractControl, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'md-input',
  imports: [FrontendErrorMessagesComponent, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() id!: string
  @Input() type!: string
  @Input() name!: string
  @Input() control!: AbstractControl | any
  @Input() value: string = ''
  @Input() placeholder: string = ''
  @Input() disabled: boolean = false

  submitted = input(false)

  @Output() valueChange = new EventEmitter<string>()

  onInputChange(event: any): void {
    this.valueChange.emit(event.target.value)
  }
}
