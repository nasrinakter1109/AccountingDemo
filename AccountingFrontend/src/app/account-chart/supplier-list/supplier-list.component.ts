import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountLedgerView } from 'src/app/models/account-ledger-view';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  listModel: AccountLedgerView[] = [];
  constructor(
    private accountService: AccountService,private route:Router
  ) {}

  ngOnInit() {
   this.loadData();
  }
  async loadData() {
    await this.accountService.getAllAccounts(22).subscribe((data:any)=>{
     if(data.status){
       this.listModel=data.result;
       console.log(this.loadData)
     }else{
       this.listModel=[];
     }
    });
 }
  addNew(){
    this.route.navigate(['/account/supplier']);
  }
  async edit(id: number) {
    this.route.navigate(['/account/supplier-edit', id]);
  }
}
