import {HttpInterceptorFn} from '@angular/common/http'
import {SpinnerService} from '@shared/services/spinner.service'
import {finalize} from 'rxjs'
import {inject} from '@angular/core'

export const SpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService)
  spinnerService.show()

  return next(req).pipe(finalize(() => spinnerService.hide()))
}
