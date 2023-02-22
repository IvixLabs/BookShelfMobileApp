import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'
import {Observable, take} from 'rxjs'
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


    constructor(
      private authService: AuthService,
      private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.authService.getToken()) {
            return true
        }

        if(state.url !== '/login') {
          this.authService.setLastUrl(state.url)
          return this.router.parseUrl('/login')
        }

        return true
    }
}
