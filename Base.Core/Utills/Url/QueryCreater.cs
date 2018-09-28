using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Base.Core.Utills.Url
{
    public class QueryCreater
    {

        public  string GetQueryStringFromObject( object obj)
        {
            var properties = from p in obj.GetType().GetProperties()
                             where p.GetValue(obj, null) != null
                             select p.Name + "=" + System.Web.HttpUtility.UrlEncode(p.GetValue(obj, null).ToString());

            return System.String.Join("&", properties.ToArray());
        }


        public string GetQueryStringFromUri()
        {
            var rawurl = "https://bencull.com/some/path?key1=val1&key2=val2&key2=valdouble&key3=";

            var uri = new Uri(rawurl);
            var baseUri = uri.GetComponents(UriComponents.Scheme | UriComponents.Host | UriComponents.Port | UriComponents.Path, UriFormat.UriEscaped);

            var query = QueryHelpers.ParseQuery(uri.Query);

            var items = query.SelectMany(x => x.Value, (col, value) => new KeyValuePair<string, string>(col.Key, value)).ToList();

            items.RemoveAll(x => x.Key == "key3"); // Remove all values for key
            items.RemoveAll(x => x.Key == "key2" && x.Value == "val2"); // Remove specific value for key

            var qb = new QueryBuilder(items);
            qb.Add("nonce", "testingnonce");
            qb.Add("payerId", "pyr_");

            var fullUri = baseUri + qb.ToQueryString();
            return fullUri;
        }
    }
}
