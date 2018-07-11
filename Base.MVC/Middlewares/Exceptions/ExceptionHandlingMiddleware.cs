using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Base.Core.Entities.Log;
using Base.Core.Exceptions.Custom;
using Base.Core.MessageQueue.RabbitMQ;
using Base.Core.Utills.Url;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Base.Middlewares.Exceptions
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        //private readonly ExceptionHandlingLogPublisher _exceptionHandlingLogPublisher;
        private HttpContext _httpContext;
        private readonly RemoteAddressFinder _remoteAdressFinder;
        private PageAccessLogModel _pageAccessLogModel;
        public ExceptionHandlingMiddleware(RequestDelegate next,
                                //ExceptionHandlingLogPublisher exceptionHandlingLogPublisher,
                                            RemoteAddressFinder remoteAdressFinder,
                                            PageAccessLogModel pageAccesslogModel)
        {
            _next = next;
            //_exceptionHandlingLogPublisher = exceptionHandlingLogPublisher;
            _remoteAdressFinder = remoteAdressFinder;
            _pageAccessLogModel = pageAccesslogModel;
            
    }

        public async Task Invoke(HttpContext context)
        {

            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private  Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            //context.Request.Headers.Where(x => x.Key == "HeaderUserAgent").FirstOrDefault().Value;
            var httpContext = context;
            var headers = context.Request.Headers;
            var host = context.Request.Host;
            //var routeValues = context.RouteValues;
            //httpContext.Session

            // aşağıdaki blok 10/07/2018 tarihinde yorum yapıldı. Mustafa Zeynel Dağlı
            /*
            _exceptionHandlingLogPublisher._exceptionHandlingLogModel.UserAgent = headers.Where(x => x.Key == "HeaderUserAgent").FirstOrDefault().Value;
            _exceptionHandlingLogPublisher._exceptionHandlingLogModel.Host = httpContext.Request.Host.Host;
            _exceptionHandlingLogPublisher._exceptionHandlingLogModel.Port = Convert.ToInt32(httpContext.Request.Host.Port);
            */


            //_pageAccessLogModel.Controller = routeValues.Where(x => x.Key == "controller").FirstOrDefault().Value;
            //_pageAccessLogModel.Action = routeValues.Where(x => x.Key == "action").FirstOrDefault().Value;
            //_pageAccessLogModel.SessionID = httpContext.Session.Id;
            //_exceptionHandlingLogPublisher._exceptionHandlingLogModel.Method = httpContext.Request.Method;
            /*_pageAccessLogModel.UserName = httpContext.Session.GetUserName();
            _pageAccessLogModel.UserPrivateKey = httpContext.Session.GetUserPrivateKey();
            _pageAccessLogModel.UserPublicKey = httpContext.Session.GetUserPublicKey();
            _pageAccessLogModel.UserToken = httpContext.Session.GetHmacToken();*/

            // 10/07/2018 tarihinde yorum yapıldı. Mustafa Zeynel Dağlı
            //_exceptionHandlingLogPublisher._exceptionHandlingLogModel.UserIP = _remoteAdressFinder.GetRequestIP();


            /*var controller = context.Controller.ToString();
            var actionProperties = context.ActionDescriptor.Properties;
            var idsplayName = context.ActionDescriptor.DisplayName;
            var actionConstratints = context.ActionDescriptor.ActionConstraints;
            var attribuetRouteInfo = context.ActionDescriptor.AttributeRouteInfo;
            var test = context.ActionDescriptor.Parameters;*/
            var queryString = context.Request.QueryString;
            var method = context.Request.Method;
            var path = context.Request.Path;

            // 10/07/2018 tarihinde yorum yapıldı. Mustafa Zeynel Dağlı
            //_exceptionHandlingLogPublisher.ExceptionLogPublish(/*context*/);




            /*IActionResult result;
            //result = new JsonResult(ex) { StatusCode = context.Response.StatusCode };
            result = new JsonResult(ex) { StatusCode = 404 };
            RouteData routeData = context.GetRouteData();
            ActionDescriptor actionDescriptor = new ActionDescriptor();
            ActionContext actionContext = new ActionContext(context, routeData, actionDescriptor);*/

            var code = HttpStatusCode.InternalServerError; // 500 if unexpected

            if (exception is HttpStatusCodeException) code = HttpStatusCode.NotFound;
            else if (exception is IdentityManagerException) code = HttpStatusCode.Unauthorized;
            else if (exception is RedisManagerException) code = HttpStatusCode.ServiceUnavailable;
            else if(exception is System.Net.Sockets.SocketException) code = HttpStatusCode.BadGateway;
            else if (exception is System.Net.Sockets.SocketException) code = HttpStatusCode.BadGateway;
            else if (exception is NullReferenceException) code = HttpStatusCode.Gone;
            else if (exception is ArgumentNullException) code = HttpStatusCode.LengthRequired;
            else if (exception is ArgumentOutOfRangeException) code = HttpStatusCode.LengthRequired;
            else if (exception is StackOverflowException) code = HttpStatusCode.RequestedRangeNotSatisfiable;
            else if (exception is InvalidOperationException) code = HttpStatusCode.MethodNotAllowed;
            else if (exception is System.Net.Sockets.SocketException) code = HttpStatusCode.BadGateway;

            var result = JsonConvert.SerializeObject(new { error = exception.Message });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class ExceptionHandlingMiddlewareExtensions
    {
        public static IApplicationBuilder UseExceptionHandlingMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionHandlingMiddleware>();
        }
    }
}
