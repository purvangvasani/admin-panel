import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/util/toastr.service';
import { AuthService } from '../auth.service';
import { LoaderService } from 'src/app/util/loader.service';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class RegisterComponent {

  public signupForm: FormGroup | any;
  public model: User | any;
  public title: string = '';

  public formdata: any;
  private id: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastService,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {
    this.title = "Create an account";
    this.buildForm();
   }

  private buildForm = (data?: any) => {
    this.signupForm = this.fb.group({
      firstname: new FormControl(data && data.firstname ? data.firstname : null, [Validators.required]),
      lastname: new FormControl(data && data.lastname ? data.lastname : null, [Validators.required]),
      email: new FormControl(data && data.email ? data.email : null, [Validators.required]),
      password: new FormControl(data && data.password ? data.password : null, [Validators.required]),
    });
  }

  public onSubmit= ()=> {
    let success = (data: any) => {
      this.loaderService.hideLoader();
      if (data && data.success) {
        this.toastrService.showSuccess('Success!', data.message ? data.message : 'Successfully Registered.');
        this.router.navigateByUrl('/login');
      } else {
        this.toastrService.showError('Error!', data.message ? data.message : data.msg ? data.msg :  'Successfully Registered.');
      }
    }
    let failure = (error: any) => {
      this.loaderService.hideLoader();
      this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while validating credentials.')
    }
    this.loaderService.showLoader();
    this.authService.register(this.signupForm.value, success, failure)
  }

}
