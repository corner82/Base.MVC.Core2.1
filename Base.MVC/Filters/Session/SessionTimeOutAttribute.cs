using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Base.Core.Entities.Session;
using Base.Core.Extensions.Session;

namespace Base.Filters.Session
{
    public class SessionTimeOutAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var user = filterContext.HttpContext.Session.Get<SessionUserModel>("CurrentUser");
            if ( user == null)
            {
                filterContext.Result = new RedirectResult("~/Acc/Login");
                return;
            } else
            {
                filterContext.HttpContext.Session.Set<SessionUserModel>("CurrentUser", user);
            }
            base.OnActionExecuting(filterContext);
        }

    }
}
