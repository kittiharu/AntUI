import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '@core/services';
import { Router} from '@angular/router';

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
    private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      //remember: [true]
    });
  }

  login(): void {
    //this.messageService.clear();
    let formValue = this.form.value;
    let domainValue = '';
    let username = formValue.username;
    if (formValue && formValue.username && formValue.password) {
      // if (formValue.domain != 'external') {
      //   domainValue = formValue.domain;
      //   username += '@' + domainValue + '.co.th';
      // }
      //this.loadingService.trigger(true);
      this.authService.login(username, formValue.password, domainValue)
        .subscribe(result => {
          if (result) {
            //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
            //setTimeout(() => { this.app.schedulingNotification(); }, 1000);
            this.router.navigate([this.authService.getRedirectUrl()]);
          }
          //this.loadingService.trigger(false);
        }, err => {
          //this.loadingService.trigger(false);
        });
    } else {
      //this.messageService.add({ severity: 'error', summary: 'Fail', detail: 'Login Fail' });
    }
  }
}
