using AccountingBackend.Data.Accounting;
using AccountingBackend.Data.ViewModel;
using AccountingBackend.Data;
using AccountingBackend.Repository.Interface;
using System.Data.SqlClient;
using System.Data;
using Microsoft.EntityFrameworkCore;
using Dapper;
using System.Threading.Tasks;

namespace AccountingBackend.Repository.Services
{
    public class CustomerSupplierService : ICustomerSupplier
    {
        private readonly ApplicationDbContext _context;
        private readonly DatabaseConnection _conn;
        public CustomerSupplierService(ApplicationDbContext context, DatabaseConnection conn)
        {
            _context = context;
            _conn = conn;
        }
        public async Task<bool> CheckName(string name)
        {
            var checkResult = (from progm in _context.AccountLedger
                               where progm.LedgerName == name
                               select progm.LedgerId).Count();
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
            var checkResult = (from progm in _context.AccountLedger
                               where progm.LedgerName == name
                               select progm.LedgerId).Count();
            if (checkResult > 0)
            {

                var checkAccount = (from progm in _context.AccountLedger
                                    where progm.LedgerName == name
                                    select progm.LedgerId).FirstOrDefault();
                return checkAccount;
            }
            else
            {
                return 0;
            }
        }

        public async Task<bool> Delete(int LedgerId)
        {
            using (SqlConnection sqlcon = new SqlConnection(_conn.DbConn))
            {
                try
                {
                    await sqlcon.OpenAsync(); 

                    using (SqlCommand cmd = new SqlCommand("AccountLedgerDelete", sqlcon))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@LedgerId", System.Data.SqlDbType.Int).Value = LedgerId;
                        long rowAffected = await cmd.ExecuteNonQueryAsync();
                        return rowAffected > 0;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public async Task<List<AccountLedgerView>> GetAll(int id)
        {
            var result = await (from a in _context.AccountLedger
                                join b in _context.AccountGroup on a.AccountGroupId equals b.AccountGroupId
                                where a.AccountGroupId == id
                                select new AccountLedgerView
                                {
                                    LedgerId = a.LedgerId,
                                    LedgerName = a.LedgerName,
                                    LedgerCode = a.LedgerCode,
                                    Phone = a.Phone,
                                    Email = a.Email,
                                    Address = a.Address,
                                    IsDefault = b.IsDefault
                                }).ToListAsync();
            return result;
        }
        public async Task<List<AccountLedgerView>> GetCashOrBank()
        {
            var result = await (from a in _context.AccountLedger
                                join b in _context.AccountGroup on a.AccountGroupId equals b.AccountGroupId
                                where a.AccountGroupId == 27 || a.AccountGroupId == 28
                                select new AccountLedgerView
                                {
                                    LedgerId = a.LedgerId,
                                    LedgerName = a.LedgerName,
                                    LedgerCode = a.LedgerCode,
                                    Phone = a.Phone,
                                    Email = a.Email,
                                    Address = a.Address,
                                    IsDefault = b.IsDefault
                                }).ToListAsync();
            return result;
        }
        public async Task<List<AccountLedgerView>> GetAll()
        {
            var result = await (from a in _context.AccountLedger
                                join b in _context.AccountGroup on a.AccountGroupId equals b.AccountGroupId
                                select new AccountLedgerView
                                {
                                    LedgerId = a.LedgerId,
                                    LedgerName = a.LedgerName,
                                    LedgerCode = a.LedgerCode,
                                    AccountGroupName = b.AccountGroupName,
                                    Phone = a.Phone,
                                    Email = a.Email,
                                    Address = a.Address,
                                    IsDefault = b.IsDefault
                                }).ToListAsync();
            return result;
        }

        public async Task<AccountLedger> GetbyId(int id)
        {
            AccountLedger model = await _context.AccountLedger.FindAsync(id);
            return model;
        }
        public async Task<int> Save(AccountLedger model)
        {
            await _context.AccountLedger.AddAsync(model);
            await _context.SaveChangesAsync();
            int id = model.LedgerId;
            if (model.OpeningBalance > 0)
            {
                //PostingOpeningBalance
                //Customer
                LedgerPosting ledgerPosting = new LedgerPosting();
                ledgerPosting.Date = DateTime.UtcNow;
                ledgerPosting.NepaliDate = String.Empty;
                ledgerPosting.LedgerId = id;
                if (model.CrOrDr == "Dr")
                {
                    ledgerPosting.Debit = model.OpeningBalance;
                    ledgerPosting.Credit = 0;
                }
                else
                {
                    ledgerPosting.Credit = model.OpeningBalance;
                    ledgerPosting.Debit = 0;
                }
                ledgerPosting.VoucherNo = id.ToString();
                ledgerPosting.DetailsId = id;
                ledgerPosting.YearId = 1;
                ledgerPosting.InvoiceNo = id.ToString();
                ledgerPosting.VoucherTypeId = 1;
                ledgerPosting.CompanyId = model.CompanyId;
                ledgerPosting.LongReference = String.Empty;
                ledgerPosting.ReferenceN = String.Empty;
                ledgerPosting.ChequeNo = String.Empty;
                ledgerPosting.ChequeDate = String.Empty;
                ledgerPosting.AddedDate = DateTime.UtcNow;
                _context.LedgerPosting.Add(ledgerPosting);
                await _context.SaveChangesAsync();
            }
            return id;
        }

        public async Task<bool> Update(AccountLedger model)
        {
            _context.AccountLedger.Update(model);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IList<AccountLedgerView>> GetAllExpenses()
        {
            var result = await (from a in _context.AccountLedger
                                join b in _context.AccountGroup on a.AccountGroupId equals b.AccountGroupId
                                where a.AccountGroupId == 13 || a.AccountGroupId == 15
                                select new AccountLedgerView
                                {
                                    LedgerId = a.LedgerId,
                                    LedgerName = a.LedgerName,
                                    LedgerCode = a.LedgerCode,
                                    Phone = a.Phone,
                                    Email = a.Email,
                                    Address = a.Address,
                                    IsDefault = b.IsDefault
                                }).ToListAsync();
            return result;
        }
        public async Task<string> GetSerialNo()
        {
            using (SqlConnection sqlcon = new SqlConnection(_conn.DbConn))
            {
                var val = sqlcon.Query<string>("SELECT ISNULL(MAX(LedgerCode+1),1) as LedgerCode FROM AccountLedger", null, null, true, 0, commandType: CommandType.Text).FirstOrDefault();
                return val;
            }
        }
    }
}
