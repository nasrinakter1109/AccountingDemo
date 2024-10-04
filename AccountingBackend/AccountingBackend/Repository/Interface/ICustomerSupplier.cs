

using AccountingBackend.Data.Accounting;
using AccountingBackend.Data.ViewModel;

namespace AccountingBackend.Repository.Interface
{
    public interface ICustomerSupplier
    {
        Task<List<AccountLedgerView>> GetAll(int id);
        Task<IList<AccountLedgerView>> GetAllExpenses();
        Task<string> GetSerialNo();
        Task<List<AccountLedgerView>> GetAll();
        Task<bool> CheckName(string name);
        Task<int> CheckNameId(string name);
        Task<int> Save(AccountLedger model);
        Task<bool> Update(AccountLedger model);
        Task<AccountLedger> GetbyId(int id);
        Task<bool> Delete(int id);
        Task<List<AccountLedgerView>> GetCashOrBank();
    }
}
