import { Component, OnInit } from '@angular/core';
import { AccountLedgerView } from '../../models/account-ledger-view';
import { AccountService } from '../../services/account.service';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterOutlet,
    FormsModule,
    CommonModule,],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
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
    this.route.navigate(['/customer']);
  }


  async edit(id: number) {
    this.route.navigate(['/customer-edit', id]);
  }
}
