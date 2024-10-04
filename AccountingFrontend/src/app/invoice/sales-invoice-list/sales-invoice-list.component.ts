import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-invoice-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterOutlet],
  templateUrl: './sales-invoice-list.component.html',
  styleUrl: './sales-invoice-list.component.css'
})
export class SalesInvoiceListComponent implements OnInit {
  saleInvoiceForm: FormGroup;
  listModel: any[] = [];
  searchList: any[] = [];
  constructor(
    private accountService: AccountService,private invoiceService:InvoiceService,private route:Router,private fb: FormBuilder
  ) {
    this.saleInvoiceForm = this.fb.group({
      ledgerId :[0],
      fromDate :[this.getEarlierDate(7)],
      toDate :[new Date().toISOString().substring(0, 10)],
      voucherNo :[''],
    });
  }

  ngOnInit() {
   this.loadData();
   this.searchSalesInvoice();
  }
  getEarlierDate(daysAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);  // Subtract the number of days
    return date.toISOString().substring(0, 10);  // Return in YYYY-MM-DD format
  }
  async loadData() {
    await this.accountService.getAllAccounts(26).subscribe((data:any)=>{
     if(data.status){
       this.listModel=data.result;
       console.log(this.loadData)
     }else{
       this.listModel=[];
     }
    });
 }
 onLedgerChange(event: any) {
  const selectedLedgerId = event.target.value;
  this.saleInvoiceForm.get('ledgerId')!.setValue(selectedLedgerId);
  console.log('Selected Ledger ID:', selectedLedgerId);
}
 async searchSalesInvoice() {
  console.log(this.saleInvoiceForm.value)
  const fromDate=new Date(this.saleInvoiceForm.get('fromDate')!.value).toISOString();
  const toDate=new Date(this.saleInvoiceForm.get('toDate')!.value).toISOString();
  const voucherNo=this.saleInvoiceForm.get('voucherNo')!.value;
  const ledgerId=this.saleInvoiceForm.get('ledgerId')!.value;
  console.log({fromDate,toDate,voucherNo,ledgerId})
  await this.invoiceService.salesInvoiceSearch(fromDate,toDate,voucherNo,ledgerId).subscribe((data:any)=>{
   if(data.status){
     this.searchList=data.result;
     console.log(this.searchList)
   }else{
     this.searchList=[];
   }
  });
}


  addNew(){
    this.route.navigate(['/salesInvoice']);
  }


  async edit(id: number) {
    this.route.navigate(['/salesInvoice-edit', id]);
  }
  async view(id: number) {
    this.route.navigate(['/salesInvoice/view', id]);
  }
}
