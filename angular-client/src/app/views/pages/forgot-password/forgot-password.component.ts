import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent, ColComponent, ContainerComponent, FormControlDirective, FormDirective, InputGroupComponent, InputGroupTextDirective, RowComponent, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { LoaderService } from 'src/app/util/loader.service';
import { LocalStorageService } from 'src/app/util/local-storage.service';
import { UtilService } from 'src/app/util/util.service';
import { AuthService } from '../auth.service';
import { ToastService } from 'src/app/util/toastr.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  imports: [ReactiveFormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class ForgotPasswordComponent {

  public formData: FormGroup | any;

  constructor(
    private localStorageService: LocalStorageService,
    private utilService: UtilService,
    private loaderService: LoaderService,
    private authService: AuthService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ){  }

  ngOnInit(): void {
    if (this.localStorageService.getValue('accessToken')) {
      this.utilService.goto('/home');
    }
    this.buildForm();
  }

  private buildForm = () => {
    this.formData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  public resetPassword = () => {
    let success = (data: any) => {
      this.loaderService.hideLoader();
      if (data.success) {
        this.toastService.showSuccess('Success!', data.message);
        this.utilService.goto('/login');
      } else {
        this.toastService.showError('Error!', data.message);
      }
    }
    let error = (error: any) => {
      this.loaderService.hideLoader();
      this.toastService.showError('Error!', error.message);
    }
    this.loaderService.showLoader();
    const user = this.formData.value;
    this.authService.resetPassword(user, success, error);
  }
}
