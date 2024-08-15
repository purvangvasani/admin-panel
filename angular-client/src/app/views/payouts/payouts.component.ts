import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, InputGroupTextDirective, InputGroupComponent, ColDirective, ButtonDirective, FormCheckLabelDirective, FormCheckInputDirective, FormCheckComponent, FormSelectDirective, FormLabelDirective, FormDirective, FormControlDirective, ContainerComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, DropdownComponent, PaginationComponent, PageLinkDirective, PageItemDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Subscription } from 'rxjs';
import { TransactionService } from 'src/app/services/transactionRequest.service';
import { LoaderService } from 'src/app/util/loader.service';
import { ToastService } from 'src/app/util/toastr.service';
import { UtilService } from 'src/app/util/util.service';
import { LocalStorageService } from 'src/app/util/local-storage.service';
import { appConstants } from 'src/app/util/app.constant';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent, ValueFormatterParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { ToggleDropdownComponent } from '../toggle-dropdown/toggle-dropdown.component'; import { format } from 'date-fns';

@Component({
  selector: 'app-payouts',
  standalone: true,
  imports: [AgGridAngular, PaginationComponent, PageItemDirective, RouterLink,
    PageLinkDirective, CommonModule, ContainerComponent, FormsModule, ReactiveFormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective, AlignDirective,
    IconDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, NgStyle,
    ToggleDropdownComponent
  ],
  templateUrl: './payouts.component.html',
  styleUrl: './payouts.component.scss'
})
export class PayoutsComponent implements OnInit, OnDestroy {
  public payoutsList: any[] = [];
  public payoutsForm: FormGroup | any;
  public access: any = null;
  public accessModule: any = null;
  public accessSubModule: any = null;
  public currentUserRole: any = this.utilService.getCurrentUserRole();
  private paramsubscriptions: Subscription[] = [];
  private params: Subscription | undefined;
  private gridApi!: GridApi<any>;
  context = {
    componentParent: this
  };
  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {
    filter: true,
  };
  public rowSelection: "single" | "multiple" = "multiple";
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 20, 50];
  public rowData!: any[];
  public themeClass: string =
    "ag-theme-quartz";
  public totalPages: number = 1;
  public currentPage: number = 1;

  constructor(private TransactionService: TransactionService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private toastrService: ToastService,
    private utilService: UtilService,
    private localStorageService: LocalStorageService,
  ) {
    const params = this.route.data.subscribe((data: Params) => {
      this.accessModule = data['module'];
      this.accessSubModule = data['subModule'];
      if (this.accessModule) {
        let access = this.localStorageService.getValue('user')?.permissions ? JSON.parse(this.localStorageService.getValue('user').permissions) : appConstants.permissionList;
        if (access && access.length) {
          let item = access.filter((a: any) => a.key === this.accessModule)[0];
          if (item && item.submodule && item.submodule.length) {
            this.access = item.submodule.filter((b: any) => b.key === this.accessSubModule)[0].access;
          } else {
            this.access = item.access;
          }
          this.access = this.access[this.currentUserRole];
          if (!(this.access && this.access.view)) {
            this.toastrService.showWarning('Warning!', "You donot have permission to view this page. Please contact to administrator!");
            this.utilService.goto('/dashboard');
          } else {
            this.columnDefs = [
              // this row just shows the row index, doesn't use any data from the row
              {
                headerName: "#",
                filter: false,
                sortable: false,
                valueFormatter: (params: ValueFormatterParams) => {
                  return `${params.node!.data.id}`;
                }, suppressMovable: true
              },
              { headerName: "Merchant Id", field: "merchant_id", suppressMovable: true },
              {
                field: 'createdAt',
                filter: 'agDateColumnFilter',
                valueFormatter: (params) => {
                  const date = new Date(params.value);
                  return format(date, 'yyyy-dd-MM HH:mm:ss');
                },
                filterParams: {
                  comparator: (filterLocalDateAtMidnight: any, cellValue: any) => {
                    if (!cellValue) return -1;

                    const cellDate = new Date(cellValue);

                    // Clear the time part for comparison
                    const cellDateWithoutTime = new Date(
                      cellDate.getFullYear(),
                      cellDate.getMonth(),
                      cellDate.getDate()
                    );

                    if (filterLocalDateAtMidnight.getTime() === cellDateWithoutTime.getTime()) {
                      return 0;
                    }
                    if (cellDateWithoutTime < filterLocalDateAtMidnight) {
                      return -1;
                    }
                    if (cellDateWithoutTime > filterLocalDateAtMidnight) {
                      return 1;
                    }

                    // Fallback return value
                    return 0;
                  }
                }
              }, { headerName: "Amount", field: "amount", suppressMovable: true },
              { headerName: "Status", field: "status", suppressMovable: true },
              { headerName: "Account Number", field: "accountNumber", suppressMovable: true },
              { headerName: "Account Name", field: "accountName", suppressMovable: true },
              {
                headerName: "Dynamic Fields",
                field: "dynamicFields",
                suppressMovable: true,
                // cellStyle: { 
                //   fontWeight: 'bold',
                //   textAlign: 'right'
                // },
                filter: false,
                sortable: false,
                cellRenderer: (params: any) => {
                  const dynamicFields = params.value;
                  if (!dynamicFields) {
                    return '';
                  }
                  const listItems = Object.entries(dynamicFields)
                    .map(([key, value]) => `<strong>${key}:</strong> ${value ?? 'none'}`)
                    .join(', ');

                  return `<p>${listItems}</p>`;
                }
              }
            ]
            if (this.access?.edit) {
              this.columnDefs.push({
                headerName: 'Action',
                filter: false,
                sortable: false,
                valueFormatter: (params: ValueFormatterParams) => {
                  return `${params.node!.data}`;
                },
                cellRenderer: ToggleDropdownComponent,
                cellRendererParams: {
                  specificId: 'toggleButton', // Custom parameter

                  onClick: this.onButtonClick.bind(this) // pass method to renderer
                }
              })
            }
            this.getAllDeposite();
          }
        }
      }
    })
    this.paramsubscriptions.push(params);
  }

  public status = [{ label: 'Done', value: 'done' },
  { label: 'Rejected', value: 'rejected' },

  ]
  ngOnInit(): void {
    this.buildForm();
  }
  handleRefreshEvent(): void {
    this.getAllDeposite();
  }
  onButtonClick(data: any, value: any) {
    this.handleToggleEvent(data, value)
  }
  ngOnDestroy(): void {
    try {
      if (this.paramsubscriptions) {
        for (let i = 0; i < this.paramsubscriptions.length; i++) {
          this.paramsubscriptions[i].unsubscribe()
        }
      }
    } catch (e) {
      console.error(e);
    }
    try {
      if (this.params) {
        this.params.unsubscribe();
      }
    } catch (e) {
      console.error(e);
    }
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
  onPaginationChanged = (event: any) => {
    console.log("onPaginationPageLoaded");
  }

  onGridReady = (params: GridReadyEvent<any>) => {
    this.gridApi = params.api;
    this.getAllDeposite();
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

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  public handlePagination = (pageNumber: number) => {
    this.currentPage = pageNumber;
    this.payoutsList = [];
    this.getAllDeposite();
  }

  public getAllDeposite = () => {
    const successCallback = (response: any) => {
      this.loaderService.hideLoader();
      if (response && response.success) {

        if (response.data && response.data.length) {
          this.rowData = response.data;
          this.payoutsList = response.data || [];
          this.currentPage = response.currentPage;
          this.totalPages = response.totalPages;
        }
      }
    }
    const errorCallback = (error: any) => {
      this.loaderService.hideLoader();
      this.payoutsList = [];
    }
    this.loaderService.showLoader();
    const criteria = {
      pageQuery: this.currentPage, pageSize: this.paginationPageSize,
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
