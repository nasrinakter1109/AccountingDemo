import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { AccountGroupView } from '../../models/account-group-view';

@Component({
  selector: 'app-account-chart-edit',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,CommonModule],
  templateUrl: './account-chart-edit.component.html',
  styleUrl: './account-chart-edit.component.css'
})
export class AccountChartEditComponent implements OnInit {
  id?: number;
  accountLedgerForm: FormGroup;
  listGroup: AccountGroupView[] = [];
  constructor(private router: ActivatedRoute,private accountService:AccountService,private fb: FormBuilder,private route:Router) {
    this.accountLedgerForm = this.fb.group({
      LedgerId :[0],
      AccountGroupId :[],
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
      Type :['Accounts'],
      AccountName :[''],
      AccountNo :[''],
        });
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      console.log('Supplier ID:', this.id);
    });
    this.loadGroups();
    this.edit(this.id!)
    console.log(this.accountLedgerForm.value)
    this.accountLedgerForm.get('LedgerCode')?.disable();
  }
  async edit(id: number) {
    await this.accountService.getAccountById(id).subscribe((data:any)=>{
      if(data.status){
         this.accountLedgerForm.patchValue(data.result);

      }else{

      }
     });;

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
     if (this.accountLedgerForm.value.LedgerId>0) {
       await this.accountService.updateAccount(this.accountLedgerForm.value).subscribe((data:any)=>{
        if(data.status){
         // this.snackbar.open('Account updated successfully!', 'Close', { duration: 2000 });
         alert("SuccessFully Updated!");
         this.accountLedgerForm.get('LedgerCode')?.disable();
         this.route.navigate(['/account-list']);
        }else{
          alert(data.message)
          this.accountLedgerForm.get('LedgerCode')?.disable();
        }
       },(err:any)=>{
        alert(err.error.message)
       });

     } else {
      console.log(this.accountLedgerForm.value)
      if(this.accountLedgerForm.valid){
        await this.accountService.createAccount(this.accountLedgerForm.value).subscribe((data:any)=>{
          if(data.status){
           // this.snackbar.open('Account created successfully!', 'Close', { duration: 2000 });
           alert("SuccessFully Save!");
           this.accountLedgerForm.get('LedgerCode')?.disable();
           this.route.navigate(['/account-list']);
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
   resetForm() {
    this.accountLedgerForm.reset({
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
