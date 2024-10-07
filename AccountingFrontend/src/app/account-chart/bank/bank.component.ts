import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/Shared/modal.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  bankLedgerForm: FormGroup;
  btnStatus:string="Save";
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,private route:Router,private modalService: ModalService
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
        this.modalService.show('Success', 'Form submitted successfully!');
        this.bankLedgerForm.get('LedgerCode')?.disable();
        this.route.navigate(['/account/bank-list']);
       }else{
        this.modalService.show('Failed', 'Form submitted Failed!');
         this.bankLedgerForm.get('LedgerCode')?.disable();
       }
     },(err:any)=>{
      alert(err.error.message)
     });

   } else {
    if(this.bankLedgerForm.valid){
      await this.accountService.createAccount(this.bankLedgerForm.value).subscribe((data:any)=>{
        if(data.status){
          this.modalService.show('Success', 'Form submitted successfully!');
         this.bankLedgerForm.get('LedgerCode')?.disable();
         this.route.navigate(['/account/bank-list']);

        }else{
          this.modalService.show('Failed', 'Form submitted Failed!');
          this.bankLedgerForm.get('LedgerCode')?.disable();
        }
       },(err:any)=>{
        alert(err.error.message)
       });
    }else{
      this.modalService.show('Error', 'Please fill out all required fields.');
     }
   }


 }




 resetForm() {
  this.bankLedgerForm.reset({
    LedgerId :0,
      AccountGroupId :28,
      LedgerName :'',
      LedgerCode :'',
      CompanyId :1,
      OpeningBalance :0,
      IsDefault :true,
      CrOrDr :'Dr',
      Address :'',
      Phone :'',
      Email :'',
      ShippingAddress :'',
      Country :'',
      City :'',
      TaxNo :'',
      CreditPeriod :0,
      CreditLimit :0,
      Type :'Accounts',
      AccountName :'',
      AccountNo :'',
  });
  this.btnStatus="Save";
  this.modalService.show('Info', 'Form has been reset.');
    this.ngOnInit();
}
}
