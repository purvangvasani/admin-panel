import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, FormControlDirective, FormDirective, FormSelectDirective, InputGroupComponent, InputGroupTextDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, PageItemDirective, PageLinkDirective, PaginationComponent, RowComponent, TableDirective, ThemeDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../util/loader.service';
import { ToastService } from '../../../util/toastr.service';
import { UtilService } from '../../../util/util.service';
import { AccountDetailsService } from '../../../services/accountDetals.service';
import { LocalStorageService } from '../../../util/local-storage.service';
import { appConstants } from '../../../util/app.constant';
import { ColDef, GridApi, GridReadyEvent, ValueFormatterParams } from 'ag-grid-community';
import { ToggleDropdownComponent } from '../../toggle-dropdown/toggle-dropdown.component';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
    selector: 'app-account-Details',
    standalone: true,
    imports: [AgGridAngular,
        TableDirective, ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, PaginationComponent, PageItemDirective, PageLinkDirective, ButtonCloseDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, RouterLink, CommonModule, FormSelectDirective, ThemeDirective, IconDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, ReactiveFormsModule, FormsModule, FormDirective, FormControlDirective, NgStyle
        , RowComponent, ColComponent,
        InputGroupComponent, InputGroupTextDirective,
    ],
    templateUrl: './accountDetails.component.html',
    styleUrl: './accountDetails.component.scss'
})
export class AccountDetailsComponent implements OnInit, OnDestroy {

    public accountForm: any;
    private paramsubscriptions: Subscription[] = [];
    public access: any = null;
    public accessModule: any = null;
    public currentUserRole: any = this.utilService.getCurrentUserRole();
    private params: Subscription | undefined
    public accountList: any = [];
    public totalPages: number = 1;
    public currentPage: number = 1;
    public editAccountData: any;
    public deleteData: any;
    public deleteModalVisible = false;
    public accessSubModule: any = null;
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
    public url: any = null;
    public onSelectFile = (event: any): void => {

        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event) => {
                this.url = event?.target?.result;
            };
        }
    }
    constructor(
        private route: ActivatedRoute,
        private localStorageService: LocalStorageService,
        private utilService: UtilService,
        private toastrService: ToastService,
        private loaderService: LoaderService,
        private accountDetailsService: AccountDetailsService
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
                        this.toastrService.showWarning('Warning!', "You donot have permission to view this page. Please contact to administrator!")
                        this.utilService.goto('/dashboard');
                    } else {
                        this.columnDefs = [
                            // this row just shows the row index, doesn't use any data from the row
                            {
                                headerName: "#",
                                filter: false,
                                sortable: false,
                                valueFormatter: (params: ValueFormatterParams) => {
                                    return `${params.node!.data.accountId}`;
                                }, suppressMovable: true
                            },
                            {
                                headerName: "Mode", filter: false,
                                sortable: false, valueFormatter: (params: ValueFormatterParams) => {
                                    return `${params.node!.data.mode === 'upi' ? 'UPI ID' : 'IMPS'}`;
                                }, suppressMovable: true
                            },
                            { headerName: "UPI", field: "upiId", suppressMovable: true },
                            { headerName: "Account Name", field: "accountName", suppressMovable: true },
                            { headerName: "Account Number", field: "accountNumber", suppressMovable: true },

                        ];
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
                                    specificId: 'actionToggleButton', // Custom parameter 
                                    onClick: this.onButtonClick.bind(this) // pass method to renderer
                                }
                            });
                        }
                        this.getAll();
                    }
                }
            }
        })
        this.paramsubscriptions.push(params);
    }
    // onButtonClick(data: any, value: any) {
    //     this.handleToggleEvent(data, value)
    // }
    onButtonClick(data: any, value: any) {
        if (value === 'update') {
            this.editAccount(data)
        } else {
            this.toggleDeleteModal(data);
        }
    }
    ngOnInit(): void {
        if (!(this.access && this.access.view)) {
            this.toastrService.showWarning('Warning!', "You donot have permission to view this page. Please contact to administrator!")
            this.utilService.goto('/home');
        } else {
            this.getAll();
            this.buildForm();
        }
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

    private buildForm = (data?: any) => {
        this.accountForm = new FormGroup({
            mode: new FormControl(data && data.mode ? data.mode : 'upi'),
            upiId: new FormControl(data && data.upiId ? data.upiId : null),
            accountName: new FormControl(data && data.accountName ? data.accountName : null),
            accountNumber: new FormControl(data && data.accountNumber ? data.accountNumber : null),
            ifsc: new FormControl(data && data.ifsc ? data.ifsc : null),
            image: new FormControl(data?.image ?? null, Validators.required) // Use a separate control for validation

        });
    }
    // onFileSelected(event: any): void {
    //     const fileInput = event.target as HTMLInputElement;
    //     const file: File = fileInput.files![0];

    //     if (file) {
    //         const validExtensions = ['image/jpeg', 'image/png'];
    //         if (!validExtensions.includes(file.type)) {
    //             this.toastrService.showWarning('Warning!', 'Only JPG and PNG files are allowed!');
    //             this.selectedFile = null;
    //             this.fileName = '';
    //             fileInput.value = '';  // Clear the file input
    //             return;
    //         }

    //         this.fileName = file.name;
    //         this.selectedFile = file;
    //         // Create a FileReader to read the file and generate a preview
    //         const reader = new FileReader();
    //         reader.onload = (e: any) => {
    //             this.imageSrc = e.target.result;
    //         };
    //         reader.readAsDataURL(file);
    //         this.accountForm.patchValue({
    //             image: file.name // Update with file name for the form control
    //         });
    //         this.accountForm.get('image')?.updateValueAndValidity();
    //     }
    // }


    toggleDeleteModal(data: any) {
        this.deleteData = data;
        this.deleteModalVisible = !this.deleteModalVisible;
    }

    public editAccount = (data: any) => {
        this.editAccountData = data;
        this.url = data.qrcode;
        this.buildForm(data);
    }

    handleDeleteToggleChange(event: boolean) {
        this.deleteModalVisible = event;
    }


    public cancel = () => {
        this.editAccountData = null;
        this.deleteData = null;
        this.url = '';
        this.accountForm.reset();
        this.deleteModalVisible = false;
        this.buildForm();
    }

    public deleteRecord = () => {
        let success = (data: any) => {
            this.loaderService.hideLoader();
            if (data && data.success) {
                this.toastrService.showSuccess('Success!', data.message)
                this.cancel()
                this.getAll();
            } else {
                this.toastrService.showError('Error!', data.message)
            }
        }
        let failure = (error: any) => {
            this.loaderService.hideLoader();
            this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while deleting record.')
        }
        this.loaderService.showLoader();
        this.accountDetailsService.deleteById({ accountId: this.deleteData.accountId }, success, failure)
    }

    numSequence(n: number): Array<number> {
        return Array(n);
    }

    public handlePagination = (pageNumber: number) => {
        this.currentPage = pageNumber;
        this.accountList = [];
        this.getAll();
    }

    public submit = () => {
        let success = (data: any) => {
            if (data && data.success) {
                this.toastrService.showSuccess('Success!', data.message)
                this.loaderService.hideLoader();
                this.cancel();
                this.getAll();
            } else {
                this.loaderService.hideLoader();
                this.toastrService.showError('Error!', data.message || data.msg)
            }
        }
        let failure = (error: any) => {
            this.loaderService.hideLoader();
            this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while add/update account details..')
        }
        this.loaderService.showLoader();
        this.accountForm.value['qrcode'] = this.url;
        if (this.editAccountData?.accountId) {
            this.accountForm.value['accountId'] = this.editAccountData?.accountId;
            this.accountDetailsService.update(this.accountForm.value, success, failure)
        } else {
            this.accountDetailsService.add(this.accountForm.value, success, failure)
        }

        // Submit the form data
        // if (this.editAccountData?.accountId) {
        //     // Include accountId in FormData if editing an existing account
        //     formData.append('accountId', this.editAccountData.accountId);
        //     this.accountDetailsService.update(formData, success, failure);
        // } else {
        //     this.accountDetailsService.add(formData, success, failure);
        // }
    }

    private getAll = () => {
        let success = (data: any) => {
            if (data && data.success) {
                if (data.data && data.data.length) {
                    this.accountList = data.data || [];
                    this.rowData = data.data;
                    this.currentPage = data.currentPage;
                    this.totalPages = data.totalPages;
                } else {
                    this.accountList = [];
                }
            } else {
                this.toastrService.showError('Error!', data.message)
            }
            this.loaderService.hideLoader();
        }
        let failure = (error: any) => {
            this.loaderService.hideLoader();
            this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while fetching account details.')
        }
        this.loaderService.showLoader();
        this.accountDetailsService.getAll({ pageQuery: this.currentPage, pageSize: this.paginationPageSize }, success, failure)
    }
    onPaginationChanged = (event: any) => {
        console.log("onPaginationPageLoaded");
    }
    onGridReady = (params: GridReadyEvent<any>) => {
        this.gridApi = params.api;
        this.getAll();
    }
}
