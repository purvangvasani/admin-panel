import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../util/http-error-handler.service';
import { environment } from '../../environments/environment';

import { DelegatorService } from '../util/delegator.service';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  private apiUrl = `${environment.apiUrl}`;
  private handleError: HandleError;

  redirectUrl: string | undefined;

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
    this.handleError = this.httpErrorHandler.createHandleError('MerchantService')
  }

  getAll(data: any, successCallback: Function, errorCallback: Function) {
    const url = this.apiUrl + '/merchant/getAll';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  getById(data: any, successCallback: Function, errorCallback: Function) {
    const url = this.apiUrl + '/merchant/getById';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  add(data: any, successCallback: Function, errorCallback: Function) {
    const url = this.apiUrl + '/merchant/add';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }
  
  update(data: any, successCallback: Function, errorCallback: Function) {
    const url = this.apiUrl + '/merchant/update';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  deleteById(data: any, successCallback: Function, errorCallback: Function) {
    const url = this.apiUrl + '/merchant/deleteById';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback)
  }
  
}