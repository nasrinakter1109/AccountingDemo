using AccountingBackend.Data;
using AccountingBackend.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccountingBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly ISalesInvoice _invoice;
        

        public InvoiceController(ISalesInvoice invoice)
        {

            _invoice = invoice;
        }


        [HttpGet("SerialNo")]
        public async Task<IActionResult> GetSerialNo()
        {


            var result = await _invoice.GetSerialNo();
            if (result != null)
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
            var result = await _invoice.GetAll();
            if (result.Count() > 0)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
        [HttpGet("Search")]
        public async Task<IActionResult> SalesInvoiceSearch(DateTime fromDate,DateTime toDate,string voucherNo,int ledgerId)
        {
            voucherNo = voucherNo?.Trim('"', ' ');
            var result = await _invoice.SalesInvoiceSearch(fromDate,toDate,voucherNo,ledgerId);
            if (result.Count() > 0)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
        [HttpGet("SalesInvoiceMasterView/{SalesMasterId}")]
        public async Task<IActionResult> GetSalesInvoiceMasterView(int SalesMasterId)
        {


            var result = await _invoice.SalesInvoiceMasterView(SalesMasterId);
            if (result != null)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
        [HttpGet("SalesInvoiceDetailsView/{SalesMasterId}")]
        public async Task<IActionResult> GetSalesInvoiceDetailsView(int SalesMasterId)
        {


            var result = await _invoice.SalesInvoiceDetailsView(SalesMasterId);
            if (result != null)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }

        [HttpGet("{SalesMasterId}")]
        public async Task<IActionResult> GetbyId(int SalesMasterId)
        {


            var result = await _invoice.GetbyId(SalesMasterId);
            if (result != null)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
        [HttpPost("Approved")]
        public async Task<IActionResult> ApprovedOk([FromBody] SalesMaster master)
        {
            var result = await _invoice.Approved(master);
            if (result)
            {
                return Ok(new { status = true, message = "Approved Successfully.!" });
            }
            return Ok(new { status = false, message = "Failed to approve!" });
        }
        [HttpPost]
        public async Task<IActionResult> SaveInvoice([FromBody] SalesMaster master)
        {
            var id = await _invoice.Save(master);
            if (id > 0)
            {
                return Ok(new { status = true, message = "Saved Successfully.!" });
            }
            return Ok(new { status = false, message = "Failed to Save!" });
        }
    }
}
