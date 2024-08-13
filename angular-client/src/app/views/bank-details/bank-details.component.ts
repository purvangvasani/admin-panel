
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, InputGroupTextDirective, InputGroupComponent, ColDirective, ButtonDirective, FormCheckLabelDirective, FormCheckInputDirective, FormCheckComponent, FormSelectDirective, FormLabelDirective, FormDirective, FormControlDirective, ContainerComponent, TabDirective, TabPanelComponent, TabsComponent, TabsContentComponent, TabsListComponent, RoundedDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { BankService } from 'src/app/services/bank.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { LoaderService } from 'src/app/util/loader.service';
import { ToastService } from 'src/app/util/toastr.service';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'app-bank-details',
  standalone: true,
  imports: [CommonModule, ContainerComponent,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    RoundedDirective,
    RowComponent,
    TabDirective,
    TabPanelComponent,
    TabsComponent,
    TabsContentComponent,
    TabsListComponent,
    IconDirective,
    NgSelectModule,
    FormsModule, ReactiveFormsModule, TextColorDirective, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective, AlignDirective],
  templateUrl: './bank-details.component.html',
  styleUrl: './bank-details.component.scss'
})
export class BankDetailsComponent implements OnInit, OnDestroy {
  public bankForm: FormGroup | any;
  public depositForm: FormGroup | any;
  public withdrawlForm: FormGroup | any;
  public refList = [{ label: "All Partners", value: 'allPartners' }, { label: "22bet.com", value: '22bet.com' }];
  public displayModeList = [
    { label: 'input', value: 'input' },
    { label: 'textarea', value: 'textarea' },
  ];
  public fieldList = [
    { label: 'text', value: 'text' },
    { label: 'number', value: 'number' },
  ]

  public deleteModalVisible = false;
  public deleteData: any;
  public bankData: any;
  public totalPages: number = 1;
  public currentPage: number = 1;
  public access: any = null;
  public accessModule: any = null;
  public accessSubModule: any = null;
  public currentUserRole: any = this.utilService.getCurrentUserRole();
  public editBankData: any;
  private params: Subscription;
  public bankId: any;
  public refId: any;
  public merchantList: any = [];
  public bankIdList: any = [];
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastService,
    private bankService: BankService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private loaderService: LoaderService,
    private merchantService: MerchantService
  ) {
    this.params = this.route.params.subscribe((params: Params) => {
      if (params['bankId']) {
        this.bankId = params['bankId'];
      }
      if (params['ref']) {
        this.refId = params['ref'];
      }
    });
    if (this.bankId) {
      this.getById();
    }
    this.buildForm();
  }

  ngOnInit(): void {
    this.getMerchantList();
  }

  ngOnDestroy() {
    try {
      if (this.params) {
        this.params.unsubscribe();
      }
    } catch (e) {
      console.error(e);
    }
  }

  private getById = () => {
    let success = (data: any) => {
      this.loaderService.hideLoader();
      if (data && data.success && data.data) {
        this.editBankData = data.data;
        this.buildForm(data.data);
      } else {
        this.toastrService.showError('Error!', data.message)
      }
    }
    let failure = (error: any) => {
      this.loaderService.hideLoader();
      this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while fetching bank details.')
    }
    this.loaderService.showLoader();
    this.bankService.getById({ bankId: this.bankId }, success, failure)
  }

  private getMerchantList = () => {
    let success = (data: any) => {
      if (data && data.success) {
        if (data.data && data.data.length) {
          this.merchantList = data.data;
          // if (!this.bankId) {
            this.getBankID();
          // }
        } else {
          this.merchantList = [];
        }
      } else {
        this.toastrService.showError('Error!', data.message)
      }
      this.loaderService.hideLoader();
    }
    let failure = (error: any) => {
      this.loaderService.hideLoader();
      this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while fetching merchant.')
    }
    this.loaderService.showLoader();
    this.merchantService.getAll({}, success, failure)
  }

  // private differenceById = (arr1: any, arr2: any) => {
  //   const ids2 = new Set(arr2.map((item: any) => item.ref));
  //   return arr1.filter((item: any) => !ids2.has(item.merchantId));
  // }
  private differenceById = (arr1: any, arr2: any, refId: any) => {
    const ids2 = new Set(arr2.map((item: any) => item.ref));
    let filteredList = arr1.filter((item: any) => !ids2.has(item.merchantId));
    if (refId) {
      const matchingRecord = arr1.find((item: any) => item.merchantId === refId);
      if (matchingRecord) {
        filteredList.push(matchingRecord);
      }
    }
    return filteredList;
  }
  public getBankID = () => {
    let success = (data: any) => {
      this.loaderService.hideLoader();
      if (data && data.success) {
        if (data.data && data.data.length) {
          this.bankIdList = data.data;
          this.merchantList = this.differenceById(this.merchantList, data.data, this.refId);
        } else {
          this.bankIdList = [];
        }
      } else {
        this.toastrService.showError('Error!', data.message)
      }
    }
    let failure = (error: any) => {
      this.loaderService.hideLoader();
      this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while validating credentials.')
    }
    this.loaderService.showLoader();
    this.bankService.getBankID({}, success, failure)
  }

  buildForm(data?: any): void {
    this.bankForm = this.fb.group({
      bankName: [data && data.bankName ? data.bankName : ''],
      active: [data && data.active ? data.active : false],
      ref: [data && data.ref ? data.ref : ''],
      uploadDetails: this.fb.array(this.initUploadDetails(data?.uploadDetails || []))
    });

    this.depositForm = this.fb.group({
      depositFields: this.fb.array(
        data?.deposits && data.deposits.length > 0
          ? this.initdepositDetails(data.deposits[0].typeDetails)
          : [this.depositItem()]
      )
    });
    this.withdrawlForm = this.fb.group({
      withdrawlFields: this.fb.array(
        data?.withdrawals && data.withdrawals.length > 0
          ? this.initwithdrawDetails(data.withdrawals[0].typeDetails)
          : [this.withdrawlItem()]
      )
    });
  }

  // Bank Items
  get uploadDetails(): FormArray {
    return this.bankForm.get('uploadDetails') as FormArray;
  }

  initUploadDetails(details: any[]): FormGroup[] {
    return details.map(detail => this.bankItem(detail));
  }

  bankItem(data: any): FormGroup {
    return this.fb.group({
      uploadName: [data?.uploadName ? data?.uploadName : ''],
      uploadValue: [data?.uploadValue ? data?.uploadValue : '']
    });
  }

  addBankItem(): void {
    this.uploadDetails.push(this.bankItem(null));
  }

  removeBankItem(index: number): void {
    this.uploadDetails.removeAt(index);
  }

  public onBankSubmit = () => {
    let success = (data: any) => {
      this.loaderService.hideLoader();
      if (data && data.success) {
        this.toastrService.showSuccess("Success!", data.message);
        this.utilService.goto('/banks/list')
      } else {
        this.toastrService.showError('Error!', data && data?.message ? data?.message : 'Error while saving bank record.')
      }
    }
    let failure = (error: any) => {
      this.loaderService.hideLoader();
      this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while saving bank record.')
    }
    this.loaderService.showLoader();
    let bankData = this.bankForm.value;
    const allwithdrawlFormFilled = this.withdrawlForm.value.withdrawlFields.every((field: any) => {
      return field.fieldName && field.displayMode && field.fieldType && (field.placeHolder || field.fieldType === 'checkbox') && (field.required !== undefined);
    });
    const allwdepositsFormFilled = this.depositForm.value.depositFields.every((field: any) => {
      return field.fieldName && field.displayMode && field.fieldType && (field.placeHolder || field.fieldType === 'checkbox') && (field.required !== undefined);
    });
    if (allwithdrawlFormFilled) {
      bankData['withdrawals'] = this.withdrawlForm.value.withdrawlFields;
    }
    if (allwdepositsFormFilled) {
      bankData['deposits'] = this.depositForm.value.depositFields;
    }
    if (this.editBankData?.bankId) {
      bankData['bankId'] = this.editBankData.bankId;
      this.bankService.update(bankData, success, failure)
    } else {
      this.bankService.add(bankData, success, failure)
    }
  }

  // Deposit Items
  get depositFields(): FormArray {
    return this.depositForm.get('depositFields') as FormArray;
  }

  initdepositDetails(depositDetails: any[]): FormGroup[] {
    return depositDetails.map(depositDetail => this.depositItem(depositDetail));
  }

  depositItem(data?: any): FormGroup {
    return this.fb.group({
      fieldName: [data && data.fieldName ? data.fieldName : ''],
      displayMode: [data && data.displayMode ? data.displayMode : ''],
      fieldType: [data && data.fieldType ? data.fieldType : ''],
      placeHolder: [data && data.placeHolder ? data.placeHolder : ''],
      required: [data && data.required ? data.required : false]
    });
  }

  adddepositItem(): void {
    this.depositFields.push(this.depositItem());
  }

  removeDepositItem(index: number): void {
    this.depositFields.removeAt(index);
  }
  onDepositSubmit(): void {
    // Handle form submission, including file handling
  }
  // withdrawl Items
  get withdrawlFields(): FormArray {
    return this.withdrawlForm.get('withdrawlFields') as FormArray;
  }
  initwithdrawDetails(depositDetails: any[]): FormGroup[] {
    return depositDetails.map(depositDetails => this.withdrawlItem(depositDetails));
  }
  withdrawlItem(data?: any): FormGroup {
    return this.fb.group({
      fieldName: [data && data.fieldName ? data.fieldName : ''],
      displayMode: [data && data.displayMode ? data.displayMode : ''],
      fieldType: [data && data.fieldType ? data.fieldType : ''],
      placeHolder: [data && data.placeHolder ? data.placeHolder : ''],
      required: [data && data.required ? data.required : false],

    });
  }
  addwithdrawlItem(): void {
    this.withdrawlFields.push(this.withdrawlItem());
  }
  removewithdrawlItem(index: number): void {
    this.withdrawlFields.removeAt(index);
  }
  onwithdrawlSubmit(): void {
  }
}
