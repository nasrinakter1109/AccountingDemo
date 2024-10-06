using AccountingBackend.Data.Accounting;
using AccountingBackend.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AccountingBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountLedgerController : ControllerBase
    {
        private readonly ICustomerSupplier _customerSupplier;
        private readonly IAccountGroup _accountGroup;

        public AccountLedgerController(ICustomerSupplier customerSupplier,IAccountGroup accountGroup)
        {
            
            _customerSupplier = customerSupplier;
            _accountGroup = accountGroup;
        }

        [HttpGet("AccountGroup")]
        public async Task<IActionResult> GetAllAccountGroup()
        {
            var result = await _accountGroup.GetAll();
            if (result.Count() >0 )
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
            
        }
        [HttpGet("LedgerCode")]
        public async Task<IActionResult> GetLedgerCode()
        {
            var result = await _customerSupplier.GetSerialNo();
            if (result !=null)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }

        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _customerSupplier.GetAll();
            if (result.Count() > 0)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
        [HttpGet("All/{id}")]
        public async Task<IActionResult> GetAll(int id)
        {
            var result = await _customerSupplier.GetAll(id);
            if (result.Count() > 0)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var accountLedger = await _customerSupplier.GetbyId(id);
            if (accountLedger == null)
            {
                return NotFound();
            }
            return Ok(new { status = true, result = accountLedger });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AccountLedger accountLedger)
        {
             if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the account name already exists
            var exists = await _customerSupplier.CheckName(accountLedger.LedgerName);
            if (exists)
            {
                return Ok(new { status = false, message = "Account name already exists.!" });
            }

            accountLedger.AddedDate = DateTime.UtcNow;
            await _customerSupplier.Save(accountLedger);
            return Ok( new { status=true,message="Saved Successfully!" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AccountLedger accountLedger)
        {
            if (id != accountLedger.LedgerId || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var exists = await _customerSupplier.CheckNameId(accountLedger.LedgerName);
            if (exists == accountLedger.LedgerId || exists==0)
            {
                accountLedger.ModifyDate = DateTime.UtcNow;
                var result = await _customerSupplier.Update(accountLedger);
                if (!result)
                {
                    return Ok(new { status = false, message = "Failed to Update!" });
                }

                return Ok(new { status = true, message = "Updated Successfully!" });                
            }
            return Ok(new { status = false, message = "Account Already Exists!" });

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var accountLedger = await _customerSupplier.GetbyId(id);
            if (accountLedger == null)
            {
                return NotFound();
            }

            if (accountLedger.IsDefault)
            {
                return Ok("Default value cannot be deleted.");
            }

            var result = await _customerSupplier.Delete(id);
            if (!result)
            {
                return Ok("Cannot be deleted. Already in use.");
            }

            return NoContent();
        }
    
    }
}
