using AccountingBackend.Data.Authentication;
using AccountingBackend.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AccountingBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _user;
        private readonly ICompany _company;
        public UserController(IUser user, ICompany company)
        {
            _user = user;
            _company = company;
        }


        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _user.GetAllRole();
            return Ok(new { status = true, result = roles });
        }
        [HttpGet("Company/{id}")]
        public async Task<IActionResult> GetCompanyDetailsById(int id)
        {
            var companyDetails = await _company.GetbyId(id);
            return Ok(new { status = true, result = companyDetails });
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _user.GetAll();
            return Ok(new { status = true, result = users });
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var users = await _user.GetbyId(id);
            return Ok(new { status = true, result = users });
        }
        [HttpPost]
        public async Task<IActionResult> SaveOrUpdateUser([FromBody] UserMaster userMaster)
        {
            try
            {
                // Check if the user already exists based on the Id property
                if (userMaster.UserId > 0) // Assuming Id is 0 for new users
                {
                    // Update the user
                    var updateResult = await _user.Update(userMaster);
                    if (updateResult)
                    {
                        return Ok(new { status = true, message = "Updated Successfully" });
                    }
                    else
                    {
                        return Ok(new { status = false, message = "Failed to update" });
                    }
                }
                else
                {
                    // Save the new user
                    var saveResult = await _user.Save(userMaster);
                    if (saveResult > 0) // Assuming Save returns the saved user's Id
                    {
                        return Ok(new { status = true, message = "Saved Successfully" });
                    }
                    else
                    {
                        return Ok(new { status = false, message = "Failed to save" });
                    }
                }
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}
