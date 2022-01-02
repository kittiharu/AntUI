import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthorizationService } from './authorization.service';

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
      if (url == '/login') {
        this.router.navigate(['/sample']);
        return false;
      }
      return true;
    } else {
      if (url == '/login' || url == '/token') return true;
      this.authorizationService.isLogin(false);
      this.authorizationService.forwardToLogin(url);
      return false;
    }
  }

}