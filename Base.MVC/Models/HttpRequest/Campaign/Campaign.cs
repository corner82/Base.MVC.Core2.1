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
        public string campaign_id { get; set; }
        public string stock_vehicle_id { get; set; }
        public string stock_vehicle_group_id { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }
        public string campaign_price { get; set; }
        public string asm_campaign_limit { get; set; }
        public string salesman_campaign_limit { get; set; }
        public string dealer_campaign_limit { get; set; }
        public string local_support { get; set; }
        public string germany_support { get; set; }
        public string mfs_support { get; set; }
        public string pk { get; set; }
    }
}