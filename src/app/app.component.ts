import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '@core/app.constants';
import { AuthorizationService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  isLogin = false;

  constructor(
    private router: Router,
    private authService: AuthorizationService
  ){}

  ngOnInit(): void {
      this.authService.loginSubject.asObservable().subscribe(value => {
        this.isLogin = value;
      });
      if (this.authService.isLoggedIn()) {
        this.isLogin = true;
      }
  }

  logout(){
    this.authService.logout();
    this.router.navigate([AppConstants.LOGIN_PATH]);
  }
}
