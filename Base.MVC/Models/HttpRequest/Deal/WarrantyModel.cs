using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Deal
{
    public class WarrantyModel
    {
        public string language_code { get; set; }
        public string pk { get; set; }
        public string pkIdentity { get; set; }
        public string url { get; set; }
        public int project_id { get; set; }


        public int vehicle_group_id { get; set; }
        public int vehicles_endgroup_id { get; set; }
        public int monthsx_id { get; set; }
        public int warranty_matrix_id { get; set; }
        public int warranty_type_id { get; set; }
        public string new_price { get; set; }
        public string quantity { get; set; }

    }
}
