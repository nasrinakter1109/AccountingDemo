using AccountingBackend.Data;
using AccountingBackend.Data.Authentication;

namespace AccountingBackend.Repository.Services
{
    public class UserAccountService
    {
        private readonly ApplicationDbContext _context;
        public UserAccountService(ApplicationDbContext context)
        {
            _context = context;
        }
        public UserAccount GetByUserName(string email, string password)
        {
            //return _users.FirstOrDefault(x => x.Email == userName);
            var result = (from a in _context.UserMaster
                          join b in _context.Role on a.RoleId equals b.RoleId
                          where a.Email == email && a.Password == password
                          select new UserAccount
                          {
                              UserId = a.UserId,
                              Email = a.Email,
                              Password = a.Password,
                              RoleName = b.RoleName,
                              RoleId=b.RoleId,
                              UserName=a.UserName
                          }).FirstOrDefault();
            return result;
        }
    }
}
