using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.BuybackTradeback
{
    public class ReturnVehicle
    {
        public string url { get; set; }
        public int? id { get; set; }
        public string project_id { get; set; }
        public string return_type_id { get; set; }
        public string description { get; set; }
        public string new_return_date { get; set; }
        public string stock_id { get; set; }
        public string pk { get; set; }
    }
}
