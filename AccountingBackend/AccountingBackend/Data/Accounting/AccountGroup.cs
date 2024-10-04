using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccountingBackend.Data.Accounting
{
    public class AccountGroup
    {

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int AccountGroupId { get; set; }
        [Required]
        public string AccountGroupName { get; set; }
        public int GroupUnder { get; set; }
        public string GroupCode { get; set; }
        public int CompanyId { get; set; }
        public string? Narration { get; set; }
        public bool IsDefault { get; set; }
        public string? Nature { get; set; }
        public string? AffectGrossProfit { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifyBy { get; set; }
        public DateTime? AddedDate { get; set; }
        public DateTime? ModifyDate { get; set; } 

    
    }
}
