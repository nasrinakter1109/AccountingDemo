using AccountingBackend.Data.ViewModel;
using AccountingBackend.Data;

namespace AccountingBackend.Repository.Interface
{
    public interface IJournalVoucher
    {
        Task<IList<JournalMasterView>> GetAll(DateTime dtFromDate, DateTime dtToDate, string voucherNo);
        Task<JournalMasterView> JournalView(int id);
        Task<IList<JournalDetailsView>> JournalDetailsView(int id);
        Task<int> Save(JournalMaster model);
        Task<bool> ApprovedOk(JournalMaster model);
        Task<bool> Update(JournalMaster model);
        Task<JournalMaster> GetbyId(int id);
        Task<string> GetSerialNo();
        Task<bool> Delete(JournalMaster model);
        Task<decimal> CheckLedgerBalance(int LedgerId);
    }
}
