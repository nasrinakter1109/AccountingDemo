
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { JournalService } from '../../services/journal.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JournalMaster } from '../../models/journal-master';
import { JournalDetails } from '../../models/journal-details';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-journal-view',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,RouterModule, MatSnackBarModule ],
  templateUrl: './journal-view.component.html',
  styleUrl: './journal-view.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JournalViewComponent  implements OnInit {
  model: any;
  company: any;
  listJournalDetails: any[] = [];
  strNumberToWords: string = '';
  approveDialogOpen = false;
   setting:any;
  constructor(
    private journalService: JournalService,
    private userService:UserService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,private router:Router,private settingsService:SettingsService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
     await this.userService.getCompanyById(1).subscribe((data:any)=>{if(data.status){this.company = data.result}});
    await this.journalService.getJournalMasterView(Number(id)).subscribe((data:any)=>{if(data.status){console.log(data.result); this.model = data.result}});
     await this.journalService.getJournalDetailsView(Number(id)).subscribe((data:any)=>{if(data.status){console.log(data.result) ;this.listJournalDetails= data.result}});
    this.strNumberToWords = this.convertAmountToWords(this.model?.Amount);

    await this.settingsService.getInvoiceSetting(5).subscribe((data:any)=>{
      if(data.status){
        this.setting=data.result;
      }
    });
  }

  convertAmountToWords(amount: number): string {
    // Convert the amount to words (implement logic similar to Blazor)
    return '';
  }

  print(): void {
    // Implement printing logic using a printing service or window.print()
  }

  openApproveDialog(): void {
    this.approveDialogOpen = true;
  }

  onApproveDialogClose(accepted: any): void {
    if (accepted) {
      this.approveJournal();
    }
    this.approveDialogOpen = false;
  }

  async approveJournal(): Promise<void> {
    // if (this.model.VoucherNo === '' || this.model.Amount === 0) {
    //   this.snackBar.open('Invalid entry.', 'Close', { duration: 3000 });
    // } else {
      let journalEntry=new JournalMaster();
      journalEntry.Amount=this.model.Amount;
      journalEntry.JournalMasterId=this.model.JournalMasterId;
      journalEntry.SerialNo=this.model.SerialNo;

      journalEntry.InvoiceNo=this.model.InvoiceNo !=null?this.model.InvoiceNo:'';
      journalEntry.Date=this.model.Date;
      journalEntry.Narration=this.model.Narration;
      journalEntry.UserId=this.model.UserId;
      journalEntry.VoucherTypeId=5;
      journalEntry.FinancialYearId=1;
      journalEntry.CompanyId=1;


      for (var item of this.listJournalDetails )
      {
        let details = new JournalDetails();
        if (item != null)
        {
          details.JournalDetailsId = item.JournalDetailsId;
          details.LedgerId = item.LedgerId;
          details.Debit = item.Debit;
          details.Credit = item.Credit;
              details.Narration = item.Narration;
              journalEntry.listOrder.push(details);
          }
      }
      journalEntry.VoucherNo = this.setting.Prefix + this.model.SerialNo + this.setting.Suffix;
      journalEntry.listDelete=[];
      journalEntry.Status = 'Approved';
      this.model.listOrder=this.listJournalDetails;
      this
       await this.journalService.approveJournal(journalEntry).subscribe((data:any)=>{
        if (data.status) {
          // this.snackBar.open('Successfully saved Journal Voucher.', 'Close', { duration: 3000 });
          alert(data.message)
          this.router.navigate(['/journal-list']);
        }
       });

    // }
  }

}
