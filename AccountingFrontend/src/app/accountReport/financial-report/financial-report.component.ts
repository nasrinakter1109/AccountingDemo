import { Component } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { ModalService } from 'src/app/Shared/modal.service';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.css']
})
export class FinancialReportComponent {
  constructor(private reportService: ReportService,private modalService: ModalService) { }
  toDate: Date | null = null;
  companyId: number | null = 1;
  onSubmit() {
    if (this.toDate && this.companyId) {
      this.reportService.getFinancialReport(this.toDate, this.companyId).subscribe(response => {
        // Create a blob from the PDF response
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'FinancialReport.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }, error => {
        this.modalService.show('Error', 'Error retraieving the report!');
        console.error('Error retrieving the report', error);
      });
    } else {
      this.modalService.show('Warning', 'Please fill in both fields.!');
      
    }
  }

}
