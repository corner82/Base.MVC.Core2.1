using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Deal
{
    public class DealBuyBackMatrixGridModel
    {
        public string language_code { get; set; }
        public string pk { get; set; }
        public string pkIdentity { get; set; }
        public string url { get; set; }
        public string page { get; set; }
        public string rows { get; set; }
        public string sort { get; set; }
        public string order { get; set; }
        public string skip { get; set; }
        public string take { get; set; }
        public int terrain_id { get; set; }
        public int comfort_super_id { get; set; }
        public int hydraulics { get; set; }
        public int customer_type_id { get; set; }
        public int model_id { get; set; }

    }
}
