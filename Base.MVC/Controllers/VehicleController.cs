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


namespace Base.MVC.Controllers
{
    public class VehicleController : Controller
    {

        private readonly IDistributedCache _distributedCache;
        public VehicleController(IDistributedCache distributedCache)
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
        [HttpGet]
        [HttpPost]

        public async Task<IActionResult> Vehicle()
        {
            return View();
        }
        

        public async Task<string> sysvehicleckdcbu()
        {
            //Vehicle kit type (CKD, CBU)

            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkVehicleCkdCbuDdList_sysvehicleckdcbu&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        public async Task<string> sysvehiclegroups()
        {
            //Vehicle Model (Groups) (CLA, TGM, TGS,...)

            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkVehicleGroupsDdList_sysvehiclegroups&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        public async Task<string> sysvehiclegtmodels()
        {
            //Vehicle Model Tonaj (CLA, TGM, TGS)

            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkVehicleGtModelsDdList_sysvehiclegtmodels&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        public async Task<string> sysvehicleconfigtypes()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkVehicleConfigTypesDdList_sysvehicleconfigtypes&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        public async Task<string> sysvehicleapptypes()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkVehicleAppTypesDdList_sysvehicleapptypes&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        public async Task<string> sysvehiclebtobts()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkVehicleBtoBtsTypesDdList_sysvehiclebtobts&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        public async Task<string> sysvehiclecabtypes()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkVehicleCapTypesDdList_sysvehiclecaptypes&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }


        public async Task<string> sysvehiclegrouptypes()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkVehicleGroupTypesDdList_sysvehiclegrouptypes&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        public async Task<string> Index1()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.


            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("https://manservices.man.com.tr/SlimProxyBoot.php?url=fillServicesDdlist_infoAfterSales&pk=zC3zCuVV2cttXP6", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
            //return "test";

            // aşağıdaki blok self-signed cert çağırıken kullanılabiliyor
            /*
            using (var httpClientHandler = new HttpClientHandler())
            {
                httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };
                using (var client = new HttpClient(httpClientHandler))
                {
                    // Make your request...
                    client.BaseAddress = new Uri("https://proxy.codebase_v2.com/SlimProxyBoot.php?url=fillServicesDdlist_infoAfterSales&pk=ktibmGO59ym7sIc");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = await client.GetAsync("https://proxy.codebase_v2.com/SlimProxyBoot.php?url=fillServicesDdlist_infoAfterSales&pk=ktibmGO59ym7sIc");
                    var data = response.Content.ReadAsStringAsync().Result;
                    return data.ToString();
                }
            }*/

        }
    }
}