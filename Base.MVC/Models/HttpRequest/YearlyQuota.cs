using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
    public class YearlyQuota
    {
        public string url { get; set; }
        public int? id { get; set; }
        public string sis_quota_id { get; set; }
        public string year { get; set; }
        public string value { get; set; }
        public string pk { get; set; }
    }
}