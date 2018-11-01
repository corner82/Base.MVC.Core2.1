 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
 
    public class BodyUpdateModel
    {
        public string url { get; set; }
        public string id { get; set; }
        public string acc_body_deff_id { get; set; }
        public string body_type_id { get; set; }
        public string vehicle_models_id { get; set; }
        public string supplier_id { get; set; }
        public string cost { get; set; }
        public string list_price { get; set; }
        public string embrace_no { get; set; }
        public string pk { get; set; }
    }

}
