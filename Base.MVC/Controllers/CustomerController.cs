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
using Base.Core.Http.HttpRequest.Concrete;

namespace Base.MVC.Controllers
{
    public class CustomerController : Controller
    {

        private readonly IDistributedCache _distributedCache;
        public CustomerController(IDistributedCache distributedCache)
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

        public async Task<IActionResult> Customer()
        {
            return View();
        }

        public async Task<IActionResult> ActivityMngr()
        {
            return View();
        }


        public async Task<IActionResult> Activity()
        {
            return View();
        }

        public async Task<IActionResult> Test()
        {
            return View();
        }

        /// <summary>
        /// get vehicle types for deal buyback vehicle types
        /// Mustafa Zeynel Dağlı
        /// </summary>
        /// 
        /// <returns></returns>
        [SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> CustomerDDSlickServiceProxy()
        {
            //Vehicle  type for deal buybacks
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkVehiclesEndgroupsCostDdList_sysvehiclesendgroups&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }
    }
}