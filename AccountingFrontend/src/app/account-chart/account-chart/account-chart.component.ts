

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountGroupView } from 'src/app/models/account-group-view';
import { AccountLedgerView } from 'src/app/models/account-ledger-view';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-chart',
  templateUrl: './account-chart.component.html',
  styleUrls: ['./account-chart.component.css']
})
export class AccountChartComponent implements OnInit {

  listModel: AccountLedgerView[] = [];
  listGroup: AccountGroupView[] = [];
 activeTable: string = 'ledger'
  constructor(
    private accountService: AccountService,private route:Router
  ) {}

  ngOnInit() {
   this.loadData();
    this.loadGroups();
  }

   loadData() {
      this.accountService.getAllAccounts().subscribe((data:any)=>{
      if(data.status){
        this.listModel=data.result;
      }else{
        this.listModel=[];
      }
     });
  }

   loadGroups() {
     this.accountService.getAllGroups().subscribe((data:any)=>{
      if(data.status){
         this.listGroup =data.result;
      }else{
         this.listGroup =[];
      }
     });
  }

  showTable(table: string) {
    this.activeTable = table; // Update active table
  }
  addNewAccount(){
    this.route.navigate(['/account/add-account']);
  }


   edit(id: number) {
    this.route.navigate(['/account/account-edit',id]);
  }



}
