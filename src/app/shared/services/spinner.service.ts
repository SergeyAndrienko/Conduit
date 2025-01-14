import {Injectable, signal} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isLoading = signal(false)

  show() {
    this.isLoading.set(true)
  }

  hide() {
    this.isLoading.set(false)
  }

  getIsLoading() {
    return this.isLoading
  }
}
