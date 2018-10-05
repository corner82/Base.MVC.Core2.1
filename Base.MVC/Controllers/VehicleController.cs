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
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Base.MVC.Models.HttpRequest;
using Base.Core.Utills.Url;
using Microsoft.AspNetCore.Http.Extensions;

namespace Base.MVC.Controllers
{
    public class VehicleController : Controller
    {

        private readonly IDistributedCache _distributedCache;
        private QueryCreater _queryCreater;

        public VehicleController(IDistributedCache distributedCache,
                                  QueryCreater queryCreater)
        {
            _distributedCache = distributedCache;
            _queryCreater = queryCreater;
        }
        public IActionResult Index()
        {
            return View();
        }

        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpGet]
        [HttpPost]

        public async Task<IActionResult> Vehicle()
        {
            return View();
        }


        /// <summary>
        /// get vehicle types for deal buyback vehicle types
        /// Mustafa Zeynel Dağlı
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleTypesForBuybackInDeal()
        {
            //Vehicle  type for deal buybacks
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehiclesEndgroupsCostDdList_sysvehiclesendgroups&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehicle CKD CBU
        /// Vehicle kit type (CKD, CBU)
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleCKDCBU([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            //url = pkVehicleCkdCbuDdList_sysvehicleckdcbu & language_code = en & pk = GsZVzEYe50uGgNM
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehiclegroups
        /// Vehicle Model (Groups) (CLA, TGM, TGS,...)
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleGroups([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            //url=pkVehicleGroupsDdList_sysvehiclegroups&language_code=en&pk=GsZVzEYe50uGgNM
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehicle grup tonaj models
        /// Vehicle Model Tonaj (CLA, TGM, TGS)
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleGTModels([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            //url = pkVehicleGtModelsDdList_sysvehiclegtmodels & language_code = en & pk = GsZVzEYe50uGgNM
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehicle config types
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleConfigTypes([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            //url=pkVehicleConfigTypesDdList_sysvehicleconfigtypes&language_code=en&pk=GsZVzEYe50uGgNM
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehicle application types
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleAppTypes([FromBody] DefaultPostModel postModel)
        {
 
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            //url = pkVehicleAppTypesDdList_sysvehicleapptypes & language_code = en & pk = GsZVzEYe50uGgNM
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehicle bto/bts
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleBTOBTS([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            //url = pkVehicleBtoBtsTypesDdList_sysvehiclebtobts & language_code = en & pk = GsZVzEYe50uGgNM
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehicle cab types
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleCabTypes([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            //url = pkVehicleCapTypesDdList_sysvehiclecaptypes & language_code = en & pk = GsZVzEYe50uGgNM
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehicle group types
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleGroupTypes([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            //url=pkVehicleGroupTypesDdList_sysvehiclegrouptypes&language_code=en&pk=GsZVzEYe50uGgNM
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehicle model variant
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleModelVariant([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            //url=pkVehicleModelVariantsDdList_sysvehiclemodelvariants&language_code=en&pk=GsZVzEYe50uGgNM

            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehicle model variant
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleKPNumbers([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            //url=pkKpnumbersDdList_syskpnumbers&language_code=en&pk=GsZVzEYe50uGgNM
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehicle brand
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleBrand([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            //url=pkVehicleBrandDdList_sysvehiclebrand&language_code=en&pk=GsZVzEYe50uGgNM
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehicle tonnage
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleTonnage([FromBody] DefaultPostModel postModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModel);
            //url=pkTonnageDdList_systonnage&language_code=en&pk=GsZVzEYe50uGgNM
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }


        /// <summary>
        /// get vehicle List
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleList([FromBody] DefaultPostModel postModelGridList)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(postModelGridList);
            //url=pkFillVehiclesGridx_sysvehicles&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
            //var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?page=&rows=&sort=&order=&" + queryStr, headers);

            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillVehiclesGridx_sysvehicles&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM", headers); var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get vehicle List
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleGridList()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillVehiclesGridx_sysvehicles&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM";
            var response = await HttpClientRequestFactory.Get(url, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// insert vehicle form
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpGet]
        public async Task<string> SysInsertVehicle()
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

                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_sysvehicles&description=aracdescriptioni&factorymodel_name=xcv&gfz=ggttrr&ckdcbu_type_id=1&vehicle_gt_model_id=2&model_variant_id=1&config_type_id=2&cap_type_id=3&vehicle_app_type_id=1&kpnumber_id=5&btsbto_type_id=1&roadtype_id=2&pk=GsZVzEYe50uGgNM
                //_hmacManager.test();
                //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php" + queryStr, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model satate is not valid");
            }

        }



    }
}