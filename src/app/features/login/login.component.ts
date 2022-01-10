import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '@core/services';
import { Router, ActivatedRoute} from '@angular/router';
import { LoadingService, MessageService } from '@core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  returnUrl: string;

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
    private messageService: MessageService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      //remember: [true]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
            this.router.navigate([this.returnUrl]);
          } 
          this.loadingService.trigger(false);
        });
    } else {
      this.messageService.error('Error', 'Require username and password');
    }
  }
}
