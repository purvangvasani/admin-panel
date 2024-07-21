import { NgStyle } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent, CardHeaderComponent, ColComponent, ContainerComponent, FormControlDirective, FormDirective, InputGroupComponent, InputGroupTextDirective, RowComponent, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { LoaderComponent } from '../../loader/loader.component';
import { ToastService } from 'src/app/util/toastr.service';
import { LoaderService } from 'src/app/util/loader.service';
import { TransactionService } from 'src/app/services/transactionRequest.service';

@Component({
  selector: 'app-deposit-add',
  standalone: true,
  imports: [ReactiveFormsModule, ContainerComponent, RowComponent, ColComponent, CardHeaderComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle],
  templateUrl: './deposit-add.component.html',
  styleUrl: './deposit-add.component.scss'
})
export class DepositAddComponent implements OnInit {
  @ViewChild('loader') loaderComponent!: LoaderComponent;

  public depositForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastService,
    private loaderService: LoaderService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm = (data?: any) => {
    this.depositForm = this.fb.group({
      merchantId: new FormControl(data && data.merchantId ? data.merchantId : null),
      accountName: new FormControl(data && data.accountName ? data.accountName : null),
      accountNumber: new FormControl(data && data.accountNumber ? data.accountNumber : null),
      amount: new FormControl(data && data.amount ? data.amount : null),
      transactionId: new FormControl(data && data.transactionId ? data.transactionId : null),
      operationType: new FormControl(data && data.operationType ? data.operationType : null),
      status: new FormControl(data && data.merchantId ? data.merchantId : 'Processing'),
      type: new FormControl('deposite'),
    });
  }
  public addTransaction = () => {
    let success = (data: any) => {
      if (data && data.success) {
        this.toastrService.showSuccess("Success!", data.message);
        this.loaderService.hideLoader();
        // this.getAll();
        this.cancel();
      } else {
        this.loaderService.hideLoader();
        this.toastrService.showError('Error!', data && data?.message ? data?.message : 'Error while saving role record.')
      }
    }
    let failure = (error: any) => {
      this.loaderService.hideLoader();
      this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while saving role record.')
    }
    this.loaderService.showLoader();
    // if (this.editRoleData?.rolesId) {
    //   this.roleData.value['rolesId'] = this.editRoleData.rolesId;
    //   this.roleService.update(this.roleData.value, success, failure)
    // } else {
    this.transactionService.addTransaction(this.depositForm.value, success, failure)
    // }
  }

  public cancel = () => {
    this.depositForm = null;
    this.buildForm();
  }
}