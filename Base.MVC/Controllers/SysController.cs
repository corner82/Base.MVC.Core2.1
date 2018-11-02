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

        public async Task<IActionResult> Branch()
        {
            return View();
        }

        public async Task<IActionResult> FixedCost()
        {
            return View();
        }

        public async Task<IActionResult> PriceListHos()
        {
            return View();
        }

        public async Task<IActionResult> YearlyQuota()
        {
            return View();
        }

        public async Task<IActionResult> MonthlyQuota()
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

        /// <summary>
        /// Delete BranchDealer
        ///Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysDeleteBranch([FromBody] DeletePostModel deleteModel)
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
        /// Insert BranchDealer
        ///Gül Özdemir
        /// </summary>
        ///
        ///http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_sysbranchesdealersdeff&name=asd&branch_no=ZZ55&address1=213123%20street&address2=no%2011&address3=etlik&postalcode=06010&country_id=107&country_region_id=9&city_id=158&sis_department_id=45&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysInsertBranch([FromBody] BranchPostModel branchModel)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(branchModel);
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
        /// Update BranchDealer
        /// Gül Özdemir
        /// </summary>
        ///
        ///http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_sysbranchesdealersdeff&name=asd&branch_no=ZZ55&address1=213123%20street&address2=no%2011&address3=etlik&postalcode=06010&country_id=107&country_region_id=9&city_id=158&sis_department_id=45&pk=GsZVzEYe50uGgNM&id=1
        /// <returns></returns>
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysUpdateBranch([FromBody] CustomerUpdateModel branchModel)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(branchModel);
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
        /// Active/Passive BranchDealer
        ///Gül Özdemir
        /// </summary>
        /// 
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_sysbranchesdealersdeff&id=29&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysActivePassiveBranch([FromBody] ActivePassivePostModel activepassiveModel)
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
        /// get Branch/Dealer List
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysBranchDealerGridList([FromBody] DefaultPostModelGridList gridModel)
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
        public async Task<string> SysCountrys([FromBody] DefaultPostModel postModel)
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
        /// get Province List (ddslick dropdown)
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        /// 
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysCountryRegions([FromBody] ProvincePostModel postModel)
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
        [HttpPost]
        public async Task<string> SysCity([FromBody] CityPostModel postModel)
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

               // http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
               // http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_sysaccbodydeff&language_code=en&name=denemeee&acc_body_type_id=1&pk=GsZVzEYe50uGgNM
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

       /// <summary>
       /// get Yes/No List
       /// Ceydacan Seyrek
       /// </summary>
       /// 
       /// <returns></returns>
       //[SessionTimeOut]
       [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
       [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
       [HttpPost]
       public async Task<string> SysYesNo()
       {
           var headers = new Dictionary<string, string>();
           var tokenGenerated = HttpContext.Session.GetHmacToken();
           headers.Add("X-Hmac", tokenGenerated);
           headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
           var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=fillYesNoTypes_sysSpecificDefinitions&language_code=en&pk=GsZVzEYe50uGgNM";
           var response = await HttpClientRequestFactory.Get(url, headers);
           var data = response.Content.ReadAsStringAsync().Result;
           return data.ToString();

       }


       /*
       [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
       [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
       [HttpPost]
       public async Task<string> SysBranchDealerGridList()
       {
           // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.
           var headers = new Dictionary<string, string>();
           var tokenGenerated = HttpContext.Session.GetHmacToken();
           headers.Add("X-Hmac", tokenGenerated);
           headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
           var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillBranchesDealersDeffGridx_sysbranchesdealersdeff&page=&rows=&sort=&order=&language_code=en&project_id=1&pk=GsZVzEYe50uGgNM";
           var response = await HttpClientRequestFactory.Get(url, headers);
           var data = response.Content.ReadAsStringAsync().Result;
           return data.ToString();
       }
       */

        /// <summary>
        /// get Branch/Dealer Man Office tree List
        /// Gül Özdemir
        /// </summary>
        /// 
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpGet]
        public async Task<string> SysBranchDealerManOfficeTreeList()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = Request.QueryString.ToString();
            var url = "http://proxy.mansis.co.za:18443/SlimProxyBoot.php";

            if (queryStr == ""){
                url = url + "?url=pkFillDepartmentsTree_syssisdepartments&pk=GsZVzEYe50uGgNM&language_code=en";
            }
            else {
                url = url + queryStr + "&url=pkFillDepartmentsTree_syssisdepartments&pk=GsZVzEYe50uGgNM&language_code=en";
            }
            var response = await HttpClientRequestFactory.Get(url, headers);

            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// get Fixed Cost grid 
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFixedSalesCostsGridx_sysfixedsalescosts&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysFixedSalesCostsGrid([FromBody] DefaultPostModelGridList gridModel)
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
        /// Delete Fixed Cost
        ///Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_sysfixedsalescosts&id=33&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysDeleteFixedCost([FromBody] DeletePostModel deleteModel)
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
        /// active passive Fixed Cost
        ///Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_sysfixedsalescosts&id=29&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysActivePassiveFixedCost([FromBody] DeletePostModel deleteModel)
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
        /// add Fixed Cost
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_sysfixedsalescosts&name=gitgel%20cost&vehicle_gruop_id=1&vehicle_second_group_id=&vvalue=1111=&currency_type_id=16&start_date=2018-10-10&is_all_vehicle=1=warranty_matrix_id=&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AddFixedCost([FromBody] FixedCost fixedcost)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(fixedcost);
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
        /// get yearly quota grid 
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillQuotasMatrixGridx_syssisquotasmatrix&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysYearlyQuotaGrid([FromBody] DefaultPostModelGridList gridModel)
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
        /// Delete yearly quota
        ///Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syssisquotasmatrix&id=33&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysDeleteYearlyQuota([FromBody] DeletePostModel deleteModel)
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
        /// active passive yearly quota
        ///Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syssisquotasmatrix&id=29&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysActivePassiveYearlyQuota([FromBody] DeletePostModel deleteModel)
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
        /// add yearly quota
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syssisquotasmatrix&sis_quota_id=1&year=2017&value=150&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AddYearlyQuota([FromBody] YearlyQuota yearlyquota)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(yearlyquota);
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
        /// add monthly quota
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syssismonthlyquotas&sis_quota_id=1&model_id=2&year=2018&month_id=12&quantity=12&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AddMonthlyQuota([FromBody] MonthlyQuota monthlyquota)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(monthlyquota);
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
        /// get RangesQuarters (ddslick dropdown)
        /// Gül Özdemir
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkNumericalRangesQuartersDdList_sysnumericalranges&sis_quota_id=1&year=2017&value=150&id=4&pk=GsZVzEYe50uGgNM&id=55

        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysRangesQuarters([FromBody] DefaultPostModel postModel)
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
        /// get MaybeYesNo(ddslick dropdown)
        /// Gül Özdemir
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=fillMaybeYesNoTypes_sysSpecificDefinitions&sis_quota_id=1&year=2017&value=150&id=4&pk=GsZVzEYe50uGgNM&id=55

        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysMaybeYesNo([FromBody] DefaultPostModel postModel)
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
    
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///Supplier
        /// <summary>
        /// get Supplier List
        /// Gül Özdemir
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillSupplierGridx_syssupplier&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SupplierGridList([FromBody] DefaultPostModelGridList gridModel)
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
        /// Active/Passive Supplier
        /// Gül Özdemir
        /// </summary>
        /// 
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syssupplier&pk=GsZVzEYe50uGgNM&id=6
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> ActivePassiveSupplier([FromBody] ActivePassivePostModel activepassiveModel)
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
        /// Delete Supplier
        /// Gül Özdemir
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syssupplier&id=6&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> DeleteSupplier([FromBody] DeletePostModel deleteModel)
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
        /// Insert Supplier
        /// Gül Özdemir
        /// </summary>
        ///
        ///http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syssupplier&name=ddsd&name_short=dd&abbrevation=d&country_id=0&city_id=0&address1=&address2=&address3=&postalcode=&tel=&fax=&email=&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> InsertSupplier([FromBody] SupplierPostModel supplierModel)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(supplierModel);
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
        /// Update Supplier
        /// Gül Özdemir
        /// </summary>
        ///
        ///http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_syssupplier&name=dzdusd&name_short=dd&abbrevation=d&country_id=0&city_id=0&address1=&address2=&address3=&postalcode=&tel=&fax=&email=&pk=GsZVzEYe50uGgNM&id=2
        /// <returns></returns>
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> UpdateSupplier([FromBody] SupplierUpdateModel supplierModel)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(supplierModel);
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
        /// //////////////////////////////////////////////////////////////////////////////////////////////////

        /// <summary>
        /// Dropdown Supplier
        /// Gül Özdemir
        /// </summary>
        /// Longname
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkSupplierLongDdList_syssupplier&language_code=en&pk=GsZVzEYe50uGgNM
        /// Shortname
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkSupplierShortDdList_syssupplier&language_code=en&pk=GsZVzEYe50uGgNM
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysSupplierDdslick([FromBody] DefaultPostModel postModel)
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
                throw new Exception("Model satate is not valid");
            }
        }
        /// <summary>
        /// add fxrate
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AddFxrate([FromBody] SysFxrate fxrate)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(fxrate);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model state is not valid");
            }

        }

    }


}
