import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {
    ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent,
    ColComponent, FormCheckComponent, FormControlDirective, FormDirective, ModalBodyComponent,
    ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective,
    PageItemDirective,
    PageLinkDirective,
    PaginationComponent,
    RowComponent, TableDirective, TextColorDirective, ThemeDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AgGridAngular, } from 'ag-grid-angular';
import { ColDef, ColGroupDef, GridApi, ICellRendererParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';
import { appConstants } from 'src/app/util/app.constant';
import { LoaderService } from 'src/app/util/loader.service';
import { LocalStorageService } from 'src/app/util/local-storage.service';
import { ToastService } from 'src/app/util/toastr.service';
import { UtilService } from 'src/app/util/util.service';
import { LoaderComponent } from 'src/app/views/loader/loader.component';
import { IServerSideDatasource, GridOptions, IServerSideGetRowsParams, IServerSideGetRowsRequest } from 'ag-grid-community';

@Component({
    templateUrl: 'roles.component.html',
    styleUrls: ['roles.component.scss'],
    standalone: true,
    providers: [RoleService],
    imports: [PaginationComponent, AgGridAngular,
        PageItemDirective,
        PageLinkDirective,
        RouterLink, NgTemplateOutlet, ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, IconDirective, LoaderComponent, TableDirective, TextColorDirective, FormCheckComponent, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, ReactiveFormsModule, FormDirective, RowComponent, FormControlDirective, NgStyle, ColComponent, CommonModule]
})
export class RolesComponent implements OnInit, OnDestroy {

    @ViewChild('loader') loaderComponent!: LoaderComponent;
    private gridApi!: GridApi;
    public deleteModalVisible = false;
    public deleteData: any;
    public roleList: any = [];
    public roleData: any;
    public totalPages: number = 1;
    public currentPage: number = 1;
    public access: any = null;
    public accessModule: any = null;
    public accessSubModule: any = null;
    public currentUserRole: any = this.utilService.getCurrentUserRole();
    private paramsubscriptions: Subscription[] = [];
    public editRoleData: any;
    private params: Subscription | undefined

    public datatableState: {
        clientSide: {
            id?: string,
            gridOptions: GridOptions,
            columnDefs: (ColDef | ColGroupDef)[]
        },
    } = {
            clientSide: {
                columnDefs: [],
                gridOptions: {}
            }
        };
    // gridOptions: GridOptions = {
    //     columnDefs: [
    //         { headerName: 'roleId', field: 'roleId', filter: 'agTextColumnFilter' },
    //         { headerName: 'roleName', field: 'roleName', filter: 'agTextColumnFilter' },
    //         { headerName: 'roleLevel', field: 'roleLevel', filter: 'agNumberColumnFilter' },
    //         { headerName: 'isActive', field: 'isActive', filter: 'agNumberColumnFilter' }

    //     ],
    //     defaultColDef: {
    //         sortable: true,
    //         filter: true,
    //         flex: 1,
    //     },
    //     pagination: true,
    //     paginationPageSize: 10,
    //     animateRows: true,
    //     onGridReady: this.onGridReady.bind(this),
    // };

    // rowData = [
    //     { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    //     { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    //     { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    //     { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    //     { make: 'Fiat', model: '500', price: 15774, electric: false },
    //     { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    //     { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    //     { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    //     { make: 'Fiat', model: '500', price: 15774, electric: false },
    //     { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    //     { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    //     { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    //     { make: 'Fiat', model: '500', price: 15774, electric: false },
    //     { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    // ];
    themeClass = "ag-theme-quartz";
    // defaultColDef: ColDef = {
    //     flex: 1,
    // };
    // colDef = [{ field: 'roleId', lockVisible: true, filter: true, floatingFilter: true },
    // { field: 'roleName', lockVisible: true, filter: true, floatingFilter: true },
    // { field: 'roleLevel', lockVisible: true },
    // { field: 'isActive', lockVisible: true },
    // { field: 'isActive', lockVisible: true }

    // ];
    // pagination = true;
    // paginationPageSize = 5;
    // paginationPageSizeSelector = [5, 10, 20];
    // serverSideDatasource!: IServerSideDatasource;


    constructor(
        private toastrService: ToastService,
        private roleService: RoleService,
        private loaderService: LoaderService,
        private utilService: UtilService,
        private route: ActivatedRoute,
        private localStorageService: LocalStorageService
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
        this.buildForm();
        this.setDatatableClientSideMode();
        // this.serverSideDatasource = this.createServerSideDatasource();
    }
    onGridReady(params: any) {
        this.gridApi = params.api;
        params.setDatasource(this.roleList);
    }
    createServerSideDatasource(): IServerSideDatasource {
        // return {
        //     getRows: (params: IServerSideGetRowsParams) => {
        //         const request: IServerSideGetRowsRequest = params.request;

        //         const criteria = {
        //             pageQuery: (request.startRow / (request.endRow - request.startRow)) + 1,
        //             pageSize: request.endRow - request.startRow,
        //             sort: request.sortModel.length > 0 ? { [request.sortModel[0].colId]: request.sortModel[0].sort === 'asc' ? 1 : -1 } : {},
        //             filterModel: request.filterModel
        //         };

        //         this.roleService.getAll(criteria).subscribe(response => {
        //             params.successCallback(response.data, response.totalCount);
        //         }, error => {
        //             params.failCallback();
        //         });
        //     }
        // };
        return {
            getRows: (params: IServerSideGetRowsParams) => {
                const promiseFunction = (resolve: Function, reject: Function) => {
                    debugger
                    const records: {
                        data: Array<any>,
                        recordsFiltered: number,
                        recordsTotal: number
                    } = {
                        data: [],
                        recordsFiltered: 0,
                        recordsTotal: 0
                    };
                    const successCallback = (response: any) => {
                        if (response?.success) {
                            records.data = response.data ? response.data : [];
                            records.recordsFiltered = response.recordsFiltered || records.data.length;
                            records.recordsTotal = response.recordsTotal || records.data.length;
                        }
                        resolve({ data: response.data, recordsFiltered: response.recordsFiltered || 0, recordsTotal: response.recordsTotal || 0 });
                    }
                    const errorCallback = (error: any) => {
                        resolve({ data: [], recordsFiltered: 0, recordsTotal: 0 });
                    }
                    const criteria = {
                        dataTablesParameters: params,
                    };
                    this.roleService.getAll(criteria, successCallback, errorCallback);
                };
                return new Promise(promiseFunction);
            }
        }
    }
    public setDatatableClientSideMode = () => {
        const columnDefs: (ColDef | ColGroupDef)[] = [];
        columnDefs.push(
            { headerName: '#', field: 'rolesId', filter: 'agTextColumnFilter' },
            { headerName: 'Role Name', field: 'roleName', filter: 'agTextColumnFilter' },
            { headerName: 'Role Level', field: 'roleLevel', filter: 'agNumberColumnFilter' },
            { headerName: 'isActive?', field: 'isActive', filter: 'agSetColumnFilter' },
            {
                headerName: 'isDeletable?',
                field: 'isDeletable',
                filter: 'agSetColumnFilter',
            }
        );
        this.datatableState.clientSide.gridOptions = {
            pagination: true,
            paginationPageSize: 5,
            paginationPageSizeSelector: [1, 10, 20],
            columnDefs: columnDefs,
            rowData: this.roleList,
            onPaginationChanged: this.onPaginationChanged.bind(this), // Bind the event handler          

        };
    }
    onPaginationChanged(event: any) {
        const api = event.api;

        // Get the current page and total pages from the API
        const currentPage = api.paginationGetCurrentPage();
        const totalPages = api.paginationGetTotalPages();

        // Calculate previous and next page values
        const prevPage = currentPage > 0 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages - 1 ? currentPage + 1 : null;

        // Log or use these values as needed
        console.log('Current Page:', currentPage);
        console.log('Total Pages:', totalPages);
        console.log('Previous Page:', prevPage);
        console.log('Next Page:', nextPage);
    }
    onPagePrevious() {
        const currentPage = this.gridApi.paginationGetCurrentPage();
        if (currentPage > 0) {
            this.gridApi.paginationGoToPage(currentPage - 1);
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

    toggleDeleteModal(data: any) {
        this.deleteData = data;
        this.deleteModalVisible = !this.deleteModalVisible;
    }

    public closeDeleteModal = () => {
        this.deleteData = null;
        this.deleteModalVisible = !this.deleteModalVisible;
    }

    handleDeleteToggleChange(event: boolean) {
        this.deleteModalVisible = event;
    }

    private buildForm = (data?: any) => {
        this.roleData = new FormGroup({
            displayName: new FormControl(data && data.displayName ? data.displayName : null, [Validators.required]),
            roleName: new FormControl(data && data.roleName ? data.roleName : null, [Validators.required]),
            roleLevel: new FormControl(data && data.roleLevel ? data.roleLevel : 0),
            isActive: new FormControl(data && data.isActive ? data.isActive : false),
            isDeletable: new FormControl(data && data.isDeletable ? data.isDeletable : false),
        });
    }

    public editRole = (data: any) => {
        this.editRoleData = data;
        this.buildForm(data);
    }

    numSequence(n: number): Array<number> {
        return Array(n);
    }

    public handlePagination = (pageNumber: number) => {
        console.log(pageNumber)
        this.currentPage = pageNumber;
        this.roleList = [];
        this.getAll();
    }

    public getAll = () => {
        let success = (data: any) => {
            if (data && data.success) {
                this.loaderService.hideLoader();
                if (data.data && data.data.length) {
                    this.roleList = data.data;
                    this.currentPage = data.currentPage;
                    this.totalPages = data.totalPages;
                } else {
                    this.roleList = [];
                }
            } else {
                this.loaderService.hideLoader();
                this.toastrService.showError('Error!', data.message)
            }
        }
        let failure = (error: any) => {
            this.loaderService.hideLoader();
            this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while validating credentials.')
        }
        this.loaderService.showLoader();
        this.roleService.getAll({ pageQuery: this.currentPage }, success, failure)
    }

    public openModal = (data: any) => {
        if (data.isActive) {
            this.toastrService.showError('Error!', "The Role is marked as active and cannot be deleted!")
        }
        else {
            this.roleData = data;
        }
    }

    public cancel = () => {
        this.editRoleData = null;
        this.roleData = null;
        this.buildForm();
    }

    public deleteRecord = () => {
        let success = (data: any) => {
            if (data && data.success) {
                this.toastrService.showSuccess('Success!', data.message)
                this.closeDeleteModal()
                this.getAll();
            } else {
                this.toastrService.showError('Error!', data.message)
            }
            this.loaderService.hideLoader();
        }
        let failure = (error: any) => {
            this.loaderService.hideLoader();
            this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while deleting record.')
        }
        this.loaderService.showLoader();
        this.roleService.deleteById({ rolesId: this.deleteData.rolesId }, success, failure)
    }

    public submit = () => {
        let success = (data: any) => {
            if (data && data.success) {
                this.toastrService.showSuccess("Success!", data.message);
                this.loaderService.hideLoader();
                this.cancel();
                this.getAll();
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
        if (this.editRoleData?.rolesId) {
            this.roleData.value['rolesId'] = this.editRoleData.rolesId;
            this.roleService.update(this.roleData.value, success, failure)
        } else {
            this.roleService.add(this.roleData.value, success, failure)
        }
    }

    public liveDemoVisible = false;

    toggleLiveDemo() {
        this.liveDemoVisible = !this.liveDemoVisible;
    }

    handleLiveDemoChange(event: boolean) {
        this.liveDemoVisible = event;
    }
}