﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AccountingReportWebAPI
{
    public class FinancialReportModel
    {
       public DateTime Date {  get; set; }
        public string AccountName { get; set; }
        public decimal Amount { get; set; }
    }
}