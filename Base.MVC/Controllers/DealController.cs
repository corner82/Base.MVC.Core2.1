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
    public class DealController : Controller
    {

        private readonly IDistributedCache _distributedCache;
        public DealController(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
        }
       

        [SessionTimeOut]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        public async Task<IActionResult> Add()

        {

            var user = HttpContext.Session.Get<SessionUserModel>("CurrentUser");
            var ff = JsonConvert.SerializeObject(user);
            _distributedCache.SetString("userTestObj", JsonConvert.SerializeObject(user));
            SessionUserModel model = JsonConvert.DeserializeObject<SessionUserModel>(_distributedCache.GetString("userTestObj"));
            var userName = model.Email;

            var user2 = JsonConvert.DeserializeObject<SessionUserModel>(await _distributedCache.GetStringAsync(user.ConcurrencyStamp));
            var userNmae2 = user2.Email;
            return View();
        }

        

    }
}