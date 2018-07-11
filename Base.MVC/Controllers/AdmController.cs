﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using Base.Core.Extensions.Session;
using Base.Core.Entities.Session;
using Microsoft.AspNetCore.Http;
using Base.Filters.Auth.Hmac;
using Base.Filters.Session;
using Base.Filters.Log.RabbitMQ;
using Base.Filters.Ajax;
using Base.Filters.Session.Ajax;


namespace Base.MVC.Controllers
{
    [Authorize(Roles = "Admin")]
    //[Route("culture?/[controller]")]
    public class AdmController : Controller
    {
        private readonly IDistributedCache _distributedCache;
        public AdmController(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
        }


        [SessionTimeOut]
        //[ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        public async Task<IActionResult> Dsh()

        {
            
            var user = HttpContext.Session.Get<SessionUserModel>("CurrentUser");
            var ff = JsonConvert.SerializeObject(user);
            _distributedCache.SetString("userTestObj",JsonConvert.SerializeObject(user));
            SessionUserModel model = JsonConvert.DeserializeObject<SessionUserModel>(_distributedCache.GetString("userTestObj"));
            var userName = model.Email;

            var user2 = JsonConvert.DeserializeObject<SessionUserModel>(await _distributedCache.GetStringAsync(user.ConcurrencyStamp));
            var userNmae2 = user2.Email;
            return View();
        }

        [SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        public async Task<IActionResult> Cfg()

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

        [AllowAnonymous]
        //[AjaxOnly]
        [AjaxOnlyOptimized]
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(AjaxSessionTimeOutAttribute))]
        public string DshTest()
        {
            return "test";
        }


    }
}