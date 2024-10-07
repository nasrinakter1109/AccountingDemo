import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { SettingsService } from 'src/app/services/settings.service';
import { UserService } from 'src/app/services/user.service';
import { concatMap, tap } from 'rxjs/operators';
import { SalesMaster } from 'src/app/models/sales-master';
import { SalesDetails } from 'src/app/models/sales-details';
import { ModalService } from 'src/app/Shared/modal.service';
@Component({
  selector: 'app-sales-invoice-view',
  templateUrl: './sales-invoice-view.component.html',
  styleUrls: ['./sales-invoice-view.component.css']
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
    private route: ActivatedRoute,private router:Router,private settingsService:SettingsService,private modalService: ModalService
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
          this.modalService.show('Success', 'Approved!');
          this.router.navigate(['/account/salesInvoice-list']);
        }
       });

    // }
  }
}
