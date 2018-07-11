using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.AspNetCore.Routing;
using Base.Core.Extensions;

namespace Base.Filters.Ajax
{
    public  class AjaxOnlyAttribute : ActionMethodSelectorAttribute
    {
        public override  bool IsValidForRequest(RouteContext routeContext, ActionDescriptor action)
        {
            if (!routeContext.HttpContext.Request.IsAjaxRequest()) {
                routeContext.HttpContext.Response.StatusCode = 301;
                return false;
            } else
            {
                return true;
            }
                
        }
    }
}
