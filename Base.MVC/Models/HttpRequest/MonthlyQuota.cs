using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
    public class MonthlyQuota
    {
        public string url { get; set; }
        public string sis_quota_id { get; set; }
        public string model_id { get; set; }
        public string year { get; set; }
        public string month_id { get; set; }
        public string quantity { get; set; }
        public string pk { get; set; }
    }
}
