import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountGroupView } from 'src/app/models/account-group-view';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/Shared/modal.service';

@Component({
  selector: 'app-add-account-chart',
  templateUrl: './add-account-chart.component.html',
  styleUrls: ['./add-account-chart.component.css']
})
export class AddAccountChartComponent  implements OnInit {
  accountLedgerForm: FormGroup;
  listGroup: AccountGroupView[] = [];
  btnStatus:string="Save";
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,private route:Router,private modalService: ModalService
  ) {
    this.accountLedgerForm = this.fb.group({
      LedgerId :[0],
      AccountGroupId :[0],
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

    this.loadGroups();
    this.getLedgerCode();
    this.accountLedgerForm.get('LedgerCode')?.disable();
  }
  async getLedgerCode(){
    await this.accountService.getLedgerCode().subscribe((data:any)=>{
      if(data.status){
        this.accountLedgerForm.get('LedgerCode')?.patchValue(data.result);
      }
     });
  }
 async loadGroups() {
   await this.accountService.getAllGroups().subscribe((data:any)=>{
     if(data.status){
        this.listGroup =data.result;
     }else{
        this.listGroup =[];
     }
    });
 }
 async onSubmit() {
    if(this.accountLedgerForm.valid){
      this.accountLedgerForm.get('LedgerCode')?.enable();
      await this.accountService.createAccount(this.accountLedgerForm.value).subscribe((data:any)=>{
        if(data.status){
          this.modalService.show('Success', 'Form submitted successfully!');
         this.accountLedgerForm.get('LedgerCode')?.disable();
         this.route.navigate(['/account/account-list']);
        }else{
          this.modalService.show('Error', 'Please fill out all required fields.');
          this.markFormGroupTouched(this.accountLedgerForm);
          this.accountLedgerForm.get('LedgerCode')?.disable();
        }
       },(err:any)=>{
        alert(err.error.message)
       });
    }
 }

 markFormGroupTouched(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    control?.markAsTouched({ onlySelf: true });
  });
}

 resetForm() {
  this.accountLedgerForm.reset({
    LedgerId :0,
    AccountGroupId:0,
      LedgerName :'',
      LedgerCode :'',
      OpeningBalance :0,
      CrOrDr :'Dr',
  });
  this.btnStatus="Save";
  this.getLedgerCode();
  this.modalService.show('Info', 'Form has been reset.');
}
}
