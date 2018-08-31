using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Base.Core.Culture.RequestCulture
{
    public class RequestUriCultureFinder
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _context;
        public RequestUriCultureFinder(IConfiguration configuration,
                                    IHttpContextAccessor context)
        {
            _configuration = configuration;
            _context = context;

            /*var builder = new UriBuilder();
            builder.Scheme = request.Scheme;
            builder.Host = request.Host.Value;
            builder.Path = request.Path;
            builder.Query = request.QueryString.ToUriComponent();
            return builder.Uri;*/
        }

        public string ReplaceCultureCode()
        {
            try {
                //var queryStr = _context.HttpContext.Request.QueryString;
                var uripath = _context.HttpContext.Request.Path;
                //var host = _context.HttpContext.Request.Host.Value;
                if (!string.IsNullOrEmpty(uripath.ToString()))
                {
                    return ReplaceCultureCode(uripath.ToString());
                }
                else
                {
                    return "";
                }
            } catch(Exception ex)
            {
                return "";
            } 
            
           
        }

        private string ReplaceCultureCode(string queryStr)
        {


            StringBuilder queryStrBuilder = new StringBuilder(queryStr);
            queryStrBuilder.Replace("  ", string.Empty);
            queryStrBuilder.Replace(Environment.NewLine, string.Empty);


            string[] queryParts = queryStr.Split('/');

            if(queryParts.Length > 1 && queryParts[1].Contains("-"))
            {
                Dictionary<string, string> langValues = new Dictionary<string, string>()
                {
                    { "tr-tr", "--dil--" },
                    { "de-de", "--dil--" },
                    { "en-us", "--dil--" },
                    { "af-za", "--dil--" },
                };

                /* queryParts[1] = queryParts[1].ToLower();
                 StringBuilder queryPartBuilder = new StringBuilder(queryParts[1]);
                 foreach (string k in langValues.Keys)
                 {
                     queryPartBuilder.Replace(k, langValues[k]);
                     if (queryPartBuilder.ToString() == langValues[k]) break;
                 }*/

                StringBuilder queryPartBuilder = new StringBuilder("--dil--");

                queryParts[1] = queryPartBuilder.ToString();
                queryParts = queryParts.Skip(1).ToArray();
                StringBuilder newQueryStr = new StringBuilder();
                foreach (string k in queryParts)
                {
                    newQueryStr.Append("/"+k);
                }
                return newQueryStr.ToString();
            }

            /*queryStrBuilder.Replace("/" + CultureInfoNames.AF.ToLower() + "/", "/--dil--/");
            queryStrBuilder.Replace("/" + CultureInfoNames.US.ToLower() + "/", "/--dil--/");
            queryStrBuilder.Replace("/" + CultureInfoNames.TR.ToLower() + "/", "/--dil--/");
            queryStrBuilder.Replace("/" + CultureInfoNames.FA.ToLower() + "/", "/--dil--/");
            queryStrBuilder.Replace("/" + CultureInfoNames.AR.ToLower() + "/", "/--dil--/");
            queryStrBuilder.Replace("/" + CultureInfoNames.ZH.ToLower() + "/", "/--dil--/");
            queryStrBuilder.Replace("/" + CultureInfoNames.MX.ToLower() + "/", "/--dil--/");
            queryStrBuilder.Replace("/" + CultureInfoNames.FR.ToLower() + "/", "/--dil--/");
            queryStrBuilder.Replace("/" + CultureInfoNames.RU.ToLower() + "/", "/--dil--/");*/
            return queryStrBuilder.ToString();
        }
       
    }
}
