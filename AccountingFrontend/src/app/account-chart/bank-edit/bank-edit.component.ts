import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router,RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank-edit',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,CommonModule],
  templateUrl: './bank-edit.component.html',
  styleUrl: './bank-edit.component.css'
})
export class BankEditComponent implements OnInit {
  id?: number;
  bankLedgerForm: FormGroup;
  constructor(private router: ActivatedRoute,private accountService:AccountService,private fb: FormBuilder,private route:Router) {
    this.bankLedgerForm = this.fb.group({
      LedgerId :[0],
      AccountGroupId :[28],
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
    // Retrieve the 'id' parameter and use the non-null assertion operator
    this.router.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // '!' asserts that id will not be null
      console.log('Supplier ID:', this.id);
    });
    this.edit(this.id!)
    this.bankLedgerForm.get('LedgerCode')?.disable();
  }
  async edit(id: number) {
    await this.accountService.getAccountById(id).subscribe((data:any)=>{
      if(data.status){
         this.bankLedgerForm.patchValue(data.result);

      }else{

      }
     });;

  }

   async onSubmit() {
    this.bankLedgerForm.get('LedgerCode')?.enable();
     if (this.bankLedgerForm.value.LedgerId>0) {
       await this.accountService.updateAccount(this.bankLedgerForm.value).subscribe((data:any)=>{
        if(data.status){
         // this.snackbar.open('Account updated successfully!', 'Close', { duration: 2000 });
         alert("SuccessFully Updated!");
         this.bankLedgerForm.get('LedgerCode')?.disable();
         this.route.navigate(['/bank-list']);
        }else{
          alert(data.message)
          this.bankLedgerForm.get('LedgerCode')?.disable();
        }
       },(err:any)=>{
        alert(err.error.message)
       });

     } else {
      console.log(this.bankLedgerForm.value)
      if(this.bankLedgerForm.valid){
        await this.accountService.createAccount(this.bankLedgerForm.value).subscribe((data:any)=>{
          if(data.status){
           // this.snackbar.open('Account created successfully!', 'Close', { duration: 2000 });
           alert("SuccessFully Save!");
           this.bankLedgerForm.get('LedgerCode')?.disable();
           this.route.navigate(['/bank-list']);
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
   resetForm() {
    this.bankLedgerForm.reset({
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
