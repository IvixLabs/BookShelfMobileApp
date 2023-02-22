import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthState {

  private token$ = new BehaviorSubject<string | undefined>(undefined)

  private lastUrl$ = new BehaviorSubject<string>('/tabs')


  constructor() {
    console.log('AuthState constructor')
  }

  setToken(token: string | undefined) {
    this.token$.next(token)
  }

  getToken$(): Observable<string | undefined> {
    return this.token$.asObservable();
  }

  getToken(): string | undefined {
    return this.token$.getValue();
  }

  setLastUrl(lastUrl: string) {
    this.lastUrl$.next(lastUrl)
  }

  getLastUrl(): string {
    return this.lastUrl$.getValue()
  }
}
