import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../util/local-storage.service';
import { AuthService } from '../auth.service';
import { LoaderService } from '../../../util/loader.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../util/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  providers: [AuthService],
  imports: [ReactiveFormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup | any;
  title: string | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private loaderService: LoaderService
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  public gotoRegister = () => {
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
    this.title = 'Administrator Login';
    this.buildForm();
  }

  private buildForm = (data?: any) => {
    this.loginForm = this.fb.group({
      email: new FormControl(data && data.email ? data.email : null, [Validators.required]),
      password: new FormControl(data && data.password ? data.password : null, [Validators.required]),
    });
  }

  public handleLoginEvent = () => {
    let success = (data: any) => {
      this.loaderService.hideLoader();
      if (data && data.success) {
        this.localStorageService.create();
        this.localStorageService.setValue('user', data.user);
        this.localStorageService.setValue('auth', data.auth);
        this.router.navigateByUrl('/dashboard');
      } else {
        this.toastrService.showError('Error!', data.message)
      }
    }
    let failure = (error: any) => {
      this.loaderService.hideLoader();
      this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while validating credentials.')
    }
    this.loaderService.showLoader();
    this.authService.login({
      email: this.loginForm.get('email')?.value,
      grantType: 'password',
      password: this.loginForm.get('password')?.value
    }, success, failure)
  }

  public handleForgotPasswordEvent = () => {
    this.router.navigateByUrl('/forgot-password');
  }

}
