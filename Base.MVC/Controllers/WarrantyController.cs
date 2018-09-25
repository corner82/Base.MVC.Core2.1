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
    public class WarrantyController : Controller
    {

        private readonly IDistributedCache _distributedCache;
        public WarrantyController(IDistributedCache distributedCache)
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

        public async Task<IActionResult> WarrantyIdent()
        {
            return View();
        }
       
        public async Task<IActionResult> Warranty()
        {
            return View();
        }

        //Servis düzenlemeleri 

        //Araç grubu--> CLA-TGS..
        public async Task<string> sysvehiclegroups()
        {
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

        //Araç config--> 4x2, 2x2, 8x4..
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

        [HttpPost]
        public async Task<string> syswarranties([FromBody] string test)
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkWarrantiesParentsDdList_syswarranties&vehicle_group_id=8&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }
                
        //Araç config--> 4x2, 2x2, 8x4..
        public async Task<string> syswarrantytypes()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            //_hmacManager.test();
            //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
            var response = await HttpClientRequestFactory.Get("http://91.93.128.181:8080/mansis_services/mansissa_Slim_Proxy_v1/SlimProxyBoot.php?url=pkWarrantyTypesDdList_syswarrantytypes&language_code=en&pk=GsZVzEYe50uGgNM", headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }




    }
}