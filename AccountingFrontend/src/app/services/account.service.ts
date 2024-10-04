import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = AppConfig.apiUrl;

  constructor(private http: HttpClient) {

  }

  getAllAccounts(id?:number) {
    if(id && id>0){
      return this.http.get(`${this.baseUrl}/AccountLedger/All/${id}`  );

    }else{
      return this.http.get(`${this.baseUrl}/AccountLedger`);
    }

  }

  getAllGroups() {
    return this.http.get(`${this.baseUrl}/AccountLedger/AccountGroup`);
  }
  getLedgerCode() {
    return this.http.get(`${this.baseUrl}/AccountLedger/LedgerCode`);
  }
  getAccountById(id: number) {
    return this.http.get(`${this.baseUrl}/AccountLedger/${id}`);
  }

  createAccount(account: any) {
    console.log({account,"1":1})
    return this.http.post(`${this.baseUrl}/AccountLedger`, account);
  }
  updateAccount(account: any) {
    return this.http.put(`${this.baseUrl}/AccountLedger/${account.LedgerId}`, account);
  }

  deleteAccount(id: number) {
    return this.http.delete(`${this.baseUrl}/AccountLedger/${id}` );
  }
}
