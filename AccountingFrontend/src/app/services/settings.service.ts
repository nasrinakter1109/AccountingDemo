import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private baseUrl = environment.apiUrl;

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
