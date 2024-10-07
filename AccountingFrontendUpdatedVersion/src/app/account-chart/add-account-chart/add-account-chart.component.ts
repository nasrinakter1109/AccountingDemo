import { Component, OnInit } from '@angular/core';
import { AccountGroupView } from '../../models/account-group-view';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-account-chart',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,CommonModule],
  templateUrl: './add-account-chart.component.html',
  styleUrl: './add-account-chart.component.css'
})
export class AddAccountChartComponent implements OnInit {
  accountLedgerForm: FormGroup;
  listGroup: AccountGroupView[] = [];
  btnStatus:string="Save";




  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,private route:Router
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
  this.accountLedgerForm.get('LedgerCode')?.enable();
   if (this.accountLedgerForm.value.LedgerId) {
     await this.accountService.updateAccount(this.accountLedgerForm.value).subscribe((data:any)=>{
      if(data.status){
        // this.snackbar.open('Account updated successfully!', 'Close', { duration: 2000 });
        alert("SuccessFully Updated!");
        this.accountLedgerForm.get('LedgerCode')?.disable();
        this.route.navigate(['/account/account-list']);
       }else{
         alert(data.message)
         this.accountLedgerForm.get('LedgerCode')?.disable();
       }
     },(err:any)=>{
      alert(err.error.message)
     });

   } else {
    if(this.accountLedgerForm.valid){
      await this.accountService.createAccount(this.accountLedgerForm.value).subscribe((data:any)=>{
        if(data.status){
         // this.snackbar.open('Account created successfully!', 'Close', { duration: 2000 });
         alert("SuccessFully Save!");
         this.accountLedgerForm.get('LedgerCode')?.disable();
         this.route.navigate(['/account/account-list']);
        }else{
          alert(data.message)
          this.accountLedgerForm.get('LedgerCode')?.disable();
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
        this.accountLedgerForm.patchValue(data.result);
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
  this.accountLedgerForm.reset({
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
