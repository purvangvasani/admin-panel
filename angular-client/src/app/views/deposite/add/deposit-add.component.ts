import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent, CardHeaderComponent, ColComponent, ContainerComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, InputGroupComponent, InputGroupTextDirective, RowComponent, TextColorDirective, ThemeDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ToastService } from 'src/app/util/toastr.service';
import { LoaderService } from 'src/app/util/loader.service';
import { TransactionService } from 'src/app/services/transactionRequest.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UtilService } from 'src/app/util/util.service';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-deposit-add',
  standalone: true,
  imports: [NgTemplateOutlet, FormsModule, ThemeDirective, CommonModule, ReactiveFormsModule, ContainerComponent, RowComponent, ColComponent, CardHeaderComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle,FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective],
  templateUrl: './deposit-add.component.html',
  styleUrl: './deposit-add.component.scss'
})
export class DepositAddComponent implements OnInit {

  public depositForm: FormGroup | any;
  public merchant = "";
  public depositFields: any = [];
  public id: any;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastService,
    private utilService: UtilService,
    private loaderService: LoaderService,
    private transactionService: TransactionService,
    private merchantService: MerchantService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        this.getMerchantById(params['id']);
      } else {
        this.toastrService.showWarning('Warning!', "You donot have permission to view this page!")
        this.utilService.goto('/404');
      }
    });
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
      type: new FormControl('Deposit'),
    });
    this.depositForm.get('merchantId')?.disable();
  }
  public addTransaction = () => {
    let success = (data: any) => {
      if (data && data.success) {
        this.toastrService.showSuccess("Success!", data.message);
        this.loaderService.hideLoader();
        this.cancel();
      } else {
        this.loaderService.hideLoader();
        this.toastrService.showError('Error!', data && data?.message ? data?.message : 'Something Went Wrong.')
      }
    }
    let failure = (error: any) => {
      this.loaderService.hideLoader();
      this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Something Went Wrong.')
    }
    this.loaderService.showLoader();
    const updatedData = this.mergeAdditionalFields(this.depositForm.value, this.depositFields);
    updatedData['merchantId'] = this.id;
    this.transactionService.addTransaction(updatedData, success, failure)
  }
  public mergeAdditionalFields = (data: any, fields: any) => {
    fields.forEach((field: any) => {
      data[field.fieldName] = field.value;
    });
    return data;
  };
  public handleFieldEvents = (events: any) => {
  }

  private getMerchantById = (id: any) => {
    let success = (data: any) => {
      if (data && data.success) {
        if (data.data.merchantname) {
          this.merchant = data.data.merchantname;
          this.depositFields = data.data.depositFields.deposits?.length ? data.data.depositFields.deposits[0].typeDetails : [];
        } 
      } else {
        this.toastrService.showError('Error!', data.message)
        this.utilService.goto('/404')
      }
      this.loaderService.hideLoader();
    }
    let failure = (error: any) => {
      this.loaderService.hideLoader();
      this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while fetching merchant.')
      this.utilService.goto('/404')
    }
    this.loaderService.showLoader();
    this.merchantService.getById({ merchantId: id, for: "public", get: 'bankDeposits' }, success, failure)
  }

  public cancel = () => {
    this.depositForm = null;
    this.depositFields.forEach((it: any) => {
      if (it.value !== '' && it.value !== null && it.value !== undefined) {
        it.value = '';
      }
    });
    this.buildForm();
  }
}