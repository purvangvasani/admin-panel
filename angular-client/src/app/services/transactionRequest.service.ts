import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../util/http-error-handler.service';
import { environment } from '../../environments/environment';

import { DelegatorService } from '../util/delegator.service';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private apiUrl = `${environment.apiUrl}`;
    private handleError: HandleError;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private http: HttpClient,
        private delegatorService: DelegatorService,
        private httpErrorHandler: HttpErrorHandler
    ) {
        this.handleError = this.httpErrorHandler.createHandleError('AuthService')
    }

    getAll(data: any, successCallback: Function, errorCallback: Function) {
        const url = this.apiUrl + '/transactionRequest/getAll';
        return this.delegatorService.post(data, url, null, successCallback, errorCallback);
    }
    addTransaction(data: any, successCallback: any, errorCallback: any) {
        const url = this.apiUrl + '/transactionRequest/addTransaction';
        return this.delegatorService.post(data, url, null, successCallback, errorCallback);
    }
    updateTransaction(data: any, successCallback: any, errorCallback: any) {
        const url = this.apiUrl + '/transactionRequest/updateTransaction';
        return this.delegatorService.post(data, url, null, successCallback, errorCallback);
    }
}