import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/Shared/modal.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplierLedgerForm: FormGroup;
  btnStatus:string="Save";




  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,private route:Router,private modalService: ModalService
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
        this.modalService.show('Success', 'Form submitted successfully!');
       this.supplierLedgerForm.get('LedgerCode')?.disable();
       this.route.navigate(['/account/supplier-list']);
      }else{
        this.modalService.show('Failed', 'Form submitted Failed!');
        this.supplierLedgerForm.get('LedgerCode')?.disable();
      }
     },(err:any)=>{
      alert(err.error.message)
     });

   } else {
    if(this.supplierLedgerForm.valid){
      await this.accountService.createAccount(this.supplierLedgerForm.value).subscribe((data:any)=>{
        if(data.status){
          this.modalService.show('Success', 'Form submitted successfully!');
         this.supplierLedgerForm.get('LedgerCode')?.disable();
         this.route.navigate(['/account/supplier-list']);
        }else{
          this.modalService.show('Failed', 'Form submitted Failed!');
          this.supplierLedgerForm.get('LedgerCode')?.disable();

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
  this.modalService.show('Info', 'Form has been reset.');
  this.supplierLedgerForm.reset({
    LedgerId :0,
    AccountGroupId:22,
      LedgerName :'',
      LedgerCode :'',
      CompanyId :1,
      IsDefault :true,
      OpeningBalance :0,
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
      Type :'Supplier',
      AccountName :'',
      AccountNo :'',
  });
  this.btnStatus="Save";
  this.getLedgerCode();

}

}
