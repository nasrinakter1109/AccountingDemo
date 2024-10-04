using AccountingBackend.Data;
using AccountingBackend.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccountingBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {

        private readonly IInvoiceSetting _invoiceSetting;
        private readonly IProduct _product;
        private readonly ITax _tax;

        public SettingsController(IInvoiceSetting invoiceSetting, IProduct product)
        {
            _invoiceSetting = invoiceSetting;
            _product = product;
        }


        [HttpGet("InvoiceSetting/{id}")]
        public async Task<IActionResult> GetInvoiceSettingById(int id)
        {


            var result = await _invoiceSetting.GetbyId(id);
            if (result != null)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
        [HttpGet("ConvertAmount/{amount}")]
        public async Task<IActionResult> GetConvertAmount(int amount)
        {


            var result =  NumberToWords.ConvertAmount(amount);
            if (result != null)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
        [HttpGet("Product")]
        public async Task<IActionResult> GetAllProduct()
        {


            var result = await _product.ProductWithStock();
            if (result.Count() >0)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }

        [HttpGet("Tax/{id}")]
        public async Task<IActionResult> GetTaxById(int id)
        {


            var result = await _tax.GetbyId(id);
            if (result != null)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
    }
}
