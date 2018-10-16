using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Deal
{
    public class DealVehicleTypeModel
    {
        public int project_id { get; set; }
        public int? vehicle_groups_id { get; set; }
        public string pk { get; set; }
        public string pkIdentity { get; set; }
        public string language_code { get; set; }
        public string url { get; set; }
    }
}
