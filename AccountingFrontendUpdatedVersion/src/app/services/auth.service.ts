import { Inject, Injectable,PLATFORM_ID } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private userDataKey = 'userData';
  private apiUrl = AppConfig.apiUrl ;

  constructor(private http: HttpClient, private router: Router,@Inject(PLATFORM_ID) private platformId: Object) { }
  login(loginData: any): Observable<any> {
    const url = `${this.apiUrl}/login`; // API login endpoint
    return this.http.post(url, loginData).pipe(
      map((response: any) => {
        // Store token and company data in session storage if login is successful
        if (response.status) {
          sessionStorage.setItem('token', response.result);
        }
        return response;
      })
    );
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem(this.tokenKey);
    return token !== null;
  }
  setUserData(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      const decodedToken: any = jwtDecode(token);
      sessionStorage.setItem(this.tokenKey, token);
      sessionStorage.setItem(this.userDataKey, JSON.stringify({
        CompanyName: decodedToken.CompanyName,
        RoleName: decodedToken.RoleName,
        RoleId: decodedToken.RoleId,
        UserName: decodedToken.UserName,
        CompanyId: decodedToken.CompanyId
      }));
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.tokenKey);
    }
    return null;
  }
  getUserData(): any {
    if (isPlatformBrowser(this.platformId)) {
      const userData = sessionStorage.getItem(this.userDataKey);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.userDataKey);
    }
    this.router.navigate(['/login']);
  }



}
