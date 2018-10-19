using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
 
    public class ContactPersonProductInterestPostModel
    {
        public string url { get; set; }
        public string customer_contact_persons_id { get; set; }
        public string vehicle_group_id { get; set; }
        public string pk { get; set; }
    }

}
