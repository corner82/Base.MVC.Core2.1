using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Deal
{
    public class DealTradeBackModel
    {
        public string language_code { get; set; }
        public string pk { get; set; }
        public string pkIdentity { get; set; }
        public string url { get; set; }
        public int project_id { get; set; }
        public int vehicles_trade_id { get; set; }
        public int customer_type_id { get; set; }
        public int comfort_super_id { get; set; }
        public int hydraulics_id { get; set; }
        public int buyback_matrix_id { get; set; }
        public int quantity { get; set; }
        public int is_other { get; set; }
        public int other_month_value { get; set; }
        public int other_milages_value { get; set; }
        public string other_description { get; set; }
    }
}
