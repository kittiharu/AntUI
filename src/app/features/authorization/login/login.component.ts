import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '@core/services';
import { Router} from '@angular/router';
import { LoadingService, MessageService } from '@core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  submitForm(): void {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
  }

  constructor(private fb: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private loadingService: LoadingService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      //remember: [true]
    });
  }

  login(): void {
    this.messageService.clear();
    let formValue = this.form.value;
    let domainValue = '';
    let username = formValue.userName;
    if (formValue && formValue.userName && formValue.password) {
      // if (formValue.domain != 'external') {
      //   domainValue = formValue.domain;
      //   username += '@' + domainValue + '.co.th';
      // }
      this.loadingService.trigger(true);
      this.authService.login(username, formValue.password, domainValue)
        .subscribe(token => {
          if (token) {
            this.messageService.success('Login Success');
            this.router.navigate([this.authService.getRedirectUrl()]);
          } 
          this.loadingService.trigger(false);
        }, err => {
          if (err.error && err.error.error_description){
            this.messageService.error('Login Fail', err.error.error_description);
          } else {
            this.messageService.error('Login Fail', 'Please contact system administrator');
          }
          this.loadingService.trigger(false);
        }, () => {
          this.loadingService.trigger(false);
        });
    } else {
      this.messageService.error('Error', 'Require username and password');
    }
  }
}
