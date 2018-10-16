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
        public string registration_name { get; set; }
        public string name_short { get; set; }
        public string trading_name { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string address3 { get; set; }
        public string postalcode { get; set; }
        public string country_id { get; set; }
        public string country2_id { get; set; }  // Firmanın ana ülkesiymiş.. kullanılmıyor...
        public string country_region_id { get; set; }
        public string city_id { get; set; }
        public string email { get; set; }
        public string phonenumber { get; set; }
        public string www { get; set; }
        public string vatnumber { get; set; }
        public string registration_number { get; set; }
        public string registration_date { get; set; }
        public string segment_type_id { get; set; }
        public string sector_type_id { get; set; }
        public string application_type_id { get; set; }
        public string turnover_rate_id { get; set; }
        public string reliability_id { get; set; }
        public string customer_category_id { get; set; }
        public string ne_count_type_id { get; set; }
        public string nv_count_type_id { get; set; }
        public string embrace_customer_no { get; set; }
        public string tu_emb_customer_no { get; set; }
        public string ce_emb_customer_no { get; set; }
        public string other_emb_customer_no { get; set; }
        public string pk { get; set; }
    }

}
