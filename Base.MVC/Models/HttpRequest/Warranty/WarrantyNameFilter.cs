﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Warranty
{
    public class WarrantyNameFilter
    {
        public string language_code { get; set; }
        public string pk { get; set; }
        //public string pkIdentity { get; set; }
        public string url { get; set; }
        public string vehicle_group_id { get; set; }
    }
}
