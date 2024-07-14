import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
    ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent,
    ColComponent, FormCheckComponent, FormControlDirective, FormDirective, FormSelectDirective, ModalBodyComponent,
    ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective,
    RowComponent, TableDirective, TextColorDirective, ThemeDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Subscription } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';
import { appConstants } from 'src/app/util/app.constant';
import { LoaderService } from 'src/app/util/loader.service';
import { LocalStorageService } from 'src/app/util/local-storage.service';
import { ToastService } from 'src/app/util/toastr.service';
import { UtilService } from 'src/app/util/util.service';
import { LoaderComponent } from 'src/app/views/loader/loader.component';
import { AuthService } from '../../pages/auth.service';
import { UserService } from '../../../services/user.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss'],
    standalone: true,
    imports: [CommonModule, FormSelectDirective, NgSelectModule, ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, IconDirective, LoaderComponent, TableDirective, TextColorDirective, FormCheckComponent, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, ReactiveFormsModule, FormsModule, FormDirective, RowComponent, FormControlDirective, NgStyle, ColComponent],
    providers: [RoleService, UserService]
})
export class UsersComponent implements OnInit {

    public userList: any = [];
    public userData: any;
    public editUserData: any;
    public deleteData: any;
    public deleteModalVisible: boolean = false;
    public displayName: any;
    public access: any = null;
    public accessModule: any = null;
    public accessSubModule: any = null;
    public currentUserRole: any = this.utilService.getCurrentUserRole();
    private paramsubscriptions: Subscription[] = [];
    public userForm: any;
    public userId: any = "";
    public roleList: any;
    public selectedRole: any;
    private params: Subscription | undefined

    constructor(
        private toastrService: ToastService,
        private userService: UserService,
        private router: Router,
        private roleService: RoleService,
        private loaderService: LoaderService,
        private utilService: UtilService,
        private route: ActivatedRoute,
        private localStorageService: LocalStorageService,
        private authService: AuthService
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
            this.getAllRoles();
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
        this.userForm = new FormGroup({
            firstname: new FormControl(data && data.firstname ? data.firstname : null, [Validators.required]),
            lastname: new FormControl(data && data.lastname ? data.lastname : null, [Validators.required]),
            email: new FormControl(data && data.email ? data.email : null, [Validators.email]),
            active: new FormControl(data && data.active ? data.active : false),
        });
    }

    private getAllRoles = () => {
        let success = (data: any) => {
            if (data && data.success) {
                if (data.data && data.data.length) {
                    this.roleList = data.data;
                }
            } else {
                this.toastrService.showError('Error!', data.message)
            }
            this.loaderService.hideLoader();
        }
        let failure = (error: any) => {
            this.loaderService.hideLoader();
            this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while fetching roles.')
        }
        this.loaderService.showLoader();
        this.roleService.getAll(success, failure)
    }

    private getAll = () => {
        let success = (data: any) => {
            if (data && data.success) {
                if (data.data && data.data.length) {
                    this.userList = data.data;
                } else {
                    this.userList = [];
                }
            } else {
                this.toastrService.showError('Error!', data.message)
            }
            this.loaderService.hideLoader();
        }
        let failure = (error: any) => {
            this.loaderService.hideLoader();
            this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while fetching users.')
        }
        this.loaderService.showLoader();
        this.userService.getAll({}, success, failure)
    }

    public cancel = () => {
        this.editUserData = null;
        this.deleteData = null;
        this.deleteModalVisible = false;
        this.buildForm();
    }

    public editUser = (data: any) => {
        this.editUserData = data;
        this.selectedRole = data.role;
        this.buildForm(data);
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

    public deleteRecord = () => {
        let success = (data: any) => {
            if (data && data.success) {
                this.toastrService.showSuccess('Success!', data.message)
                this.cancel()
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
        this.userService.deleteById({ userId: this.deleteData.userId }, success, failure)
    }

    public resetPassword = (email: any) => {
        let success = (data: any) => {
            this.loaderService.hideLoader();
            if (data.success) {
                this.toastrService.showSuccess('Success!', data.message);
                this.utilService.goto('/login');
            } else {
                this.toastrService.showError('Error!', data.message);
            }
        }
        let error = (error: any) => {
            this.loaderService.hideLoader();
            this.toastrService.showError('Error!', error.message);
        }
        this.loaderService.showLoader();
        this.authService.resetPassword({ email: email }, success, error);
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
            this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while add/update user..')
        }
        this.userForm.value['role'] = this.selectedRole;
        this.loaderService.showLoader();
        if (this.editUserData?.userId) {
            this.userForm.value['userId'] = this.editUserData?.userId;
            this.userService.update(this.userForm.value, success, failure)
        } else {
            this.userService.add(this.userForm.value, success, failure)
        }
    }
}