using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Base.Core.Entities.Session;
using Base.Core.Extensions.Session;
using Base.Filters.Auth.Hmac;
using Base.Filters.Log.RabbitMQ;
using Base.Filters.Session;
using Newtonsoft.Json;
using Base.Core.Utills.Url;
using Base.Core.Http.HttpRequest.Concrete;
using Microsoft.AspNetCore.Http.Extensions;
using Base.MVC.Models.HttpRequest;
using Base.MVC.Models.HttpRequest.Training;

namespace Base.MVC.Controllers
{
    public class ParkOffController : Controller
    {
        private readonly IDistributedCache _distributedCache;
        private QueryCreater _queryCreater;

        public ParkOffController(IDistributedCache distributedCache,
                              QueryCreater queryCreater)
        {
            _distributedCache = distributedCache;
            _queryCreater = queryCreater;
        }

        public IActionResult Index()
        {
            return View();
        }

        [SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]

        public async Task<IActionResult> ParkOff()
        {
            return View();
        }
        
    }
}