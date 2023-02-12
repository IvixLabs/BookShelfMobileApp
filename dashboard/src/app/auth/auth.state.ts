import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class AuthState {

  private token$ = new BehaviorSubject<string | undefined>(undefined)

  setToken(token: string | undefined) {
    this.token$.next(token)
  }

  getToken$(): Observable<string | undefined> {
    return this.token$.asObservable();
  }
}
