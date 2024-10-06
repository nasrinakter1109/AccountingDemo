import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: any = null;
  private apiUrl = AppConfig.apiUrl ;

  constructor(private http: HttpClient) { }
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
    return !!localStorage.getItem('token');
  }

  setUserData(data: any): void {
    this.userData = data;
  }


  getUserData(): any {
    return this.userData;
  }

  clearUserData(): void {
    this.userData = null;
  }



}
