using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Deal
{
    public class BodyProposalModel
    {
        public string language_code { get; set; }
        public string pk { get; set; }
        public string pkIdentity { get; set; }
        public string url { get; set; }
        public string body_brand { get; set; }
        public string body_options { get; set; }
        public string body_desc { get; set; }
        public string demand_date { get; set;}
        public int vehicle_group_id { get; set; }
        public int vehicles_endgroup_id { get; set; }
    }
}
