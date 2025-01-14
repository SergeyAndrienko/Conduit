import {HttpInterceptorFn} from '@angular/common/http'
import {PersistenceService} from '@shared/services/persistence.service'
import {inject} from '@angular/core'

export const TokenInterception: HttpInterceptorFn = (req, next) => {
  const persistenceService = inject(PersistenceService)
  const token = persistenceService.get('accessToken')

  if (token) {
    const headers = req.headers.set('Authorization', `Token ${token}`)
    req = req.clone({headers})
  }

  return next(req)
}
