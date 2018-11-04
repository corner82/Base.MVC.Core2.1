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
                search: true,
                searchText: window.lang.translate('Search'),

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


    

 




    //add deal-campaign aside tab form elements begin
    

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