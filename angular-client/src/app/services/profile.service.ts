import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../util/http-error-handler.service';
import { environment } from '../../environments/environment';

import { DelegatorService } from '../util/delegator.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

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

  update(data?: any, successCallback?: any, errorCallback?: any) {
    const url = this.apiUrl + '/profile/update';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  getByUserId(data?: any, successCallback?: any, errorCallback?: any) {
    const url = this.apiUrl + '/profile/getByUserId';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  permissionUpdate(data?: any, successCallback?: any, errorCallback?: any) {
    const url = this.apiUrl + '/permission/update';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  permissionGetBy(data?: any, successCallback?: any, errorCallback?: any) {
    const url = this.apiUrl + '/permission/getBy';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }
}