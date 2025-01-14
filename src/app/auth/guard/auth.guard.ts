import {Injectable} from '@angular/core'
import {CanActivate, Router} from '@angular/router'
import {Observable} from 'rxjs'
import {PersistenceService} from '@shared/services/persistence.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private persistenceService: PersistenceService,
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.persistenceService.get('accessToken')
    if (isLoggedIn) {
      this.router.navigateByUrl('/')
      return false
    }
    return true
  }
}
