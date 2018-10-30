using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Target
{
    public class Target
    {
        public string url { get; set; }
        public int? id { get; set; }
        public string target_type_id { get; set; }
        public string role_id { get; set; }
        public string user_id { get; set; }
        public string month_id { get; set; }
        public string pk { get; set; }
    }
}
