import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../util/http-error-handler.service';
import { environment } from '../../environments/environment';

import { DelegatorService } from '../util/delegator.service';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {

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
    const url = this.apiUrl + '/account/getAll';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  getAccount(data: any, successCallback: any, errorCallback: any) {
    const url = this.apiUrl + '/account/getAccountDetails';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  // add(data: any, successCallback: any, errorCallback: any) {
  //   const url = this.apiUrl + '/account/add';
  //   return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  // }
  add(formData: FormData, successCallback: any, errorCallback: any) {
    const url = `${this.apiUrl}/account/update`;
    return this.delegatorService.post(formData, url, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }, successCallback, errorCallback);
  }

  // update(data: any, successCallback: any, errorCallback: any) {
  //   const url = this.apiUrl + '/account/update';
  //   return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  // }
  update(formData: FormData, successCallback: any, errorCallback: any) {
    const url = `${this.apiUrl}/account/update`;
    return this.delegatorService.post(formData, url, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }, successCallback, errorCallback);
  }


  deleteById(data: any, successCallback: any, errorCallback: any) {
    const url = this.apiUrl + '/account/delete';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback)
  }

}