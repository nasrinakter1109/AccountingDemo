using AccountingBackend.Data.Authentication;
using AccountingBackend.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AccountingBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrivilegeController : ControllerBase
    {
        private readonly IPrivilege _privilege;

        public PrivilegeController(IPrivilege privilege)
        {
            _privilege = privilege;
        }

        

        [HttpGet("{roleId}")]
        public async Task<IActionResult> GetPrivilegesByRoleId(int roleId)
        {
            var privileges = await _privilege.GetbyId(roleId);
            return Ok(new {status=true,result=privileges });
        }

        [HttpPost]
        public async Task<IActionResult> SavePrivilege([FromBody] Privilege model)
        {
            var result = await _privilege.Save(model);
            if (result) // Assuming Save returns the saved user's Id
            {
                return Ok(new { status = result, message = "Saved Successfully" });
            }
            else
            {
                return Ok(new { status = result, message = "Failed to save" });
            }
            
        }

        [HttpDelete("{roleId}")]
        public async Task<IActionResult> DeletePrivilege(int roleId)
        {
            var result = await _privilege.Delete(roleId);
            if (result) // Assuming Save returns the saved user's Id
            {
                return Ok(new { status = result, message = "Saved Successfully" });
            }
            else
            {
                return Ok(new { status = result, message = "Failed to save" });
            }
            
        }

        [HttpGet("privilege-check")]
        public async Task<IActionResult> PrivilegeCheck(string formName, string roleName)
        {
            var result = await _privilege.PriviliageCheck(formName, roleName);
            if (result !=null ) 
            {
                return Ok(new { status = result, message = "Saved Successfully" });
            }
            else
            {
                return Ok(new { status = result, message = "Failed to save" });
            }
        }
    }
}
