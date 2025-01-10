import {Directive, effect, ElementRef, inject, input} from '@angular/core'

@Directive({
  selector: '[mdDisableInput]',
})
export class DisableInputDirective {
  isDisabled = input(false)
  element = inject(ElementRef)
  stylesEffect = effect(() => {
    if (this.isDisabled()) {
      console.log('execute style effect to red')
      this.element.nativeElement.classList.add('disabled-input')
    } else {
      console.log('execute style effect to black')
      this.element.nativeElement.classList.remove('disabled-input')
    }
  })
}
