import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  isLogin = true;

  constructor(
    private router: Router,
    private authService: AuthorizationService
  ){}

  ngOnInit(): void {
      this.authService.loginSubject.asObservable().subscribe(value => {
        this.isLogin = value;
      });
  }

  logout(){
    this.router.navigate(['/login']);
  }
}
