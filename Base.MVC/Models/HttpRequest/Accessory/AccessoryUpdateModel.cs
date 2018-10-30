 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
 
    public class AccessoryUpdateModel
    {
        public string url { get; set; }
        public string id { get; set; }
        public string vehicle_group_id { get; set; }
        public string kpnumber_id { get; set; }
        public string supplier_id { get; set; }
        public string acc_deff_id { get; set; }
        public string accessory_option_id { get; set; }
        public string cost_local { get; set; }
        public string cost_national { get; set; }
        public string part_num_local { get; set; }
        public string part_num_nat { get; set; }
        public string accessory_embrace_no { get; set; }
        public string list_price { get; set; }
        public string pk { get; set; }
    }

}
