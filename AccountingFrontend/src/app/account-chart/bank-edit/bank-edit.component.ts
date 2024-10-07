import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/Shared/modal.service';

@Component({
  selector: 'app-bank-edit',
  templateUrl: './bank-edit.component.html',
  styleUrls: ['./bank-edit.component.css']
})
export class BankEditComponent implements OnInit {
  id?: number;
  bankLedgerForm: FormGroup;
  constructor(private router: ActivatedRoute,private accountService:AccountService,private fb: FormBuilder,private route:Router,private modalService: ModalService) {
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
    this.router.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
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
    this.modalService.show('Info', 'Form has been reset.');
      this.ngOnInit();
  }
}
