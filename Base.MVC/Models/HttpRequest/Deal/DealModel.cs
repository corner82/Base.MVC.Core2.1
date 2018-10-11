using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Deal
{
    public class DealModel
    {
        public int customer_id { get; set; }
        public bool is_house_deal { get; set; }
        public string pk { get; set; }
        public string pkIdentity { get; set; }
        public string description { get; set; }
        public int probability_id { get; set; }
        public int reliability_id { get; set; }
        public int discount_rate { get; set; }
        public string url { get; set; }
        public string deal_name { get; set; }
    }
}
