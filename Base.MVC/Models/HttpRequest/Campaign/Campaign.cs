using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Campaign
{
    public class Campaign
    {
        public string url { get; set; }
        public int? id { get; set; }
        public string chassis_id { get; set; }
        public string model_id { get; set; }
        public string name { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }
        public string price { get; set; }
        public string asmLimit { get; set; }
        public string smLimit { get; set; }
        public string dealerLimit { get; set; }
        public string localSupport { get; set; }
        public string germanySupport { get; set; }
        public string mfsSupport { get; set; }
        public string pk { get; set; }
    }
}       
