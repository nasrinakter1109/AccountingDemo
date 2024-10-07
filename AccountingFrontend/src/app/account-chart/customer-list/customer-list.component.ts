import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountLedgerView } from 'src/app/models/account-ledger-view';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  listModel: AccountLedgerView[] = [];

  constructor(
    private accountService: AccountService,private route:Router
  ) {}

  ngOnInit() {
   this.loadData();
  }

   loadData() {
     this.accountService.getAllAccounts(26).subscribe((data:any)=>{
     if(data.status){
       this.listModel=data.result;
       console.log(this.loadData)
     }else{
       this.listModel=[];
     }
    });
 }

  addNew(){
    this.route.navigate(['/account/customer']);
  }


  async edit(id: number) {
    this.route.navigate(['/account/customer-edit', id]);
  }
}
