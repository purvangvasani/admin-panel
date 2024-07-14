import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class UtilService {

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    public goto = (route: any, data?: any) => {
        if (data) {
            this.router.navigate([route, data]);
        } else {
            this.router.navigateByUrl(route);
        }
    }

    public getCurrentUserRole = () => {
        let role = this.localStorageService.getValue('user').roleName;
        return role;
    }
}