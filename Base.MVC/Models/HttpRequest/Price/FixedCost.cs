using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Price
{
    public class FixedCost
    {
        public string url { get; set; }
        public int? id { get; set; }
        public string name { get; set; }
        public string vehicle_gruop_id { get; set; }
        public string vehicle_second_group_id { get; set; }
        public string currency_type_id { get; set; }
        public string start_date { get; set; }
        public string vvalue { get; set; }
        public string warranty_matrix_id { get; set; }
        public string is_all_vehicle { get; set; }
        public string pk { get; set; }
    }
}