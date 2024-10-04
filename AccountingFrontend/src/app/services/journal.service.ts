import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private baseUrl = AppConfig.apiUrl;

  constructor(private http: HttpClient) {}
  getSerialNo(){
    return this.http.get(`${this.baseUrl}/Journal/SerialNo`);
  }
  CheckLedgerBalance(ledgerId:number){
    return this.http.get(`${this.baseUrl}/Journal/CheckLedgerBalance/${ledgerId}`);
  }
  getJournalDetailsView(journalMasterId:number){
    return this.http.get(`${this.baseUrl}/Journal/DetailsView/${journalMasterId}`);
  }
  getJournalMasterView(journalMasterId:number){
    return this.http.get(`${this.baseUrl}/Journal/MasterView/${journalMasterId}`);
  }
  

  getAll(){
    return this.http.get(`${this.baseUrl}/Journal`);
  }
  getById(id:number){
    return this.http.get(`${this.baseUrl}/Journal/${id}`);
  }
  saveJournalEntry(journalEntry:any){
    return this.http.post(`${this.baseUrl}/Journal`, journalEntry);
  }
  approveJournal(journalEntry:any){
    console.log({journalEntry})
    return this.http.post(`${this.baseUrl}/Journal/Approved`, journalEntry);
  }
}
