using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.RepairMaintenance
{
    public class RepairMaintenance
    {
        public string url { get; set; }
        public int? id { get; set; }
        public string vehicle_group_id { get; set; }
        public string vehicle_gt_model_id { get; set; }
        public string rm_type_id { get; set; }
        public string comfort_super_id { get; set; }
        public string month_id { get; set; }
        public string mileage_id { get; set; }
        public string mothly_price { get; set; }
        public string cpk_price { get; set; }
        public string pk { get; set; }
    }
}