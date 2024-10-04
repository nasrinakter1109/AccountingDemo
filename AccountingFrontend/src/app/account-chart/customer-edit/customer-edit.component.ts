import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router,RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,CommonModule],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit {
  id?: number;
  customerLedgerForm: FormGroup;
  constructor(private router: ActivatedRoute,private accountService:AccountService,private fb: FormBuilder,private route:Router) {
    this.customerLedgerForm = this.fb.group({
      LedgerId :[0],
      AccountGroupId :[26],
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
      Type :['Customer'],
      AccountName :[''],
      AccountNo :[''],
        });
  }

  ngOnInit(): void {
    // Retrieve the 'id' parameter and use the non-null assertion operator
    this.router.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // '!' asserts that id will not be null
      console.log('Customer ID:', this.id);
    });
    this.edit(this.id!)
    this.customerLedgerForm.get('LedgerCode')?.disable();

  }


  async edit(id: number) {
    await this.accountService.getAccountById(id).subscribe((data:any)=>{
      if(data.status){
         this.customerLedgerForm.patchValue(data.result);

      }else{

      }
     });;

  }

   async onSubmit() {
    this.customerLedgerForm.get('LedgerCode')?.enable();
     if (this.customerLedgerForm.value.LedgerId>0) {
       await this.accountService.updateAccount(this.customerLedgerForm.value).subscribe((data:any)=>{
        if(data.status){
         // this.snackbar.open('Account updated successfully!', 'Close', { duration: 2000 });
         alert("SuccessFully Updated!");
         this.customerLedgerForm.get('LedgerCode')?.disable();
         this.route.navigate(['/customer-list']);
        }else{
          alert(data.message)
          this.customerLedgerForm.get('LedgerCode')?.disable();
        }
       },(err:any)=>{
        alert(err.error.message)
       });

     } else {
      console.log(this.customerLedgerForm.value)
      if(this.customerLedgerForm.valid){
        await this.accountService.createAccount(this.customerLedgerForm.value).subscribe((data:any)=>{
          if(data.status){
           // this.snackbar.open('Account created successfully!', 'Close', { duration: 2000 });
           alert("SuccessFully Save!");
           this.customerLedgerForm.get('LedgerCode')?.disable();
           this.route.navigate(['/customer-list']);
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
  }
}
