using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Deal
{
    public class BodyExtrasFeaturesModel
    {
        public string language_code { get; set; }
        public string pk { get; set; }
        public string pkIdentity { get; set; }
        public string url { get; set; }
        public int project_id { get; set; }
        public int quantity { get; set; }
        public int vehicles_group_id { get; set; }
        public int vehicles_endgroup_id { get; set; }
        public int body_type_id { get; set; }
        public int body_supplier_id { get; set; }
        public string list_price { get; set; }
        public string new_price { get; set; }
        public int depozit_type_id { get; set; }
        
        public int? id { get; set; }
        public int? body_extras_matrix_id { get; set; }
        public int? body_features_matrix_id { get; set; }
        
    }
}
