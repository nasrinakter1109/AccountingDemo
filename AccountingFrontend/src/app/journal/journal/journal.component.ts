import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountLedgerView } from 'src/app/models/account-ledger-view';
import { JournalMaster } from 'src/app/models/journal-master';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { JournalService } from 'src/app/services/journal.service';
import { ModalService } from 'src/app/Shared/modal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit{
  journalForm:FormGroup;
  _journalForm:FormArray;
  listLedger: AccountLedgerView[] = [];
  totalAmount:number=0;
  totalCredit:number=0;
   debitValue:number=0;
   creditValue:number=0;
   btnStatus:string="Save";
   isSubmit:boolean=false;
   isSaveClick:boolean=false;
  constructor(private fb:FormBuilder,private journalService:JournalService,private accountService:AccountService,private route:Router,private authService: AuthService,private modalService: ModalService){
    const userData = this.authService.getUserData();
    this.journalForm=this.fb.group({
      JournalMasterId : [0],
      SerialNo : [''],
      VoucherNo : ["DRAFT"],
      InvoiceNo : [''],
      Date : [,Validators.required],
      Amount : [0],
      Narration : [''],
      UserId : [userData?.UserName],
      VoucherTypeId : [5],
      FinancialYearId : [1],
      CompanyId : [1],
      Status : ['Draft'],
      listOrder : [[]],
      listDelete : [[]],
    });
    this._journalForm=this.fb.array([]);
  }
  ngOnInit(): void {
    this.loadData();
    this.getSerialNo();
    this.journalForm.get('VoucherNo')?.disable();
    this.addRow();
    this.addRow();
  }
  loadData() {
    this.accountService.getAllAccounts().subscribe((data:any)=>{
    if(data.status){
      this.listLedger=data.result;
    }else{
      this.listLedger=[];
    }
   });
  }
   getSerialNo(){
     this.journalService.getSerialNo().subscribe((data:any)=>{
      if(data.status){
        console.log(data.result)
        this.journalForm.get('SerialNo')?.patchValue(data.result);
        console.log(this.journalForm.get('SerialNo')!.value)
      }
     });
  }
  CheckLedgerBalance(ledgerId:number){
    this.journalService.CheckLedgerBalance(ledgerId).subscribe((data:any)=>{
     if(data.status){
       return data.result;
     }else{
      return 0;
     }
    });
 }
  addRow() {
    this._journalForm.push(
          new FormGroup({
            JournalDetailsId :new FormControl(0,[]),
            JournalMasterId :new FormControl(0,[]),
            LedgerId :new FormControl(0,[]),
            Credit :new FormControl(0,[]),
            Debit :new FormControl(0,[]),
            Narration :new FormControl('',[]),
          })
      );
  }

  debitAmountControl(i:number,elementName:string){
    let debit=this._journalForm.controls[i].get('Debit')!.value;
    let credit=this._journalForm.controls[i].get('Credit')!.value;
    let ledgerId=this._journalForm.controls[i].get('LedgerId')!.value;

    if(elementName==('Debit'+i)){
     this._journalForm.controls[i].patchValue({
       Credit:0
     });
    }else{
     this._journalForm.controls[i].patchValue({
       Debit:0
    });
    }
   this.totalAmount =0;
   this.totalCredit =0;
   this._journalForm.controls.forEach(frmGroup=>{
   let tDebit=Number(frmGroup.get('Debit')!.value);
   let tCredit=Number(frmGroup.get('Credit')!.value);
   this.totalAmount+=tDebit;
   this.totalCredit+=tCredit;
   });
    this.journalForm.get('Amount')!.patchValue(this.totalAmount);

 }

 saveTransaction(){
  let journalEntry=new JournalMaster();
  if(this.journalForm.get('Amount')!.value == this.totalCredit){
    if(this.journalForm.invalid)  {
      this.modalService.show('Warnning', 'Please Fill All the required field!');return;}
    journalEntry=this.journalForm.value;
    journalEntry.Date = new Date(journalEntry.Date).toISOString();
    var filter=this._journalForm.value.filter((item:any)=>item.LedgerId !=null && item.Debit >0 || item.Credit >0 );
    journalEntry.listOrder =filter;
    if(this._journalForm.length>0 && filter.length>0){
      this.journalForm.get('VoucherNo')?.enable();
   this.journalService.saveJournalEntry(journalEntry).subscribe((response:any)=>{
      if(response.status){
        this.modalService.show('Success', 'Form submitted successfully!');;
        this.journalForm.get('VoucherNo')?.disable();
        this.route.navigate(['/account/journal-list']);
      }else{
        this.modalService.show('Failed', 'Form submition Failed!');;
        this.journalForm.get('VoucherNo')?.disable();
        this.route.navigate(['/journal-list']);
        this.isSaveClick=false
      }
   },(error:any)=>{
    this.modalService.show('Error', 'Something went wrong!');
    this.isSubmit=false;
    this.isSaveClick=false;
  } );
  }else{
    this.modalService.show('Warnning', 'Please fill Account Head And Amount!');

  this.isSubmit=false;
  this.isSaveClick=false;
  this.addRow();
  this.addRow();
  this.addRow();
  this.addRow();
  this.addRow();
}
}else{
  this.isSubmit=false;
  this.isSaveClick=false;
  this.modalService.show('Warnning', 'Total Debit value and Total Credit is not same value!');

  }

}
reset(){
  this.isSubmit=false;
  this.isSaveClick=false;
   this.journalForm.reset();
   this._journalForm=this.fb.array([]);
   this.totalAmount=0;
   this.totalCredit=0;
   this.addRow();
   this.addRow();
   //this.router.navigate(['/accounts/transaction/journal-entry']); // navigate to other page
   this.btnStatus="Save";
}

removeRow(index:number){
  let tDebit=this._journalForm.value[index]["debit"];
  let tCredit=this._journalForm.value[index]["credit"];

  this._journalForm.removeAt(index);
}
  get f(){
    return this.journalForm.controls;
  }

  get formVal() {
    return this.journalForm.value;
  }
  getJournalVal(i:number,key:any){
    return this._journalForm.controls[i].get(key)!.value;
  }
}
