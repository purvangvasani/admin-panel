import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../util/http-error-handler.service';
import { environment } from '../../environments/environment';

import { DelegatorService } from '../util/delegator.service';

@Injectable({
  providedIn: 'root'
})
export class BankService {

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

  getAll(data: any, successCallback: any, errorCallback: any) {
    const url = this.apiUrl + '/banks/getAll';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  getById(data: any, successCallback: any, errorCallback: any) {
    const url = this.apiUrl + '/banks/getById';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  add(data: any, successCallback: any, errorCallback: any) {
    const url = this.apiUrl + '/banks/add';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }
  
  update(data: any, successCallback: any, errorCallback: any) {
    const url = this.apiUrl + '/banks/update';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  deleteById(data: any, successCallback: any, errorCallback: any) {
    const url = this.apiUrl + '/banks/delete';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback)
  }
  
}