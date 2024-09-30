import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:5001/api/user';  // Change to match your API endpoint

  constructor(private http: HttpClient) { }

  // Get users from the API
  getUsers(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  // Add a new user to the API
  addUser(): Observable<any> {
    return this.http.post(this.apiUrl, {});
  }
}
