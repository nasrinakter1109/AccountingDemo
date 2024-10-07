import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountLedgerView } from 'src/app/models/account-ledger-view';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {

  listModel: AccountLedgerView[] = [];

  constructor(
    private accountService: AccountService,private route:Router
  ) {}

  ngOnInit() {
   this.loadData();
  }

  async loadData() {
    await this.accountService.getAllAccounts(28).subscribe((data:any)=>{
     if(data.status){
       this.listModel=data.result;
     }else{
       this.listModel=[];
     }
    });
 }

  addNew(){
    this.route.navigate(['/account/bank']);
  }


  async edit(id: number) {
    this.route.navigate(['/account/bank-edit',id]);
  }

}
