﻿using System.ComponentModel.DataAnnotations;

namespace AccountingBackend.Data.Accounting
{
    public class LedgerPosting
    {
        [Key]
        public int LedgerPostingId { get; set; }
        public DateTime Date { get; set; }
        public string NepaliDate { get; set; }
        public int VoucherTypeId { get; set; }
        public string VoucherNo { get; set; }
        public int LedgerId { get; set; }
        public Decimal Debit { get; set; }
        public Decimal Credit { get; set; }
        public int DetailsId { get; set; }
        public int YearId { get; set; }
        public string InvoiceNo { get; set; }
        public string ChequeNo { get; set; }
        public string ChequeDate { get; set; }
        public int CompanyId { get; set; }
        public string ReferenceN { get; set; }
        public string LongReference { get; set; }
        public DateTime? AddedDate { get; set; }
        public DateTime? ModifyDate { get; set; }
    }
}
