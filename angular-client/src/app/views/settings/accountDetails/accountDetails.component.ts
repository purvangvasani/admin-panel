import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, FormControlDirective, FormDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, PageItemDirective, PageLinkDirective, PaginationComponent, TableDirective, ThemeDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../util/loader.service';
import { ToastService } from '../../../util/toastr.service';
import { UtilService } from '../../../util/util.service';
import { AccountDetailsService } from '../../../services/accountDetals.service';
import { LocalStorageService } from '../../../util/local-storage.service';
import { appConstants } from '../../../util/app.constant';

@Component({
    selector: 'app-account-Details',
    standalone: true,
    imports: [
        TableDirective, ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, PaginationComponent, PageItemDirective, PageLinkDirective, ButtonCloseDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, RouterLink, CommonModule, FormSelectDirective, ThemeDirective, IconDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, ReactiveFormsModule, FormsModule, FormDirective, FormControlDirective, NgStyle
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
    private editAccountData: any;
    public deleteData: any;
    public deleteModalVisible = false;
    public accessSubModule: any = null;

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
                        console.log(item.subModule)
                        this.access = item.submodule.filter((b: any) => b.key === this.accessSubModule)[0].access;
                    } else {
                        this.access = item.access;
                    }
                    console.log(this.access)
                    this.access = this.access[this.currentUserRole];
                    if (!(this.access && this.access.view)) {
                        this.toastrService.showWarning('Warning!', "You donot have permission to view this page. Please contact to administrator!")
                        this.utilService.goto('/dashboard');
                    } else {
                        this.getAll();
                    }
                }
            }
        })
        this.paramsubscriptions.push(params);
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
        });
    }

    toggleDeleteModal(data: any) {
        this.deleteData = data;
        this.deleteModalVisible = !this.deleteModalVisible;
    }

    public editAccount = (data: any) => {
        this.editAccountData = data;
        this.buildForm(data);
    }

    handleDeleteToggleChange(event: boolean) {
        this.deleteModalVisible = event;
    }


    public cancel = () => {
        this.editAccountData = null;
        this.deleteData = null;
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
        if (this.editAccountData?.accountId) {
            this.accountForm.value['accountId'] = this.editAccountData?.accountId;
            this.accountDetailsService.update(this.accountForm.value, success, failure)
        } else {
            this.accountDetailsService.add(this.accountForm.value, success, failure)
        }
    }

    private getAll = () => {
        let success = (data: any) => {
            if (data && data.success) {
                if (data.data && data.data.length) {
                    this.accountList = data.data;
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
        this.accountDetailsService.getAll({ pageQuery: this.currentPage }, success, failure)
    }
}
