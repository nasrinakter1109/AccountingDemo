import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/Shared/modal.service';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {
  id?: number;
  supplierLedgerForm: FormGroup;
  constructor(private router: ActivatedRoute,private accountService:AccountService,private fb: FormBuilder,private route:Router,private modalService: ModalService) {
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

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      console.log('Supplier ID:', this.id);
    });
    this.edit(this.id!)
    this.supplierLedgerForm.get('LedgerCode')?.disable();
  }

  async edit(id: number) {
    await this.accountService.getAccountById(id).subscribe((data:any)=>{
      if(data.status){
         this.supplierLedgerForm.patchValue(data.result);

      }else{

      }
     });;

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
    this.modalService.show('Info', 'Form has been reset.');
    this.ngOnInit();
  }
}
