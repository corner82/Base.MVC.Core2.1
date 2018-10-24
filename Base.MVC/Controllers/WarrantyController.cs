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
using Base.MVC.Models.HttpRequest.Warranty;

namespace Base.MVC.Controllers
{
    public class WarrantyController : Controller
    {
        private readonly IDistributedCache _distributedCache;
        private QueryCreater _queryCreater;

        public WarrantyController(IDistributedCache distributedCache,
                              QueryCreater queryCreater)
        {
            _distributedCache = distributedCache;
            _queryCreater = queryCreater;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [HttpPost]
        [SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]

        public async Task<IActionResult> WarrantyIdent()
        {
            return View();
        }

        public async Task<IActionResult> FactoryWarrantyIdent()
        {
            return View();
        }
       
        public async Task<IActionResult> Warranty()
        {
            return View();
        }

        //Servis düzenlemeleri 

        /// <summary>
        /// get Vehicle Group
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleGroups()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleGroupsDdList_sysvehiclegroups&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get Vehicle Config ( 4x2, 2x2, 8x4..)
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleConfigTypes()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleConfigTypesDdList_sysvehicleconfigtypes&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get Warranty name (ddslick dropdown)
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkWarrantiesParentsDdList_syswarranties&vehicle_group_id=8&language_code=en&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysWarranties([FromBody] WarrantyNameFilter postModel)
        {
            if (ModelState.IsValid)
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
            else
            {
                throw new Exception("Model state is not valid");
            }
        }

        /// <summary>
        /// get Warranty
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        //[ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        //[ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        //[HttpPost]
        //public async Task<string> SysWarranties()//([FromBody] string test)
        //{
        //    // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

        //    var headers = new Dictionary<string, string>();
        //    var tokenGenerated = HttpContext.Session.GetHmacToken();
        //    headers.Add("X-Hmac", tokenGenerated);
        //    headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
        //    //_hmacManager.test();
        //    //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
        //    //var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkUpdateAct_syswarranties&name=denneea&vehicle_group_id=8&id=5&pk=GsZVzEYe50uGgNM", headers);
        //    var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkWarrantiesParentsDdList_syswarranties&vehicle_group_id=8&language_code=en&pk=GsZVzEYe50uGgNM", headers);
        //    var data = response.Content.ReadAsStringAsync().Result;
        //    return data.ToString();
        //}

        /// <summary>
        /// get Warranty Type
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysWarrantyTypes()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkWarrantyTypesDdList_syswarrantytypes&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get Warranty Month
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysMonths()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkWarrantyMonthsDdList_sysmonths&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get Warranty Mileages
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysMileages()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkMileagesWarrantyDdList_sysmileages&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get Warranty Name Grid
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysWarrantiesGrid([FromBody] DefaultPostModelGridList gridModel)
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
                throw new Exception("Model state is not valid");
            }

        }

        /// <summary>
        /// get Warranty Matrix Grid
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
            //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysWarrantiesTypeGrid([FromBody] DefaultPostModelGridList gridModel)
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
                throw new Exception("Model state is not valid");
            }

        }

        /// <summary>
        /// get Warranty Name with Filter 
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysWarrantyNameFilter([FromHeader] string vehicle_group_id)
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkWarrantiesParentsDdList_syswarranties&language_code=en&pk=GsZVzEYe50uGgNM&vehicle_group_id=" + vehicle_group_id;
                //_hmacManager.test();
                //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
                var response = await HttpClientRequestFactory.Get(url,headers);//("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkWarrantiesParentsDdList_syswarranties&language_code=en&pk=GsZVzEYe50uGgNM&vehicle_group_id=", headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model state is not valid");
            }

        }

        /// <summary>
        /// get Warranty Name Insert
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        /// http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkInsertAct_syswarranties&name=dennee&vehicle_group_id=8&pk=GsZVzEYe50uGgNM
        /// 
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpGet]
        public async Task<string> InsertActSysWarranties()
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

                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syswarranties&name=dennee&vehicle_group_id=8&pk=GsZVzEYe50uGgNM
                //_hmacManager.test();
                //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php" + queryStr, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model state is not valid");
            }

        }

        /// <summary>
        /// add warranty name
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syswarranties&name=dennee&vehicle_group_id=8&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AddWarrantyName([FromBody] WarrantyName warrantyname)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(warrantyname);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model state is not valid");
            }

        }

        /// <summary>
        /// Active/Pasive Warranty Name
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syswarranties&id=29&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysActivePasiveWrName([FromBody] ActivePassivePostModel deleteModel)
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
        /// Delete Warranty Name
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_sysvehiclemodelvariants&id=9&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysDeleteWrName([FromBody] DeletePostModel deleteModel)
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
        /// add warranty name
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syswarranties&name=dennee&vehicle_group_id=8&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AddWarrantyInfo([FromBody] Warranty warrantyinfo)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(warrantyinfo);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model state is not valid");
            }

        }

        /// <summary>
        /// Delete warranty
        ///Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syseducationssalesman&id=8&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysDeleteWarranty([FromBody] DeletePostModel deleteModel)
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
        /// warranty Name Filter
        ///Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkWarrantiesParentsDdList_syswarranties&vehicle_group_id=8&language_code=en&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysVehicleWarranty([FromBody] WarrantyName wrmodel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(wrmodel);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }
    }
}