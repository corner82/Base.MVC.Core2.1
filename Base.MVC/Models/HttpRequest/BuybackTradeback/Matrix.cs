using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.BuybackTradeback
{
    public class Matrix
    {
        public string url { get; set; }
        public int? id { get; set; }
        public string model_id { get; set; }
        public string terrain_id { get; set; }
        public string month_id { get; set; }
        public string mileage_id { get; set; }
        public string price { get; set; }
        public string comfort_super_id { get; set; }
        public string hydraulics { get; set; }
        public string customer_type_id { get; set; }
        public string pk { get; set; }
    }
}