import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.authService.token
        }
      });
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('Interceptor Error: ', error);
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/account', 'login'], {
              queryParams: {
                authFailed: true
              }
            });
          }
          return throwError(error);
        })
      );
  }
}
