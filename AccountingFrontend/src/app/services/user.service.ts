import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl =environment.apiUrl;

  constructor(private http: HttpClient) { }


  getCompanyById(id:number){
    console.log(id)
    return this.http.get(`${this.apiUrl}/user/Company/${id}`);
  }
  getRoles(){
    console.log("test")
    return this.http.get(`${this.apiUrl}/user/roles`);
  }
  getUsers(){
    return this.http.get(`${this.apiUrl}/user`);
  }

  getUsersById(id:number){
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }
  saveOrUpdateUser(userMaster: UserModel){
    return this.http.post(`${this.apiUrl}/user`, userMaster, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
