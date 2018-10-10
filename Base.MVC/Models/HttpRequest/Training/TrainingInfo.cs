using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest.Training
{
    public class TrainingInfo
    {
        public string url { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string address3 { get; set; }
        public string postalcode { get; set; } //int
        public string description { get; set; }
        public string education_definition_id { get; set; }//int
        public string user_id { get; set; }//int
        public string city_id { get; set; }//int
        public string education_value { get; set; }//int
        public string edu_start_date { get; set; } //DateTime
        public string edu_end_date { get; set; }//DateTime
        public string pk { get; set; }

    }
}