using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AccountingReportWebAPI.Controllers
{
    public class ReportsController : ApiController
    {
        [HttpGet]
        [Route("api/reports/financial")]
        public IHttpActionResult GetFinancialReport()
        {
            // Load the Crystal Report
            ReportDocument reportDocument = new ReportDocument();
            reportDocument.Load(Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/Reports"), "FinancialReport.rpt"));

            // Prepare the data source
            List<FinancialReportModel> financialData = GetFinancialData(); // This method should return your data
            reportDocument.SetDataSource(financialData);

            // Export the report to a PDF file or any other format
            Stream stream = reportDocument.ExportToStream(ExportFormatType.PortableDocFormat);

            // Return the file
            var result = new HttpResponseMessage(System.Net.HttpStatusCode.OK)
            {
                Content = new StreamContent(stream)
            };
            result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");
            result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("inline")
            {
                FileName = "FinancialReport.pdf"
            };
            return ResponseMessage(result);
        }

        private List<FinancialReportModel> GetFinancialData()
        {
            // Replace this with your actual data retrieval logic
            return new List<FinancialReportModel>
            {
                new FinancialReportModel { AccountName = "Account 1", Amount = 1000, Date = DateTime.Now },
                new FinancialReportModel { AccountName = "Account 2", Amount = 1500, Date = DateTime.Now }
            };
        }
    }
}
