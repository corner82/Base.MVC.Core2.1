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
    public class AccessoryController : Controller
    {

        private readonly IDistributedCache _distributedCache;
        private QueryCreater _queryCreater;

        public AccessoryController(IDistributedCache distributedCache,
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

        public async Task<IActionResult> Accessory()
        {
            return View();
        }

/*
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

*/
        /// <summary>
        /// get AccessoryFeature List
        /// Gül Özdemir
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillAccDeffGridx_sysaccdeff&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AccessoryFeatureGridList([FromBody] DefaultPostModelGridList gridModel)
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


        /// <summary>
        /// Active/Passive AccessoryFeature
        ///Gül Özdemir
        /// </summary>
        /// 
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_sysaccdeff&id=1&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> ActivePassiveAccessoryFeature([FromBody] ActivePassivePostModel activepassiveModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(activepassiveModel);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// Delete AccessoryFeature
        ///Gül Özdemir
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_sysaccdeff&id=2&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> DeleteAccessoryFeature([FromBody] DeletePostModel deleteModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(deleteModel);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }


        /// <summary>
        /// Insert AccessoryFeature
        /// Gül Özdemir
        /// </summary>
        ///
        ///http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_sysaccdeff&name_bo=apple&name_sm=apple%20apple&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> InsertAccessoryFeature([FromBody] AccessoryPostModel accessoryModel)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(accessoryModel);
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
        /// Update AccessoryFeature
        /// Gül Özdemir
        /// </summary>
        ///
        ///http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_sysaccdeff&name_bo=apple&name_sm=apple%20apple&id=1&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> UpdateAccessoryFeature([FromBody] AccessoryUpdateModel accessoryModel)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(accessoryModel);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
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