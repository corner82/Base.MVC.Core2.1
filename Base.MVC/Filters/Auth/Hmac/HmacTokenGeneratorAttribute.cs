using Base.Core.Auth.Hmac;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
//using Wangkanai.Detection;
using Base.Core.Utills.Url;
using Base.Core.Extensions.Session;

namespace Base.Filters.Auth.Hmac
{
    public class HmacTokenGeneratorAttribute : ActionFilterAttribute
    {
        //private readonly IDeviceResolver _deviceResolver;
        private readonly RemoteAddressFinder _remoteAdressFinder;
        public HmacTokenGeneratorAttribute(/*IDeviceResolver deviceResolver,*/
                                           RemoteAddressFinder remoteAdressFinder)
        {
            //_deviceResolver = deviceResolver;
            _remoteAdressFinder = remoteAdressFinder;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var userName = context.HttpContext.Session.GetUserName();
            var password = context.HttpContext.Session.GetUserPassword();
            var privateKey = context.HttpContext.Session.GetUserPrivateKey();
            var ip = _remoteAdressFinder.GetRequestIP();
            /*var device = _deviceResolver.Device;
            var userAgent = _deviceResolver.UserAgent;
            var userAgentString = _deviceResolver.UserAgent.ToString();*/
            var device = "";
            var userAgent = "";
            var userAgentString = "";
            var ticks = DateTime.Now.Ticks;
            var token = HmacServiceManager.GenerateToken(userName, privateKey
                                                            , ip
                                                            , userAgentString
                                                            , ticks);
            context.HttpContext.Session.SetHmacToken(token);
            base.OnActionExecuting(context);
        }
    }
}
