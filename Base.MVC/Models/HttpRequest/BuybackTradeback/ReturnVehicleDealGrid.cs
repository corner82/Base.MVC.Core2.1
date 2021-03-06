﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.BuybackTradeback
{
    public class ReturnVehicleDealGrid
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
        public int? project_id { get; set; }
    }
}
