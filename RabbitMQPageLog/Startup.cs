using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using Base.Core.Culture;
using Base.Core.Utills.Url;
using Base.Core.Auth.Hmac;
using Base.Core.MessageQueue.RabbitMQ;
using Base.Core.Entities.Log;
using Base.Core.Entities.Identity;
using Base.Core.Culture.RequestCulture;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using RabbitMQPageLog.Data;

namespace RabbitMQPageLog
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

            //Identity dccontext ayarlarý(postgreSQL için ayarlanýyor veya sql server için )
            services.AddDbContext<PageAccessLogContext>(options =>
                            //options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"))
                            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")
                            //, b => b.MigrationsAssembly("Miya.Core.Entities.Identity")

                            )
            );


            // Add console logging
            services.AddSingleton(new LoggerFactory()
                .AddConsole(Configuration.GetSection("Logging"))
                .AddSerilog());
            //.AddDebug());
            services.AddLogging();

            // Add Serilog logging           
            Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(Configuration)
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .WriteTo.RollingFile(Configuration["Serilog:LogFile"])
            .CreateLogger();

            services.AddSingleton<ServiceProvider, ServiceProvider>();
            // Add the App
            services.AddSingleton<App>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            
            

            



            

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
