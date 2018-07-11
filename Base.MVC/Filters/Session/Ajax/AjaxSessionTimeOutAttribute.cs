using Microsoft.AspNetCore.Mvc.Filters;
using Base.Core.Extensions.Session;
using Microsoft.AspNetCore.Mvc;
using Base.Core.Entities.Session;
using Base.Core.Utills.Url;

namespace Base.Filters.Session.Ajax
{
    public class AjaxSessionTimeOutAttribute : ActionFilterAttribute
    {
        private readonly RemoteAddressFinder _remoteAdresFinder;

        public  AjaxSessionTimeOutAttribute(RemoteAddressFinder remoteAdresFinder) {
            _remoteAdresFinder = remoteAdresFinder;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            //_remoteAdresFinder = context.HttpContext.RequestServices.GetService<RemoteAddressFinder>();
            var user = context.HttpContext.Session.Get<SessionUserModel>("CurrentUser");
            if (user == null)
            {
                //throw new ArgumentNullException();
                //context.Result = new BadRequestObjectResult(context.ModelState);
                context.Result = new StatusCodeResult(403);
            }
            context.HttpContext.Session.Set<SessionUserModel>("CurrentUser", user);
            base.OnActionExecuting(context);
        }
    }
}
