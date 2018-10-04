using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Deal
{
    public class VehicleTypeModel
    {
        public int project_id { get; set; }
        public string pk { get; set; }
        public int vehicle_gt_model_id { get; set; }
        public int quantity { get; set; }
        public DateTime delivery_date { get; set; }
        public string url { get; set; }
    }
}
