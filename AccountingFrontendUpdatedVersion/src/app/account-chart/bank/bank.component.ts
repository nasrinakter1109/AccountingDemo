import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,CommonModule],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css'
})
export class BankComponent implements OnInit {
  bankLedgerForm: FormGroup;
  btnStatus:string="Save";
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,private route:Router
  ) {
    this.bankLedgerForm = this.fb.group({
      LedgerId :[0],
      AccountGroupId :[28],
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
      Type :['Accounts'],
      AccountName :[''],
      AccountNo :[''],
        });
  }

  ngOnInit() {
    this.getLedgerCode();
    this.bankLedgerForm.get('LedgerCode')?.disable();
  }
  async getLedgerCode(){
    await this.accountService.getLedgerCode().subscribe((data:any)=>{
      if(data.status){
        this.bankLedgerForm.get('LedgerCode')?.patchValue(data.result);
      }
     });
  }




 async onSubmit() {
  this.bankLedgerForm.get('LedgerCode')?.enable();
   if (this.bankLedgerForm.value.LedgerId) {
     await this.accountService.updateAccount(this.bankLedgerForm.value).subscribe((data:any)=>{
      if(data.status){
        // this.snackbar.open('Account updated successfully!', 'Close', { duration: 2000 });
        alert("SuccessFully Updated!");
        this.bankLedgerForm.get('LedgerCode')?.disable();
        this.route.navigate(['/account/bank-list']);
       }else{
         alert(data.message)
         this.bankLedgerForm.get('LedgerCode')?.disable();
       }
     },(err:any)=>{
      alert(err.error.message)
     });

   } else {
    if(this.bankLedgerForm.valid){
      await this.accountService.createAccount(this.bankLedgerForm.value).subscribe((data:any)=>{
        if(data.status){
         // this.snackbar.open('Account created successfully!', 'Close', { duration: 2000 });
         alert("SuccessFully Save!");
         this.bankLedgerForm.get('LedgerCode')?.disable();
         this.route.navigate(['/account/bank-list']);

        }else{
          alert(data.message)
          this.bankLedgerForm.get('LedgerCode')?.disable();
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
        this.bankLedgerForm.patchValue(data.result);
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
  this.bankLedgerForm.reset({
    LedgerId :0,
      AccountGroupId :0,
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
