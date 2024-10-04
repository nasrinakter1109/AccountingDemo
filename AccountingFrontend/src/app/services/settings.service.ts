import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private baseUrl = AppConfig.apiUrl;

  constructor(private http: HttpClient) {}

  getInvoiceSetting(id:number){
    console.log({setind:id})
    return this.http.get(`${this.baseUrl}/Settings/InvoiceSetting/${id}`);
  }
  getAllProductWithStock(){
    return this.http.get(`${this.baseUrl}/Settings/Product`);
  }
  getTaxById(id:number){
    return this.http.get(`${this.baseUrl}/Settings/Tax/${id}`);
  }
  convertAmount(amount:number){
    return this.http.get(`${this.baseUrl}/Settings/ConvertAmount/${amount}`);
  }

}
