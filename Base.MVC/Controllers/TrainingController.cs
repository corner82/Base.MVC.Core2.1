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
using Base.Core.Utills.Url;
using Base.Core.Http.HttpRequest.Concrete;
using Microsoft.AspNetCore.Http.Extensions;
using Base.MVC.Models.HttpRequest;
using Base.MVC.Models.HttpRequest.Training;

namespace Base.MVC.Controllers
{
    public class TrainingController : Controller
    {
        private readonly IDistributedCache _distributedCache;
        private QueryCreater _queryCreater;

        public TrainingController(IDistributedCache distributedCache,
                              QueryCreater queryCreater)
        {
            _distributedCache = distributedCache;
            _queryCreater = queryCreater;
        }

        public IActionResult Index()
        {
            return View();
        }

        [SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]

        public async Task<IActionResult> UserTraining()
        {
            return View();
        }

        public async Task<IActionResult> Training()
        {
            return View();
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
        public async Task<string> SysRegionFilter([FromHeader] string country_id )
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCountryRegionsDdList_syscountryregions&language_code=en&pk=GsZVzEYe50uGgNM&country_id=" + 107;//+ country_id;
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
        /// get trainig definitions
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysTrainingDef()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkEducationDefinitionsDdList_syseducationdefinitions&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get trainig definition Grid
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysTrainingDefGrid()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillEducationDefinitionsGridx_syseducationdefinitions&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get trainee
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysTrainee()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillEducationsSalesmanGridx_syseducationssalesman&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get Salesman 
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysSalesman()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkSalesmanDdList_infoUsers&language_code=en&pk=GsZVzEYe50uGgNM";
                var response = await HttpClientRequestFactory.Get(url, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
        }

        /// <summary>
        /// get Salesman 
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysTraningSalesmanGrid()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillEducationsSalesmanGridx_syseducationssalesman&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM";
                var response = await HttpClientRequestFactory.Get(url, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
        }

        /// <summary>
        /// insert training form --- Not: insert etmedi AddTrainingName kullandım...
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        //[ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        //[ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        //[HttpGet]
        //public async Task<string> SysInsertTraining()
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var headers = new Dictionary<string, string>();
        //        var tokenGenerated = HttpContext.Session.GetHmacToken();
        //        headers.Add("X-Hmac", tokenGenerated);
        //        headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());

        //        var encodedURL = Request.GetEncodedUrl();
        //        var pathAndQuery = Request.GetEncodedPathAndQuery();
        //        var displayURL = Request.GetDisplayUrl();
        //        string path = Request.Path.ToString();
        //        string queryStr = Request.QueryString.ToString();

        //        // http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
        //        // http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syseducationdefinitions&name=aracdescriptioni&pk=GsZVzEYe50uGgNM
        //        //_hmacManager.test();
        //        //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
        //        var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
        //        var data = response.Content.ReadAsStringAsync().Result;
        //        return data.ToString();
        //    }
        //    else
        //    {
        //        throw new Exception("Model state is not valid");
        //    }

        //}

        /// <summary>
        /// add training name
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AddTrainingName([FromBody] TrainingName trainingname)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(trainingname);
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
        /// add training info
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AddTrainingInfo([FromBody] TrainingInfo traininginfo)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(traininginfo);
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
        /// Active/Pasive Training Name
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syseducationdefinitions&id=29&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysActivePasiveTrName([FromBody] ActivePasivePostModel deleteModel)
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
        /// Delete traning Name
        ///Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syseducationdefinitions&id=3&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysDeleteTrName([FromBody] DeletePostModel deleteModel)
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

    }
}