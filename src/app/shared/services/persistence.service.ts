import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  // TODO: Err in logs "Error getting data from localStorage ReferenceError: localStorage is not defined"
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Error saving to localStorage', e)
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(<string>localStorage.getItem(key))
    } catch (e) {
      console.error('Error getting data from localStorage', e)
      return null
    }
  }

  remove(key: string): boolean {
    try {
      localStorage.removeItem(key)
      return true
    } catch (e) {
      console.error('Error removing data from localStorage', e)
      return false
    }
  }
}
