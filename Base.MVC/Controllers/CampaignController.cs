﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Base.Core.Entities.Session;
using Base.Core.Extensions.Session;
using Base.Filters.Auth.Hmac;
using Base.Filters.Log.RabbitMQ;
using Base.Filters.Session;
using Newtonsoft.Json;
using Base.Core.Utills.Url;
using Base.Core.Http.HttpRequest.Concrete;
using Microsoft.AspNetCore.Http.Extensions;
using Base.MVC.Models.HttpRequest;
using Base.MVC.Models.HttpRequest.Training;
using Base.MVC.Models.HttpRequest.Campaign;

namespace Base.MVC.Controllers
{
    public class CampaignController : Controller
    {
        private readonly IDistributedCache _distributedCache;
        private QueryCreater _queryCreater;

        public CampaignController(IDistributedCache distributedCache,
                              QueryCreater queryCreater)
        {
            _distributedCache = distributedCache;
            _queryCreater = queryCreater;
        }

        public IActionResult Index()
        {
            return View();
        }

        [SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]

        public async Task<IActionResult> Campaign()
        {
            return View();
        }

        /// <summary>
        /// get Campaign grid 
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFixedSalesCostsGridx_sysfixedsalescosts&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[SessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> CampaignGrid([FromBody] DefaultPostModelGridList gridModel)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(gridModel);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model state is not valid");
            }

        }

        /// <summary>
        /// Delete Campaign
        ///Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_sysfixedsalescosts&id=33&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> DeleteCampaign([FromBody] DeletePostModel deleteModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(deleteModel);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }

        /// <summary>
        /// add Campaign
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_sysfixedsalescosts&name=gitgel%20cost&vehicle_gruop_id=1&vehicle_second_group_id=&vvalue=1111=&currency_type_id=16&start_date=2018-10-10&is_all_vehicle=1=warranty_matrix_id=&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AddCampaign([FromBody] Campaign campaign)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(campaign);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model state is not valid");
            }

        }

        /// <summary>
        /// Active/Pasive Campaign
        /// /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syswarranties&id=29&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> SysActivePasiveCampaign([FromBody] ActivePassivePostModel actModel)
        {
            var headers = new Dictionary<string, string>();
            var tokenGenerated = HttpContext.Session.GetHmacToken();
            headers.Add("X-Hmac", tokenGenerated);
            headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
            string queryStr = _queryCreater.GetQueryStringFromObject(actModel);
            var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
            var data = response.Content.ReadAsStringAsync().Result;
            return data.ToString();
        }


        /// <summary>
        /// add Campaign Name
        /// Ceydacan Seyrek
        /// </summary>
        /// http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_sysfixedsalescosts&name=gitgel%20cost&vehicle_gruop_id=1&vehicle_second_group_id=&vvalue=1111=&currency_type_id=16&start_date=2018-10-10&is_all_vehicle=1=warranty_matrix_id=&pk=GsZVzEYe50uGgNM
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> AddCampaignName([FromBody] CampaignName campaignName)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(campaignName);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model state is not valid");
            }

        }

        /// <summary>
        /// Campaign vehicle chassis
        /// Ceydacan Seyrek
        /// </summary>
        /// 
        /// <returns></returns>
        //[AjaxSessionTimeOut]
        [ServiceFilter(typeof(HmacTokenGeneratorAttribute))]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        [HttpPost]
        public async Task<string> CampaignChassis([FromBody] CampaignChassis campaignchassis)
        {
            if (ModelState.IsValid)
            {
                var headers = new Dictionary<string, string>();
                var tokenGenerated = HttpContext.Session.GetHmacToken();
                headers.Add("X-Hmac", tokenGenerated);
                headers.Add("X-PublicKey", HttpContext.Session.GetUserPublicKey());
                string queryStr = _queryCreater.GetQueryStringFromObject(campaignchassis);
                var response = await HttpClientRequestFactory.Get("http://proxy.mansis.co.za:18443/SlimProxyBoot.php?" + queryStr, headers);
                var data = response.Content.ReadAsStringAsync().Result;
                return data.ToString();
            }
            else
            {
                throw new Exception("Model state is not valid");
            }

        }

    }
}