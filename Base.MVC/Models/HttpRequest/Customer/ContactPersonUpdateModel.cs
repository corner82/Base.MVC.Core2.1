using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
 
    public class ContactPersonUpdateModel
    {
        public string url { get; set; }
        public string id { get; set; }
        public string customer_id { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string email { get; set; }
        public string mobile { get; set; }
        public string phone { get; set; }
        public string fax { get; set; }
        public string priority_id { get; set; }
        public string source_of_lead_id { get; set; }
        public string con_end_date { get; set; }
        public string title_id { get; set; }
        public string title_role_id { get; set; }
        public string brand_loyalty_id { get; set; }
        public string last_brand_id { get; set; }
        public string competitor_satisfaction_id { get; set; }
        public string man_satisfaction_id { get; set; }
        public string pk { get; set; }
    }

}
