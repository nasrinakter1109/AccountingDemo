import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { JournalService } from '../../services/journal.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JournalMaster } from '../../models/journal-master';
import { JournalDetails } from '../../models/journal-details';
import { SettingsService } from '../../services/settings.service';
import { InvoiceService } from '../../services/invoice.service';
import { SalesMaster } from '../../models/sales-master';
import { SalesDetails } from '../../models/sales-details';
import { concatMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-sales-invoice-view',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './sales-invoice-view.component.html',
  styleUrl: './sales-invoice-view.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesInvoiceViewComponent implements OnInit {
  model: any;
  company: any;
  master:any
  productList:any[]=[];
  strNumberToWords: string = '';
  approveDialogOpen = false;
   setting:any;





  constructor(
    private invoiceService: InvoiceService,
    private userService:UserService,
    // private snackBar: MatSnackBar,
    private route: ActivatedRoute,private router:Router,private settingsService:SettingsService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

      this.userService.getCompanyById(1).subscribe((data:any)=>{if(data.status){this.company = data.result}});

     this.invoiceService.getSalesInvoiceMasterView(Number(id)).subscribe((data:any)=>{if(data.status){
       this.model = data.result}});

      this.invoiceService.getSalesInvoiceDetailsView(Number(id)).subscribe((data:any)=>{if(data.status){this.productList= data.result}});

      this.invoiceService.getById(Number(id))
      .pipe(
        tap((data: any) => {
          if (data.status) {
            console.log({ master: data.result });
            this.master = data.result;
          }
        }),
        tap(() => {
          this.convertAmountToWords(this.master?.TotalAmount);
        }),
        concatMap(() => this.invoiceService.getSerialNo())
      )
      .subscribe((data: any) => {
        if (data.status) {
          console.log({ serial: data.result });
          this.master.SerialNo = data.result;
          //this.master.VoucherNo=this.setting.Prefix + this.master.SerialNo + this.setting.Suffix;
        }
      });
     this.settingsService.getInvoiceSetting(5).subscribe((data:any)=>{
      if(data.status){
        this.setting=data.result;
      }
    });


  }
  convertAmountToWords(amount: number) {
    console.log({amount})
     this.settingsService.convertAmount(amount).subscribe((data:any)=>{if(data.status){
      console.log({amountInword:data.result})
      this.strNumberToWords = data.result;
    }});

  }

  print(): void {
    // Implement printing logic using a printing service or window.print()
  }

  openApproveDialog(): void {
    this.approveDialogOpen = true;
  }

  onApproveDialogClose(accepted: any): void {
    if (accepted) {
      this.approve();
    }
    this.approveDialogOpen = false;
  }

  async approve(): Promise<void> {
    let master=new SalesMaster();
    master = {
      ...this.master,
       UserId :"test",//implement later
       PaymentStatus : "Approved",
       VoucherNo:this.setting.Prefix + this.master.SerialNo + this.setting.Suffix,
       ModifyDate : new Date().toISOString().substring(0, 10),
      listOrder: [] ,
      listDelete:[]
    };
    console.log(this.master)
    for (var item of this.productList)
    {
      let details = new SalesDetails();
      if (item != null)
      {
        details.SalesDetailsId = item.SalesDetailsId;
        details.ProductId = item.ProductId;
        details.Qty = item.Qty;
        details.UnitId = item.UnitId;
        details.Rate = item.PurchaseRate;
        details.Amount = item.Amount;
        details.Discount = item.Discount;
        details.DiscountAmount = item.DiscountAmount;
        if (item.TaxId == 0)
        {
          details.TaxId = 1;
        }
        else
        {
          details.TaxId = item.TaxId;
        }
        details.TaxRate = item.TaxRate;
        details.TaxAmount = item.TaxAmount;
        details.BatchId = item.BatchId;
        details.NetAmount = item.NetAmount;
        details.GrossAmount = 0;
        details.OrderDetailsId = 0;
        details.QuotationDetailsId = 0;
        master.listOrder.push(details);
      }
    }
       await this.invoiceService.approved(master).subscribe((data:any)=>{
        if (data.status) {
          // this.snackBar.open('Successfully saved Journal Voucher.', 'Close', { duration: 3000 });
          alert(data.message)
          this.router.navigate(['/salesInvoice-list']);
        }
       });

    // }
  }
}
