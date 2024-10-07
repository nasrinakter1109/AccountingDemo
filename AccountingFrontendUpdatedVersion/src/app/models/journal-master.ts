import { JournalDetails } from "./journal-details";

export class JournalMaster {
 JournalMasterId : number=0;
 SerialNo : string='';
 VoucherNo : string='';
 InvoiceNo : string='';
 Date : any;
 Amount : number=0;
 Narration : string='';
 UserId : string='';
 VoucherTypeId : number=0;
 FinancialYearId : number=0;
 CompanyId : number=0;
 Status : string='';
 listOrder : JournalDetails[]=[];
 listDelete : any[]=[];
}
