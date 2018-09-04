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

        public async Task<IActionResult> CustomerGrp()
        {
            return View();
        }

        public async Task<IActionResult> Segment()
        {
            return View();
        }

        public async Task<IActionResult> Sector()
        {
            return View();
        }

        public async Task<IActionResult> ReliabilityRate()
        {
            return View();
        }

        public async Task<IActionResult> Brand()
        {
            return View();
        }
        //Contact Person Role
        public async Task<IActionResult> CPRole()
        {
            return View();
        }

        public async Task<IActionResult> VehicleKitType()
        {
            return View();
        }

        public async Task<IActionResult> VehicleModel()
        {
            return View();
        }

        public async Task<IActionResult> TNofVehicles()
        {
            return View();
        }

        public async Task<IActionResult> TNofEmployes()
        {
            return View();
        }

        public async Task<IActionResult> AnnualRevenue()
        {
            return View();
        }

        public async Task<IActionResult> Test()
        {
            return View();
        }

        public async Task<IActionResult> FxRate()
        {
            return View();
        }

        public async Task<IActionResult> WarrantyType()
        {
            return View();
        }

        public async Task<IActionResult> Mil()
        {
            return View();
        }

        public async Task<IActionResult> WarrantyName()
        {
            return View();
        }

        public async Task<IActionResult> DemoLocation()
        {
            return View();
        }

        public async Task<IActionResult> ParkoffType()
        {
            return View();
        }

        public async Task<IActionResult> DemoReqType()
        {
            return View();
        }

        public async Task<IActionResult> BuybackTerrain()
        {
            return View();
        }

        public async Task<IActionResult> Terrain()
        {
            return View();
        }
                        
        public async Task<IActionResult> Month()
        {
            return View();
        }
        
        public async Task<IActionResult> Training()
        {
            return View();
        }

        public async Task<IActionResult> Accessory()
        {
            return View();
        }

        public async Task<IActionResult> Branch()
        {
            return View();
        }
    }
}
