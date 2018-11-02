using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
    public class SysFxrate
    {
        public string end_date { get; set; }
        public string start_date { get; set; }
        public string fix { get; set; }
        public int? id { get; set; }
        public string pk { get; set; }
        public string url { get; set; }
    }
}