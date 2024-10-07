import { Component, OnInit } from '@angular/core';
import { AccountLedgerView } from '../../models/account-ledger-view';
import { AccountService } from '../../services/account.service';
import { Router ,RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-bank-list',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './bank-list.component.html',
  styleUrl: './bank-list.component.css'
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
