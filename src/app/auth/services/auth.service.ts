import {Injectable} from '@angular/core'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {map, Observable} from 'rxjs'
import {CurrentUserInterface} from '@shared/types/currentUser.interface'
import {environment} from '../../../environments/environment'
import {AuthResponseInterface} from '../types/authResponse.interface'
import {LoginRequestInterface} from '@app/auth/types/loginRequest.interface'
import {ApiService} from '@shared/services/api.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.apiUrl

  constructor(private http: ApiService) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>(`/users`, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>(`/users/login`, data)
      .pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http.get<AuthResponseInterface>(`/user`).pipe(map(this.getUser))
  }
}
