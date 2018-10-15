﻿$(document).ready(function () {

    $("#deal_hidden").deal()
    var dealID;

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });

    /**
     * only add deal tab is active at the beginning
     *  @author Mustafa Zeynel Dağlı
     *  @since 08/10/2018
     * */
    $("#deal_hidden").organizeTabs({ tabID: "deals_tab" });
    //$("#deal_hidden").organizeTabs('disableAllTabsButOne');

    


    //Make the dashboard widgets sortable Using jquery UI
    $(".connectedSortable").sortable({
        placeholder: "sort-highlight",
        connectWith: ".connectedSortable",
        handle: ".box-header, .nav-tabs",
        forcePlaceholderSize: true,
        zIndex: 999999
    });
    $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");

    $(document).click(function (event) {
        /*alert(event.target.nodeName);
        alert($(event.target).data('nodejs-log'));
        alert('session id =>' + localStorage.getItem('sessionID'));
        alert('user name =>' + localStorage.getItem('userName'));
        alert('user IP =>' + localStorage.getItem('userIP'));*/
        var test = event.target;
        //alert(test.attr('data-toggle'));

        //var socket = io.connect('https://localhost:8444');
        //var socket = io.connect('http://localhost:3000', { reconnect: true });
        /*var $messageForm = $('#send-message');
        var $messageBox = $('#chat-input');*/

        /*$messageForm.submit(function (e) {
            e.preventDefault();
            socket.emit('send message', 'click message');
            //$messageBox.val('');
        })*/
        var msg = '{ "UserName" : "' + localStorage.getItem('userName') + '","Host" : "localhost:3000","Action": "' + $("#requestUriRegulated").val() + '","Controller":"' + $("#requestUriRegulated").val() + '","Port":"3000","UserAgent":"Chrome","UserIP":"127.0.0.1","Method":"Demo","SessionID": "' + localStorage.getItem('sessionID') + '","UserToken":"ssssss","UserPublicKey":"' + $("#publicKey").val() + '"}';
        //socket.emit('send message', 'click message');
        //socket.emit('send message', msg);

        /*socket.on('new message', function (data) {
            $('.panel-body').append(data + '<br/>');
        })*/
    });

    //jQuery UI sortable for the todo list
    $(".todo-list").sortable({
        placeholder: "sort-highlight",
        handle: ".handle",
        forcePlaceholderSize: true,
        zIndex: 999999
    });

    // vehicle type date picker
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-1d'
    });



    //----------------------------------add  deal campaign begin-------------------------------------------------

    /**
     * add campaign to deal asider opening
     * @author Mustafa Zeynel Dağlı
     * @since 08/10/2018
     * */
    $('#campaignAddAside').asideRight({
        width: "900"
    });

    /**
     * add campaiggn asider events
     * @author Mustafa Zeynel Dağlı
     * @since 08/10/2018
     * */
    $('#campaignAddAside').asideRight({
        onClosed: function (event, element) {
            //alert('onclosed event right slider');
        },
        onClosing: function (event, element) {
            //alert('onclosing event right slider');
        },
        onOpened: function (event, element) {
            //alert('onopened event right slider');
        },
        onOpening: function (event, element) {
            //console.log(element);
            //alert('onopening event right slider');
        }
    });

    /**
     * add campaign asider opening
     * @author Mustafa Zeynel Dağlı
     * @since 08/10/2018
     * */
    $("#toggle_CampaignAsider").on("click", function (e) {
        e.preventDefault();
        // $(".sidebar.left").sidebar().trigger("sidebar:open");
        //alert('test');

        //alert($(this).offset().top);
        $('#campaignAddAside').asideRight('setFromTop', (parseFloat($(this).offset().top)) - 500);
        $('#campaignAddAside').asideRight('toggle');
    });

    /**
     * add campaign asider closing
     * @author Mustafa Zeynel Dağlı
     * @since 08/10/2018
     * */
    $("#toggle_closeCampaignAside").on("click", function () {
        $('#campaignAddAside').asideRight('toggle');
    });

    //----------------------------------add  deal campaign end-------------------------------------------------


    //----------------------------------add  deal begin-------------------------------------------------

    /**
     * loading image for add deal process
     * */
    $('#tab_DealAttr').loadImager();

    /**
     * add deal form reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetDealAddForm = function () {
        $('#addDealForm').validationEngine('hide');
        $('#addDealForm')[0].reset();
        $('#ddslickCustomer').ddslick("select", { index: '0' });
        $('#ddslickPriority').ddslick("select", { index: '0' });
        $('#ddslickRealizationRate').ddslick("select", { index: '0' });
        /* $('#dropdownLicenseResult').ddslick('selectByValue',
             { index: '0' }*/
    }

    /**
     * add deal form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addDealForm").validationEngine();

    /**
     * add deal click event handler
     * @author Mustafa Zeynel Dağlı
     * @todo deal id js değişkene atılacak
     * @ajax call değişkeni standart lokal değişken yapılacak
     * */
    $("#add_deal").on("click", function (e) {
        e.preventDefault();
        $('#tab_DealAttr').loadImager('removeLoadImage');
        $("#tab_DealAttr").loadImager('appendImage');

        var ddDataCustomer = $('#ddslickCustomer').data('ddslick');
        var ddDataPriority = $('#ddslickPriority').data('ddslick');
        var ddDataRealizationRate = $('#ddslickRealizationRate').data('ddslick');

        if ($("#addDealForm").validationEngine("validate")) {
            if (!ddDataCustomer.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select customer"),
                    window.lang.translate("Please select customer"));
                $('#tab_DealAttr').loadImager('removeLoadImage');
                return false;
            }
            var ajax_DdslickCustomer = $('#add_deal').ajaxCallWidget({
                proxy: '/Deal/AddDealProxyService',
                type: "POST",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                loadingImageID: "tab_DealAttr",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    deal_name: $("#deal_name").val(),
                    url: "pkInsertAct_infoproject",
                    pkIdentity: $("#publicKey").val(),
                    customer_id: ddDataCustomer.selectedData.value,
                    is_house_deal: 0,
                    probability_id: ddDataPriority.selectedData.value,
                    reliability_id: ddDataRealizationRate.selectedData.value,
                    description: $("#description").val(),
                    discount_rate: $("#description").val()
                })

            });
            ajax_DdslickCustomer.ajaxCallWidget({
                onAfterSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    //alert(data.lastInsertId);
                    //$("#deal_hidden").deal({ dealID: data.lastInsertId })
                    $("#deal_hidden").deal("setDealID", data.lastInsertId )
                    //console.log($("#deal_hidden").deal("option", "dealID"));
                    //alert($("#deal_hidden").deal("option", "dealID"));

                    $("#update_deal").removeClass("hidden");
                    $("#add_deal").addClass("hidden");

                    $("#deal_hidden").organizeTabs("enableAllTabs");
                    $("#gridContainer_vehicle").dxDataGrid("instance").refresh();
                },
                onReset: function () {
                    //resetDealAddForm();
                }

            })
            ajax_DdslickCustomer.ajaxCallWidget('call');
            return false;
        } else {
            $('#tab_DealAttr').loadImager('removeLoadImage');
        }


        return false;
    })

    // add deal reset
    $("#add_deal_reset").on("click", function (e) {
        e.preventDefault();
        resetDealAddForm();
        return false;
    })

    //----------------------------------add  deal end-------------------------------------------------


    //----------------------------------add vehicle type to deal begin-------------------------------------------------

    /**
     * loading image for add vehicle type process
     * */
    $('#tab_VehicleType').loadImager();

    /**
     * add deal form vehicle type reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetVehicleTypeAddDealForm = function () {
        $('#addVehicleTypeForm').validationEngine('hide');
        $('#addVehicleTypeForm')[0].reset();
        $('#ddslickVehicleType').ddslick("select", { index: '0' });

    }

    /**
     * add vehicle type form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addVehicleTypeForm").validationEngine();

    /**
     * add deal click event handler
     * @author Mustafa Zeynel Dağlı
     * @todo deal is js lokal değişkenden alınacak
     * */
    $("#add_vehicleType").on("click", function (e) {
        e.preventDefault();
        $('#tab_VehicleType').loadImager('removeLoadImage');
        $("#tab_VehicleType").loadImager('appendImage');

        var ddDataVehicleType = $('#ddslickVehicleType').data('ddslick');
        if (!ddDataVehicleType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                                      window.lang.translate("Please select vehicle type"));
            $('#tab_VehicleType').loadImager('removeLoadImage');
            return false;
        }

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        if (dealID == null || dealID == "" || dealID <= 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', "Please select deal",
                                       "Please select deal");
            $('#tab_VehicleType').loadImager('removeLoadImage');
            return false;
        }

        alert(ddDataVehicleType.selectedData.value);
        if ($("#tagcabin_DealVehicles").tagCabin('findSpecificTags', ddDataVehicleType.selectedData.value, 'data-attribute') != true) {
            /*tagBuilderChemicalPropGroup.tagCabin('addTagManuallyDataAttr', selectedItem.value,
                selectedItem.text,*/
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', "Please select another vehicle type",
                "Please select another vehicle type");
            $('#tab_VehicleType').loadImager('removeLoadImage');
            return false;
        }

        var ajax = $('#add_vehicleType').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "tab_VehicleType",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Deal/AddVehicleTypeProxyService',
            type: "POST",
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkInsertAct_infoprojectvehiclemodels",
                pkIdentity: $("#publicKey").val(),
                project_id: dealID,
                is_house_deal: 0,
                vehicle_gt_model_id: ddDataVehicleType.selectedData.value,
                quantity: $("#quantity").val(),
                delivery_date: "10/10/2018",
            })

        });
        ajax.ajaxCallWidget({
            onReset: function (event, data) {
                resetVehicleTypeAddDealForm();
            },
            onAfterSuccess: function (event, data) {
                $("#deal_hidden").deal("addVehicleType", { vehicleType: ddDataVehicleType.selectedData.value, count: $("#quantity").val() });
                $("#tagcabin_DealVehicles").tagCabin('addTagManuallyDataAttr', ddDataVehicleType.selectedData.value,
                    ddDataVehicleType.selectedData.text+" / "+$("#quantity").val(),

                );

                /*var tagBuilderChemicalPropGroup = $('#chemical-property-group-cabin').tagCabin({
                    tagCopy: false,
                    tagDeletable: true,
                    tagDeletableAll: false,
                    tagBox: $('.tag-container-chemical-property-group').find('ul'),

                });*/

                console.log($("#deal_hidden").deal("option", "dealID"));
            }
        })
        ajax.ajaxCallWidget('call');
        return false;
    })

    // add deal reset
    $("#add_vehicleType_reset").on("click", function (e) {
        e.preventDefault();
        resetDealAddForm();
        return false;
    })

    //----------------------------------add vehicle type to deal end-------------------------------------------------


    //----------------------------------add buyback to deal begin-------------------------------------------------

    /**
     * loading image for add vehicle type process
     * */
    $('#tab_BuyBack').loadImager();

    /**
     * add deal buyback form vehicle type reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetBuyBackForm = function () {
        //$('#addBuyBackForm').validationEngine('hide');
        $('#addBuyBackForm')[0].reset();
        $('#ddslickVehicleTypeBuyBack').ddslick("select", { index: '0' });
        $('#ddslickCustomerTypeBuyBack').ddslick("select", { index: '0' });
        $('#ddslickTruckTypeBuyBack').ddslick("select", { index: '0' });
        $('#ddslickTerrainTypeBuyBack').ddslick("select", { index: '0' });
        $('#ddslickRepMainBuyBack').ddslick("select", { index: '0' });
        $('#ddslickHydraBuyBack').ddslick("select", { index: '0' });
    }

    /**
     * add buyback form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addBuyBackForm").validationEngine();

    /**
     * add deal click event handler
     * @author Mustafa Zeynel Dağlı
     * @todo deal is js lokal değişkenden alınacak
     * */
    $("#add_buyBack").on("click", function (e) {
        e.preventDefault();
        $('#tab_BuyBack').loadImager('removeLoadImage');
        $("#tab_BuyBack").loadImager('appendImage');


        var ddDataDealVehicleType = $('#ddslickDealVehicleTypeBuyBack').data('ddslick');
        if (!ddDataDealVehicleType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                window.lang.translate("Please select vehicle type"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataVehicleType = $('#ddslickVehicleTypeBuyBack').data('ddslick');
        if (!ddDataVehicleType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                window.lang.translate("Please select vehicle type"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataCustomerType = $('#ddslickCustomerTypeBuyBack').data('ddslick');
        if (!ddDataCustomerType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select customer type"),
                window.lang.translate("Please select customer type"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataTruckType = $('#ddslickTruckTypeBuyBack').data('ddslick');
        if (!ddDataTruckType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select truck type"),
                window.lang.translate("Please select truck type"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataTerrainType = $('#ddslickTerrainTypeBuyBack').data('ddslick');
        if (!ddDataTerrainType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select terrain type"),
                window.lang.translate("Please select terrain type"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataRepairMaintainance = $('#ddslickRepMainBuyBack').data('ddslick');
        if (!ddDataRepairMaintainance.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select R&M "),
                window.lang.translate("Please select R&M"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataHydralics = $('#ddslickHydraBuyBack').data('ddslick');
        if (!ddDataHydralics.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select hydraulics "),
                window.lang.translate("Please select R&M"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        if (dealID == null || dealID == "" || dealID <= 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', "Please select deal",
                "Please select deal");
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ajax = $('#add_buyBack').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "tab_BuyBack",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Deal/AddBuyBackProxyService',
            type: "POST",
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkInsertAct_infoprojectbuybacks",
                pkIdentity: $("#publicKey").val(),
                project_id: dealID,
                is_house_deal: 0,
                vehicles_endgroup_id : ddDataVehicleType.selectedData.value,
                vehicles_trade_id : ddDataVehicleType.selectedData.value,
                customer_type_id: ddDataCustomerType.selectedData.value,
                comfort_super_id : ddDataVehicleType.selectedData.value,
                terrain_id : ddDataVehicleType.selectedData.value,
                vehicle_group_id : ddDataVehicleType.selectedData.value,
                hydraulics_id : ddDataVehicleType.selectedData.value,
                buyback_matrix_id : 1,
                quantity: $("#quantity").val(),
                delivery_date: "10/10/2018",
            })

        });
        ajax.ajaxCallWidget({
            onReset: function (event, data) {
                resetVehicleTypeAddDealForm();
            },
            onAfterSuccess: function (event, data) {
                $("#deal_hidden").deal("addBuyBack", {
                    vehicleType : ddslickVehicleTypeBuyBack.selectedData.value,
                    customerType : ddDataCustomerType.selectedData.value,
                    truckType : ddDataTruckType.selectedData.value,
                    repairMain : ddDataTerrainType.selectedData.value,
                    customerType: ddDataRepairMaintainance.selectedData.value,
                    hydraulicsType: ddDataHydralics.selectedData.value,
                });
                //console.log($("#deal_hidden").deal("option", "dealID"));
            }
        })
        //ajax.ajaxCallWidget('call');
        return false;
    })

    // add deal reset
    $("#add_buyBack_reset").on("click", function (e) {
        e.preventDefault();
        resetBuyBackForm();
        return false;
    })

    //----------------------------------add buyBack to deal end-------------------------------------------------


    //----------------------------------add tradeback to deal begin-------------------------------------------------

    /**
     * loading image for add vehicle type process
     * */
    $('#tab_TradeBack').loadImager();

    /**
     * add deal buyback form vehicle type reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetBuyBackForm = function () {
        //$('#addTradeBackForm').validationEngine('hide');
        $('#addTradeBackForm')[0].reset();
        $('#ddslickVehicleTypeTradeBack').ddslick("select", { index: '0' });
        $('#ddslickCustomerTypeTradeBack').ddslick("select", { index: '0' });
        $('#ddslickTruckTypeTradeBack').ddslick("select", { index: '0' });
        $('#ddslickTerrainTypeTradeBack').ddslick("select", { index: '0' });
        $('#ddslickRepMainTradeBack').ddslick("select", { index: '0' });
        $('#ddslickHydraTradeBack').ddslick("select", { index: '0' });
    }

    /**
     * add buyback form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addTradeBackForm").validationEngine();

    /**
     * add tared back click event handler
     * @author Mustafa Zeynel Dağlı
     * @todo deal is js lokal değişkenden alınacak
     * */
    $("#add_tradeBack").on("click", function (e) {
        e.preventDefault();
        $('#tab_TradeBack').loadImager('removeLoadImage');
        $("#tab_TradeBack").loadImager('appendImage');

        var ddDataVehicleType = $('#ddslickDealVehicleTypeTradeBack').data('ddslick');
        //alert($('#ddslickVehicleTypeTradeBack').ddslick("instance"));
        //alert(ddDataVehicleType);
        //alert($('#ddslickVehicleTypeTradeBack').length);
        //console.log(jQuery.type(ddDataVehicleType));
        if (typeof ddDataVehicleType != "undefined") {
            //alert("dene1");
            if (ddDataVehicleType.selectedData.value <= 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                    window.lang.translate("Please select vehicle type"));
                $('#tab_TradeBack').loadImager('removeLoadImage');
                return false;
            } else {

            }
        } else {
            //alert("dene2");
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                window.lang.translate("Please select vehicle type"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }
        

        var ddDataCustomerType = $('#ddslickCustomerTypeTradeBack').data('ddslick');
        if (!ddDataCustomerType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select customer type"),
                window.lang.translate("Please select customer type"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }

        /*var ddDataTruckType = $('#ddslickTruckTypeTradeBack').data('ddslick');
        if (!ddDataTruckType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select truck type"),
                window.lang.translate("Please select truck type"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }*/

        var ddDataTerrainType = $('#ddslickTerrainTypeTradeBack').data('ddslick');
        if (!ddDataTerrainType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select terrain type"),
                window.lang.translate("Please select terrain type"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataRepairMaintainance = $('#ddslickRepMainTradeBack').data('ddslick');
        if (!ddDataRepairMaintainance.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select R&M "),
                window.lang.translate("Please select R&M"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataHydralics = $('#ddslickHydraTradeBack').data('ddslick');
        if (!ddDataHydralics.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select hydraulics "),
                window.lang.translate("Please select hydraulics"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        if (dealID == null || dealID == "" || dealID <= 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', "Please select deal",
                "Please select deal");
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ajax = $('#add_tradeBack').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "tab_TradeBack",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Deal/AddBuyBackProxyService',
            type: "POST",
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkInsertAct_infoprojectvehiclemodels",
                pkIdentity: $("#publicKey").val(),
                project_id: dealID,
                is_house_deal: 0,
                vehicle_gt_model_id: ddDataVehicleType.selectedData.value,
                quantity: $("#quantity").val(),
                delivery_date: "10/10/2018",
            })

        });
        ajax.ajaxCallWidget({
            onReset: function (event, data) {
                resetVehicleTypeAddDealForm();
            },
            onAfterSuccess: function (event, data) {
                $("#deal_hidden").deal("addBuyBack", {
                    vehicleType: ddslickVehicleTypeBuyBack.selectedData.value,
                    customerType: ddDataCustomerType.selectedData.value,
                    truckType: ddDataTruckType.selectedData.value,
                    repairMain: ddDataTerrainType.selectedData.value,
                    customerType: ddDataRepairMaintainance.selectedData.value,
                    hydraulicsType: ddDataHydralics.selectedData.value,
                });
                //console.log($("#deal_hidden").deal("option", "dealID"));
            }
        })
        ajax.ajaxCallWidget('call');
        return false;
    })

    // add deal reset
    $("#add_buyBack_reset").on("click", function (e) {
        e.preventDefault();
        resetBuyBackForm();
        return false;
    })

    //----------------------------------add tradeBack to deal end-------------------------------------------------




});