using System.ComponentModel.DataAnnotations;

namespace AccountingBackend.Data.Authentication
{
    public class Role
    {
        [Key]
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
