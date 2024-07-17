
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, InputGroupTextDirective, InputGroupComponent, ColDirective, ButtonDirective, FormCheckLabelDirective, FormCheckInputDirective, FormCheckComponent, FormSelectDirective, FormLabelDirective, FormDirective, FormControlDirective, ContainerComponent, TabDirective, TabPanelComponent, TabsComponent, TabsContentComponent, TabsListComponent, RoundedDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { NgSelectModule } from '@ng-select/ng-select';

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
export class BankDetailsComponent implements OnInit {
  public bankForm: FormGroup | any;
  public depositForm: FormGroup | any;
  public withdrawlForm: FormGroup | any;

  public refList = [{ label: "All Partners", value: 'allPartners' }, { label: "22bet.com", value: '22bet.com' }];
  public displayModeList = [
    { label: 'input', value: 'input' },
    { label: 'time', value: 'time' },
    { label: 'birthdate', value: 'birthdate' },
    { label: 'textarea', value: 'textarea' },
    { label: 'file', value: 'file' },
    { label: 'select', value: 'select' },
    { label: 'html', value: 'html' },
    { label: 'qrcode', value: 'qrcode' },
    { label: 'phone number', value: 'phone number' },
    { label: 'link', value: 'link' },

  ];
  public fieldList = [
    { label: 'text', value: 'text' },
    { label: 'number', value: 'number' },
    { label: 'checkbox', value: 'checkbox' },
    { label: 'null', value: 'null' },

  ]
  constructor(private router: Router, private fb: FormBuilder) { }
  handleTabsEvent(event: any) {
    console.log(event)
  }
  ngOnInit(): void {
    this.buildForm();

  }
  buildForm(data?: any): void {
    this.bankForm = this.fb.group({
      bankName: [data && data.bankName ? data.bankName : ''],
      isActive: [data && data.isActive ? data.isActive : false],
      value: [data && data.value ? data.value : ''],
      ref: [data && data.ref ? data.ref : ''],
      details: this.fb.array([this.bankItem()])
    });

    this.depositForm = this.fb.group({
      depositFields: this.fb.array([this.depositItem(data)])
    });
    this.withdrawlForm = this.fb.group({
      withdrawlFields: this.fb.array([this.withdrawlItem(data)])
    });
  }

  // Bank Items
  get details(): FormArray {
    return this.bankForm.get('details') as FormArray;
  }
  bankItem(): FormGroup {
    return this.fb.group({
      name: [''],
      value: ['']
    });
  }
  addBankItem(): void {
    this.details.push(this.bankItem());
  }
  removeBankItem(index: number): void {
    this.details.removeAt(index);
  }

  onBankSubmit(): void {
    console.log(this.bankForm.value);
    // Handle form submission, including file handling
  }

  // Deposit Items
  get depositFields(): FormArray {
    return this.depositForm.get('depositFields') as FormArray;
  }

  depositItem(data?: any): FormGroup {
    return this.fb.group({
      fieldName: [data && data.fieldName ? data.fieldName : ''],
      displayMode: [data && data.displayMode ? data.displayMode : ''],
      field: [data && data.field ? data.field : ''],
      placeHolder: [data && data.placeHolder ? data.placeHolder : ''],
      required: [data && data.required ? data.required : false],

    });
  }

  adddepositItem(): void {
    this.depositFields.push(this.depositItem());
  }

  removeDepositItem(index: number): void {
    this.depositFields.removeAt(index);
  }
  onDepositSubmit(): void {
    console.log(this.depositForm.value);
    // Handle form submission, including file handling
  }
  // withdrawl Items
  get withdrawlFields(): FormArray {
    return this.withdrawlForm.get('withdrawlFields') as FormArray;
  }

  withdrawlItem(data?: any): FormGroup {
    return this.fb.group({
      fieldName: [data && data.fieldName ? data.fieldName : ''],
      displayMode: [data && data.displayMode ? data.displayMode : ''],
      field: [data && data.field ? data.field : ''],
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
    console.log(this.withdrawlForm.value);
    // Handle form submission, including file handling
  }
}
