using Base.Core.Entities.Log;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Serilog;
using Serilog.Events;
using System;
using System.IO;
using System.Text;

namespace RabbitMQPageLog
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create service collection
            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);

            // Create service provider
            var serviceProvider = serviceCollection.BuildServiceProvider();

            // Run app
            serviceProvider.GetService<App>().Run();
            //serviceProvider.GetService<App>().RunExceptionLogger();

            /*Console.WriteLine(" Press [enter] to exit.");
            Console.ReadLine();*/
        }

        private static void ConfigureServices(IServiceCollection serviceCollection)
        {
            // Build configuration
            var configuration = new ConfigurationBuilder()
                //.SetBasePath(AppContext.BaseDirectory)
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("rabbitMQlogsubs.json", false)
                .Build();

            // Add console logging
            serviceCollection.AddSingleton(new LoggerFactory()
                .AddConsole(configuration.GetSection("Logging"))
                .AddSerilog());
                //.AddDebug());
            serviceCollection.AddLogging();

            // Add Serilog logging           
            Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(configuration)
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .WriteTo.RollingFile(configuration["Serilog:LogFile"])
            .CreateLogger();

            // Add access to generic IConfigurationRoot
            serviceCollection.AddSingleton(configuration);

            // Add the App
            serviceCollection.AddTransient<App>();

        }
    }


    public class App
    {
        private readonly ILogger<App> _logger;
        private readonly IConfigurationRoot _config;

        public App(ILogger<App> logger, IConfigurationRoot config)
        {
            _logger = logger;
            _config = config;
        }

        public void PageEntryLogger(IConnection connection, IModel channel)
        {
            var queueName = _config.GetSection("RabbitMQLog").GetSection("PageLogQueue").Value;

            /*using (var channel = connection.CreateModel())
            {*/
            channel.QueueDeclare(queue: queueName,
                                 durable: false,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);
            //new sharedQueue
            //var consumer = new QueueingBasicConsumer(channel);
            var consumer = new EventingBasicConsumer(channel);

            consumer.Registered += (model, ea) =>
            {
                var consumerTag = ea.ConsumerTag;
                Console.WriteLine(" [x] Registered Consumer tag ==> {0} ", consumerTag);
                _logger.LogDebug($"[x] Registered Consumer tag ==> {consumerTag} ");
            };


            consumer.Received += (model, ea) =>
            {
                var body = ea.Body;
                var message = System.Text.Encoding.UTF8.GetString(body);
                var pageAccess = JsonConvert.DeserializeObject<PageAccessLogModel>(message);
                //Console.WriteLine(user);
                //Console.WriteLine(" [x] Received {0}", message);
                Console.WriteLine(" [x] Received {0} Host {1} Controller {2} Action {3} sessionID {4}", pageAccess.UserName,
                                                                                                       pageAccess.Host,
                                                                                                       pageAccess.Controller,
                                                                                                       pageAccess.Action,
                                                                                                       pageAccess.SessionID);
                _logger.LogDebug($"[x] Received {pageAccess.UserName} Host {pageAccess.Host} Controller {pageAccess.Controller} Action {pageAccess.Action} SessionID {pageAccess.SessionID}");
            };




            channel.BasicConsume(queue: queueName,
                                     autoAck: true,
                                     consumer: consumer);

            //}

        }

        public void ExceptionLogger(IConnection connection, IModel channel)
        {
            /*using (var channel = connection.CreateModel())
            {*/

            var queueNameException = _config.GetSection("RabbitMQLog").GetSection("ExceptionLogQueue").Value;
            channel.QueueDeclare(queue: queueNameException,
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

            var consumerException = new EventingBasicConsumer(channel);

            // consumerException.sh

            var consumerExceptionTag = "";
            consumerException.Registered += (model, ea) =>
            {
                consumerExceptionTag = ea.ConsumerTag;
                Console.WriteLine(" [x] Registered ConsumerException tag ==> {0} ", consumerExceptionTag);
                _logger.LogDebug($"[x] Registered ConsumerException tag ==> {consumerExceptionTag} ");
            };

            //channel.

            /*consumerException.HandleBasicConsumeOk(consumerExceptionTag){

            };*/


            consumerException.Received += (model, ea) =>
            //consumer.Received += (model, ea) =>
            {

                //var testdata = ea.BasicProperties.Headers.TryGetValue("test", out test;
                var body = ea.Body;
                var message = Encoding.UTF8.GetString(body);
                // 10/07/2018 tarihinde yorum yapıldı
                var pageAccess = JsonConvert.DeserializeObject<ExceptionHandlingLogModel>(message);
                //Console.WriteLine(user);
                //Console.WriteLine(" [x] Received {0}", message);
                Console.WriteLine(" bu veri exception queue'den gelmiştir [x] Received {0} Host {1} Controller {2} Action {3} sessionID {4}", pageAccess.UserName,
                                                                                                       pageAccess.Host,
                                                                                                       pageAccess.Controller,
                                                                                                       pageAccess.Action,
                                                                                                       pageAccess.SessionID);
                _logger.LogDebug($" bu veri exception queue'den gelmiştir [x] Received {pageAccess.UserName} Host {pageAccess.Host} Controller {pageAccess.Controller} Action {pageAccess.Action} SessionID {pageAccess.SessionID}");
                channel.BasicAck(ea.DeliveryTag, false);
            };
            channel.BasicConsume(queue: queueNameException,
                                 autoAck: true,
                                 consumer: consumerException);
            //}
        }


        public void Run()
        {
            // Let's test log levels:
            _logger.LogTrace("LogTrace");
            _logger.LogDebug("LogDebug");
            _logger.LogInformation("LogInformation");
            _logger.LogWarning("LogWarning");
            _logger.LogError("LogError");
            _logger.LogCritical("LogCritical");

            var hostName = _config.GetSection("RabbitMQLog").GetSection("HostName").Value;
            var queueName = _config.GetSection("RabbitMQLog").GetSection("PageLogQueue").Value;
            Console.WriteLine(hostName);
            Console.WriteLine(queueName);

            var factory = new ConnectionFactory() { HostName = hostName };
            //var connection = factory.CreateConnection();
            try
            {
                using (var connection = factory.CreateConnection())
                {
                    using (var channel = connection.CreateModel())
                    {

                        this.PageEntryLogger(connection, channel);
                        this.ExceptionLogger(connection, channel);

                        Console.WriteLine(" Press [enter] to exit.");
                        Console.ReadLine();
                    }
                }
            }
            catch (Exception ex)
            {
                //throw new RabbitMQSubscribeException(ex);
            }

        }

        /*public void RunExceptionLogger()
        {
            // Let's test log levels:
            _logger.LogTrace("LogTrace");
            _logger.LogDebug("LogDebug");
            _logger.LogInformation("LogInformation");
            _logger.LogWarning("LogWarning");
            _logger.LogError("LogError");
            _logger.LogCritical("LogCritical");

            var hostName = _config.GetSection("RabbitMQLog").GetSection("HostName").Value;
            var queueName = _config.GetSection("RabbitMQLog").GetSection("ExceptionLogQueue").Value;
            Console.WriteLine(hostName);
            Console.WriteLine(queueName);

            var factory = new ConnectionFactory() { HostName = hostName };
            try
            {
                using (var connection = factory.CreateConnection())
                {
                    using (var channel = connection.CreateModel())
                    {
                        channel.QueueDeclare(queue: queueName,
                                             durable: false,
                                             exclusive: false,
                                             autoDelete: false,
                                             arguments: null);

                        var consumer = new EventingBasicConsumer(channel);
                        consumer.Received += (model, ea) =>
                        {
                            var body = ea.Body;
                            var message = Encoding.UTF8.GetString(body);
                            var pageAccess = JsonConvert.DeserializeObject<ExceptionHandlingLogModel>(message);
                            //Console.WriteLine(user);
                            //Console.WriteLine(" [x] Received {0}", message);
                            Console.WriteLine(" bu veri exception queue'den gelmiştir [x] Received {0} Host {1} Controller {2} Action {3} sessionID {4}", pageAccess.UserName,
                                                                                                                   pageAccess.Host,
                                                                                                                   pageAccess.Controller,
                                                                                                                   pageAccess.Action,
                                                                                                                   pageAccess.SessionID);
                            _logger.LogDebug($" bu veri exception queue'den gelmiştir [x] Received {pageAccess.UserName} Host {pageAccess.Host} Controller {pageAccess.Controller} Action {pageAccess.Action} SessionID {pageAccess.SessionID}");
                        };
                        channel.BasicConsume(queue: queueName,
                                             autoAck: true,
                                             consumer: consumer);

                        /*Console.WriteLine(" Press [enter] to exit.");
                        Console.ReadLine();*/
        /*}
    }
}
catch (Exception ex)
{
    throw new RabbitMQSubscribeException(ex);
}



}*/

    }
}
