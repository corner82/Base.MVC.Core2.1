using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Truckstogo
{
    public class Truckstogo
    {
        public string url { get; set; }
        public int? id { get; set; }
        public string stock_id { get; set; }
        public string truckstogo_type_id { get; set; }
        public string description { get; set; }
        public string etd_date { get; set; }
        public string pk { get; set; }
        public string pkIdentity { get; set; }
    }
}