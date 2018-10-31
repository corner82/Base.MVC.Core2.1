using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Deal
{
    public class AksesuarModel
    {
        public string language_code { get; set; }
        public string pk { get; set; }
        public string pkIdentity { get; set; }
        public string url { get; set; }
        public int project_id { get; set; }
        public int vehicles_group_id { get; set; }
        public int vehicle_gt_model_id { get; set; }
        public int acc_option_id { get; set; }
        public int acc_supplier_id { get; set; }
        public int accessories_matrix_id { get; set; }
        public string deal_acc_newvalue { get; set; }
        public string quantity { get; set; }
        public int? id { get; set; }
    }
}
