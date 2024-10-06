using AccountingBackend.Data;
using AccountingBackend.Data.Authentication;
using AccountingBackend.Repository.Interface;
using AccountingBackend.Repository.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AccountingBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserAccountService _userAccountService;
        private readonly IConfiguration _config;
        private readonly ICompany _company;
        public LoginController(UserAccountService userAccountService,IConfiguration configuration, ICompany company)
        {
            _userAccountService = userAccountService;
            _config = configuration;
            _company = company;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var isValid = IsValidUser(login);
            if(isValid == null || isValid.Password != login.Password || isValid.Email != login.Email  )
            {
                return Ok(new { staus = false, message = "Invalid user namd or password." });
            }
            var company =await _company.GetbyId(1);
            var token = GenerateJwtToken(company, isValid);
            return Ok(new {status=true,result= token });
         
        }
        private UserAccount IsValidUser(LoginModel login)
        {
            var userAccount = _userAccountService.GetByUserName(login.Email, login.Password);
                  
            return userAccount;
        }

        private string GenerateJwtToken(Company company, UserAccount user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim("CompanyId", company.CompanyId.ToString()),
                new Claim("RoleId", user.RoleId.ToString()),                 
                new Claim("RoleName", user.RoleName),                      
                new Claim("CompanyName", company.CompanyName),
                 new Claim("UserName", user.UserName),

              };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
