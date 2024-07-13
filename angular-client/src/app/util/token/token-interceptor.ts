import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../views/pages/auth.service';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
        const accessToken = this.localStorageService.getValue('accessToken');
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${accessToken}` }
        });
    }
    return next.handle(request);
  }

}