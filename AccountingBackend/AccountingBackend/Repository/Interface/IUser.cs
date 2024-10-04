using AccountingBackend.Data.Authentication;
using AccountingBackend.Data.ViewModel;
using System.Data;

namespace AccountingBackend.Repository.Interface
{
    public interface IUser
    {
        Task<List<UserView>> GetAll();
        Task<List<Role>> GetAllRole();
        Task<int> Save(UserMaster model);
        Task<bool> Update(UserMaster model);
        Task<UserMaster> GetbyId(int id);
        Task<UserMaster> UserProfile(string email);
        Task<bool> Delete(int id);
    }
}
