import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/Shared/modal.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  id?: number;
  customerLedgerForm: FormGroup;
  constructor(private router: ActivatedRoute,private accountService:AccountService,private fb: FormBuilder,private route:Router,private modalService: ModalService) {
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
    this.router.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
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
     if (this.customerLedgerForm.value.LedgerId) {
       await this.accountService.updateAccount(this.customerLedgerForm.value).subscribe((data:any)=>{
        if(data.status){
          this.modalService.show('Success', 'Form submitted successfully!');
         this.customerLedgerForm.get('LedgerCode')?.disable();
         this.route.navigate(['/account/customer-list']);
        }else{
          this.modalService.show('Failed', 'Form submitted Failed!');
          this.customerLedgerForm.get('LedgerCode')?.disable();
        }
       },(err:any)=>{
        alert(err.error.message)
       });

     } else {
      if(this.customerLedgerForm.valid){
        console.log({saveresult:this.customerLedgerForm.value})
        await this.accountService.createAccount(this.customerLedgerForm.value).subscribe((data:any)=>{
          if(data.status){
            this.modalService.show('Success', 'Form submitted successfully!');
           this.customerLedgerForm.get('LedgerCode')?.disable();
           this.route.navigate(['/account/customer-list']);
          }else{
            this.modalService.show('Failed', 'Form submitted Failed!');
            this.customerLedgerForm.get('LedgerCode')?.disable();
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
    this.customerLedgerForm.reset({
      LedgerId :0,
      AccountGroupId:26,
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
        Type :'Customer',
        AccountName :'',
        AccountNo :'',
    });
    this.modalService.show('Info', 'Form has been reset.');
      this.ngOnInit();
  }
}
