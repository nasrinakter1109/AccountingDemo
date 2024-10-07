import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = environment.reportApiUrl;

  constructor(private http: HttpClient) { }

  getFinancialReport(toDate: Date, companyId: number) {
    return this.http.get(`${this.apiUrl}/financial?toDate=${toDate}&companyId=${companyId}`, { responseType: 'blob' });
  }
}
