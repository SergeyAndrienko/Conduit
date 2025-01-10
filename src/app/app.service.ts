import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {environment} from '../environments/environment'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AppServiceHTTP {
  constructor(private http: HttpClient) {}

  private corsProxy = 'https://cors-anywhere.herokuapp.com/'

  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.apiUrl(path), {params})
  }

  post<T>(path: string, body: any, options?: object): Observable<T> {
    return this.http.post<T>(this.apiUrl(path), body, options)
  }

  put<T>(path: string, body: any, options?: object): Observable<T> {
    return this.http.put<T>(this.apiUrl(path), body, options)
  }

  delete<T>(path: string, options?: object): Observable<T> {
    return this.http.delete<T>(this.apiUrl(path), options)
  }

  patch<T>(path: string, body: any, options?: object): Observable<T> {
    return this.http.patch<T>(this.apiUrl(path), body, options)
  }

  private apiUrl(path: string): string {
    return new URL(environment.apiUrl) + path
  }
}