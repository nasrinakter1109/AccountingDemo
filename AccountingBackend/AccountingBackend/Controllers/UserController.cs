using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccountingBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = new List<string> { "User1", "User2" };
            return Ok(users);
        }

        [HttpPost]
        public IActionResult AddUser()
        {
            // Logic to add user
            return Ok();
        }
    }
}
