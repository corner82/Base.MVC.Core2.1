$(document).ready(function () {



    //deal list  grid loading-image
    $("#loading-image-vehicleGrid").loadImager();



    /**
     * ddslick customer dropdown load imager
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $('#loadingImage_DdslickCustomer').loadImager();

    /**
     * ddslick realization rate dropdown load imager
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $('#loadingImage_DdslickRealizationRate').loadImager();

    /**
    * ddslick priority dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickPriority').loadImager();

    /**
    * ddslick vehicle type dropdown(buyback) load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager();

    /**
    * ddslick vehicle type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickVehicleType').loadImager();

    /**
    * ddslick customer type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickCustomerTypeBuyBack').loadImager();

    /**
    * ddslick terrain type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTerrainTypeBuyBack').loadImager();

    /**
    * ddslick R&M dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickRepMainBuyBack').loadImager();

    /**
    * ddslick truck type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTruckTypeBuyBack').loadImager();


    /**
    * ddslick hydraulics dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickHydraBuyBack').loadImager();


    //tradeback
    /**
    * ddslick vehicle type dropdown(buyback) load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickVehicleTypeTradeBack').loadImager();


    /**
    * ddslick customer type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager();

    /**
    * ddslick terrain type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTerrainTypeTradeBack').loadImager();

    /**
    * ddslick R&M dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickRepMainTradeBack').loadImager();

    /**
    * ddslick truck type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTruckTypeTradeBack').loadImager();


    /**
    * ddslick hydraulics dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickHydraTradeBack').loadImager();


    /**
    * ddslick vehicle type-campaign dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 11/09/2018
    */
    $('#loadingImage_DdslickVehicleTypeCampaign').loadImager();

    /**
    * ddslick campaign dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 11/09/2018
    */
    $('#loadingImage_DdslickCampaigns').loadImager();





    //Deal tab form elements begin
    /**
     * ddslick customer dropdown 
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    var ddslickCustomerData = [
        {
            text: 'Please select...',
            value: 1,
            selected: true
        },
        {
            text: "South Africa Corp.",
            value: 2,
            selected: false
        },
        {
            text: "Pine Town Corp",
            value: 3,
            selected: false
        }
    ];
    $('#loadingImage_DdslickCustomer').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCustomer").loadImager('appendImage');
    var ajax_DdslickCustomer = $('#ajax_DdslickCustomer').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickCustomer.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomer').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickCustomer').ddslick({
                //height: 150,
                data: ddslickCustomerData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickCustomer").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomer').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('vehiclekittype bulunamamıştır...'), window.lang.translate('vehiclekittype  bulunamamıştır...'));
        },
    })
    ajax_DdslickCustomer.ajaxCallWidget('call');

    /**
     * ddslick priority dropdown 
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    var ddslickPriorityData = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "Normal",
            value: 2,
            selected: false
        },
        {
            text: "Strategic",
            value: 3,
            selected: false
        },
        {
            text: "Very Strategic",
            value: 4,
            selected: false
        },
        {
            text: "Ultimate Deal",
            value: 5,
            selected: false
        }
    ];
    $('#loadingImage_DdslickPriority').loadImager('removeLoadImage');
    $("#loadingImage_DdslickPriority").loadImager('appendImage');
    var ajax_DdslickPriority = $('#ajax_DdslickPriority').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickPriority.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickPriority').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Priority data not found...'), window.lang.translate('Priority data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickPriority').ddslick({
                //height: 150,
                data: ddslickPriorityData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickPriority").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickPriority').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Priority data not found...'), window.lang.translate('Priority data not found...'));
        },
    })
    ajax_DdslickPriority.ajaxCallWidget('call');

    /**
    * ddslick realization rate dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    var ddslickRealizationRateData = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "<%25",
            value: 2,
            selected: false
        },
        {
            text: "%25-%50",
            value: 3,
            selected: false
        },
        {
            text: "%50-%75",
            value: 4,
            selected: false
        },
        {
            text: ">%75",
            value: 5,
            selected: false
        }
    ];
    $('#loadingImage_DdslickRealizationRate').loadImager('removeLoadImage');
    $("#loadingImage_DdslickRealizationRate").loadImager('appendImage');
    var ajax_DdslickRealizationRate = $('#ajax_DdslickRealizationRate').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickRealizationRate.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickRealizationRate').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Realization Rate data not found...'), window.lang.translate('Realization Rate data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickRealizationRate').ddslick({
                //height: 150,
                data: ddslickRealizationRateData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickRealizationRate").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickRealizationRate').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Realization Rate data not found...'), window.lang.translate('Realization Rate data not found...'));
        },
    })
    ajax_DdslickRealizationRate.ajaxCallWidget('call');
    //Deal tab form elements end

    //add vehicle type tab form elements begin
    /**
    * ddslick vehicle type dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    var ddslickVehicleTypeData = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-EL",
            value: 2,
            selected: false
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-ELX",
            value: 3,
            selected: false
        },
        {
            text: "TGS-16-4406X4BLS-LX-ALU-EL",
            value: 4,
            selected: false
        },
        {
            text: "TGS-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGX-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGV-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        }
    ];
    $('#loadingImage_DdslickVehicleType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleType").loadImager('appendImage');
    var ajax_DdslickVehicleType = $('#ajax_DdslickVehicleType').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickVehicleType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleType').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Priority data not found...'), window.lang.translate('Priority data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickVehicleType').ddslick({
                //height: 150,
                data: ddslickVehicleTypeData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickVehicleType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleType').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Vehicle Type data not found...'), window.lang.translate('Vehicle Type data not found...'));
        },
    })
    ajax_DdslickVehicleType.ajaxCallWidget('call');

    //add vehicle type tab form elements end


    //BuyBack tab form elements begin
    /**
     * ddslick vehicle type (buyback) dropdown 
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleTypeBuyBack").loadImager('appendImage');
    var ajax_DdslickVehicleTypeBuyBack = $('#ajax_DdslickVehicleTypeBuyBack').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleTypesForBuybackInDeal/',
        type : 'POST'

    });
    ajax_DdslickVehicleTypeBuyBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Vehicle type data not found'), window.lang.translate('Vehiicle type data not found...'));
        },
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);

            $('#ddslickVehicleTypeBuyBack').ddslick({
                //height: 150,
                //data: ddslickVehicleTypeDataBuyBack,
                data: data,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickVehicleTypeBuyBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Vehicle Type data not found...'), window.lang.translate('Vehicle Type data not found...'));
        },
    })
    ajax_DdslickVehicleTypeBuyBack.ajaxCallWidget('call');


    /**
    * ddslick customer type (buyback) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    var ddslickCustomerTypeBuyBackData = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "House Deal",
            value: 2,
            selected: false
        },
        {
            text: "New",
            value: 3,
            selected: false
        },
        {
            text: "Regular",
            value: 4,
            selected: false
        },
    ];
    $('#loadingImage_DdslickCustomerTypeBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCustomerTypeBuyBack").loadImager('appendImage');
    var ajax_DdslickCustomerTypeBuyBack = $('#ajax_DdslickCustomerTypeBuyBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickCustomerTypeBuyBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomerTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Customer  type data not found...'), window.lang.translate('Customer type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickCustomerTypeBuyBack').ddslick({
                //height: 150,
                data: ddslickCustomerTypeBuyBackData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickCustomerTypeBuyBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomerTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Customer Type data not found...'), window.lang.translate('Customer Type data not found...'));
        },
    })
    ajax_DdslickCustomerTypeBuyBack.ajaxCallWidget('call');

    /**
    * ddslick truck type (buyback) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    var ddslickTruckTypeDataBuyBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26",
            value: 2,
            selected: false
        },
        {
            text: "TGS-16",
            value: 3,
            selected: false
        },
        {
            text: "TGX-16",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickTruckTypeBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTruckTypeBuyBack").loadImager('appendImage');
    var ajax_DdslickTruckTypeBuyBack = $('#ajax_DdslickTruckTypeBuyBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickTruckTypeBuyBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTruckTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Truck  type data not found...'), window.lang.translate('Truck type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickTruckTypeBuyBack').ddslick({
                //height: 150,
                data: ddslickTruckTypeDataBuyBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickTruckTypeBuyBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTruckTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Truck Type data not found...'), window.lang.translate('Truck Type data not found...'));
        },
    })
    ajax_DdslickTruckTypeBuyBack.ajaxCallWidget('call');

    /**
    * ddslick terrain type (buyback) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    var ddslickTerrainTypeDataBuyBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "Off Road",
            value: 2,
            selected: false
        },
        {
            text: "on Road",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickTerrainTypeBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTerrainTypeBuyBack").loadImager('appendImage');
    var ajax_DdslickTerrainTypeBuyBack = $('#ajax_DdslickTerrainTypeBuyBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickTerrainTypeBuyBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTerrainTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Terrain  type data not found...'), window.lang.translate('Terrain type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickTerrainTypeBuyBack').ddslick({
                //height: 150,
                data: ddslickTerrainTypeDataBuyBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickTerrainTypeBuyBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTerrainTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Terrain Type data not found...'), window.lang.translate('Terrain Type data not found...'));
        },
    })
    ajax_DdslickTerrainTypeBuyBack.ajaxCallWidget('call');

    /**
   * ddslick R&M (buyback) dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    var ddslickRepMainDataBuyBack = [
        {
            text: 'Comfort Super',
            value: -1,
            selected: true
        },
        {
            text: "Comfort Mini",
            value: 2,
            selected: false
        },
        {
            text: "Comfort Detail",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickRepMainBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickRepMainBuyBack").loadImager('appendImage');
    var ajax_DdslickRepMainBuyBack = $('#ajax_DdslickRepMainBuyBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickRepMainBuyBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickRepMainBuyBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('R&M  type data not found...'), window.lang.translate('R&M type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickRepMainBuyBack').ddslick({
                //height: 150,
                data: ddslickRepMainDataBuyBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickRepMainBuyBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickRepMainBuyBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('R&M Type data not found...'), window.lang.translate('R&M Type data not found...'));
        },
    })
    ajax_DdslickRepMainBuyBack.ajaxCallWidget('call');


    /**
   * ddslick hydraulics (buyback) dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    var ddslickHydraDataBuyBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26 hydra",
            value: 2,
            selected: false
        },
        {
            text: "TGS-16 hydra",
            value: 3,
            selected: false
        },
        {
            text: "TGX-16 hydra",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickHydraBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickHydraBuyBack").loadImager('appendImage');
    var ajax_DdslickHydraBuyBack = $('#ajax_DdslickHydraBuyBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickHydraBuyBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickHydraBuyBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Hydraulics  type data not found...'), window.lang.translate('Hydraulics type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickHydraBuyBack').ddslick({
                //height: 150,
                data: ddslickHydraDataBuyBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickHydraBuyBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickHydraBuyBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Hydraulics Type data not found...'), window.lang.translate('Hydraulics Type data not found...'));
        },
    })
    ajax_DdslickHydraBuyBack.ajaxCallWidget('call');
    //BuyBack tab form elements end

    //TradeBack tab form elements begin
    /**
    * ddslick vehicle type (tradeback) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    var ddslickVehicleTypeDataTradeBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-EL",
            value: 2,
            selected: false
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-ELX",
            value: 3,
            selected: false
        },
        {
            text: "TGS-16-4406X4BLS-LX-ALU-EL",
            value: 4,
            selected: false
        },
        {
            text: "TGS-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGX-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGV-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        }
    ];
    $('#loadingImage_DdslickVehicleTypeTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleTypeTradeBack").loadImager('appendImage');
    var ajax_DdslickVehicleTypeTradeBack = $('#ajax_DdslickVehicleTypeTradeBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickVehicleTypeTradeBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Vehicle type data not found...'), window.lang.translate('Vehiicle type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickVehicleTypeTradeBack').ddslick({
                //height: 150,
                data: ddslickVehicleTypeDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickVehicleTypeTradeBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Vehicle Type data not found...'), window.lang.translate('Vehicle Type data not found...'));
        },
    })
    ajax_DdslickVehicleTypeTradeBack.ajaxCallWidget('call');

    /**
   * ddslick customer type (tradeback) dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    var ddslickCustomerTypeDataTradeBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "House Deal",
            value: 2,
            selected: false
        },
        {
            text: "New",
            value: 3,
            selected: false
        },
        {
            text: "Regular",
            value: 4,
            selected: false
        },
    ];
    $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCustomerTypeTradeBack").loadImager('appendImage');
    var ajax_DdslickCustomerTypeTradeBack = $('#ajax_DdslickCustomerTypeTradeBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickCustomerTypeTradeBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Customer  type data not found...'), window.lang.translate('Customer type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickCustomerTypeTradeBack').ddslick({
                //height: 150,
                data: ddslickCustomerTypeDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickCustomerTypeTradeBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Customer Type data not found...'), window.lang.translate('Customer Type data not found...'));
        },
    })
    ajax_DdslickCustomerTypeTradeBack.ajaxCallWidget('call');

    /**
    * ddslick truck type (tradeback) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    var ddslickTruckTypeDataTradeBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26",
            value: 2,
            selected: false
        },
        {
            text: "TGS-16",
            value: 3,
            selected: false
        },
        {
            text: "TGX-16",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickTruckTypeTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTruckTypeTradeBack").loadImager('appendImage');
    var ajax_DdslickTruckTypeTradeBack = $('#ajax_DdslickTruckTypeTradeBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickTruckTypeTradeBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTruckTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Truck  type data not found...'), window.lang.translate('Truck type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickTruckTypeTradeBack').ddslick({
                //height: 150,
                data: ddslickTruckTypeDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickTruckTypeTradeBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTruckTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Truck Type data not found...'), window.lang.translate('Truck Type data not found...'));
        },
    })
    ajax_DdslickTruckTypeTradeBack.ajaxCallWidget('call');

    /**
    * ddslick terrain type (tradeback) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    var ddslickTerrainTypeDataTradeBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "Off Road",
            value: 2,
            selected: false
        },
        {
            text: "on Road",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickTerrainTypeTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTerrainTypeTradeBack").loadImager('appendImage');
    var ajax_DdslickTerrainTypeTradeBack = $('#ajax_DdslickTerrainTypeTradeBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickTerrainTypeTradeBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTerrainTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Terrain  type data not found...'), window.lang.translate('Terrain type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickTerrainTypeTradeBack').ddslick({
                //height: 150,
                data: ddslickTerrainTypeDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickTerrainTypeTradeBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTerrainTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Terrain Type data not found...'), window.lang.translate('Terrain Type data not found...'));
        },
    })
    ajax_DdslickTerrainTypeTradeBack.ajaxCallWidget('call');

    /**
    * ddslick R&M (tradeback) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    var ddslickRepMainDataTradeBack = [
        {
            text: 'Comfort Super',
            value: -1,
            selected: true
        },
        {
            text: "Comfort Mini",
            value: 2,
            selected: false
        },
        {
            text: "Comfort Detail",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickRepMainTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickRepMainTradeBack").loadImager('appendImage');
    var ajax_DdslickRepMainTradeBack = $('#ajax_DdslickRepMainTradeBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickRepMainTradeBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickRepMainTradeBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('R&M  type data not found...'), window.lang.translate('R&M type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickRepMainTradeBack').ddslick({
                //height: 150,
                data: ddslickRepMainDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickRepMainTradeBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickRepMainTradeBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('R&M Type data not found...'), window.lang.translate('R&M Type data not found...'));
        },
    })
    ajax_DdslickRepMainTradeBack.ajaxCallWidget('call');

    /**
   * ddslick hydraulics (tradeback) dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    var ddslickHydraDataTradeBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26 hydra",
            value: 2,
            selected: false
        },
        {
            text: "TGS-16 hydra",
            value: 3,
            selected: false
        },
        {
            text: "TGX-16 hydra",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickHydraTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickHydraTradeBack").loadImager('appendImage');
    var ajax_DdslickHydraTradeBack = $('#ajax_DdslickHydraTradeBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickHydraTradeBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickHydraTradeBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Hydraulics  type data not found...'), window.lang.translate('Hydraulics type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickHydraTradeBack').ddslick({
                //height: 150,
                data: ddslickHydraDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickHydraTradeBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickHydraTradeBack').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Hydraulics Type data not found...'), window.lang.translate('Hydraulics Type data not found...'));
        },
    })
    ajax_DdslickHydraTradeBack.ajaxCallWidget('call');


    //TradeBack tab form elements end


    //add deal-campaign aside tab form elements begin
    /**
    * ddslick vehicle type dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    var ddslickVehicleTypeDataCampaign = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-EL",
            value: 2,
            selected: false
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-ELX",
            value: 3,
            selected: false
        },
        {
            text: "TGS-16-4406X4BLS-LX-ALU-EL",
            value: 4,
            selected: false
        },
        {
            text: "TGS-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGX-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGV-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        }
    ];
    $('#loadingImage_DdslickVehicleTypeCampaign').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleTypeCampain").loadImager('appendImage');
    var ajax_DdslickVehicleTypeCampaign = $('#ajax_DdslickVehicleTypeCampaign').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickVehicleTypeCampaign.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleTypeCampain').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Priority data not found...'), window.lang.translate('Priority data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickVehicleTypeCampaign').ddslick({
                //height: 150,
                data: ddslickVehicleTypeDataCampaign,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickVehicleTypeCampain").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleTypeCampain').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Vehicle Type data not found...'), window.lang.translate('Vehicle Type data not found...'));
        },
    })
    ajax_DdslickVehicleTypeCampaign.ajaxCallWidget('call');


    /**
    * ddslick vehicle type dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    var ddslickDataCampaigns = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-EL",
            value: 2,
            selected: false
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-ELX",
            value: 3,
            selected: false
        },
        {
            text: "TGS-16-4406X4BLS-LX-ALU-EL",
            value: 4,
            selected: false
        },
        {
            text: "TGS-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGX-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGV-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        }
    ];
    $('#loadingImage_DdslickCampaigns').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCampaigns").loadImager('appendImage');
    var ajax_DdslickCampaigns = $('#ajax_DdslickCampaigns').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickCampaigns.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCampaigns').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Priority data not found...'), window.lang.translate('Priority data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickCampaigns').ddslick({
                //height: 150,
                data: ddslickDataCampaigns,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickCampaigns").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCampaigns').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('Vehicle Type data not found...'), window.lang.translate('Vehicle Type data not found...'));
        },
    })
    ajax_DdslickCampaigns.ajaxCallWidget('call');


    //add deal-campaign aside tab form elements end


});