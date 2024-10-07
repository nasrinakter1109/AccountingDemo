import { Component, OnInit } from '@angular/core';
import { AccountLedgerView } from '../../models/account-ledger-view';
import { AccountService } from '../../services/account.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [RouterOutlet,
    FormsModule,
    CommonModule,],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css'
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
