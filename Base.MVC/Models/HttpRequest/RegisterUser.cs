using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.Models.HttpRequest
{
    public class RegisterUser
    {
        public string url { get; set; }
        public string user_name { get; set; }
        public string user_email { get; set; }
        public string role { get; set; }
        public string branch { get; set; }
        public string password { get; set; }
        public string password_retype { get; set; }
        public string pk { get; set; }
    }
}