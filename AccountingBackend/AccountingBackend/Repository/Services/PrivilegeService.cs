using AccountingBackend.Data.Authentication;
using AccountingBackend.Data;
using System.Data.SqlClient;
using System.Data;
using AccountingBackend.Repository.Interface;
using AccountingBackend.Data.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace AccountingBackend.Repository.Services
{
    public class PrivilegeService : IPrivilege
    {
        private readonly ApplicationDbContext _context;
        private readonly DatabaseConnection _conn;
        public PrivilegeService(ApplicationDbContext context, DatabaseConnection conn)
        {
            _context = context;
            _conn = conn;
        }

        public async Task<bool> Delete(int RoleId)
        {
            using (SqlConnection sqlcon = new SqlConnection(_conn.DbConn))
            {
                await sqlcon.OpenAsync(); // Open the connection asynchronously

                using (SqlCommand cmd = new SqlCommand("DELETE FROM Privilege WHERE RoleId=@RoleId", sqlcon))
                {
                    cmd.CommandType = CommandType.Text;

                    // Use fully qualified name for SqlDbType
                    cmd.Parameters.Add("@RoleId", System.Data.SqlDbType.Int).Value = RoleId;

                    try
                    {
                        int rowsAffected = await cmd.ExecuteNonQueryAsync(); // Execute the command asynchronously

                        // Return true if at least one row was affected
                        return rowsAffected > 0;
                    }
                    catch (Exception ex)
                    {
                        // Log the exception if necessary
                        return false; // Return false in case of an error
                    }
                }
            }
        }

        public async Task<IList<Privilege>> GetbyId(int id)
        {
            var varlist = (from a in _context.Privilege
                           where a.RoleId == id
                           select new Privilege
                           {
                               PrivilegeId = a.PrivilegeId,
                               RoleId = a.RoleId,
                               FormName = a.FormName,
                               AddAction = a.AddAction,
                               EditAction = a.EditAction,
                               DeleteAction = a.DeleteAction,
                               ShowAction = a.ShowAction,
                               CompanyId = a.CompanyId,
                               SettingType = a.SettingType,
                               IsActive = a.IsActive,
                               AddedDate = a.AddedDate,
                               ModifyDate = a.ModifyDate
                           }).ToList();

            return varlist;
        }

        public async Task<PrivilegeView> PriviliageCheck(string FormName, string roleNames)
        {
            var result = await (from a in _context.Privilege
                                join b in _context.Role on a.RoleId equals b.RoleId
                                where a.FormName == FormName && b.RoleName == roleNames
                                select new PrivilegeView
                                {
                                    PrivilegeId = a.PrivilegeId,
                                    FormName = a.FormName,
                                    ShowAction = a.ShowAction
                                }).FirstOrDefaultAsync();
            return result;
        }

        public async Task<bool> Save(Privilege model)
        {
            using (SqlConnection sqlcon = new SqlConnection(_conn.DbConn))
            {
                if (sqlcon.State == ConnectionState.Closed)
                {
                    sqlcon.Open();
                }

                // Check if the Privilege record exists
                SqlCommand checkCmd = new SqlCommand("SELECT COUNT(1) FROM Privilege WHERE PrivilegeId = @PrivilegeId", sqlcon);
                checkCmd.Parameters.AddWithValue("@PrivilegeId", model.PrivilegeId);
                int recordExists = (int)await checkCmd.ExecuteScalarAsync();

                SqlCommand cmd;

                if (recordExists > 0)
                {
                    // Record exists, perform update
                    cmd = new SqlCommand("UPDATE Privilege SET FormName = @FormName, AddAction = @AddAction, EditAction = @EditAction, DeleteAction = @DeleteAction, ShowAction = @ShowAction, RoleId = @RoleId, CompanyId = @CompanyId, SettingType = @SettingType, IsActive = @IsActive, ModifyDate = @ModifyDate WHERE PrivilegeId = @PrivilegeId", sqlcon);
                }
                else
                {
                    // Record doesn't exist, perform insert (if needed)
                    cmd = new SqlCommand("INSERT INTO Privilege (FormName, AddAction, EditAction, DeleteAction, ShowAction, RoleId, CompanyId, SettingType, IsActive, AddedDate, ModifyDate) VALUES (@FormName, @AddAction, @EditAction, @DeleteAction, @ShowAction, @RoleId, @CompanyId, @SettingType, @IsActive, @AddedDate, @ModifyDate)", sqlcon);
                    cmd.Parameters.AddWithValue("@AddedDate", model.AddedDate ?? DateTime.Now);
                }

                // Add common parameters
                cmd.Parameters.AddWithValue("@PrivilegeId", model.PrivilegeId);
                cmd.Parameters.AddWithValue("@FormName", model.FormName);
                cmd.Parameters.AddWithValue("@AddAction", model.AddAction);
                cmd.Parameters.AddWithValue("@EditAction", model.EditAction);
                cmd.Parameters.AddWithValue("@DeleteAction", model.DeleteAction);
                cmd.Parameters.AddWithValue("@ShowAction", model.ShowAction);
                cmd.Parameters.AddWithValue("@RoleId", model.RoleId);
                cmd.Parameters.AddWithValue("@CompanyId", model.CompanyId);
                cmd.Parameters.AddWithValue("@SettingType", model.SettingType);
                cmd.Parameters.AddWithValue("@IsActive", model.IsActive);

                // Handle ModifyDate (always updated on save)
                cmd.Parameters.AddWithValue("@ModifyDate", model.ModifyDate ?? DateTime.Now);

                // Execute the command (insert or update)
                await cmd.ExecuteNonQueryAsync();
            }

            return true;
        }
        public async Task<Role> GetId(int id)
        {
            Role model = await _context.Role.FindAsync(id);
            return model;
        }
    }
}
