import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/helpers/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { WelcomeComponent } from './features/welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  { path: 'sample', loadChildren: () => import('./features/sample/sample.module').then(m => m.SampleModule), canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
