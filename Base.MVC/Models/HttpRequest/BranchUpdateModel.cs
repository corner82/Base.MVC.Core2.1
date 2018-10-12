using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
 
    public class BranchUpdateModel
    {
        public string url { get; set; }
        public string name { get; set; }
        public string branch_no { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string address3 { get; set; }
        public string postalcode { get; set; }
        public string country_id { get; set; }
        public string country_region_id { get; set; }
        public string city_id { get; set; }
        public string sis_department_id { get; set; }
        public string pk { get; set; }
        public string id { get; set; }
    }

}
