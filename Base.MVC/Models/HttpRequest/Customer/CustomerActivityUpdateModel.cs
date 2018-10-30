using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
 
    public class CustomerActivityUpdateModel
    {
        public string url { get; set; }
        public string id { get; set; }
        public string customer_id { get; set; }
        public string act_date { get; set; }
        public string contact_person_id { get; set; }
        public string cs_activation_type_id { get; set; }
        public string cs_statu_types_id { get; set; }
        public string planned_unplaned_id { get; set; }
        public string cs_act_statutype_id { get; set; }
        public string customer_segment_type_id { get; set; }
        public string vehicle_model_id { get; set; }
        public string activty_tracking_type_id { get; set; }
        public string activity_tracking_date { get; set; }
        public string manager_description { get; set; }
        public string project_id { get; set; }
        public string description { get; set; }
        public string realization_date { get; set; }
        public string report { get; set; }
        public string pk { get; set; }
    }

}
