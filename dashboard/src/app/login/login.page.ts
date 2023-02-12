import {Component, OnInit} from '@angular/core';
import {AuthApi} from "../auth/auth.api";
import {Observable, take} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ''

  password: string = ''

  jwt: Observable<string | undefined>

  constructor(private authService: AuthService) {
    this.jwt = authService.getToken$()
  }

  ngOnInit() {
  }

  login() {
    this.authService
      .login(this.username, this.password)
  }

}
