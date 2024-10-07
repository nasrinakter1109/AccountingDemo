

import { Component, OnInit } from '@angular/core';
import { AccountLedger } from '../../models/account-ledger';
import { AccountService } from '../../services/account.service';
import {  Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountLedgerView } from '../../models/account-ledger-view';
import { AccountGroupView } from '../../models/account-group-view';
@Component({
  selector: 'app-account-chart',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './account-chart.component.html',
  styleUrl: './account-chart.component.css',

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
    this.activeTable = table;
  }
  addNewAccount(){
    this.route.navigate(['/account/add-account']);
  }


   edit(id: number) {
    this.route.navigate(['/account/account-edit',id]);
  }



}
