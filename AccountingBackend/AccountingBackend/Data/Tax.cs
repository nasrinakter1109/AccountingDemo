using System.ComponentModel.DataAnnotations;

namespace AccountingBackend.Data
{
    public class Tax
    {
        [Key]
        public int TaxId { get; set; }
        [Required]
        public string TaxName { get; set; }
        public Decimal Rate { get; set; }
        public bool IsActive { get; set; }
        public int CompanyId { get; set; }
        public DateTime? AddedDate { get; set; }
        public DateTime? ModifyDate { get; set; }
    }
}
