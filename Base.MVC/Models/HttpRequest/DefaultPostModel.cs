using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
    public class DefaultPostModel
    {
        public string language_code { get; set; }
        public string pk { get; set; }
        public string pkIdentity { get; set; }
        public string url { get; set; }

        public int? project_id { get; set; }
        public int? acc_body_types_id { get; set; }
    }
}
