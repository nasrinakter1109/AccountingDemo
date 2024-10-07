import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private userDataKey = 'userData';
  private apiUrl = environment.apiUrl; // Use the environment API URL

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Login method to authenticate users
  login(loginData: any): Observable<any> {
    const url = `${this.apiUrl}/login`; // API login endpoint
    return this.http.post(url, loginData).pipe(
      map((response: any) => {
        // Store token in session storage if login is successful
        if (response.status) {
          sessionStorage.setItem(this.tokenKey, response.result);
          this.setUserData(response.result);
        }
        return response;
      })
    );
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  // Set user data in session storage
  setUserData(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      const decodedToken: any = jwtDecode(token);
      sessionStorage.setItem(this.tokenKey, token);
      sessionStorage.setItem(
        this.userDataKey,
        JSON.stringify({
          CompanyName: decodedToken.CompanyName,
          RoleName: decodedToken.RoleName,
          RoleId: decodedToken.RoleId,
          UserName: decodedToken.UserName,
          CompanyId: decodedToken.CompanyId,
        })
      );
    }
  }

  // Get token from session storage
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Get user data from session storage
  getUserData(): any {
    if (isPlatformBrowser(this.platformId)) {
      const userData = sessionStorage.getItem(this.userDataKey);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  // Logout and clear session storage
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.userDataKey);
    }
    this.router.navigate(['/login']);
  }
}
