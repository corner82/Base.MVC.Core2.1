using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Base.Core.Extensions
{
    public static class HttpRequestExtensions
    {

        private const string RequestedWithHeader = "X-Requested-With";
        private const string XmlHttpRequest = "XMLHttpRequest";

        public static string GetQueryStringFromObject(this HttpRequest request, object obj)
        {
            var properties = from p in obj.GetType().GetProperties()
                             where p.GetValue(obj, null) != null
                             select p.Name + "=" + System.Web.HttpUtility.UrlEncode(p.GetValue(obj, null).ToString());

            return System.String.Join("&", properties.ToArray());
        }

        // use this extension method in webui filters or middleware
        public static bool IsAjaxRequest(this HttpRequest request)
        {
            if (request == null)
            {
                //throw new ArgumentNullException("request");
                return false;
            }

            if (request.Headers != null)
            {
                return request.Headers[RequestedWithHeader] == XmlHttpRequest;
            }

            return false;
        }

        // use this extension method in api calls
        public static bool IsApiCall(this HttpRequest request)
        {
            bool isJson = request.GetTypedHeaders().Accept.Contains(
                new MediaTypeHeaderValue("application/json"));
            if (isJson)
                return true;
            if (request.Path.Value.StartsWith("/api/"))
                return true;
            return false;
        }

        /// <summary>
        /// Retrieve the raw body as a string from the Request.Body stream (without [FromBody] attribute and controller parameters)
        /// </summary>
        /// <param name="request">Request instance to apply to</param>
        /// <param name="encoding">Optional - Encoding, defaults to UTF8</param>
        /// <returns></returns>
        public static async Task<string> GetRawBodyStringAsync(this HttpRequest request, System.Text.Encoding encoding = null)
        {
            if (encoding == null)
                encoding = System.Text.Encoding.UTF8;

            using (StreamReader reader = new StreamReader(request.Body, encoding))
                return await reader.ReadToEndAsync();
        }

        /// <summary>
        /// Retrieves the raw body as a byte array from the Request.Body stream (without [FromBody] attribute and controller parameters)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static async Task<byte[]> GetRawBodyBytesAsync(this HttpRequest request)
        {
            using (var ms = new MemoryStream(2048))
            {
                await request.Body.CopyToAsync(ms);
                return ms.ToArray();
            }
        }
    }
}
