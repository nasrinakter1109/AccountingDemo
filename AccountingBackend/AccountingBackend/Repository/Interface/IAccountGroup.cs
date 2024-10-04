using AccountingBackend.Data.Accounting;
using AccountingBackend.Data.ViewModel;

namespace AccountingBackend.Repository.Interface
{
    public interface IAccountGroup
    {
        Task<List<AccountGroupView>> GetAll();
        Task<bool> CheckName(string name);
        Task<int> CheckNameId(string name);
        Task<int> Save(AccountGroup model);
        Task<bool> Update(AccountGroup model);
        Task<AccountGroup> GetbyId(int id);
        Task<bool> Delete(int id);
    }
}
