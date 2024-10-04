using AccountingBackend.Data.Accounting;
using AccountingBackend.Data.ViewModel;
using AccountingBackend.Data;
using AccountingBackend.Repository.Interface;
using Microsoft.Data.SqlClient;
using System.Data;
using Microsoft.EntityFrameworkCore;
using Dapper;

namespace AccountingBackend.Repository.Services
{
    public class AccountGroupService : IAccountGroup
    {
        private readonly ApplicationDbContext _context;
        private readonly DatabaseConnection _conn;
        public AccountGroupService(ApplicationDbContext context, DatabaseConnection conn)
        {
            _context = context;
            _conn = conn;
        }
        public async Task<bool> CheckName(string name)
        {
            var checkResult = (from progm in _context.AccountGroup
                               where progm.AccountGroupName == name
                               select progm.AccountGroupId).Count();
            if (checkResult > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<int> CheckNameId(string name)
        {
            var checkResult = (from progm in _context.AccountGroup
                               where progm.AccountGroupName == name
                               select progm.AccountGroupId).Count();
            if (checkResult > 0)
            {

                var checkAccount = (from progm in _context.AccountGroup
                                    where progm.AccountGroupName == name
                                    select progm.AccountGroupId).FirstOrDefault();
                return checkAccount;
            }
            else
            {
                return 0;
            }
        }

        public async Task<bool> Delete(int id)
        {
            var checkResult = await (from progm in _context.AccountLedger
                                     where progm.AccountGroupId == id
                                     select progm.AccountGroupId).CountAsync();
            if (checkResult > 0)
            {
                return false;
            }
            else
            {
                AccountGroup user = await _context.AccountGroup.FindAsync(id);
                _context.Remove(user);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<List<AccountGroupView>> GetAll()
        {
            using (SqlConnection sqlcon = new SqlConnection(_conn.DbConn))
            {
                var ListofPlan = sqlcon.Query<AccountGroupView>("AccountGroupSearch", null, null, true, 0, commandType: CommandType.StoredProcedure).ToList();
                return ListofPlan;
            }
        }

        public async Task<AccountGroup> GetbyId(int id)
        {
            AccountGroup model = await _context.AccountGroup.FindAsync(id);
            return model;
        }

        public async Task<int> Save(AccountGroup model)
        {
            await _context.AccountGroup.AddAsync(model);
            await _context.SaveChangesAsync();
            int id = model.AccountGroupId;
            return id;
        }

        public async Task<bool> Update(AccountGroup model)
        {
            _context.AccountGroup.Update(model);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
