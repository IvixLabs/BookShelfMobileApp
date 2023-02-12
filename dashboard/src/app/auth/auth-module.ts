import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AuthApi} from "./auth.api";
import {AuthState} from "./auth.state";
import {AuthService} from "./auth.service";

@NgModule({
  providers: [AuthApi, AuthState, AuthService],
  imports: [HttpClientModule],
})
export class AuthModule {
}
