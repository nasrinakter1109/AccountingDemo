import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customerLedgerForm: FormGroup;
  btnStatus:string="Save";
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,private route:Router
  ) {
    this.customerLedgerForm = this.fb.group({
      LedgerId :[0],
      AccountGroupId :[26],
      LedgerName :['',Validators.required],
      LedgerCode :[],
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
      Type :['Customer'],
      AccountName :[''],
      AccountNo :[''],
        });
  }

  ngOnInit() {
    this.getLedgerCode();
    this.customerLedgerForm.get('LedgerCode')?.disable();
  }
  async getLedgerCode(){
    await this.accountService.getLedgerCode().subscribe((data:any)=>{
      if(data.status){
        this.customerLedgerForm.get('LedgerCode')?.patchValue(data.result);
      }
     });
  }
 async onSubmit() {
  this.customerLedgerForm.get('LedgerCode')?.enable();
   if (this.customerLedgerForm.value.LedgerId) {
     await this.accountService.updateAccount(this.customerLedgerForm.value).subscribe((data:any)=>{
      if(data.status){
       // this.snackbar.open('Account updated successfully!', 'Close', { duration: 2000 });
       alert("SuccessFully Updated!");
       this.customerLedgerForm.get('LedgerCode')?.disable();
       this.route.navigate(['/account/customer-list']);
      }else{
        alert(data.message)
        this.customerLedgerForm.get('LedgerCode')?.disable();
      }
     },(err:any)=>{
      alert(err.error.message)
     });

   } else {
    if(this.customerLedgerForm.valid){
      await this.accountService.createAccount(this.customerLedgerForm.value).subscribe((data:any)=>{
        if(data.status){
         // this.snackbar.open('Account created successfully!', 'Close', { duration: 2000 });
         alert("SuccessFully Save!");
         this.customerLedgerForm.get('LedgerCode')?.disable();
         this.route.navigate(['/account/customer-list']);
        }else{
          alert(data.message)
          this.customerLedgerForm.get('LedgerCode')?.disable();
        }
       },(err:any)=>{
        alert(err.error.message)
       });
    }

   }

 }

 async edit(id: number) {
   await this.accountService.getAccountById(id).subscribe((data:any)=>{
     if(data.status){
        this.customerLedgerForm.patchValue(data.result);
        this.btnStatus="Update";
     }else{
      this.btnStatus="Save";
     }
    });;

 }

 async delete(id: number) {
   const confirmed = confirm('Are you sure you want to delete this account?');
   if (confirmed) {
     await this.accountService.deleteAccount(id);
    //  this.snackbar.open('Account deleted successfully!', 'Close', { duration: 2000 });

   }
 }
 resetForm() {
  this.customerLedgerForm.reset({
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
