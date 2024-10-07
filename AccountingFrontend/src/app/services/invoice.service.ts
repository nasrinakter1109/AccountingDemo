import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SalesMaster } from '../models/sales-master';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getAll() {
    return this.http.get(`${this.baseUrl}/Invoice`);
  }
  salesInvoiceSearch(fromDate:any,toDate:any, voucherNo:string,ledgerId:number){
    const formattedVoucherNo = voucherNo ? `"${voucherNo}"` : '""';
    const paramObj = new HttpParams()
    .set('fromDate', fromDate)
    .set('toDate',toDate)
    .set('voucherNo', formattedVoucherNo)
    .set('ledgerId',ledgerId.toString())
   return this.http.get(`${this.baseUrl}/Invoice/Search`, {params:paramObj} );
  }
  getSalesInvoiceMasterView(SalesMasterId:number) {
    return this.http.get(`${this.baseUrl}/Invoice/SalesInvoiceMasterView/${SalesMasterId}`);
  }
  getSalesInvoiceDetailsView(SalesMasterId:number) {
    return this.http.get(`${this.baseUrl}/Invoice/SalesInvoiceDetailsView/${SalesMasterId}`);
  }
  getById(SalesMasterId:number) {
    return this.http.get(`${this.baseUrl}/Invoice/${SalesMasterId}`);
  }
  getSerialNo() {
    return this.http.get(`${this.baseUrl}/Invoice/SerialNo`);
  }
  saveInvoice(master:SalesMaster){
    console.log({master})
    return this.http.post(`${this.baseUrl}/Invoice`, master );
  }
  approved(master:SalesMaster){
    console.log({master})
    return this.http.post(`${this.baseUrl}/Invoice/Approved`, master );
  }
}
