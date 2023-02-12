import {Injectable} from "@angular/core";
import {take} from "rxjs";
import {AuthApi} from "./auth.api";
import {AuthState} from "./auth.state";

@Injectable()
export class AuthService {


  constructor(private authApi: AuthApi, private authState: AuthState) {
  }

  getToken$() {
    return this.authState.getToken$()
  }


  login(username: string, password: string) {
    this.authApi
      .getJwtToken(username, password)
      .pipe(take(1))
      .subscribe(res => {
        this.authState.setToken(res.token)
      })
  }

}
