using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Deal
{
    public class TradeInVehicleModel
    {
        public string language_code { get; set; }
        public string pk { get; set; }
        public string pkIdentity { get; set; }
        public string url { get; set; }
        public int project_id { get; set; }

        public string engine_number { get; set; }
        public string vin_number { get; set; }
        public string km { get; set; }
        public string brand { get; set; }
        //public string vehicle_brand { get; set; }
        public string vehicle_model { get; set; }
        public string license_plate { get; set; }
        public string model_year { get; set; }
        public string waranty { get; set; }
        public string truck_number { get; set; }
        public string embrace_transfer_date { get; set; }
        public string vehicle_location { get; set; }
        public string vehicle_up_desc { get; set; }
        public string vehicle_type_of_body { get; set; }


    }
}
