using AccountingBackend.Data;

namespace AccountingBackend.Repository.Interface
{
    public interface ICompany
    {
        Task<bool> Update(Company model);
        Task<Company> GetbyId(int id);
    }
}
