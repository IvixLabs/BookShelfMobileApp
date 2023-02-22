import {Injectable} from "@angular/core";
import {Observable, take, tap} from "rxjs";
import {AuthApi} from "./auth.api";
import {AuthState} from "./auth.state";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authApi: AuthApi,
    private authState: AuthState,
    private router: Router) {
  }

  getToken$() {
    return this.authState.getToken$()
  }

  getToken() {
    return this.authState.getToken()
  }

  setLastUrl(lastUrl: string) {
    this.authState.setLastUrl(lastUrl)
  }

  getLastUrl(): string {
    return this.authState.getLastUrl()
  }

  login(username: string, password: string): Observable<any> {
    return this.authApi
      .getJwtToken(username, password)
      .pipe(tap(
        res => {

          this.authState.setToken(res.token)

          const lastUrl = this.getLastUrl()

          this.router.navigate([lastUrl])
        }
      ))
  }

}
