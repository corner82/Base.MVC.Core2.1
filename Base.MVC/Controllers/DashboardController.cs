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

        public async Task<IActionResult> Salesman()
        {
            return View();
        }

        public async Task<IActionResult> Backoffice()
        {
            return View();
        }

        public async Task<IActionResult> Areasales()
        {
            return View();
        }
    }
}