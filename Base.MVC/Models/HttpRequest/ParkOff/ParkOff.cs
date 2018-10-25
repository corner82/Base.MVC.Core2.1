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
        public string parkoffType_id { get; set; }
        public string branch_id { get; set; }
        public string chassis_id { get; set; }
        public string completed_id { get; set; }
        public string pk { get; set; }
    }
}