import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, FormControlDirective, FormDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, PageItemDirective, PageLinkDirective, PaginationComponent, TableDirective, ThemeDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Subscription } from 'rxjs';
import { appConstants } from 'src/app/util/app.constant';
import { LoaderService } from 'src/app/util/loader.service';
import { ToastService } from 'src/app/util/toastr.service';
import { UtilService } from 'src/app/util/util.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-merchant',
    standalone: true,
    imports: [
        ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, ButtonCloseDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, PaginationComponent, PageItemDirective, TableDirective, RouterLink, PageLinkDirective, CommonModule, FormSelectDirective, ThemeDirective, IconDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, ReactiveFormsModule, FormsModule, FormDirective, FormControlDirective, NgStyle
    ],
    templateUrl: './merchant.component.html',
    styleUrl: './merchant.component.scss'
})
export class MerchantComponent implements OnInit, OnDestroy {

    public merchantForm: any;
    private paramsubscriptions: Subscription[] = [];
    public access: any = null;
    public accessModule: any = null;
    public currentUserRole: any = this.utilService.getCurrentUserRole();
    private params: Subscription | undefined
    public merchantList: any = [];
    public totalPages: number = 1;
    public currentPage: number = 1;
    private editMerchantData: any;
    public deleteData: any;
    public deleteModalVisible = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private utilService: UtilService,
        private toastrService: ToastService,
        private loaderService: LoaderService,
        private merchantService: MerchantService
    ) {
        const params = this.route.data.subscribe((data: Params) => {
            this.accessModule = data['module'];
            if (this.accessModule) {
                // let access = this.localStorageService.getValue('user')?.permissions ? JSON.parse(this.localStorageService.getValue('user').permissions) : appConstants.permissionList;
                let access = appConstants.permissionList;
                if (access && access.length) {
                    let item = access.filter((a: any) => a.key === this.accessModule)[0];
                    this.access = item.access;
                    this.access = this.access[this.currentUserRole];
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
        this.merchantForm = new FormGroup({
            merchantname: new FormControl(data && data.merchantname ? data.merchantname : null, [Validators.required]),
        });
    }

    toggleDeleteModal(data: any) {
        this.deleteData = data;
        this.deleteModalVisible = !this.deleteModalVisible;
    }

    handleDeleteToggleChange(event: boolean) {
        this.deleteModalVisible = event;
    }

    public cancel = () => {
        this.editMerchantData = null;
        this.deleteData = null;
        this.deleteModalVisible = false;
        this.buildForm();
    }

    public editMerchant = (data: any) => {
        this.editMerchantData = data;
        this.buildForm(data);
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
        this.merchantService.deleteById({ merchantId: this.deleteData.merchantId }, success, failure)
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
            this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while add/update merchant..')
        }
        this.loaderService.showLoader();
        if (this.editMerchantData?.userId) {
            this.merchantForm.value['merchantId'] = this.editMerchantData?.merchantId;
            this.merchantService.update(this.merchantForm.value, success, failure)
        } else {
            this.merchantService.add(this.merchantForm.value, success, failure)
        }
    }

    numSequence(n: number): Array<number> {
        return Array(n);
    }

    public handlePagination = (pageNumber: number) => {
        this.currentPage = pageNumber;
        this.merchantList = [];
        this.getAll();
    }

    private getAll = () => {
        let success = (data: any) => {
            if (data && data.success) {
                if (data.data && data.data.length) {
                    this.merchantList = data.data;
                    this.currentPage = data.currentPage;
                    this.totalPages = data.totalPages;
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
        this.merchantService.getAll({ pageQuery: this.currentPage }, success, failure)
    }

    public copyText = (text: any, type: any) => {
        var copyText = text;
        // Select the text field
        // copyText.select();
        // copyText.setSelectionRange(0, 99999); // For mobile devices
        // Copy the text inside the text field
        // this.router.navigate(['/deposit-add'], {queryParams:  { id: copyText.url }})
        if (type === 'withdrawal') {
            navigator.clipboard.writeText(environment.UIURL + "/withdrawal-add;id=" + btoa(copyText.merchantId));
        } else {
            navigator.clipboard.writeText(environment.UIURL + "/deposit-add;id=" + btoa(copyText.merchantId));
        }
    }
}
