using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Deal
{
    public class TradeInModel
    {
        public string language_code { get; set; }
        public string pk { get; set; }
        public string pkIdentity { get; set; }
        public string url { get; set; }
        public int project_id { get; set; }
        public string quantity { get; set; }
        public string topused { get; set; }
        public string customer { get; set; }
        public int over_allowance { get; set; }
    }
}
