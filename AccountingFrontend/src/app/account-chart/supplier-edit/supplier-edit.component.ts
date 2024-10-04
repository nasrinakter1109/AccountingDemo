import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-supplier-edit',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ReactiveFormsModule],
  templateUrl: './supplier-edit.component.html',
  styleUrl: './supplier-edit.component.css'
})
export class SupplierEditComponent implements OnInit {
  id?: number;
  supplierLedgerForm: FormGroup;
  constructor(private router: ActivatedRoute,private accountService:AccountService,private fb: FormBuilder,private route:Router) {
    this.supplierLedgerForm = this.fb.group({
      LedgerId :[0],
      AccountGroupId :[22],
      LedgerName :['',Validators.required],
      LedgerCode :['',Validators.required],
      CompanyId :[1],
      OpeningBalance :[0],
      IsDefault :[true],
      CrOrDr :["Dr"],
      Address :[''],
      Phone :[''],
      Email :[''],
      ShippingAddress :[''],
      Country :[''],
      City :[''],
      TaxNo :[''],
      CreditPeriod :[0],
      CreditLimit :[0],
      Type :['Supplier'],
      AccountName :[''],
      AccountNo :[''],
        });
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      console.log('Supplier ID:', this.id);
    });
    this.edit(this.id!)
    this.supplierLedgerForm.get('LedgerCode')?.disable();
  }

  async edit(id: number) {
    await this.accountService.getAccountById(id).subscribe((data:any)=>{
      if(data.status){
         this.supplierLedgerForm.patchValue(data.result);

      }else{

      }
     });;

  }

   async onSubmit() {
    this.supplierLedgerForm.get('LedgerCode')?.enable();
     if (this.supplierLedgerForm.value.LedgerId>0) {
       await this.accountService.updateAccount(this.supplierLedgerForm.value).subscribe((data:any)=>{
        if(data.status){
         // this.snackbar.open('Account updated successfully!', 'Close', { duration: 2000 });
         alert("SuccessFully Updated!");
         this.supplierLedgerForm.get('LedgerCode')?.disable();
         this.route.navigate(['/supplier-list']);
        }else{
          alert(data.message)
          this.supplierLedgerForm.get('LedgerCode')?.disable();
        }
       },(err:any)=>{
        alert(err.error.message)
       });

     } else {
      console.log(this.supplierLedgerForm.value)
      if(this.supplierLedgerForm.valid){
        await this.accountService.createAccount(this.supplierLedgerForm.value).subscribe((data:any)=>{
          if(data.status){
           // this.snackbar.open('Account created successfully!', 'Close', { duration: 2000 });
           alert("SuccessFully Save!");
           this.supplierLedgerForm.get('LedgerCode')?.disable();
           this.route.navigate(['/supplier-list']);
          }else{
            alert(data.message)
            this.supplierLedgerForm.get('LedgerCode')?.disable();

          }
         },(err:any)=>{
          alert(err.error.message)
         });
      }
     }

   }
   resetForm() {
    this.supplierLedgerForm.reset({
      LedgerId :0,
        LedgerName :'',
        LedgerCode :'',
        CompanyId :1,
        OpeningBalance :0,
        IsDefault :0,
        CrOrDr :'',
        Address :'',
        Phone :'',
        Email :'',
        ShippingAddress :'',
        Country :'',
        City :'',
        TaxNo :'',
        CreditPeriod :'',
        CreditLimit :'',
        AccountName :'',
        AccountNo :'',
    });
  }
}
