import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, InputGroupTextDirective, InputGroupComponent, ColDirective, ButtonDirective, FormCheckLabelDirective, FormCheckInputDirective, FormCheckComponent, FormSelectDirective, FormLabelDirective, FormDirective, FormControlDirective, ContainerComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, DropdownComponent, PaginationComponent, PageItemDirective, PageLinkDirective, ModalTitleDirective, ModalHeaderComponent, ModalToggleDirective, ModalComponent, ModalFooterComponent, ModalBodyComponent, ButtonCloseDirective, ThemeDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { LoaderService } from 'src/app/util/loader.service';
import { ToastService } from 'src/app/util/toastr.service';
import { BankService } from 'src/app/services/bank.service';
import { UtilService } from 'src/app/util/util.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/util/local-storage.service';
import { appConstants } from 'src/app/util/app.constant';
@Component({
  selector: 'app-banks',
  standalone: true,
  imports: [CommonModule, ContainerComponent, PageItemDirective, IconDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, NgStyle, ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent,
    FormsModule, PaginationComponent, RouterLink, PageLinkDirective, ReactiveFormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective, AlignDirective],
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.scss'
})
export class BanksComponent implements OnInit, OnDestroy {

  public deleteModalVisible = false;
  public deleteData: any;
  public bankList: any = [];
  public bankData: any;
  public totalPages: number = 1;
  public currentPage: number = 1;
  public access: any = null;
  public accessModule: any = null;
  public accessSubModule: any = null;
  public currentUserRole: any = this.utilService.getCurrentUserRole();
  private paramsubscriptions: Subscription[] = [];
  public editBankData: any;
  private params: Subscription | undefined
  public paginationPageSize = 10;

  constructor(
    private toastrService: ToastService,
    private bankService: BankService,
    private utilService: UtilService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private loaderService: LoaderService,
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
            this.getAll();
          }
        }
      }
    })
    this.paramsubscriptions.push(params);
  }

  ngOnInit(): void {
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

  public getAll = () => {
    let success = (data: any) => {
      this.loaderService.hideLoader();
      if (data && data.success) {
        if (data.data && data.data.length) {
          this.bankList = data.data;
          this.currentPage = data.currentPage;
          this.totalPages = data.totalPages;
        } else {
          this.bankList = [];
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
    this.bankService.getAll({ pageQuery: this.currentPage, pageSize: this.paginationPageSize }, success, failure)
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  public handlePagination = (pageNumber: number) => {
    this.currentPage = pageNumber;
    this.bankList = [];
    this.getAll();
  }

  toggleDeleteModal(data: any) {
    this.deleteData = data;
    this.deleteModalVisible = !this.deleteModalVisible;
  }

  handleDeleteToggleChange(event: boolean) {
    this.deleteModalVisible = event;
  }

  public closeDeleteModal = () => {
    this.deleteData = null;
    this.deleteModalVisible = !this.deleteModalVisible;
  }

  public deleteRecord = () => {
    let success = (data: any) => {
      this.loaderService.hideLoader();
      if (data && data.success) {
        this.toastrService.showSuccess('Success!', data.message)
        this.closeDeleteModal()
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
    this.bankService.deleteById({ bankId: this.deleteData.bankId }, success, failure)
  }

  public editBank = (data: any) => {
    this.utilService.goto('/banks/edit', { bankId: data.bankId, ref: data.ref });
  }

  handleCreateEvent() {
    this.utilService.goto('/banks/add');
  }
}
