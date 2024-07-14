import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../util/http-error-handler.service';
import { environment } from '../../environments/environment';

import { DelegatorService } from '../util/delegator.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
    this.handleError = this.httpErrorHandler.createHandleError('AuthService')
  }

  getAll(data: any, successCallback: Function, errorCallback: Function) {
    const url = this.apiUrl + '/user/getAll';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  getByUserId(data: any, successCallback: Function, errorCallback: Function) {
    const url = this.apiUrl + '/user/getByUserId';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  add(data: any, successCallback: Function, errorCallback: Function) {
    const url = this.apiUrl + '/user/add';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }
  
  update(data: any, successCallback: Function, errorCallback: Function) {
    const url = this.apiUrl + '/user/update';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  deleteById(data: any, successCallback: Function, errorCallback: Function) {
    const url = this.apiUrl + '/user/deleteById';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback)
  }
  
}