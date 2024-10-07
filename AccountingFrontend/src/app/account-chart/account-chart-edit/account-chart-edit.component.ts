import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountGroupView } from 'src/app/models/account-group-view';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/Shared/modal.service';

@Component({
  selector: 'app-account-chart-edit',
  templateUrl: './account-chart-edit.component.html',
  styleUrls: ['./account-chart-edit.component.css']
})
export class AccountChartEditComponent implements OnInit {
  id?: number;
  accountLedgerForm: FormGroup;
  listGroup: AccountGroupView[] = [];
  constructor(private router: ActivatedRoute,private accountService:AccountService,private fb: FormBuilder,private route:Router,private modalService: ModalService) {
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
     if (this.accountLedgerForm.value.LedgerId>0) {
      this.accountLedgerForm.get('LedgerCode')?.enable();
       await this.accountService.updateAccount(this.accountLedgerForm.value).subscribe((data:any)=>{
        if(data.status){
          this.modalService.show('Success', 'Form submitted successfully!');
         this.accountLedgerForm.get('LedgerCode')?.disable();
         this.route.navigate(['/account/account-list']);
        }else{
          this.modalService.show('Error', 'Please fill out all required fields.');
          this.accountLedgerForm.get('LedgerCode')?.disable();
        }
       },(err:any)=>{
        alert(err.error.message)
       });

     } else {
      console.log(this.accountLedgerForm.value)
      if(this.accountLedgerForm.valid){
        this.accountLedgerForm.get('LedgerCode')?.enable();
        await this.accountService.createAccount(this.accountLedgerForm.value).subscribe((data:any)=>{
          if(data.status){
           this.modalService.show('Success', 'Form submitted successfully!');
           this.accountLedgerForm.get('LedgerCode')?.disable();
           this.route.navigate(['/account/account-list']);
          }else{
            this.modalService.show('Error', 'Please fill out all required fields.');
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
      AccountGroupId:0,
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
    //this.route.navigate(['/account/account-list']);
  }
}
