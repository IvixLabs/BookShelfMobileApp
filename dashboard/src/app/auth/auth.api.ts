import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthApi {

  constructor(private http: HttpClient) {
  }

  getJwtToken(username: string, password: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    })


    return this.http
      .post<any>(
        'http://api.dashskel.loc/auth',
        {login: username, password: password},
        {headers}
      )
  }
}
