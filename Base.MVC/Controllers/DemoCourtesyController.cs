﻿using System;
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
using Base.Core.Http.HttpRequest.Concrete;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Base.MVC.Models.HttpRequest;
using Base.MVC.Models.HttpRequest.BuybackTradeback;
using Base.Core.Utills.Url;

namespace Base.MVC.Controllers
{
    public class DemoCourtesyController : Controller
    {

        private readonly IDistributedCache _distributedCache;
        private QueryCreater _queryCreater;

        public DemoCourtesyController(IDistributedCache distributedCache,
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

        public async Task<IActionResult> DemoCourtesyReturn()
        {
            return View();
        }
        
        public async Task<IActionResult> DemoCourtesyAllocation()
        {
            return View();
        }
                
        public async Task<IActionResult> DemoCourtesyNewReq()
        {
            return View();
        }

       

    }
}