using AccountingBackend.Data;
using AccountingBackend.Data.Accounting;
using AccountingBackend.Data.ViewModel;
using AccountingBackend.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccountingBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JournalController : ControllerBase
    {
        private readonly IJournalVoucher _voucher;
        

        public JournalController(IJournalVoucher voucher)
        {

            _voucher = voucher;
            
        }

       
        [HttpGet("SerialNo")]
        public async Task<IActionResult> GetSerialNo()
        {


            var result = await _voucher.GetSerialNo();
            if (result != null)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
        [HttpGet("CheckLedgerBalance/{ledgerId}")]
        public async Task<IActionResult> GetCheckLedgerBalance(int ledgerId)
        {


            var result = await _voucher.CheckLedgerBalance(ledgerId);
            if (result >0)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
       
        [HttpGet("MasterView/{journalMasterId}")]
        public async Task<IActionResult> JournalMasterView(int journalMasterId)
        {


            var result = await _voucher.JournalView(journalMasterId);
            if (result != null)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
        [HttpGet("DetailsView/{journalMasterId}")]
        public async Task<IActionResult> JournalDetailsView(int journalMasterId)
        {


            var result = await _voucher.JournalDetailsView(journalMasterId);
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

            DateTime dtFromDate = DateTime.UtcNow.AddDays(-7);//it will implement for search later 
            DateTime dtToDate = DateTime.UtcNow;//it will implement for search later 
            string strVoucherNo = string.Empty;//it will implement for search later 
            var result = await _voucher.GetAll(dtFromDate, dtToDate, strVoucherNo);
            if (result.Count() > 0)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
        [HttpGet("{journalMasterId}")]
        public async Task<IActionResult> GetbyId(int journalMasterId)
        {

            
            var result = await _voucher.GetbyId(journalMasterId);
            if (result !=null)
            {
                return Ok(new { status = true, result = result });
            }
            else
            {
                return Ok(new { status = false, result = result });
            }
        }
        [HttpPost("Approved")]
        public async Task<IActionResult> ApprovedOk([FromBody] JournalMaster master)
        {
            var result = await _voucher.ApprovedOk(master);
            if (result)
            {
                return Ok(new { status = true, message = "Approved Successfully.!" });
            }
            return Ok(new { status = false, message = "Failed to approve!" });
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] JournalMaster master)
        {
            var id = await _voucher.Save(master);
            if (id > 0)
            {
                return Ok(new { status = true, message = "Saved Successfully.!" });
            }
            return Ok(new { status = false, message = "Failed to Save!" });
        }
    }
}
