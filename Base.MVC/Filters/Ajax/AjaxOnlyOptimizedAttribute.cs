using Base.Core.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Base.Filters.Ajax
{
    public class AjaxOnlyOptimizedAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if(!context.HttpContext.Request.IsAjaxRequest())
            {
                context.Result = new StatusCodeResult(405);
            }
                                
        }
    }
}
