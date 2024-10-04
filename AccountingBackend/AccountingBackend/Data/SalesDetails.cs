﻿using System.ComponentModel.DataAnnotations;

namespace AccountingBackend.Data
{
    public class SalesDetails
    {
        [Key]
        public int SalesDetailsId { get; set; }
        public int SalesMasterId { get; set; }
        public int OrderDetailsId { get; set; }
        public int QuotationDetailsId { get; set; }
        public int ProductId { get; set; }
        public decimal Qty { get; set; }
        public decimal Rate { get; set; }
        public int UnitId { get; set; }
        public decimal Discount { get; set; }
        public decimal DiscountAmount { get; set; }
        public int TaxId { get; set; }
        public int BatchId { get; set; }
        public decimal TaxRate { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal GrossAmount { get; set; }
        public decimal NetAmount { get; set; }
        public decimal Amount { get; set; }
    }
}
