import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  isLogin = false;

  constructor(
    private router: Router
  ){}

  logout(){
    this.router.navigate(['/login']);
  }
}
