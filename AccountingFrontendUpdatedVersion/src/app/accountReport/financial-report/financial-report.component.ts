import { Component } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-financial-report',
  standalone: true,
  imports: [CommonModule,RouterOutlet,FormsModule],
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.css']
})
export class FinancialReportComponent {
  constructor(private reportService: ReportService) { }
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
        console.error('Error retrieving the report', error);
      });
    } else {
      alert('Please fill in both fields.');
    }
  }

}

