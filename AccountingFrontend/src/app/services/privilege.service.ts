import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Privilege } from '../models/privilege';
@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}



  getPrivilegesByRoleId(roleId: number) {
    return this.http.get(`${this.apiUrl}/Privilege/${roleId}`);
  }

  savePrivilege(model: Privilege){
    console.log({model})
    return this.http.post(`${this.apiUrl}/Privilege`, model);
  }

  deletePrivilege(roleId: number) {
    return this.http.delete(`${this.apiUrl}/Privilege/${roleId}`);
  }

  privilegeCheck(formName: string, roleName: string){
    return this.http.get(`${this.apiUrl}/Privilege/privilege-check?formName=${formName}&roleName=${roleName}`);
  }
}
