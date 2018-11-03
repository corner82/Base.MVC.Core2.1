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
using Base.MVC.Models.HttpRequest;
using Base.MVC.Models.HttpRequest.Price;
using Microsoft.AspNetCore.Http.Extensions;
using Base.Core.Utills.Url;
using Microsoft.Extensions.Localization;
using Base.Filters.Session.Ajax;
using Base.MVC.Models.HttpRequest.Dashboard;

namespace Base.MVC.Controllers
{
    public class DashboardController : Controller
    {
        private readonly IDistributedCache _distributedCache;
        private readonly IStringLocalizer _localizer;
        private QueryCreater _queryCreater;

        public DashboardController(IDistributedCache distributedCache, IStringLocalizer localizer,
                              QueryCreater queryCreater)

        {
            _distributedCache = distributedCache;
            _localizer = localizer;
            _queryCreater = queryCreater;
        }

        public async Task<IActionResult> Asm()
        {
            return View();
        }

        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkAsmTargetsDashboard_dashboard&pk=GsZVzEYe50uGgNM&language_code=en
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AsmData([FromBody] AsmTargetModel asmtargetmodel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(asmtargetmodel);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AsmDataGridList([FromBody] DefaultPostModelGridList gridModel)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(gridModel);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model satate is not valid");
            }

        }

        public async Task<IActionResult> Keyaccountmanager()
        {
            return View();
        }

        public async Task<IActionResult> Backoffice()
        {
            return View();
        }

        public async Task<IActionResult> Keyaccountchannelhead()
        {
            return View();
        }

        public async Task<IActionResult> Headofsales()
        {
            return View();
        }

        public async Task<IActionResult> Pcdmanager()
        {
            return View();
        }

        public async Task<IActionResult> Pcdsalesman()
        {
            return View();
        }

        public async Task<IActionResult> Salesman()
        {
            return View();
        }

        public async Task<IActionResult> Retailchannelhead()
        {
            return View();
        }
    }
}