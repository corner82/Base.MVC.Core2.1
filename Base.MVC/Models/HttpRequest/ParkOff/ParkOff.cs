using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.ParkOff
{
    public class ParkOff
    {
        public string url { get; set; }
        public int? id { get; set; }
        public string parkoff_type_id { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }
        public string stock_id { get; set; }
        public string is_complete { get; set; }
        public string pk { get; set; }
    }
}