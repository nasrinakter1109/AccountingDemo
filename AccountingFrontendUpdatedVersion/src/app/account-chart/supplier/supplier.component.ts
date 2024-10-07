import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account.service';
@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,CommonModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {
  supplierLedgerForm: FormGroup;
  btnStatus:string="Save";




  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,private route:Router
  ) {
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

  ngOnInit() {
    this.getLedgerCode();
    this.supplierLedgerForm.get('LedgerCode')?.disable();
  }
   getLedgerCode(){

     this.accountService.getLedgerCode().subscribe((data:any)=>{
      if(data.status){
        this.supplierLedgerForm.get('LedgerCode')?.patchValue(data.result);
      }
     });
  }


 async onSubmit() {
  this.supplierLedgerForm.get('LedgerCode')?.enable();
   if (this.supplierLedgerForm.value.LedgerId>0) {
     await this.accountService.updateAccount(this.supplierLedgerForm.value).subscribe((data:any)=>{
      if(data.status){
       // this.snackbar.open('Account updated successfully!', 'Close', { duration: 2000 });
       alert("SuccessFully Updated!");
       this.supplierLedgerForm.get('LedgerCode')?.disable();
       this.route.navigate(['/account/supplier-list']);
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
         this.route.navigate(['/account/supplier-list']);
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



 async delete(id: number) {
   const confirmed = confirm('Are you sure you want to delete this account?');
   if (confirmed) {
     await this.accountService.deleteAccount(id);
    //  this.snackbar.open('Account deleted successfully!', 'Close', { duration: 2000 });
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
  this.btnStatus="Save";
  this.getLedgerCode();
}

}
