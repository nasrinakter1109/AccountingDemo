using AccountingBackend.Data.ViewModel;
using AccountingBackend.Data;
using AccountingBackend.Repository.Interface;
using System.Data;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AccountingBackend.Repository.Services
{
    public class TaxService : ITax
    {
        private readonly ApplicationDbContext _context;
        private readonly DatabaseConnection _conn;
        public TaxService(ApplicationDbContext context, DatabaseConnection conn)
        {
            _context = context;
            _conn = conn;
        }
        public async Task<bool> CheckName(string name)
        {
            var checkResult = (from progm in _context.Tax
                               where progm.TaxName == name
                               select progm.TaxId).Count();
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
            var checkResult = (from progm in _context.Tax
                               where progm.TaxName == name
                               select progm.TaxId).Count();
            if (checkResult > 0)
            {

                var checkAccount = (from progm in _context.Tax
                                    where progm.TaxName == name
                                    select progm.TaxId).FirstOrDefault();
                return checkAccount;
            }
            else
            {
                return 0;
            }
        }

        public async Task<bool> Delete(int TaxId)
        {
            SqlConnection sqlcon = new SqlConnection(_conn.DbConn);
            try
            {
                if (sqlcon.State == ConnectionState.Closed)
                {
                    sqlcon.Open();
                }
                SqlCommand cmd = new SqlCommand("TaxDelete", sqlcon);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter para = new SqlParameter();
                para = cmd.Parameters.Add("@TaxId", SqlDbType.Int);
                para.Value = TaxId;
                long rowAffacted = cmd.ExecuteNonQuery();
                //transaction.Commit();
                if (rowAffacted > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {
                sqlcon.Close();
            }
        }

        public async Task<List<TaxView>> GetAll()
        {
            var result = await (from a in _context.Tax
                                select new TaxView
                                {
                                    TaxId = a.TaxId,
                                    TaxName = a.TaxName,
                                    Rate = a.Rate,
                                    IsActive = a.IsActive
                                }).ToListAsync();
            return result;
        }

        public async Task<Tax> GetbyId(int id)
        {
            Tax model = await _context.Tax.FindAsync(id);
            return model;
        }

        public async Task<int> Save(Tax model)
        {
            await _context.Tax.AddAsync(model);
            await _context.SaveChangesAsync();
            int id = model.TaxId;
            return id;
        }

        public async Task<bool> Update(Tax model)
        {
            _context.Tax.Update(model);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
