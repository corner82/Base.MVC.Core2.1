using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Base.Filters.Session;
using Base.Filters.Auth.Hmac;
using Base.Filters.Log.RabbitMQ;
using Base.Core.Extensions.Session;
using Base.Core.Http.HttpRequest.Concrete;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System;
using System.Collections;
using Base.MVC.Models.HttpRequest;
using System.IO;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.AspNetCore.Http.Extensions;
using System.Linq;
using System.Reflection;
using Base.Core.Utills.Url;

namespace Base.MVC.Controllers
{
   
    public class HomeController : Controller
    {

        private readonly IStringLocalizer _localizer;
        private QueryCreater _queryCreater;


        public HomeController(IStringLocalizer localizer,
                              QueryCreater queryCreater)
        {
            _localizer = localizer;
            _queryCreater = queryCreater;
        }

        [SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpGet]
        [HttpPost]
        public async Task<string> Index()
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

        [SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> IndexPostObjectParameter([FromBody] AddressInfo addressInfo)
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            if(ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                

                string test = _queryCreater.GetQueryStringFromObject(addressInfo);
                var encodedURL = Request.GetEncodedUrl();
                Request.GetEncodedPathAndQuery();
               


                //_hmacManager.test();
                //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
                var response = await HttpClientRequestFactory.Get("https://manservices.man.com.tr/SlimProxyBoot.php?url=fillServicesDdlist_infoAfterSales&pk=zC3zCuVV2cttXP6", headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            } else
            {
                throw new Exception("Model satate is not valid");
            }
            
        }

        [SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> IndexPostPrimitiveTypeParameter([FromBody] string  addressInfo)
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.
            if(ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                var response = await HttpClientRequestFactory.Get("https://manservices.man.com.tr/SlimProxyBoot.php?url=fillServicesDdlist_infoAfterSales&pk=zC3zCuVV2cttXP6", headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            } else
            {
                throw new Exception("Model satate is not valid");
            }
            
        }

        [SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> IndexPostPrimitiveTypeParameterFromHeader([FromHeader] string myFirstHeader, [FromHeader] string mySecondHeader)
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

            if(ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                //_hmacManager.test();
                //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
                var response = await HttpClientRequestFactory.Get("https://manservices.man.com.tr/SlimProxyBoot.php?url=fillServicesDdlist_infoAfterSales&pk=zC3zCuVV2cttXP6", headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model satate is not valid");
            }
            
        }


        [SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpGet]
        public async Task<string> IndexGetObjectParameter()
        {
            // aşağıdaki blok self-signed cert kısmında ssl bağlantı sorunu çıkartıyor.

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

                //_hmacManager.test();
                //var response = await HttpClientRequestFactory.Get("http://localhost:58443/api/values/23", headers);
                var response = await HttpClientRequestFactory.Get("https://manservices.man.com.tr/SlimProxyBoot.php?url=fillServicesDdlist_infoAfterSales&pk=zC3zCuVV2cttXP6", headers);
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