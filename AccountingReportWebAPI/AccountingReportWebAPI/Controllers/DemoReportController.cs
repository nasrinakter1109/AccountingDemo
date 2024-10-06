using System;
using System.IO;
using System.Net.Http;
using System.Net;
using System.Web.Http;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System.Data.SqlClient;
using System.Globalization;
using System.Data;
using System.Net.Http.Headers;

namespace AccountingReportWebAPI.Controllers
{
    [RoutePrefix("api/demo/reports")]
    public class DemoReportController : ApiController
    {
        [HttpGet]
        [Route("api/FinancialReport/ExportBalanceSheetReport")]
        public HttpResponseMessage ExportBalanceSheetReport(DateTime toDate, int companyId)
        {
            try
            {
                // Create DataSets to hold data from stored procedures
                DataSet balanceSheetDataSet = new DataSet();
                DataSet balanceSheetDetailedDataSet = new DataSet();

                // 1. Execute the BalanceSheet stored procedure
                using (SqlConnection con = new SqlConnection("Server = BELAL - WITH - NUC -; Initial Catalog = AccountingDemo; Trusted_Connection = True; TrustServerCertificate = true"))
                {
                    SqlCommand cmd = new SqlCommand("BalanceSheet", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@toDate", toDate);
                    cmd.Parameters.AddWithValue("@CompanyId", companyId);

                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(balanceSheetDataSet);  // Fill dataset with first stored procedure results
                }

                // 2. Execute the BalanceSheetDetailed stored procedure for each asset/liability
                foreach (DataRow row in balanceSheetDataSet.Tables[0].Rows)  // Assuming first table contains IDs for detailed query
                {
                    int accountGroupId = Convert.ToInt32(row["ID"]);  // Adjust column name according to your result set

                    using (SqlConnection con = new SqlConnection("Server=BELAL-WITH-NUC-;Initial Catalog=AccountingDemo;Trusted_Connection=True;TrustServerCertificate=true"))
                    {
                        SqlCommand cmd = new SqlCommand("BalanceSheetDetailed", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@toDate", toDate);
                        cmd.Parameters.AddWithValue("@CompanyId", companyId);
                        cmd.Parameters.AddWithValue("@AccountGroupId", accountGroupId);
                        cmd.Parameters.AddWithValue("@isAsset", true);  // Set this as true or false depending on type

                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataSet tempDataSet = new DataSet();
                        da.Fill(tempDataSet);  // Fill dataset with second stored procedure results

                        balanceSheetDetailedDataSet.Merge(tempDataSet);  // Merge with detailed dataset
                    }
                }

                // 3. Load and configure the Crystal Report
                ReportDocument reportDocument = new ReportDocument();
                string reportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/FinancialReport.rpt");
                reportDocument.Load(reportPath);

                // 4. Set DataSource for the report
                reportDocument.Database.Tables[0].SetDataSource(balanceSheetDataSet.Tables[0]);
                reportDocument.Database.Tables[1].SetDataSource(balanceSheetDetailedDataSet.Tables[0]);

                // 5. Export report to PDF
                Stream reportStream = reportDocument.ExportToStream(ExportFormatType.PortableDocFormat);
                reportStream.Seek(0, SeekOrigin.Begin);

                // 6. Return the PDF as a file response
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StreamContent(reportStream);
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = "BalanceSheetReport.pdf"
                };
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");

                return response;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



    }
}
