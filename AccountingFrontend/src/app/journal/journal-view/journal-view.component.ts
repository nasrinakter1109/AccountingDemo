import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalDetails } from 'src/app/models/journal-details';
import { JournalMaster } from 'src/app/models/journal-master';
import { JournalService } from 'src/app/services/journal.service';
import { SettingsService } from 'src/app/services/settings.service';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from 'src/app/Shared/modal.service';

@Component({
  selector: 'app-journal-view',
  templateUrl: './journal-view.component.html',
  styleUrls: ['./journal-view.component.css']
})
export class JournalViewComponent implements OnInit {
  model: any;
  company: any;
  listJournalDetails: any[] = [];
  strNumberToWords: string = '';
  approveDialogOpen = false;
   setting:any;
  constructor(
    private journalService: JournalService,
    private userService:UserService,
    private modalService: ModalService,
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
          this.modalService.show('Success', 'Form submitted successfully!');
          this.router.navigate(['/journal-list']);
        }
       });

    // }
  }

}
