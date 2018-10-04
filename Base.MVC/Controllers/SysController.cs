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
using Microsoft.AspNetCore.Http.Extensions;
using Base.Core.Utills.Url;
using Microsoft.Extensions.Localization;
using Base.Filters.Session.Ajax;

namespace Base.MVC.Controllers
{
    public class SysController : Controller
    {

        private readonly IDistributedCache _distributedCache;
        private readonly IStringLocalizer _localizer;
        private QueryCreater _queryCreater;

        public SysController(IDistributedCache distributedCache, IStringLocalizer localizer,
                              QueryCreater queryCreater)
        {
            _distributedCache = distributedCache;
            _localizer = localizer;
            _queryCreater = queryCreater;
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

        public async Task<IActionResult> Province()
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

        public async Task<IActionResult> Supplier()
        {
            return View();
        }

        public async Task<IActionResult> AccessoryFeatureName()
        {
            return View();
        }

        public async Task<IActionResult> Accessory()
        {
            return View();
        }

        public async Task<IActionResult> Body()
        {
            return View();
        }

        public async Task<IActionResult> Branch()
        {
            return View();
        }

        /// <summary>
        /// get priority for deal buyback vehicle types
        /// Mustafa Zeynel Dağlı
        /// </summary>
        /// 
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> PriorityDDSlickServiceProxy([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get priority for deal buyback vehicle types
        /// Mustafa Zeynel Dağlı
        /// </summary>
        /// 
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> DDSlickRealizationRateServiceProxy([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }


        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> IndexPostObjectParameter([FromBody] AddressInfo addressInfo)
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                //_hmacManager.test();
                //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=fillServicesDdlist_infoAfterSales&pk=zC3zCuVV2cttXP6", headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model satate is not valid");
            }

        }


        /// <summary>
        /// get country List (ddslick dropdown)
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysCountrys()
        {
            //Vehicle  type for deal buybacks
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkCountryDdList_syscountrys&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }


        /// <summary>
        /// get Province List (ddslick dropdown)
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        /// 
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpGet]
        public async Task<string> SysCountryRegions()
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());

                //var pathAndQuery = Request.GetEncodedPathAndQuery();
                //var displayURL = Request.GetDisplayUrl();
                //string path = Request.Path.ToString();
                string queryStr = Request.QueryString.ToString();

                //var url = "http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkCountryRegionsDdList_syscountryregions&language_code=en&pk=GsZVzEYe50uGgNM&country_id=" + country_id;

                var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCountryRegionsDdList_syscountryregions&language_code=en&pk=GsZVzEYe50uGgNM&" + queryStr;
                var response = await HttpClientRequestFactory.Get(url, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model satate is not valid");
            }
        }

        /// <summary>
        /// get City List (ddslick dropdown)
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpGet]
        public async Task<string> SysCity()
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());

                //var pathAndQuery = Request.GetEncodedPathAndQuery();
                //var displayURL = Request.GetDisplayUrl();
                //string path = Request.Path.ToString();
                string queryStr = Request.QueryString.ToString();

                var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCityDdList_syscity&language_code=en&pk=GsZVzEYe50uGgNM&" + queryStr;

                var response = await HttpClientRequestFactory.Get(url, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model satate is not valid");
            }
        }

        /// <summary>
        /// get Province List (Country Filter)
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysRegionFilter([FromHeader] string country_id)
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCountryRegionsDdList_syscountryregions&language_code=en&pk=GsZVzEYe50uGgNM&country_id=" + country_id;
                //&country_id=107
                var response = await HttpClientRequestFactory.Get(url, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model state is not valid");
            }

        }

        /// <summary>
        /// get City List (Province Filter)
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysCityFilter([FromHeader] string country_id, [FromHeader] string region_id)
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCityDdList_syscity&language_code=en&pk=GsZVzEYe50uGgNM&country_id=" + country_id + "&region_id=" + region_id;
                //&country_id=107&region_id=1
                var response = await HttpClientRequestFactory.Get(url, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model state is not valid");
            }

        }

        /// <summary>
        /// insert Body form
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpGet]
        public async Task<string> SysInsertBody()
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());

                var encodedURL = Request.GetEncodedUrl();
                var pathAndQuery = Request.GetEncodedPathAndQuery();
                var displayURL = Request.GetDisplayUrl();
                string path = Request.Path.ToString();
                string queryStr = Request.QueryString.ToString();

                // http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_sysaccbodydeff&language_code=en&name=denemeee&acc_body_type_id=1&pk=GsZVzEYe50uGgNM
                //_hmacManager.test();
                //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model satate is not valid");
            }

        }

        /// <summary>
        /// get body List
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysBodyGridList()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillAccBodyDeffGridx_sysaccbodydeff&id=1&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM";
            var response = await HttpClientRequestFactory.Get(url, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

    }
}
