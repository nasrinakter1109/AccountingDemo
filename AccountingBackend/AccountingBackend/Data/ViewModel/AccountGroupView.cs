using System.ComponentModel.DataAnnotations;

namespace AccountingBackend.Data.ViewModel
{
    public class AccountGroupView
    {
        public int AccountGroupId { get; set; }
        [Required]
        public string AccountGroupName { get; set; }
        public string Under { get; set; }
        public string Nature { get; set; }
        public DateTime? AddedDate { get; set; }
        public DateTime? ModifyDate { get; set; }
    }
}
