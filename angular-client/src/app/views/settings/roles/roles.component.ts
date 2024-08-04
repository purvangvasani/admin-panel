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
import { ColDef, ColGroupDef, GridApi, GridReadyEvent, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';
import { appConstants } from 'src/app/util/app.constant';
import { LoaderService } from 'src/app/util/loader.service';
import { LocalStorageService } from 'src/app/util/local-storage.service';
import { ToastService } from 'src/app/util/toastr.service';
import { UtilService } from 'src/app/util/util.service';
import { LoaderComponent } from 'src/app/views/loader/loader.component';
import { ToggleDropdownComponent } from '../../toggle-dropdown/toggle-dropdown.component';

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
                debugger
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
                                    return `${params.node!.data.rolesId}`;
                                }, suppressMovable: true
                            },
                            { headerName: "Role Name", field: "displayName", suppressMovable: true },
                            { headerName: "Role Level", field: "roleLevel", suppressMovable: true },
                            {
                                headerName: "Is Active?",
                                filter: false,
                                sortable: false,
                                valueFormatter: (params: ValueFormatterParams) => {
                                    return `${params.node!.data.isActive ? 'Yes' : 'No'}`;
                                }, suppressMovable: true
                            },
                            {
                                headerName: "Is Deletable?",
                                filter: false,
                                sortable: false,
                                valueFormatter: (params: ValueFormatterParams) => {
                                    return `${params.node!.data.isDeletable ? 'Yes' : 'No'}`;
                                }, suppressMovable: true
                            }
                        ];
                        if (this.access.edit) {
                            this.columnDefs.push({
                                headerName: 'Action',
                                filter: false,
                                sortable: false,
                                valueFormatter: (params: ValueFormatterParams) => {
                                    return `${params.node!.data}`;
                                },
                                cellRenderer: ToggleDropdownComponent,
                                cellRendererParams: {
                                    specificId: 'roleButtons', // Custom parameter
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


    ngOnInit(): void {
        this.buildForm();
    }
    onButtonClick(data: any, value: any) {
        if (value === 'update') {
            this.editRole(data)
        } else {
            this.toggleDeleteModal(data);
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

    onPaginationChanged = (event: any) => {
        console.log("onPaginationPageLoaded");
    }

    onGridReady = (params: GridReadyEvent<any>) => {
        this.gridApi = params.api;
        this.getAll();
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
                    this.rowData = data.data;
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
        this.roleService.getAll({ pageQuery: this.currentPage, pageSize: this.paginationPageSize, roleType: 'general' }, success, failure)
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