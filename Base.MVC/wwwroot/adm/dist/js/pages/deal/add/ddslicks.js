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
    * ddslick deal vehicle type dropdown(buyback) load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickDealVehicleTypeBuyBack').loadImager();

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
    * ddslick vehicle type dropdown(buyback) load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickDealVehicleTypeTradeBack').loadImager();


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

    /**
    * ddslick add bdy type load imager
    * @author Mustafa Zeynel Dağlı
    * @since 16/10/2018
    */
    $('#loadingImage_DdslickAddBodyType').loadImager();

    /**
    * ddslick vehicle group load imager (body)
    * @author Mustafa Zeynel Dağlı
    * @since 16/10/2018
    */
    $('#loadingImage_DdslickVehicleGroupsBody').loadImager();

    /**
    * ddslick deal vehicle type load imager (body)
    * @author Mustafa Zeynel Dağlı
    * @since 16/10/2018
    */
    $('#loadingImage_DdslickDealVehicleTypeBody').loadImager();


    /**
     * tab organizer events attached
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $("#deal_hidden").organizeTabs({
        onAftertab_BuyBack: function (e) {
            $('#loadingImage_DdslickDealVehicleTypeBuyBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeBuyBack").loadImager('appendImage');
            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {

                var vehicleTypes = $("#deal_hidden").deal("getVehicleTypes");
                if (vehicleTypes.length == 0) {

                    /*$('#tab_BuyBack').loadImager('removeLoadImage');
                    $('#tab_BuyBack').loadImager('appendImage');*/

                    $(window).warningMessage('resetOnShown');
                    $(window).warningMessage('show', window.lang.translate("You must add at least one vehicle type to deal"),
                        window.lang.translate("You must add at least one vehicle type to deal"));
                    return false;
                }

                var ajax_DdslickVehicleTypeBuyBack = $('#ajax_DdslickDealVehicleTypeBuyBack').ajaxCallWidget({
                    proxy: '/Deal/DdslickGetDealVehicleTypeProxyService/',
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    noDataFailureText: window.lang.translate("No data returned from service"),
                    loadingImageID: "loadingImage_DdslickDealVehicleTypeBuyBack",
                    data: JSON.stringify({
                        //url: "pkProjectVehicleModelsDdList_infoprojectvehiclemodels",
                        url: "pkProjectVehicleModelsTradeDdList_infoprojectbuybacks",
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        project_id: $("#deal_hidden").deal("getDealID"),
                        //project_id: 1,
                        pkIdentity: $("#publicKey").val(),
                    }),
                    type: 'POST'
                });
                var selectedContVehicleTypeBuyBack = false;
                ajax_DdslickVehicleTypeBuyBack.ajaxCallWidget({
                    onSuccess: function (event, data) {
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickDealVehicleTypeBuyBack').ddslick({
                            data: data,
                            width: '100%',
                            onSelected: function (selectedData) {
                                if (selectedContVehicleTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                                selectedContVehicleTypeBuyBack = true;
                                if (selectedData.selectedData.value > 0) {
                                }
                            }
                        });
                        $("#loadingImage_DdslickDealVehicleTypeBuyBack").loadImager('removeLoadImage');

                    },
                });
                ajax_DdslickVehicleTypeBuyBack.ajaxCallWidget('call');
            } else {
                /*$('#tab_BuyBack').loadImager('removeLoadImage');
                $('#tab_BuyBack').loadImager('appendImage');*/

                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select deal"),
                    window.lang.translate("Please select deal"));
                // $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager('removeLoadImage');
            }
        },
        onAftertab_TradeBack: function (e) {

            $('#loadingImage_DdslickDealVehicleTypeTradeBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeTradeBack").loadImager('appendImage');

            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {


                var vehicleTypes = $("#deal_hidden").deal("getVehicleTypes");
                if (vehicleTypes.length == 0) {

                    /*$('#tab_TradeBack').loadImager('removeLoadImage');
                    $('#tab_TradeBack').loadImager('appendImage');*/

                    $(window).warningMessage('resetOnShown');
                    $(window).warningMessage('show', window.lang.translate("You must add at least one vehicle type to deal"),
                        window.lang.translate("You must add at least one vehicle type to deal"));
                    return false;
                }

                var ajax_DdslickVehicleTypeTradeBack = $('#ajax_DdslickDealVehicleTypeTradeBack').ajaxCallWidget({
                    proxy: '/Deal/DdslickGetDealVehicleTypeProxyService/',
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    noDataFailureText: window.lang.translate("No data returned from service"),
                    loadingImageID: "loadingImage_DdslickDealVehicleTypeTradeBack",
                    data: JSON.stringify({
                        //url: "pkProjectVehicleModelsDdList_infoprojectvehiclemodels",
                        url: "pkProjectVehicleModelsTradeDdList_infoprojecttradeback",
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        project_id: $("#deal_hidden").deal("getDealID"),
                        //project_id : 1,
                        pkIdentity: $("#publicKey").val(),
                    }),
                    type: 'POST'
                });
                var selectedContVehicleTypeTradeBack = false;
                ajax_DdslickVehicleTypeTradeBack.ajaxCallWidget({
                    onSuccess: function (event, data) {
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickDealVehicleTypeTradeBack').ddslick({
                            data: data,
                            width: '100%',
                            onSelected: function (selectedData) {
                                if (selectedContVehicleTypeTradeBack == true) $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                                selectedContVehicleTypeTradeBack = true;
                                if (selectedData.selectedData.value > 0) {
                                    //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                                }
                            }
                        });
                        $("#loadingImage_DdslickDealVehicleTypeTradeBack").loadImager('removeLoadImage');
                    },
                })
                ajax_DdslickVehicleTypeTradeBack.ajaxCallWidget('call');
            } else {
                /*$('#tab_TradeBack').loadImager('removeLoadImage');
                $('#tab_TradeBack').loadImager('appendImage');*/

                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select deal"),
                    window.lang.translate("Please select deal"));
                 $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager('removeLoadImage');
            }


        },
        onAftertab_Body: function (e) {
            $('#tab_Body').loadImager('removeLoadImage');
            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {
                //alert("deal id > 0");

            } else {
                /*$('#tab_VehicleType').loadImager('removeLoadImage');
                $('#tab_VehicleType').loadImager('appendImage');*/
                //alert("deal id < 0");
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', "Please select deal",
                    "Please select deal");
            }
        },
        onAftertab_VehicleType: function (e) {
            $('#tab_VehicleType').loadImager('removeLoadImage');
            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {
                //alert("deal id > 0");
                
            } else {
                /*$('#tab_VehicleType').loadImager('removeLoadImage');
                $('#tab_VehicleType').loadImager('appendImage');*/
                //alert("deal id < 0");
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', "Please select deal",
                    "Please select deal");
            }
        },
    });


    //Deal tab form elements begin
    /**
     * ddslick customer dropdown 
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $('#loadingImage_DdslickCustomer').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCustomer").loadImager('appendImage');
    var ajax_DdslickCustomer = $('#ajax_DdslickCustomer').ajaxCallWidget({
        proxy: '/Customer/DdslickGetAllCustomers',
        type: "POST",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        loadingImageID: "loadingImage_DdslickCustomer",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerDdList_infocustomer",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_DdslickCustomer.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickCustomer').ddslick({
                //height: 150,
                data: data,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickCustomer").loadImager('removeLoadImage');
        },
        /*onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            $(window).dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomer').loadImager('removeLoadImage');
                }
            });
            $(window).dangerMessage('show', window.lang.translate('vehiclekittype bulunamamıştır...'), window.lang.translate('vehiclekittype  bulunamamıştır...'));
        },*/
    })
    ajax_DdslickCustomer.ajaxCallWidget('call');

    /**
     * ddslick priority dropdown 
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $('#loadingImage_DdslickPriority').loadImager('removeLoadImage');
    $("#loadingImage_DdslickPriority").loadImager('appendImage');
    var ajax_DdslickPriority = $('#ajax_DdslickPriority').ajaxCallWidget({
        proxy: '/Sys/PriorityDDSlickServiceProxy',
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        loadingImageID: "loadingImage_DdslickPriority",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkPriorityTypeDdList_sysprioritytype",
            pkIdentity: $("#publicKey").val()
        }),
        type : "POST"
        

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
            //alert("priority data found");
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickPriority').ddslick({
                //height: 150,
                //data: $.parseJSON(data),
                data: data,
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
    $('#loadingImage_DdslickRealizationRate').loadImager('removeLoadImage');
    $("#loadingImage_DdslickRealizationRate").loadImager('appendImage');
    var ajax_DdslickRealizationRate = $('#ajax_DdslickRealizationRate').ajaxCallWidget({
        proxy: '/Sys/DDSlickRealizationRateServiceProxy',
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        loadingImageID: "loadingImage_DdslickRealizationRate",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkProbabilitiesDdList_sysprobabilities",
            pkIdentity: $("#publicKey").val()
        }),
        type: "POST"

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
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickRealizationRate').ddslick({
                //height: 150,
                data: data,
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
    
    $('#loadingImage_DdslickVehicleType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleType").loadImager('appendImage');
    var ajax_DdslickVehicleType = $('#ajax_DdslickVehicleType').ajaxCallWidget({
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        loadingImageID: "loadingImage_DdslickVehicleType",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehiclesEndgroupsCostDdList_sysvehiclesendgroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_DdslickVehicleType.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickVehicleType').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });
            $("#loadingImage_DdslickVehicleType").loadImager('removeLoadImage');
        },
    })
    ajax_DdslickVehicleType.ajaxCallWidget('call');

    //add vehicle type tab form elements end


    //BuyBack tab form elements begin
    
    /**
    * ddslick customer type (buyback) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickCustomerTypeBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCustomerTypeBuyBack").loadImager('appendImage');
    var ajax_DdslickCustomerTypeBuyBack = $('#ajax_DdslickCustomerTypeBuyBack').ajaxCallWidget({
        proxy: '/Customer/SysCustomerType',
        type: "POST",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        loadingImageID: "loadingImage_DdslickCustomerTypeBuyBack",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerTypesDdList_syscustomertypes",
            pkIdentity: $("#publicKey").val()
        })

    });
    var selectedContCustomerTypeBuyBack = false;
    ajax_DdslickCustomerTypeBuyBack.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: true, description: "" }
            );
            $('#ddslickCustomerTypeBuyBack').ddslick({
                //height: 150,
                //data: ddslickCustomerTypeBuyBackData,
                data: data,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedContCustomerTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                    selectedContCustomerTypeBuyBack = true;
                    if (selectedData.selectedData.value > 0) {
                        /*var instance = $("#gridContainer_BuyBack").dxDataGrid("instance");
                        instance.option({
                            //dataSource: [],
                            showSubmenuMode: {
                                name: 'onClick'
                            },
                            columns: [
                                {
                                    //allowGrouping: false,
                                    caption: "Vehicle zeynel",
                                    dataField: "vahicle_description"
                                },
                                {
                                    caption: "Comfort Super",
                                    dataField: "comfort_super_name"
                                },
                                {
                                    caption: "Mileage",
                                    dataField: "mileage_type_name"
                                },
                                {
                                    caption: "Terrain",
                                    dataField: "terrain_name"
                                },
                                {
                                    caption: "Month",
                                    dataField: "month_name"
                                },
                                {
                                    caption: "Price",
                                    dataField: "price"
                                }

                            ],

                        });*/
                        
                    }
                }
            });

            $("#loadingImage_DdslickCustomerTypeBuyBack").loadImager('removeLoadImage');
        },
    })
    ajax_DdslickCustomerTypeBuyBack.ajaxCallWidget('call');

    /**
    * ddslick truck type (buyback) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    /*$('#loadingImage_DdslickTruckTypeBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTruckTypeBuyBack").loadImager('appendImage');
    var ajax_DdslickTruckTypeBuyBack = $('#ajax_DdslickTruckTypeBuyBack').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleGroups',
        type: "POST",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        loadingImageID: "loadingImage_DdslickTruckTypeBuyBack",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_DdslickTruckTypeBuyBack.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickTruckTypeBuyBack').ddslick({
                //height: 150,
                data: data,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickTruckTypeBuyBack").loadImager('removeLoadImage');
        },
    })
    ajax_DdslickTruckTypeBuyBack.ajaxCallWidget('call');*/

    /**
    * ddslick terrain type (buyback) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTerrainTypeBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTerrainTypeBuyBack").loadImager('appendImage');
    var selectedContTerrainTypeBuyBack = false;
    var ajax_DdslickTerrainTypeBuyBack = $('#ajax_DdslickTerrainTypeBuyBack').ajaxCallWidget({
        proxy: '/BuybackTradeback/SysBbTerrains',
        type: "POST",
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickTerrainTypeBuyBack",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkTerrainsBuybackDdList_systerrains",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_DdslickTerrainTypeBuyBack.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickTerrainTypeBuyBack').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {
                    if (selectedContTerrainTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                    selectedContTerrainTypeBuyBack = true;
                    if (selectedData.selectedData.value > 0) {
                        $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                    }
                }
            });

            $("#loadingImage_DdslickTerrainTypeBuyBack").loadImager('removeLoadImage');
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
            text: 'Please select',
            value: 0,
            selected: true
        },
        {
            text: "Yes",
            value: 1,
            selected: false
        },
        {
            text: "No",
            value: 2,
            selected: false
        },

    ];
    $('#loadingImage_DdslickRepMainBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickRepMainBuyBack").loadImager('appendImage');
    var selectedContRepMainBuyBack = false;
    $('#ddslickRepMainBuyBack').ddslick({
        //height: 150,
        data: ddslickRepMainDataBuyBack,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedContRepMainBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            selectedContRepMainBuyBack = true;
            if (selectedData.selectedData.value > 0) {
                $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            }
        }
    });
    $("#loadingImage_DdslickRepMainBuyBack").loadImager('removeLoadImage');

    /**
   * ddslick hydraulics (buyback) dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    var ddslickHydraDataBuyBack = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },
        {
            text: "Yes",
            value: 1,
            selected: false
        },
        {
            text: "No",
            value: 2,
            selected: false
        },

    ];
    $('#loadingImage_DdslickHydraBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickHydraBuyBack").loadImager('appendImage');
    var selectedContHydraBuyBack
    $('#ddslickHydraBuyBack').ddslick({
        //height: 150,
        data: ddslickHydraDataBuyBack,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedContHydraBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            selectedContHydraBuyBack = true;
            if (selectedData.selectedData.value > 0) {
                $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            }
        }
    });
    $("#loadingImage_DdslickHydraBuyBack").loadImager('removeLoadImage');

    //BuyBack tab form elements end

    //TradeBack tab form elements begin
    /**
   * ddslick customer type (tradeback) dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCustomerTypeTradeBack").loadImager('appendImage');
    selectedContCustomerTypeTradeBack = false;
    var ajax_DdslickCustomerTypeTradeBack = $('#ajax_DdslickCustomerTypeTradeBack').ajaxCallWidget({
        proxy: '/Customer/SysCustomerType',
        type: "POST",
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickCustomerTypeTradeBack",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerTypesDdList_syscustomertypes",
            pkIdentity: $("#publicKey").val()
        })

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
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickCustomerTypeTradeBack').ddslick({
                //height: 150,
                data: data,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedContCustomerTypeTradeBack == true) $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                    selectedContCustomerTypeTradeBack = true;
                    if (selectedData.selectedData.value > 0) {
                        $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
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
    $('#loadingImage_DdslickTruckTypeTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTruckTypeTradeBack").loadImager('appendImage');
    selectedContTruckTypeTradeBack = false;
    var ajax_DdslickTruckTypeTradeBack = $('#ajax_DdslickTruckTypeTradeBack').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleGroups',
        type: "POST",
        //failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickTruckTypeTradeBack",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerTypesDdList_syscustomertypes",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_DdslickTruckTypeTradeBack.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickTruckTypeTradeBack').ddslick({
                //height: 150,
                data: data,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedContTruckTypeBuyBack == true) $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                    selectedContTruckTypeBuyBack = true;
                    if (selectedData.selectedData.value > 0) {
                        $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                    }
                }
            });

            $("#loadingImage_DdslickTruckTypeTradeBack").loadImager('removeLoadImage');
        },
        
    })
    ajax_DdslickTruckTypeTradeBack.ajaxCallWidget('call');

    /**
    * ddslick terrain type (tradeback) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTerrainTypeTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTerrainTypeTradeBack").loadImager('appendImage');
    var selectedContTerrainTypeTradeBack = false
    var ajax_DdslickTerrainTypeTradeBack = $('#ajax_DdslickTerrainTypeTradeBack').ajaxCallWidget({
        proxy: '/BuybackTradeback/SysBbTerrains',
        type: "POST",
        //failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickTerrainTypeTradeBack",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkTerrainsTradebackDdList_systerrains",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_DdslickTerrainTypeTradeBack.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickTerrainTypeTradeBack').ddslick({
                //height: 150,
                data: data,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedContTerrainTypeTradeBack == true) $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                    selectedContTerrainTypeTradeBack = true;
                    if (selectedData.selectedData.value > 0) {
                        $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                    }
                }
            });

            $("#loadingImage_DdslickTerrainTypeTradeBack").loadImager('removeLoadImage');
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
            text: 'Please select',
            value: 0,
            selected: true
        },
        {
            text: "Yes",
            value: 1,
            selected: false
        },
        {
            text: "No",
            value: 2,
            selected: false
        },
    ];
    $('#loadingImage_DdslickRepMainTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickRepMainTradeBack").loadImager('appendImage');
    var selectedContRepMainTypeTradeBack = false;
    $('#ddslickRepMainTradeBack').ddslick({
        //height: 150,
        data: ddslickRepMainDataTradeBack,
        width: '100%',
        onSelected: function (selectedData) {
            if (selectedContRepMainTypeTradeBack == true) $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
            selectedContRepMainTypeTradeBack = true;
            if (selectedData.selectedData.value > 0) {
                $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
            }
        }
    });
    $('#loadingImage_DdslickRepMainTradeBack').loadImager('removeLoadImage');

    /**
   * ddslick hydraulics (tradeback) dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    var ddslickHydraDataTradeBack = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },
        {
            text: "Yes",
            value: 1,
            selected: false
        },
        {
            text: "No",
            value: 2,
            selected: false
        },

    ];
    $('#loadingImage_DdslickHydraTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickHydraTradeBack").loadImager('appendImage');
    var selectedContHydraTypeTradeBack = false;
    $('#ddslickHydraTradeBack').ddslick({
        //height: 150,
        data: ddslickHydraDataTradeBack,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedContHydraTypeTradeBack == true) $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
            selectedContHydraTypeTradeBack = true;
            if (selectedData.selectedData.value > 0) {
                $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
            }
        }
    });
    $("#loadingImage_DdslickHydraTradeBack").loadImager('removeLoadImage');

    //TradeBack tab form elements end


    //Body tab form elements begin

    /**
    * ddslick add body types (body) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 16/10/2018
    */
    var ddslickAddBodyTypeData = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },
        {
            text: "Body Feature",
            value: 1,
            selected: false
        },
        {
            text: "Body Extras",
            value: 2,
            selected: false
        },

    ];
    $('#loadingImage_DdslickAddBodyType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickAddBodyType").loadImager('appendImage');
    $('#ddslickAddBodyType').ddslick({
        //height: 150,
        data: ddslickAddBodyTypeData,
        //data: data,
        width: '100%',
        onSelected: function (selectedData) {
            /*if (selectedContCustomerTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            selectedContCustomerTypeBuyBack = true;*/
            if (selectedData.selectedData.value > 0) {
            }
        }
    });
    $('#loadingImage_DdslickAddBodyType').loadImager('removeLoadImage');

    

    /**
    * ddslick vehicle groups (body) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 16/10/2018
    */
    $('#loadingImage_DdslickVehicleGroupsBody').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleGroupsBody").loadImager('appendImage');
    //var selectedContTerrainTypeBuyBack = false;
    var ajax_DdslickVehicleGroupsBody = $('#ajax_DdslickVehicleGroupsBody').ajaxCallWidget({
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleGroupsBody",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_DdslickVehicleGroupsBody.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickVehicleGroupsBody').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {
                    /*if (selectedContTerrainTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                    selectedContTerrainTypeBuyBack = true;*/
                    if (selectedData.selectedData.value > 0) {
                        getDealVehicleTypeDdslick();
                    }
                }
            });

            $("#loadingImage_DdslickTerrainTypeBuyBack").loadImager('removeLoadImage');
        },
    })
    ajax_DdslickVehicleGroupsBody.ajaxCallWidget('call');

    /**
   * ddslick deal vehicle type dropdown (body)
   * @author Mustafa Zeynel Dağlı
   * @since 16/08/2018
   */
    var ddslickDealVehicleTypeBodyData = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },
    ];
    $('#loadingImage_DdslickDealVehicleTypeBody').loadImager('removeLoadImage');
    $("#loadingImage_DdslickDealVehicleTypeBody").loadImager('appendImage');
    var selectedContRepMainBuyBack = false;
    $('#ddslickDealVehicleTypeBody').ddslick({
        //height: 150,
        data: ddslickDealVehicleTypeBodyData,
        width: '100%',
        onSelected: function (selectedData) {
            /*if (selectedContRepMainBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            selectedContRepMainBuyBack = true;*/
            if (selectedData.selectedData.value > 0) {
                //$("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                
            }
        }
    });
    $("#loadingImage_DdslickDealVehicleTypeBody").loadImager('removeLoadImage');

    /**
   * ddslick deal vehicle type dropdown function (body)
   * @author Mustafa Zeynel Dağlı
   * @since 16/08/2018
   */
    var getDealVehicleTypeDdslick = function () {
        if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {
            $('#loadingImage_DdslickDealVehicleTypeBody').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeBody").loadImager('appendImage');
            var ddDataVehicleGroupsBody = $('#ddslickVehicleGroupsBody').data("ddslick");
            var ajax_DdslickDealVehicleTypeBody = $('#ajax_DdslickDealVehicleTypeBody').ajaxCallWidget({
                proxy: '/Deal/DdslickGetDealVehicleTypeProxyService',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickDealVehicleTypeBody",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkVehicleGroupsDdList_sysvehiclegroups",
                    pkIdentity: $("#publicKey").val(),
                    project_id: parseInt($("#deal_hidden").deal("getDealID")),
                    vehicle_groups_id: parseInt(ddDataVehicleGroupsBody.selectedData.value)
                })

            });
            ajax_DdslickDealVehicleTypeBody.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickDealVehicleTypeBody').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                            if (selectedData.selectedData.value > 0) {
                                //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                            }
                        }
                    });
                    $("#loadingImage_DdslickDealVehicleTypeBody").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickDealVehicleTypeBody.ajaxCallWidget('call');
        } else {
            /*$('#tab_VehicleType').loadImager('removeLoadImage');
            $('#tab_VehicleType').loadImager('appendImage');*/
            //alert("deal id < 0");
            $(window).warningMessage('resetOnShown');
            $(window).warningMessage('show', "Please select deal",
                "Please select deal");
        }

        
    };


    /**
   * ddslick hydraulics (buyback) dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    var ddslickHydraDataBuyBack = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },
        {
            text: "Yes",
            value: 1,
            selected: false
        },
        {
            text: "No",
            value: 2,
            selected: false
        },

    ];
    $('#loadingImage_DdslickHydraBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickHydraBuyBack").loadImager('appendImage');
    var selectedContHydraBuyBack
    $('#ddslickHydraBuyBack').ddslick({
        //height: 150,
        data: ddslickHydraDataBuyBack,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedContHydraBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            selectedContHydraBuyBack = true;
            if (selectedData.selectedData.value > 0) {
                $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            }
        }
    });
    $("#loadingImage_DdslickHydraBuyBack").loadImager('removeLoadImage');

    //BuyBack tab form elements end




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