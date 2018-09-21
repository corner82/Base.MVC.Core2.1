using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Localization.Routing;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using Base.Core.Exceptions.Custom;
using Base.Middlewares.Exceptions;
using Base.Core.Culture;
using Base.Core.Utills.Url;
using Base.Core.Auth.Hmac;
using Base.Core.MessageQueue.RabbitMQ;
using Base.Core.Entities.Log;
using Base.Core.Entities.Identity;
using Base.Filters.Session.Ajax;
using Base.Filters.Auth.Hmac;
using Base.Filters.Log.RabbitMQ;
using Base.Core.Culture.RequestCulture;

namespace Base.MVC
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            /*services.Configure<RequestLocalizationOptions>(options =>
           {
               CultureInfo[] supportedCultures = new[]
                   {
                   new CultureInfo("en-us"),
                   new CultureInfo("en-AU"),
                   new CultureInfo("en-GB"),
                   new CultureInfo("en"),
                   new CultureInfo("es-ES"),
                   new CultureInfo("es-MX"),
                   new CultureInfo("es"),
                   new CultureInfo("fr-fr"),
                   new CultureInfo("fr"),
                   new CultureInfo("tr"),
               };

               options.DefaultRequestCulture = new RequestCulture("es-ES");
               options.SupportedCultures = supportedCultures;
               options.SupportedUICultures = supportedCultures;
               options.RequestCultureProviders = new List<IRequestCultureProvider>
                   {
                       new RouteDataRequestCultureProvider(),
                       new QueryStringRequestCultureProvider(),
                       new CookieRequestCultureProvider()
                   };
           });*/
            //services.AddLocalization();


            //Identity dccontext ayarlarý(postgreSQL için ayarlanýyor veya sql server için )
            services.AddDbContext<CustomIdentityDbContext>(options =>
                            //options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"))
                            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")
                            , b => b.MigrationsAssembly("Base.MVC")

                            )
            );




            // Identity ayarlarý
            services.AddIdentity<CustomIdentityUser, CustomIdentityRole>()
                    .AddEntityFrameworkStores<CustomIdentityDbContext>()
                    .AddDefaultTokenProviders();



            //HTTP Cookie ayarlarý
            services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = "/Acc/Login";
                options.LogoutPath = "/Acc/Logout";
                options.AccessDeniedPath = "/Acc/AccesDenied";
                /*options.Cookie = new CookieBuilder()
                {
                    HttpOnly = true,
                    Name = ".Miya.Security.Cookie",
                    Path = "/",
                    SameSite = SameSiteMode.Lax,
                    SecurePolicy = CookieSecurePolicy.SameAsRequest,
                    Expiration = TimeSpan.FromMinutes(2)
                };*/
            });


            // redis ayarlarý
            services.AddDistributedRedisCache(options =>
            {
                options.InstanceName = Configuration.GetConnectionString("RedisInstanceName");
                options.Configuration = Configuration.GetConnectionString("RedisServer");
              
            }
            );



            // session ayarlarý
            services.AddSession(options =>
            {

                options.IdleTimeout = TimeSpan.FromMinutes(20);
                options.Cookie = new CookieBuilder
                {

                    //Expiration = TimeSpan.FromMinutes(2),
                    HttpOnly = true,
                    //Domain = "http://localhost/9082/",
                    SecurePolicy = CookieSecurePolicy.SameAsRequest,
                    SameSite = SameSiteMode.Lax,
                    Name = ".Miya.Security.Cookie",
                    Path = "/",

                };
            });

            // Add detection services container and device resolver service@aut
            /**
             * core 2.1 uyumu olmadýðý için device detector yorum yapýldý
             * */
            /*services.AddDetectionCore()
                    .AddDevice();*/

            //culture localizer ayarlarý
            services.AddSingleton<IStringLocalizerFactory, JsonStringLocalizerFactory>();
            services.AddSingleton<IStringLocalizer, JsonStringLocalizer>();
            services.AddLocalization(options => options.ResourcesPath = "Resources");

            services.AddMvc()
                .AddViewLocalization()
                .AddDataAnnotationsLocalization();

            services.AddScoped<AjaxSessionTimeOutAttribute>();
            services.AddScoped<HmacTokenGeneratorAttribute>();
            services.AddScoped<PageEntryLogRabbitMQAttribute>();

            //services.AddScoped<ISessionService, SessionService>();
            //services.AddSingleton<HmacServiceManagerBase, HmacServiceManager>();
            services.AddTransient<RemoteAddressFinder, RemoteAddressFinder>();
            services.AddTransient<HmacServiceManagerBase, HmacServiceManager>();
            // Page entry log(RabbitMQ) 
            services.AddTransient<PageEntryLogPublisher, PageEntryLogPublisher>();
            services.AddSingleton<PageAccessLogModel, PageAccessLogModel>();
            //exception handling log(RabbitMQ)


            // aþaðýdaki alanlar 10/07/2018 tarihinde yrumlandý, ilgili dosyalar aranýyor
            //services.AddTransient<ExceptionHandlingLogPublisher, ExceptionHandlingLogPublisher>();
            //services.AddSingleton<ExceptionHandlingLogModel, ExceptionHandlingLogModel>();

            // request culture request uri culture finder services
            services.AddSingleton<RequestCultureFinder, RequestCultureFinder>(); 
            services.AddSingleton<RequestUriCultureFinder, RequestUriCultureFinder>();


            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseHttpStatusCodeExceptionMiddleware();
                app.UseExceptionHandlingMiddleware();
            }
            else
            {
                app.UseHttpStatusCodeExceptionMiddleware();
                app.UseExceptionHandlingMiddleware();
            }

            // session
            app.UseSession();


            // Identity
            app.UseAuthentication();



            // route globalizasyon cultureInfo ayarlar
            app.UseRouter(routes =>
            {
                routes.MapMiddlewareRoute("{culture?}/{*mvcRoute}", _app =>
                {
                    var supportedCultures = new List<CultureInfo>
                    {
                        new CultureInfo("en-US"),
                        new CultureInfo("af-ZA"),
                        new CultureInfo("de-DE"),
                        new CultureInfo("tr-TR")
                    };

                    var requestLocalizationOptions = new RequestLocalizationOptions
                    {
                        DefaultRequestCulture = new RequestCulture("en-US"),
                        SupportedCultures = supportedCultures,
                        SupportedUICultures = supportedCultures
                    };
                    requestLocalizationOptions.RequestCultureProviders = new List<IRequestCultureProvider>
                    {
                        new RouteDataRequestCultureProvider(),
                        new QueryStringRequestCultureProvider(),
                        new CookieRequestCultureProvider(),
                    };

                    /*requestLocalizationOptions.RequestCultureProviders.Insert(0, new QueryStringRequestCultureProvider());
                    requestLocalizationOptions.RequestCultureProviders.Insert(1, new RouteDataRequestCultureProvider());
                    requestLocalizationOptions.RequestCultureProviders.Insert(2, new CookieRequestCultureProvider());*/
                    _app.UseRequestLocalization(requestLocalizationOptions);

                    _app.UseMvc(mvcRoutes =>
                    {
                        /*mvcRoutes.MapRoute(
                            name: "default",
                            //template: "{culture=tr-TR}/{controller=Home}/{action=Index}/{id?}");
                            //template: "{culture?}/{controller=Home}/{action=Index}/{id?}",
                            template: "{culture?}/{controller}/{action}/{id?}",
                            defaults: new { controller = "Home", action = "Index" });*/
                        /* mvcRoutes.MapRoute(
                         name: "default_route",
                         template: "{controller}/{action}/{culture?}/{id?}",
                         defaults: new { controller = "Home", action = "Index" });*/


                        mvcRoutes.MapRoute(
                        name: "defaultCulture",
                        template: "{culture:regex(^[a-z]{{2}}-[a-z]{{2}}$)}/{controller=Home}/{action=Index}/{id?}");
                        //template: "{culture:regex(^[a-z]{{2}}(-[a-z]{{2}})?$)}/{controller=Home}/{action=Index}/{id?}");
                        //template: "{culture:regex(^[a-z]{{2}}$)}/{controller=Home}/{action=Index}/{id?}");

                        mvcRoutes.MapRoute(
                            name: "defaultApi",
                            template: "{controller=Home}/{action=Index}/{id?}");


                    });
                });

            });

            //var localOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            //app.UseRequestLocalization(localOptions.Value);

            /* app.UseMvc(routes=> {
                 routes.MapRoute(
                     name: "default",
                     template: "{culture?}/{controller=home}/{action=index}/{id?}");
                 });*/

           

        }
    }
}
