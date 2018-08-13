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

namespace Base.MVC.Controllers
{
    public class SysController : Controller
    {

        private readonly IDistributedCache _distributedCache;
        public SysController(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
        }
        public IActionResult Index()
        {
            return View();
        }

        [SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]

        public async Task<IActionResult> Country()
        {
            return View();
        }

        public async Task<IActionResult> State()
        {
            return View();
        }

        public async Task<IActionResult> City()
        {
            return View();
        }

        public async Task<IActionResult> Test()
        {
            return View();
        }
    }
}