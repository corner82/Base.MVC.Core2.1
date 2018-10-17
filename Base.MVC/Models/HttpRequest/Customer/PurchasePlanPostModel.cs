using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
 
    public class PurchasePlanPostModel
    {
        public string url { get; set; }
        public string customer_id { get; set; }
        public string last_purchase_date { get; set; }
        public string date_of_purchase { get; set; }
        public string address1 { get; set; }
        public string quantity { get; set; }
        public string description { get; set; }
        public string last_brand { get; set; }
        public string pk { get; set; }
    }

}
