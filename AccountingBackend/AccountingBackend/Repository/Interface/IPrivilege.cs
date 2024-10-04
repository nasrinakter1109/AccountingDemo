using AccountingBackend.Data.Authentication;
using AccountingBackend.Data.ViewModel;

namespace AccountingBackend.Repository.Interface
{
    public interface IPrivilege
    {

        Task<Role> GetId(int id);
        Task<bool> Save(Privilege model);
        Task<PrivilegeView> PriviliageCheck(string FormName, string RoleName);
        Task<IList<Privilege>> GetbyId(int id);
        Task<bool> Delete(int id);
    }
}
