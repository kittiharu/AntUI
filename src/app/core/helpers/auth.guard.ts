import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AppConstants } from '@core/app.constants';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authorizationService: AuthorizationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    if (this.authorizationService.isLoggedIn()) {
      console.log('logined');
      if (url == AppConstants.LOGIN_PATH) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      if (url == AppConstants.LOGIN_PATH) return true;
      this.authorizationService.isLogin(false);
      this.router.navigate([AppConstants.LOGIN_PATH], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }

}