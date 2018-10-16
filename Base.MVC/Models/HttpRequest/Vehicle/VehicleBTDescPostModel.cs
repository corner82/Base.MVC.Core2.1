using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
 //Vehicle Buyback Tradeback Description
    public class VehicleBTDescPostModel
    {
        public string url { get; set; }
        public string description { get; set; }
        public string vehicle_gt_model_id { get; set; }
        public string pk { get; set; }
    }

}
