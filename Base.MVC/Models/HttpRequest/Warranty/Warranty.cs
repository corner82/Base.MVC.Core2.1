using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Warranty
{
    public class Warranty
    {
        public string url { get; set; }
        public string warranty_id { get; set; }
        public string vehicle_config_type_id { get; set; }
        public string months1_id { get; set; }
        public string mileages1_id { get; set; }
        public string warranty_types_id { get; set; }
        public string ismaintenance { get; set; }
        public string unique_code { get; set; }
        public string price_in_euros { get; set; }
        public string pk { get; set; }
    }
}
