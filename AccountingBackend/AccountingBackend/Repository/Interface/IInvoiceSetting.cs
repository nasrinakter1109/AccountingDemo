using AccountingBackend.Data;

namespace AccountingBackend.Repository.Interface
{
    public interface IInvoiceSetting
    {
        Task<List<InvoiceSetting>> GetAll();
        Task<int> CheckNameId(string name);
        Task<bool> Update(InvoiceSetting model);
        Task<InvoiceSetting> GetbyId(int id);
        Task<bool> Delete(int id);
    }
}
