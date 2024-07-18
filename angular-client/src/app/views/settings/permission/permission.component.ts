import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/util/loader.service';
import { ToastService } from 'src/app/util/toastr.service';
import { appConstants } from 'src/app/util/app.constant';
import { UtilService } from 'src/app/util/util.service';
import { AuthService } from '../../pages/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FormSelectDirective } from '@coreui/angular';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
    templateUrl: 'permission.component.html',
    styleUrls: ['permission.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, FormSelectDirective, NgSelectModule],
    providers: [ProfileService, RoleService]
})
export class PermissionComponent implements OnInit {

    public roleList: any = [];
    public selectedRole: any;
    public permissions: any = appConstants.permissionList;
    public currentUserRole: any = this.utilService.getCurrentUserRole();
    public isSuperorAdmin: boolean = false;

    constructor(
        private toastrService: ToastService,
        private utilService: UtilService,
        private loaderService: LoaderService,
        private roleService: RoleService,
        private profileService: ProfileService,
        private authService: AuthService,
    ) {
        this.isSuperorAdmin = this.currentUserRole === 'super' || this.currentUserRole === 'admin' ? false : true;
    }

    ngOnInit(): void {
        this.getAll();
        this.permissionsGetby();
    }

    private getAll = () => {
        let success = (data: any) => {
            this.loaderService.hideLoader();
            if (data && data.success) {
                if (data.data && data.data.length) {
                    let datalist = data.data.find((x: any) => x.roleName === this.currentUserRole);
                    if (datalist && datalist.roleName) {
                        this.roleList = data.data.filter((x: any) => {
                            if (x.roleLevel >= datalist.roleLevel) {
                                return x
                            }
                        })
                    } else {
                        this.roleList = data.data;
                    }
                    this.selectedRole = this.roleList && this.roleList.length ? this.roleList[0].roleName : null;
                } else {
                    this.roleList = [];
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
        this.roleService.getAll({}, success, failure)
    }

    public changePermission = (module: any, access: any, key: any) => {
        for (let i = 0; i < this.permissions.length; i++) {
            if (module === this.permissions[i].key) {
                if (!access[this.selectedRole].view && key === 'view') {
                    if (this.permissions[i] && this.permissions[i].submodule && this.permissions[i].submodule.length) {
                        for (let j = 0; j < this.permissions[i].submodule.length; j++) {
                            this.permissions[i].submodule[j].access[this.selectedRole].view = access[this.selectedRole].view;
                            this.permissions[i].submodule[j].access[this.selectedRole].add = access[this.selectedRole].view;
                            this.permissions[i].submodule[j].access[this.selectedRole].edit = access[this.selectedRole].view;
                            this.permissions[i].submodule[j].access[this.selectedRole].delete = access[this.selectedRole].view;
                        }
                    }
                    this.permissions[i].access[this.selectedRole].view = access[this.selectedRole].view;
                    this.permissions[i].access[this.selectedRole].add = access[this.selectedRole].view;
                    this.permissions[i].access[this.selectedRole].edit = access[this.selectedRole].view;
                    this.permissions[i].access[this.selectedRole].delete = access[this.selectedRole].view;
                } else if (!access[this.selectedRole].add && key === 'add') {
                    this.permissions[i].access[this.selectedRole].add = access[this.selectedRole].add;
                    this.permissions[i].access[this.selectedRole].edit = access[this.selectedRole].add;
                    this.permissions[i].access[this.selectedRole].delete = access[this.selectedRole].add;
                } else if (!access[this.selectedRole].edit && key === 'edit') {
                    this.permissions[i].access[this.selectedRole].edit = access[this.selectedRole].edit;
                    this.permissions[i].access[this.selectedRole].delete = access[this.selectedRole].edit;
                } else if (access[this.selectedRole].delete && key === 'delete') {
                    this.permissions[i].access[this.selectedRole].view = access[this.selectedRole].delete;
                    this.permissions[i].access[this.selectedRole].add = access[this.selectedRole].delete;
                    this.permissions[i].access[this.selectedRole].edit = access[this.selectedRole].delete;
                    this.permissions[i].access[this.selectedRole].delete = access[this.selectedRole].delete;
                } else if (access[this.selectedRole].edit && key === 'edit') {
                    this.permissions[i].access[this.selectedRole].view = access[this.selectedRole].edit;
                    this.permissions[i].access[this.selectedRole].add = access[this.selectedRole].edit;
                    this.permissions[i].access[this.selectedRole].edit = access[this.selectedRole].edit;
                } else if (access[this.selectedRole].add && key === 'add') {
                    this.permissions[i].access[this.selectedRole].view = access[this.selectedRole].add;
                    this.permissions[i].access[this.selectedRole].add = access[this.selectedRole].add;
                } else if (access[this.selectedRole].view && key === 'view') {
                    if (this.permissions[i] && this.permissions[i].submodule && this.permissions[i].submodule.length) {
                        for (let j = 0; j < this.permissions[i].submodule.length; j++) {
                            this.permissions[i].submodule[j].access[this.selectedRole].view = access[this.selectedRole].view;
                        }
                    }
                }
            } else {
                if (this.permissions[i] && this.permissions[i].submodule && this.permissions[i].submodule.length) {
                    for (let j = 0; j < this.permissions[i].submodule.length; j++) {
                        if (module === this.permissions[i].submodule[j].key) {
                            if (!access[this.selectedRole].view && key === 'view') {
                                this.permissions[i].submodule[j].access[this.selectedRole].view = access[this.selectedRole].view;
                                this.permissions[i].submodule[j].access[this.selectedRole].add = access[this.selectedRole].view;
                                this.permissions[i].submodule[j].access[this.selectedRole].edit = access[this.selectedRole].view;
                                this.permissions[i].submodule[j].access[this.selectedRole].delete = access[this.selectedRole].view;
                            } else if (!access[this.selectedRole].add && key === 'add') {
                                this.permissions[i].submodule[j].access[this.selectedRole].add = access[this.selectedRole].add;
                                this.permissions[i].submodule[j].access[this.selectedRole].edit = access[this.selectedRole].add;
                                this.permissions[i].submodule[j].access[this.selectedRole].delete = access[this.selectedRole].add;
                            } else if (!access[this.selectedRole].edit && key === 'edit') {
                                this.permissions[i].submodule[j].access[this.selectedRole].edit = access[this.selectedRole].edit;
                                this.permissions[i].submodule[j].access[this.selectedRole].delete = access[this.selectedRole].edit;
                            } else if (access[this.selectedRole].delete && key === 'delete') {
                                this.permissions[i].submodule[j].access[this.selectedRole].view = access[this.selectedRole].delete;
                                this.permissions[i].submodule[j].access[this.selectedRole].add = access[this.selectedRole].delete;
                                this.permissions[i].submodule[j].access[this.selectedRole].edit = access[this.selectedRole].delete;
                                this.permissions[i].submodule[j].access[this.selectedRole].delete = access[this.selectedRole].delete;
                            } else if (access[this.selectedRole].edit && key === 'edit') {
                                this.permissions[i].submodule[j].access[this.selectedRole].view = access[this.selectedRole].edit;
                                this.permissions[i].submodule[j].access[this.selectedRole].add = access[this.selectedRole].edit;
                                this.permissions[i].submodule[j].access[this.selectedRole].edit = access[this.selectedRole].edit;
                            } else if (access[this.selectedRole].add && key === 'add') {
                                this.permissions[i].submodule[j].access[this.selectedRole].view = access[this.selectedRole].add;
                                this.permissions[i].submodule[j].access[this.selectedRole].add = access[this.selectedRole].add;
                            }
                        }
                    }
                }
            }
        }
    }

    private permissionsGetby = () => {
        let success = (data: any) => {
            this.loaderService.hideLoader();
            // if (data && data.success && data.data && data.data._id) {
            //     this.permissions = data.data.permissionAccess;
            // } else {
            //     this.permissions = appConstants.permissionList;
            // }
            this.permissions = appConstants.permissionList;
        }
        let failure = (error: any) => {
            this.loaderService.hideLoader();
            this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while fetching permissions.')
        }
        this.loaderService.showLoader();
        this.profileService.permissionGetBy({}, success, failure)
    }

    public submit = () => {
        let success = (data: any) => {
            this.loaderService.hideLoader();
            if (data && data.success) {
                this.toastrService.showSuccess('Success!', 'Permissions updated successfully.')
                this.permissionsGetby();
            } else {
                this.toastrService.showError('Error!', data.message)
            }
        }
        let failure = (error: any) => {
            this.loaderService.hideLoader();
            this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while updating permissions.')
        }
        this.loaderService.showLoader();
        this.profileService.permissionUpdate(this.permissions, success, failure)
    }

    public confirmLogout = () => {
        this.authService.logout();
        this.utilService.goto('/login');
    }
}