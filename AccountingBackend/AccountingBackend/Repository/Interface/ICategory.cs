using AccountingBackend.Data;
using AccountingBackend.Data.ViewModel;

namespace AccountingBackend.Repository.Interface
{
    public interface ICategory
    {
        Task<List<ProductGroupView>> GetAll();
        Task<bool> CheckName(string name);
        Task<int> CheckNameId(string name);
        Task<int> Save(ProductGroup model);
        Task<bool> Update(ProductGroup model);
        Task<ProductGroup> GetbyId(int id);
        Task<bool> Delete(int id);
    }
}
