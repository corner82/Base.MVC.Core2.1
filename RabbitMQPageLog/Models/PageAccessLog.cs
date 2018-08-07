using System;
using System.Collections.Generic;
using System.Text;

namespace RabbitMQPageLog.Models
{
    public class PageAccessLog
    {
        public int ID { get; set; }
        public int Test { get; set; }
        public string Action { get; set; }
        public string Controller { get; set; }
        public DateTime AccessDate { get; set; }
    }
}
