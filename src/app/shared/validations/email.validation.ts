import {AbstractControl, ValidationErrors} from '@angular/forms'

export const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

export function emailValidation(
  control: AbstractControl,
): ValidationErrors | null {
  if (control.value) {
    return emailPattern.test(control.value) ? null : {invalidEmail: true}
  }
  return null
}
