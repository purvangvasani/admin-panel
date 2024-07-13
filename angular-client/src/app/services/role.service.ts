import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../util/http-error-handler.service';
import { environment } from '../../environments/environment';

import { DelegatorService } from '../util/delegator.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = `${environment.apiUrl}`;
  private handleError: HandleError;

  redirectUrl: string;

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
    const url = this.apiUrl + '/role/getAll';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  getByRoleId(data: any, successCallback: Function, errorCallback: Function) {
    const url = this.apiUrl + '/role/getByRoleId';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  add(data, successCallback, errorCallback) {
    const url = this.apiUrl + '/role/add';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }
  
  update(data, successCallback, errorCallback) {
    const url = this.apiUrl + '/role/update';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  deleteById(data, successCallback, errorCallback) {
    const url = this.apiUrl + '/role/deleteById';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback)
  }
  
}