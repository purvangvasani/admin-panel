import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, InputGroupTextDirective, InputGroupComponent, ColDirective, ButtonDirective, FormCheckLabelDirective, FormCheckInputDirective, FormCheckComponent, FormSelectDirective, FormLabelDirective, FormDirective, FormControlDirective, ContainerComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, DropdownComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PayoutsService } from 'src/app/services/payouts.service';
import { TransactionService } from 'src/app/services/transactionRequest.service';
import { LoaderService } from 'src/app/util/loader.service';
import { ToastService } from 'src/app/util/toastr.service';

@Component({
  selector: 'app-payouts',
  standalone: true,
  imports: [CommonModule, ContainerComponent, FormsModule, ReactiveFormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective, AlignDirective,
    IconDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, NgStyle
  ],
  templateUrl: './payouts.component.html',
  styleUrl: './payouts.component.scss'
})
export class PayoutsComponent {
  public payoutsList: any[] = [];
  public payoutsForm: FormGroup | any;

  constructor(private TransactionService: TransactionService, private fb: FormBuilder,
    private loaderService: LoaderService, private toastrService: ToastService,
  ) { }
  public status = [{ label: 'Done', value: 'done' },
  { label: 'Rejected', value: 'rejected' },

  ]
  ngOnInit(): void {
    this.getAllDeposite();
    this.buildForm();

  }
  buildForm(data?: any): void {
    this.payoutsForm = this.fb.group({
      account: [data && data.account ? data.account : 'Account'],
      currency: [data && data.currency ? data.currency : 'Currency'],
      status: [data && data.status ? data.status : 'Status'],
      operationAmountFrom: [data && data.operationAmountFrom ? data.operationAmountFrom : null],
      operationAmountTo: [data && data.operationAmountTo ? data.operationAmountTo : null],
      creationDateFrom: [data && data.creationDateFrom ? data.creationDateFrom : null],
      creationDateTo: [data && data.creationDateTo ? data.creationDateTo : null]
    }, {
      validators: this.dateRangeValidator // Custom validator function
    });
  }
  public getHoursDifference(createdAt: string, updatedAt: string, type?: string): string {
    // Parse the input createdAt date (assumed to be in UTC)
    const createdDate = new Date(createdAt);
    const updatedDate = type !== 'Processing' ? new Date(updatedAt) : new Date();
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = updatedDate.getTime() - createdDate.getTime();
    // Convert milliseconds to hours, minutes, and seconds
    const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    // Format the result as HH:MM:SS
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)} Hrs`;
  }
  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
  dateRangeValidator = (formGroup: FormGroup) => {
    const fromDate = formGroup.get('creationDateFrom')?.value;
    const toDate = formGroup.get('creationDateTo')?.value;

    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      formGroup.get('creationDateTo')?.setErrors({ dateRangeError: true });
    } else {
      formGroup.get('creationDateTo')?.setErrors(null);
    }
  };
  public getAllDeposite = () => {
    const successCallback = (response: any) => {
      if (response && response.success) {
        this.loaderService.hideLoader();

        if (response.data && response.data.length) {
          this.payoutsList = response.data || [];
        }
      }
    }
    const errorCallback = (error: any) => {
      this.loaderService.hideLoader();
      this.payoutsList = [];
    }
    this.loaderService.showLoader();
    const criteria = {
      type: 'Withdrawal',
    }
    this.TransactionService.getAll(criteria, successCallback, errorCallback);
  }
  public handleToggleEvent = (data: any, status: any) => {
    let success = (data: any) => {
      if (data && data.success) {
        this.toastrService.showSuccess("Success!", data.message);
        this.loaderService.hideLoader();
        this.getAllDeposite();
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
    if (data) {
      data.status = status;
      this.TransactionService.updateTransaction(data, success, failure);
    }
  }
  handleFilterEvent() {
    const filters = this.payoutsForm.value;

    // This is Tentatively Handled by ts 

    this.payoutsList = this.payoutsList.filter(item => {
      let matches = true; // Initialize matches to true

      // Filter by account
      if (filters.account !== undefined && item.account !== undefined && filters.account !== 'Account') {
        const accountMatches = item.account.toLowerCase().includes(filters.account.toLowerCase());
        matches = matches && accountMatches;
      }

      // Filter by currency
      if (filters.currency !== undefined && item.currency !== undefined && filters.currency !== 'Currency') {
        const currencyMatches = item.currency.toLowerCase().includes(filters.currency.toLowerCase());
        matches = matches && currencyMatches;
      }

      // Filter by status
      if (filters.status !== undefined && item.status !== undefined && filters.status !== 'Status') {
        const statusMatches = item.status.toLowerCase().includes(filters.status.toLowerCase());
        matches = matches && statusMatches;
      }
      // Filter by operationAmountFrom 

      if ((filters.operationAmountFrom !== undefined && filters.operationAmountFrom !== null) && (item.amount !== undefined && item.amount !== null)) {
        const operationAmountFromMatches = item.amount >= filters.operationAmountFrom;
        matches = matches && operationAmountFromMatches;
      }

      // Filter by operationAmountTo 
      if ((filters.operationAmountTo !== undefined && filters.operationAmountTo !== null) && (item.amount !== undefined && item.amount !== null)) {
        const operationAmountToMatches = item.amount <= filters.operationAmountTo;
        matches = matches && operationAmountToMatches;
      }

      // Filter by creationDateFrom
      if ((filters.creationDateFrom !== undefined && filters.creationDateFrom !== null) && (item.created_at !== undefined && item.created_at !== null)) {
        const creationDateFromItem = new Date(item.created_at); // Assuming item.created_at is in '2023-03-28T19:03:51.000000Z' format
        const creationDateFromFilter = new Date(filters.creationDateFrom); // Parse '27-03-2023' to Date
        matches = matches && creationDateFromItem >= creationDateFromFilter;
      }
      // Filter by creationDateTo
      if ((filters.creationDateTo !== undefined && filters.creationDateTo !== null) && (item.created_at !== undefined && item.created_at !== null)) {
        const creationDateToItem = new Date(item.created_at); // Assuming item.created_at is in '2023-03-28T19:03:51.000000Z' format
        const creationDateToFilter = new Date(filters.creationDateTo);// Parse '27-03-2023' to Date
        matches = matches && creationDateToItem <= creationDateToFilter;
      }

      return matches;
    });

    return this.payoutsList;
  }
}
