using System;
using System.IO;
using System.Net.Http;
using System.Net;
using System.Web.Http;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System.Data.SqlClient;
using System.Globalization;

namespace AccountingReportWebAPI.Controllers
{
    [RoutePrefix("api/reports")]
    public class DemoReportController : ApiController
    {
        [HttpGet]
        [Route("financial")]
        public HttpResponseMessage GetFinancialReport(DateTime toDate, int companyId)
        {
            try
            {
                // Load the report document
                ReportDocument reportDocument = new ReportDocument();
                string reportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/FinancialReport.rpt");
                reportDocument.Load(reportPath);

                // Set the connection information (if required)
                ConnectionInfo connectionInfo = new ConnectionInfo
                {
                    ServerName = "BELAL-WITH-NUC-",
                    DatabaseName = "QuickAccounting",
                    IntegratedSecurity = true
                };

                foreach (Table table in reportDocument.Database.Tables)
                {
                    TableLogOnInfo tableLogOnInfo = table.LogOnInfo;
                    tableLogOnInfo.ConnectionInfo = connectionInfo;
                    table.ApplyLogOnInfo(tableLogOnInfo);
                }

                // Set parameters for the stored procedure
                reportDocument.SetParameterValue("@toDate", toDate);
                reportDocument.SetParameterValue("@CompanyId", companyId);
                var companyInfo = GetCompanyInfo(companyId);

                // Pass company information to the report
                reportDocument.SetParameterValue("CompanyName", companyInfo.CompanyName); 
                reportDocument.SetParameterValue("Address", companyInfo.Address);
                reportDocument.SetParameterValue("MobileNo", companyInfo.Address);

                // Export to PDF
                Stream stream = reportDocument.ExportToStream(ExportFormatType.PortableDocFormat);
                stream.Seek(0, SeekOrigin.Begin);

                // Create an HTTP response with the file content
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StreamContent(stream)
                };
                response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");
                response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = "FinancialReport.pdf"
                };

                return response;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        private Company GetCompanyInfo(int companyId)
        {
            using (var connection = new SqlConnection("Server=BELAL-WITH-NUC-;Initial Catalog=AccountingDemo;Trusted_Connection=True;TrustServerCertificate=true"))
            {
                string query = "SELECT CompanyName, Address FROM Company WHERE CompanyId = @CompanyId"; 
                var command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@CompanyId", companyId);
                connection.Open();

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new Company
                        {
                            CompanyName = reader["CompanyName"].ToString(),
                            Address = reader["Address"].ToString(),
                            MobileNo = reader["Address"].ToString()
                        };
                    }
                }
            }

            return null; 
        }
    


    }
}
