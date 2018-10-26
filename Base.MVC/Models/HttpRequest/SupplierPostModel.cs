using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
 
    public class SupplierPostModel
    {
        public string url { get; set; }
        public string name { get; set; }
        public string name_short { get; set; }
        public string abbrevation { get; set; }
        public string country_id { get; set; }
        public string city_id { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string address3 { get; set; }
        public string postalcode { get; set; }
        public string tel { get; set; }
        public string fax { get; set; }
        public string email { get; set; }
        public string supplier_embrace_no { get; set; }
        public string pk { get; set; }
    }

}
