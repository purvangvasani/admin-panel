import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private toastr: ToastrService) { }

    public options: any = {
        timeOut: 3000,
        closeButton: true,
    };

    public showSuccess(title: any, message: any) {
        this.toastr.success(message, title, this.options);
    }

    public showError(title: any, message: any) {
        this.toastr.error(message, title, this.options);
    }

    public showInfo(title: any, message: any) {
        this.toastr.info(message, title, this.options);
    }

    public showWarning(title: any, message: any) {
        this.toastr.warning(message, title, this.options);
    }

    public show(title: any, message: any) {
        this.toastr.show(message, title, this.options);
    }
}