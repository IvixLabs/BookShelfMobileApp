import {Component, OnInit} from '@angular/core';
import {AuthApi} from "../auth/auth.api";
import {catchError, Observable, take} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authFail:boolean = false

  username: string = ''

  password: string = ''

  jwt: Observable<string | undefined>

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {
    this.jwt = authService.getToken$()
  }

  ngOnInit() {

  }

  onDataChanged() {
    this.authFail = false
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging...',
    })

    await loading.present()

    this.authService
      .login(this.username, this.password)
      .pipe(catchError(async error => {
        this.authFail = true
        await loading.dismiss()
        throw error
      }))
      .subscribe(async res => {
        await loading.dismiss()

        const lastUrl = this.authService.getLastUrl()
        console.log(lastUrl)

        this.router.navigate([lastUrl])
      })
  }

}
