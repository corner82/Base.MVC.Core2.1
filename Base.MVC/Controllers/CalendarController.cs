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
using Base.MVC.Models.HttpRequest.Calendar;

namespace Base.MVC.Controllers
{
    public class CalendarController : Controller
    {
        private readonly IDistributedCache _distributedCache;
        private readonly IStringLocalizer _localizer;
        private QueryCreater _queryCreater;

        public CalendarController(IDistributedCache distributedCache, IStringLocalizer localizer,
                              QueryCreater queryCreater)

        {
            _distributedCache = distributedCache;
            _localizer = localizer;
            _queryCreater = queryCreater;
        }

        public async Task<IActionResult> Salesman()
        {
            return View();
        }

   
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillCalendarEventsGridx_infocalendarevents&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysCalendar([FromBody] CalendarPostModel calendarmodel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(calendarmodel);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }
    }
}