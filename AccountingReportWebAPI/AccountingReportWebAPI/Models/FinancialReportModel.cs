using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AccountingReportWebAPI
{
    public class FinancialReportModel
    {
       public string Name {  get; set; }
        public int Id { get; set; }
        public decimal Balance { get; set; }
    }
}