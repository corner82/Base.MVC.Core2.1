﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Base.Core.Extensions.Object
{
    public static class ObjectExtensions
    {
        public static string GetQueryStringFromObject(this object ob, object obj)
        {
            var properties = from p in obj.GetType().GetProperties()
                             where p.GetValue(obj, null) != null
                             select p.Name + "=" + System.Web.HttpUtility.UrlEncode(p.GetValue(obj, null).ToString());

            return System.String.Join("&", properties.ToArray());
        }

    }
}
