import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserInterface } from '@core/interfaces/user.interface';
import { FirebaseAuthInterface } from '@core/interfaces/firebase-auth.interface';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  public errorMessage$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string {
    const authExpires = localStorage.getItem('firebase-auth-expires');
    const dateNow = new Date();
    let authExpiresDate = new Date();
    if (authExpires) {
      authExpiresDate = new Date(authExpires);
    }
    if (dateNow > authExpiresDate) { // auth token expired
      this.logout();
      return null;
    }
    return localStorage.getItem('firebase-auth-token');
  }

  login(user: UserInterface): Observable<any> {
    return this.http.post(`${this.url}${environment.firebaseConfig.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  handleError(errorResponse: HttpErrorResponse): any {
    const errorMessage = errorResponse.error.error.message;
    console.log('errorMessage = ', errorMessage, errorResponse);

    switch (errorMessage) {
      case 'INVALID_EMAIL':
        this.errorMessage$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.errorMessage$.next('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.errorMessage$.next('Email not found');
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        this.errorMessage$.next('Access to this account has been temporarily disabled due to many failed login attempts. \
            You can immediately restore it by resetting your password or you can try again later.');
        break;
    }

    return throwError(errorResponse);
  }

  setToken(response: FirebaseAuthInterface): void {
    console.log('setToken response = ', response);
    const msSinceEpochUTC = new Date().getTime();
    const expirySeconds = parseInt(response.expiresIn, 10);
    const expiryDate = new Date(msSinceEpochUTC + expirySeconds * 1000);
    localStorage.setItem('firebase-auth-token', response.idToken);
    localStorage.setItem('firebase-auth-expires', expiryDate.toString());
  }
}
