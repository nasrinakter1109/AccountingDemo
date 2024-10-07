import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { InvoiceService } from '../../services/invoice.service';
import { SettingsService } from '../../services/settings.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { SalesMaster } from '../../models/sales-master';
import { SalesDetails } from '../../models/sales-details';
import { catchError, of, retry } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sales-invoice',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ReactiveFormsModule,NgSelectModule,FormsModule ],
  templateUrl: './sales-invoice.component.html',
  styleUrl: './sales-invoice.component.css'
})
export class SalesInvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  searchValue!: string;
  // Mock data
  listLedger :any[]=[];
  listProduct:any = [];
  userData:any;
  constructor(private fb: FormBuilder,private route:Router,private accountService:AccountService,private invoiceService:InvoiceService,private settingsService:SettingsService,private authService: AuthService) {
    this.userData = this.authService.getUserData();

    this.invoiceForm = this.fb.group({
    VoucherNo: ['DRAFT'],
    LedgerId: [null, Validators.required],
    Date: [new Date().toISOString().substring(0, 10), Validators.required],
    DueDate: [null],
    Reference: [''],
    Narration: [''],
    NetAmounts: [0],
    BillDiscount: [0],
    TotalAmount: [0],
    TotalTax: [0],
    GrandTotal: [0],
    items: this.fb.array([])  // FormArray for product list
  });

}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
    this.getProductList();
    //this.getTaxList();
  }

  loadData() {
    this.accountService.getAllAccounts(26).subscribe((data: any) => {
      if (data.status) {
        this.listLedger = data.result || [];
        console.log(this.listLedger);
      } else {
        this.listLedger = [];
      }
    });
  }

getProductList() {
  this.settingsService.getAllProductWithStock().subscribe((data:any)=>{
  if(data.status){
    this.listProduct=data.result;
    console.log(this.loadData)
  }else{
    this.listProduct=[];
  }
 });
}
// getTaxList() {
//   this.settingsService.getAllProductWithStock().subscribe((data:any)=>{
//   if(data.status){
//     this.listLedger=data.result;
//     console.log(this.loadData)
//   }else{
//     this.listLedger=[];
//   }
//  });
// }



  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }
  onChange(event: any): void {
    console.log('Selected product:', event);

    // Ensure event contains valid product data
    if (event && event.ProductId) {
      if (this.items && this.items.controls) {
        let filterArray = this.items.controls.filter((i: any) => i.value.ProductId === event.ProductId);
        console.log({ filterArray });

        if (filterArray.length > 0) {
          alert("Product Already Exists");
        } else {
          this.items.push(this.fb.group({
            SalesDetailsId: [0],
            SalesMasterId: [0],
            OrderDetailsId: [0],
            QuotationDetailsId: [0],
            ProductId: [event.ProductId || 0],
            ProductName: [{ value: event.ProductName || '' || 0, disabled: true }],
            Qty: [1],
            SalesRate: [{ value: event.SalesRate || 0, disabled: true }],
            UnitId: [event.UnitId || 0],
            UnitName: [{ value: event.UnitName || '', disabled: true }],
            Discount: [0],
            DiscountAmount: [0],
            TaxId: [event.TaxId || 0],
            BatchId: [1],
            TaxRate: [0],
            TaxAmount: [{ value: event.TaxAmount || 0, disabled: true }],
            GrossAmount: [{ value: Math.round(1 * (event.SalesRate || 0)), disabled: true } ],
            NetAmount: [{ value: Math.round(1 * (event.SalesRate || 0)), disabled: true } ],
            Amount: [{ value: Math.round(1 * (event.SalesRate || 0)), disabled: true } ],
            TotalAmount:[ { value: Math.round(1 * (event.SalesRate || 0)), disabled: true }]
          }));
          this.calculateTotal();
        }
      } else {
        console.error('Form controls are not properly initialized.');
      }
    } else {
      console.error('Invalid product data:', event);
    }
  }

  onCustomerChange(event: any){

  }
  addItem() {
    this.items.push(this.fb.group({
      SalesDetailsId :[0],
      SalesMasterId :[0],
      OrderDetailsId :[0],
      QuotationDetailsId :[0],
      ProductId :[0],
      ProductName :[0],
      Qty :[0],
      SalesRate :[0],
      UnitId :[0],
      UnitName :[0],
      Discount :[0],
      DiscountAmount :[0],
      TaxId :[0],
      BatchId :[0],
      TaxRate :[0],
      TaxAmount :[0],
      GrossAmount :[0],
      NetAmount :[0],
      Amount :[0],
      TotalAmount:[0]
    }));
  }

  deleteItem(index: number) {
    this.items.removeAt(index);
  }

  calculateItemTotal(index: number) {
    const item = this.items.at(index);
    const qty = item.get('Qty')!.value;
    const rate = item.get('SalesRate')!.value;
    const discount = item.get('DiscountAmount')!.value;
    const grossAtm = qty*rate;
    const total = qty * rate - discount;
    item.patchValue({ NetAmount: grossAtm,TotalAmount:total,Amount:grossAtm });
    this.calculateTotal();
  }

  calculateTotal() {
    let decTotalAmount = 0;
    let decAdditionalCost = 0;
    let decTaxAmount = 0;
    let decTotalDisTax = 0;
    let decGrandTotalCshbnk = 0;
    let decNetAmount = 0;
    let decCheckTax = 0;
    let decGrandTotal = 0;
    let decVat = 0;

    this.items.controls.forEach((control: AbstractControl) => {
        const formGroup = control as FormGroup;
        const totalAmount = formGroup.get('TotalAmount')?.value || 0;
        const netAmount = formGroup.get('NetAmount')?.value || 0;
        const taxAmount = formGroup.get('TaxAmount')?.value || 0;
        const vatAmount = formGroup.get('VatAmount')?.value || 0;
        const discountAmount = formGroup.get('DiscountAmount')?.value || 0

        decTotalAmount += totalAmount;
        decNetAmount += netAmount;
        decTotalDisTax += discountAmount;
        decCheckTax += taxAmount;
        decVat += vatAmount;
    });

    this.invoiceForm.get('NetAmounts')?.patchValue(Math.round(decNetAmount));
    this.invoiceForm.get('BillDiscount')?.patchValue(Math.round(decTotalDisTax))
    let decTotalAmountTax = decTotalAmount;
    decTotalDisTax = decNetAmount;

    const billDiscount = this.invoiceForm.get('BillDiscount')?.value || 0;
    if (billDiscount > 0) {
        const discountPercentage = (billDiscount * 100) / decTotalAmountTax;
        this.invoiceForm.get('DisPer')?.patchValue(discountPercentage);
    } else {
        this.invoiceForm.get('DisPer')?.patchValue(0);
    }

    const totalAmountAfterDiscount = decNetAmount - billDiscount;
    this.invoiceForm.get('TotalAmount')?.patchValue(Math.round(totalAmountAfterDiscount));

    this.invoiceForm.get('TotalTax')?.patchValue(Math.round(decVat));

    let decDiscountAmount = billDiscount;
    decGrandTotal = (decTotalDisTax + decAdditionalCost + decCheckTax) - decDiscountAmount;

    if (decGrandTotal >= 0) {
        this.invoiceForm.get('GrandTotal')?.patchValue(decGrandTotal + (this.invoiceForm.get('ShippingAmount')?.value || 0));
    } else {
        this.invoiceForm.get('BillDiscount')?.patchValue(0);
        this.invoiceForm.get('GrandTotal')?.patchValue((decGrandTotal + (this.invoiceForm.get('ShippingAmount')?.value || 0)));
    }

    // Handling Pay Amount and Previous Due
    const grandTotal = this.invoiceForm.get('GrandTotal')?.value || 0;
    decGrandTotalCshbnk = this.invoiceForm.get('PayAmount')?.value || 0;

    if (grandTotal >= decGrandTotalCshbnk) {
        const remainingDue = grandTotal - decGrandTotalCshbnk;
        this.invoiceForm.get('PreviousDue')?.patchValue(Math.round(remainingDue));
    } else {
        this.invoiceForm.get('PayAmount')?.patchValue(0);
        this.invoiceForm.get('PreviousDue')?.patchValue(0);
    }
}
 initForm() {
    this.invoiceForm = this.fb.group({
      VoucherNo: ['DRAFT'],
      LedgerId: [null, Validators.required],
      Date: [new Date().toISOString().substring(0, 10), Validators.required],
      DueDate: [null],
      Reference: [''],
      Narration: [''],
      NetAmounts: [0],
      BillDiscount: [0],
      TotalAmount: [0],
      TotalTax: [0],
      GrandTotal: [0],
      PayAmount:[0],
      PreviousDue:[0],
      ShippingAmount:[0],
      DisPer:[0],
      items: this.fb.array([])
    });
  }

  saveInvoice() {
    let master = new SalesMaster();
    master = {
      ...this.invoiceForm.value,
      UserId: this.userData.UserName,
      TotalAmount: this.invoiceForm.get('TotalAmount')?.value || 0,
      NetAmounts: this.invoiceForm.get('NetAmounts')?.value || 0,
      TaxRate: 0,
      PayAmount: 0,
      PaymentStatus: "Draft",
      DisPer: 0,
      PreviousDue: this.invoiceForm.get('GrandTotal')?.value || 0,
      BalanceDue: this.invoiceForm.get('GrandTotal')?.value || 0,
      CompanyId: this.userData.CompanyId,
      FinancialYearId: 1,
      VoucherTypeId: 9,
      SerialNo: "0",
      Status: "Unpaid",
      QuotationMasterId: 0,
      OrderMasterId: 0,
      WarehouseId: 1,
      AddedDate: new Date().toISOString().substring(0, 10),
      listOrder: [] ,
      listDelete:[]
    };

    this.items.controls.forEach((control: AbstractControl) => {
      const formGroup = control as FormGroup;
      let details = new SalesDetails();
      details = {
        SalesDetailsId: 0,
        SalesMasterId: master.SalesMasterId || 0,
        ProductId: formGroup.get('ProductId')?.value || 0,
        Qty: formGroup.get('Qty')?.value || 0,
        UnitId: formGroup.get('UnitId')?.value || 0,
        Rate: formGroup.get('Rate')?.value || 0,
        Amount: formGroup.get('Amount')?.value || 0,
        Discount: formGroup.get('Discount')?.value || 0,
        DiscountAmount: formGroup.get('DiscountAmount')?.value || 0,
        TaxId: formGroup.get('TaxId')?.value || 0,
        TaxRate: formGroup.get('TaxRate')?.value || 0,
        TaxAmount: formGroup.get('TaxAmount')?.value || 0,
        BatchId: formGroup.get('BatchId')?.value || 0,
        NetAmount: formGroup.get('NetAmount')?.value || 0,
        GrossAmount: formGroup.get('GrossAmount')?.value || 0,
        OrderDetailsId: formGroup.get('OrderDetailsId')?.value || 0,
        QuotationDetailsId: formGroup.get('QuotationDetailsId')?.value || 0
      };

      master.listOrder.push(details);
    });

    this.invoiceService.saveInvoice(master).subscribe(
      (res: any) => {
        console.log({res})
        alert(res.message);
        this.route.navigate(['/account/supplier-list']);
      },
      (err: any) => {
        alert(err.error.message);
      }
    );
  }


  cancel() {
    this.invoiceForm.reset();
  }

  openCustomerDrawer() {
    // Logic to open customer creation drawer
  }
}
