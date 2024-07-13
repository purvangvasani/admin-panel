import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../../util/http-error-handler.service';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from 'src/app/util/local-storage.service';
// import * as jwt_decode from 'jwt-decode';
import { DelegatorService } from 'src/app/util/delegator.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}`;
  private handleError: HandleError;

  redirectUrl: string | undefined;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private delegatorService: DelegatorService,
    private httpErrorHandler: HttpErrorHandler,
    private localStorageService: LocalStorageService
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('AuthService')
  }

  register(data: any, successCallback: any, errorCallback: any) {
    const url = this.apiUrl + '/register';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  login(data: any, successCallback: Function, errorCallback: Function) {
    const url = this.apiUrl + '/login';
    return this.delegatorService.post(data, url, null, successCallback, errorCallback);
  }

  // register(data: User) {
  //   return this.http.post(`${this.apiUrl}/register`, data, this.httpOptions)
  //   .pipe(
  //     catchError(this.handleError('register', null))
  //   )
  // }

  // login(data: any): Observable<boolean> {
  //   return this.http.post(`${this.apiUrl}/login`, data, this.httpOptions)
  //   .pipe(
  //     tap(user => this.doLogin(user)),
  //     mapTo(true),
  //     catchError(this.handleError('login', false))
  //   )
  // }
  
  doLogin(user: any) {
    this.localStorageService.setValue('user', user);
    // localStorage.setItem('currentUser', JSON.stringify(user))
  }

  getCurrentUser() {
    return this.localStorageService.getValue('user');
  }

  getDecodeToken(token: string) {
    return jwtDecode(token);
  }

  isLoggedIn() {
    const data = this.getCurrentUser();
    if(data) {
      const token = this.getDecodeToken(this.localStorageService.getValue('accessToken'));
      const currentTime = Math.round((new Date()).getTime() / 1000);
      if (token.exp && (token.exp > currentTime)) {
        return true;
      } else {
        this.logout();
      }
    }
    return false;
  }

  logout() {
    this.localStorageService.clearAllLocalStorage();
    // localStorage.removeItem('userData');
    // localStorage.removeItem('user');
    // localStorage.removeItem('auth');
  }

}