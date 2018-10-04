/*
* Buyback Tradeback Matrix Form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });

    var contractType = "";
/*
* Buyback Tradeback Matrix LoadImager
* @author Ceydacan Seyrek
* @since 10/09/2018
*/
//to Buyback Tradeback Matrix form
    $("#loadingImage_bbInfo").loadImager();
    $("#loadingImage_DdslickBbCustomerType").loadImager();
    $("#loadingImage_DdslickBbComfortSuper").loadImager();
    $("#loadingImage_DdslickBbOffRoad").loadImager();
    $("#loadingImage_DdslickBbTruckType").loadImager();
    $("#loadingImage_DdslickBbHydraulics").loadImager();
    $("#loadingImage_DdslickBbMileage").loadImager();
    $("#loadingImage_DdslickBbMonths").loadImager();

    $("#loadingImage_tbInfo").loadImager();
    $("#loadingImage_DdslickTbCustomerType").loadImager();
    $("#loadingImage_DdslickTbComfortSuper").loadImager();
    $("#loadingImage_DdslickTbOffRoad").loadImager();
    $("#loadingImage_DdslickTbTruckType").loadImager();
    $("#loadingImage_DdslickTbHydraulics").loadImager();
    $("#loadingImage_DdslickTbMileage").loadImager();
    $("#loadingImage_DdslickTbMonths").loadImager();

//to Buyback Tradeback Matrix form grid loading-image
    $('#buybackInfoForm').validationEngine();
    $('#tradebackInfoForm').validationEngine();

    var langCode = $("#langCode").val();
    //alert(langCode);

//Buyback Dropdown Data

//Off Road
    $('#loadingImage_DdslickBbOffRoad').loadImager('removeLoadImage');
    $("#loadingImage_DdslickBbOffRoad").loadImager('appendImage');

    var ajaxACLResources_BbOffRoad = $('#ajax_DdslickBbOffRoad').ajaxCallWidget({
        proxy: '/BuybackTradeback/SysBbTerrains/',
        type: 'POST'
    });

    ajaxACLResources_BbOffRoad.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBbOffRoad').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata_bbtboffroad) {
            //var data = $.parseJSON(cbdata);
            var cbdata_offRoad = $.parseJSON(cbdata_bbtboffroad);
            cbdata_offRoad.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickBbOffRoad').ddslick({
                //height: 150,
                data: cbdata_offRoad,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickBbOffRoad").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBbOffRoad').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('OffRoad bulunamamıştır...'), window.lang.translate('OffRoad bulunamamıştır...'));
        },
    })
    ajaxACLResources_BbOffRoad.ajaxCallWidget('call');
//Off Road End

//Mil
    $('#loadingImage_DdslickBbMileage').loadImager('removeLoadImage');
    $("#loadingImage_DdslickBbMileage").loadImager('appendImage');

    var ajaxACLResources_BbMileage = $('#ajax_DdslickBbMileage').ajaxCallWidget({
        proxy: '/BuybackTradeback/SysBbMileages/',
        type: 'POST'
    })

    ajaxACLResources_BbMileage.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBbMileage').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata_mil) {
            //var data = $.parseJSON(cbdata);
            var cbdata_mileage = $.parseJSON(cbdata_mil);
            cbdata_mileage.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickBbMileage').ddslick({
                //height: 150,
                data: cbdata_mileage,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickBbMileage").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBbMileage').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Mileage bulunamamıştır...'), window.lang.translate('Mileage bulunamamıştır...'));
        },
    })
    ajaxACLResources_BbMileage.ajaxCallWidget('call');
//Mil End

//Month
    $('#loadingImage_DdslickBbMonths').loadImager('removeLoadImage');
    $("#loadingImage_DdslickBbMonths").loadImager('appendImage');

    var ajaxACLResources_BbMonths = $('#ajax_DdslickBbMonths').ajaxCallWidget({
        proxy: '/BuybackTradeback/SysBbMonths/',
        type: 'POST'
    });

    ajaxACLResources_BbMonths.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBbMonths').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata_month) {
            //var data = $.parseJSON(cbdata);
            var cbdata_months = $.parseJSON(cbdata_month);
            cbdata_months.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickBbMonths').ddslick({
                //height: 150,
                data: cbdata_months,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickBbMonths").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBbMonths').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Months bulunamamıştır...'), window.lang.translate('Months bulunamamıştır...'));
        },
    })
    ajaxACLResources_BbMonths.ajaxCallWidget('call');
//Month End

//Customer Type
    $('#loadingImage_DdslickBbCustomerType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickBbCustomerType").loadImager('appendImage');

    var ajaxACLResources_BbCustomerType = $('#ajax_DdslickBbCustomerType').ajaxCallWidget({
        proxy: '/Customer/SysCustomerType/',
        type: 'POST'
    });

    ajaxACLResources_BbCustomerType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomerType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata_cusType) {
            //var data = $.parseJSON(cbdata);
            var cbdata_customerType = $.parseJSON(cbdata_cusType);
            cbdata_customerType.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickBbCustomerType').ddslick({
                //height: 150,
                data: cbdata_customerType,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickBbCustomerType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBbCustomerType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Customer type bulunamamıştır...'), window.lang.translate('Customer type  bulunamamıştır...'));
        },
    })
    ajaxACLResources_BbCustomerType.ajaxCallWidget('call');
//Customer Type End

//ComfortSuper
    $('#loadingImage_DdslickBbComfortSuper').loadImager('removeLoadImage');
    $("#loadingImage_DdslickBbComfortSuper").loadImager('appendImage');

    var ajaxACLResources_BbComfortSuper = $('#ajax_DdslickBbComfortSuper').ajaxCallWidget({
        proxy: '/Sys/SysYesNo/',
        type: 'POST'
    });

    ajaxACLResources_BbComfortSuper.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBbComfortSuper').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, data_yesNo) {
            //var data = $.parseJSON(cbdata);
            var cbdata_yesNo = $.parseJSON(data_yesNo);
            cbdata_yesNo.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 2, selected: true, description: "" }
            );
            $('#ddslickBbComfortSuper').ddslick({
                //height: 150,
                data: cbdata_yesNo,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickBbComfortSuper").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBbComfortSuper').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('ComfortSuper bulunamamıştır...'), window.lang.translate('ComfortSuper bulunamamıştır...'));
        },
    })
    ajaxACLResources_BbComfortSuper.ajaxCallWidget('call');
//ComfortSuper End

//TruckType
    $('#loadingImage_DdslickBbTruckType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickBbTruckType").loadImager('appendImage');

    var ajaxACLResources_BbTruckType = $('#ajax_DdslickBbTruckType').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleTypesForBuybackInDeal/',
        type: 'POST'
    });

    ajaxACLResources_BbTruckType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBbTruckType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata) {
            //var data = $.parseJSON(cbdata);
            var cbdata_vehicle = $.parseJSON(cbdata);
            cbdata_vehicle.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickBbTruckType').ddslick({
                //height: 150,
                data: cbdata_vehicle,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickBbTruckType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBbTruckType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Truck Type bulunamamıştır...'), window.lang.translate('Truck Type bulunamamıştır...'));
        },
    })
    ajaxACLResources_BbTruckType.ajaxCallWidget('call');
//TruckType End

//Hydraulics
    $('#loadingImage_DdslickBbHydraulics').loadImager('removeLoadImage');
    $("#loadingImage_DdslickBbHydraulics").loadImager('appendImage');

    var ajaxACLResources_BbHydraulics = $('#ajax_DdslickBbHydraulics').ajaxCallWidget({
        proxy: '/Sys/SysYesNo/',
        type: 'POST'
    });

    ajaxACLResources_BbHydraulics.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_BbDdslickHydraulics').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, data_yesNo) {
            //var data = $.parseJSON(cbdata);
            var cbdata_yesNo = $.parseJSON(data_yesNo);
            cbdata_yesNo.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 2, selected: true, description: "" }
            );
            $('#ddslickBbHydraulics').ddslick({
                //height: 150,
                data: cbdata_yesNo,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickBbHydraulics").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBbHydraulics').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Hydraulics bulunamamıştır...'), window.lang.translate('Hydraulics bulunamamıştır...'));
        },
    })
    ajaxACLResources_BbHydraulics.ajaxCallWidget('call');
//Hydraulics End
//Buyback Dropdown Data End


//Tradeback Dropdown Data
//Off Road
    $('#loadingImage_DdslickTbOffRoad').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTbOffRoad").loadImager('appendImage');

    var ajaxACLResources_TbOffRoad = $('#ajax_DdslickTbOffRoad').ajaxCallWidget({
        proxy: '/BuybackTradeback/SysTbTerrains/',
        type: 'POST'
    });

    ajaxACLResources_TbOffRoad.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTbOffRoad').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata_Tbtboffroad) {
            //var data = $.parseJSON(cbdata);
            var cbdata_offRoad = $.parseJSON(cbdata_Tbtboffroad);
            cbdata_offRoad.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickTbOffRoad').ddslick({
                //height: 150,
                data: cbdata_offRoad,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickTbOffRoad").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTbOffRoad').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('OffRoad bulunamamıştır...'), window.lang.translate('OffRoad bulunamamıştır...'));
        },
    })
    ajaxACLResources_TbOffRoad.ajaxCallWidget('call');
//Off Road End

//Mil
    $('#loadingImage_DdslickTbMileage').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTbMileage").loadImager('appendImage');

    var ajaxACLResources_TbMileage = $('#ajax_DdslickTbMileage').ajaxCallWidget({
        proxy: '/BuybackTradeback/SysTbMileages/',
        type: 'POST'
    })

    ajaxACLResources_TbMileage.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTbMileage').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata_mil) {
            //var data = $.parseJSON(cbdata);
            var cbdata_mileage = $.parseJSON(cbdata_mil);
            cbdata_mileage.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickTbMileage').ddslick({
                //height: 150,
                data: cbdata_mileage,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickTbMileage").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTbMileage').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Mileage bulunamamıştır...'), window.lang.translate('Mileage bulunamamıştır...'));
        },
    })
    ajaxACLResources_TbMileage.ajaxCallWidget('call');
//Mil End

//Month
    $('#loadingImage_DdslickTbMonths').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTbMonths").loadImager('appendImage');

    var ajaxACLResources_TbMonths = $('#ajax_DdslickTbMonths').ajaxCallWidget({
        proxy: '/BuybackTradeback/SysTbMonths/',
        type: 'POST'
    });

    ajaxACLResources_TbMonths.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTbMonths').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata_month) {
            //var data = $.parseJSON(cbdata);
            var cbdata_months = $.parseJSON(cbdata_month);
            cbdata_months.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickTbMonths').ddslick({
                //height: 150,
                data: cbdata_months,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickTbMonths").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTbMonths').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Months bulunamamıştır...'), window.lang.translate('Months bulunamamıştır...'));
        },
    })
    ajaxACLResources_TbMonths.ajaxCallWidget('call');
//Month End

//Customer Type
    $('#loadingImage_DdslickTbCustomerType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTbCustomerType").loadImager('appendImage');

    var ajaxACLResources_TbCustomerType = $('#ajax_DdslickTbCustomerType').ajaxCallWidget({
        proxy: '/Customer/SysCustomerType/',
        type: 'POST'
    });

    ajaxACLResources_TbCustomerType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomerType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata_cusType) {
            //var data = $.parseJSON(cbdata);
            var cbdata_customerType = $.parseJSON(cbdata_cusType);
            cbdata_customerType.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickTbCustomerType').ddslick({
                //height: 150,
                data: cbdata_customerType,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickTbCustomerType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTbCustomerType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Customer type bulunamamıştır...'), window.lang.translate('Customer type  bulunamamıştır...'));
        },
    })
    ajaxACLResources_TbCustomerType.ajaxCallWidget('call');
//Customer Type End

//ComfortSuper
    $('#loadingImage_DdslickTbComfortSuper').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTbComfortSuper").loadImager('appendImage');

    var ajaxACLResources_TbComfortSuper = $('#ajax_DdslickTbComfortSuper').ajaxCallWidget({
        proxy: '/Sys/SysYesNo/',
        type: 'POST'
    });

    ajaxACLResources_TbComfortSuper.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTbComfortSuper').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, data_yesNo) {
            //var data = $.parseJSON(cbdata);
            var cbdata_yesNo = $.parseJSON(data_yesNo);
            cbdata_yesNo.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 2, selected: true, description: "" }
            );
            $('#ddslickTbComfortSuper').ddslick({
                //height: 150,
                data: cbdata_yesNo,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickTbComfortSuper").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTbComfortSuper').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('ComfortSuper bulunamamıştır...'), window.lang.translate('ComfortSuper bulunamamıştır...'));
        },
    })
    ajaxACLResources_TbComfortSuper.ajaxCallWidget('call');
//ComfortSuper End

//TruckType
    $('#loadingImage_DdslickTbTruckType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTbTruckType").loadImager('appendImage');

    var ajaxACLResources_TbTruckType = $('#ajax_DdslickTbTruckType').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleTypesForBuybackInDeal/',
        type: 'POST'
    });

    ajaxACLResources_TbTruckType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTbTruckType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata) {
            //var data = $.parseJSON(cbdata);
            var cbdata_vehicle = $.parseJSON(cbdata);
            cbdata_vehicle.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickTbTruckType').ddslick({
                //height: 150,
                data: cbdata_vehicle,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickTbTruckType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTbTruckType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Truck Type bulunamamıştır...'), window.lang.translate('Truck Type bulunamamıştır...'));
        },
    })
    ajaxACLResources_TbTruckType.ajaxCallWidget('call');
//TruckType End

//Hydraulics
    $('#loadingImage_DdslickTbHydraulics').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTbHydraulics").loadImager('appendImage');

    var ajaxACLResources_TbHydraulics = $('#ajax_DdslickTbHydraulics').ajaxCallWidget({
        proxy: '/Sys/SysYesNo/',
        type: 'POST'
    });

    ajaxACLResources_TbHydraulics.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_TbDdslickHydraulics').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, data_yesNo) {
            //var data = $.parseJSON(cbdata);
            var cbdata_yesNo = $.parseJSON(data_yesNo);
            cbdata_yesNo.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 2, selected: true, description: "" }
            );
            $('#ddslickTbHydraulics').ddslick({
                //height: 150,
                data: cbdata_yesNo,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickTbHydraulics").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTbHydraulics').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Hydraulics bulunamamıştır...'), window.lang.translate('Hydraulics bulunamamıştır...'));
        },
    })
    ajaxACLResources_TbHydraulics.ajaxCallWidget('call');
//Hydraulics End
//Tradeback Dropdown Data End


    /* devexgrid */
    var buybackGrid = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
            var deferred = $.Deferred(),
                args = {};

            if (loadOptions.sort) {
                args.orderby = loadOptions.sort[0].selector;
                if (loadOptions.sort[0].desc)
                    args.orderby += " desc";
            }

            args.skip = loadOptions.skip || 0;
            args.take = loadOptions.take || 12;

            $.ajax({
                url: '/BuybackTradeback/SysBbMatrix',
                dataType: "json",
                type: 'POST',
                data: args,
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data Loading Error");
                },
                timeout: 5000
            });

            return deferred.promise();
        }
    });

    var tradebackGrid = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
            var deferred = $.Deferred(),
                args = {};

            if (loadOptions.sort) {
                args.orderby = loadOptions.sort[0].selector;
                if (loadOptions.sort[0].desc)
                    args.orderby += " desc";
            }

            args.skip = loadOptions.skip || 0;
            args.take = loadOptions.take || 12;

            $.ajax({
                url: '/BuybackTradeback/SysTbMatrix',
                dataType: "json",
                type: 'POST',
                data: args,
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data Loading Error");
                },
                timeout: 5000
            });

            return deferred.promise();
        }
    });

    DevExpress.localization.locale(langCode);

//Buyback Grid
    $("#gridContainer_bbMatrix").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: buybackGrid,
        columnHidingEnabled: true,
        selection: {
            mode: "single"
        },
        hoverStateEnabled: true,
        editing: {
            //mode: "batch"
            mode: "form",
            //allowAdding: true,
            //allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: "BuybackMatrix"
        },
        grouping: {
            contextMenuEnabled: true,
            expandMode: "rowClick"
        },
        groupPanel: {
            emptyPanelText: "Use the context menu of header columns to group data",
            visible: true
        },
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            pageSize: 8
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: window.lang.translate('Search') + "...",
        },
        headerFilter: {
            visible: true
        },
        columnChooser: {
            enabled: true,
            mode: "select"
        },
        columns: [{
            caption: window.lang.translate('Contract type') + "...",
            dataField: "contract_name"
        }, {
            caption: window.lang.translate('Customer type') + "...",
            dataField: "customer_type_name"
        }, {
            caption: window.lang.translate('ComfortSuper') + "...",
            dataField: "comfort_super_name"
        }, {
            caption: window.lang.translate('% Off road') + "...",
            dataField: "terrain_name"
        }, {
            caption: window.lang.translate('Truck Type') + "...",
            dataField: "vahicle_description"
        }, {
            caption: window.lang.translate('Hydraulics') + "...",
            dataField: "hydraulics_name"
        }, {
            caption: window.lang.translate('Mileage per annum (km)') + "...",
            dataField: "mileage_type_name"
        }, {
            caption: window.lang.translate('Months') + "...",
            dataField: "month_name"
        }, {
            caption: window.lang.translate('Price') + "...",
            dataField: "price"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillBbMatrixForm(data);
            }
        }
    });

//Tradeback Grid

    $("#gridContainer_tbMatrix").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: tradebackGrid,
        columnHidingEnabled: true,
        selection: {
            mode: "single"
        },
        hoverStateEnabled: true,
        editing: {
            //mode: "batch"
            mode: "form",
            //allowAdding: true,
            //allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: "TradebackMatrix"
        },
        grouping: {
            contextMenuEnabled: true,
            expandMode: "rowClick"
        },
        groupPanel: {
            emptyPanelText: "Use the context menu of header columns to group data",
            visible: true
        },
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            pageSize: 8
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: window.lang.translate('Search') + "...",
        },
        headerFilter: {
            visible: true
        },
        columnChooser: {
            enabled: true,
            mode: "select"
        },
        columns: [{
            caption: window.lang.translate('Contract type') + "...",
            dataField: "contract_name"
        }, {
            caption: window.lang.translate('Customer type') + "...",
            dataField: "customer_type_name"
        }, {
            caption: window.lang.translate('ComfortSuper') + "...",
            dataField: "comfort_super_name"
        }, {
            caption: window.lang.translate('% Off road') + "...",
            dataField: "terrain_name"
        }, {
            caption: window.lang.translate('Truck Type') + "...",
            dataField: "vahicle_description"
        }, {
            caption: window.lang.translate('Hydraulics') + "...",
            dataField: "hydraulics_name"
        }, {
            caption: window.lang.translate('Mileage per annum (km)') + "...",
            dataField: "mileage_type_name"
        }, {
            caption: window.lang.translate('Months') + "...",
            dataField: "month_name"
        }, {
            caption: window.lang.translate('Price') + "...",
            dataField: "price"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillTbMatrixForm(data);
            }
        }
    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


 /**
 * Buyback Matrix
 * @author Ceydacan Seyrek
 * @since 10/09/2018
 */

    window.insertbbMatrix = function () {
        $("#loadingImage_bbInfo").loadImager('removeLoadImage');
        $("#loadingImage_bbInfo").loadImager('appendImage');

       // var cst_purchaselastupdate = $('#txt-location-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysbbInfo',

                name: bbMatrix_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Tradeback Matrix Ekleme İşlemi Başarısız...',
                    'Buyback Tradeback Matrix Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysbbInfo" servis hatası->' + textStatus);
                $("#loadingImage_bbInfo").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#buybackInfoForm')[0].reset();

                        $("#loadingImage_bbInfo").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Buyback Tradeback Matrix Kay�t ��lemi Ba�ar�l�...',
                    'Buyback Tradeback Matrix kay�t i�lemini ger�ekle�tirdiniz... ',
                    data);
                $("#loadingImage_bbInfo").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Tradeback Matrix Kayıt İşlemi Başarısız...',
                    'Buyback Tradeback Matrix kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbInfo" servis datası boştur!!');
                $("#loadingImage_bbInfo").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Tradeback Matrix İşlemi Başarısız...',
                    'Buyback Tradeback Matrix kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbInfo" servis datası boştur!!');
                $("#loadingImage_bbInfo").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loadingImage_bbInfo").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $("#loadingImage_bbInfo").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Buyback Tradeback Matrix İşlemi Başarısız...',
                    'Aynı isim ile Buyback Tradeback Matrix  kaydı yapılmıştır, yeni bir Buyback Tradeback Matrix kaydı deneyiniz... ');
                $("#loadingImage_bbInfo").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
/**
* reset Buyback Matrix Form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.resetBbMatrixForm = function () {
        $("#loadingImage_bbInfo").loadImager('removeLoadImage');
        $("#loadingImage_bbInfo").loadImager('appendImage');

        $('#buybackInfoForm').validationEngine('hide');
        //$('#ddslickTonnage').ddslick('select', { index: String(0) });
        //$('#ddslickContractType').ddslick('select', { index: String(0) });
        $('#ddslickBbCustomerType').ddslick('select', { index: String(0) });
        $('#ddslickBbComfortSuper').ddslick('select', { index: String(0) });
        $('#ddslickBbOffRoad').ddslick('select', { index: String(0) });
        $('#ddslickBbTruckType').ddslick('select', { index: String(0) });
        $('#ddslickBbHydraulics').ddslick('select', { index: String(0) });
        $('#ddslickBbMileage').ddslick('select', { index: String(0) });
        $('#ddslickBbMonths').ddslick('select', { index: String(0) });

        $("#loadingImage_bbInfo").loadImager('removeLoadImage');

        return false;
    }


/**
* insert Buyback Matrix Wrapper
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.insertBbMatrixWrapper = function (e) {
        e.preventDefault();

        if ($("#buybackInfoForm").validationEngine('validate')) {

            insertBbMatrix();
        }
        return false;
    }


/**
* Fill Buyback Matrix form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.fillBbMatrixForm = function (data) {
        $("#loadingImage_bbInfo").loadImager('removeLoadImage');
        $("#loadingImage_bbInfo").loadImager('appendImage');

        document.getElementById("txt-BbMatrix-price").value = data.price;

        $("#loadingImage_bbInfo").loadImager('removeLoadImage');
        //$('#ddslickTonnage').ddslick('select', { index: 3 });        
        $('#ddslickBbCustomerType').ddslick('selectByValue',
            {
                index: '' + data.customer_type_id + '',
                text: '' + data.customer_type_name + ''
            }
        );
        $('#ddslickBbComfortSuper').ddslick('selectByValue',
            {
                index: '' + data.comfort_super_id + '',
                text: '' + data.comfort_super_name + ''
            }
        );
        $('#ddslickBbOffRoad').ddslick('selectByValue',
            {
                index: '' + data.terrain_id + '',
                text: '' + data.terrain_name + ''
            }
        );

        $('#ddslickBbTruckType').ddslick('selectByValue',
            {
                index: '' + data.model_id + '',
                text: '' + data.vahicle_description + ''
            }
        );
        $('#ddslickBbHydraulics').ddslick('selectByValue',
            {
                index: '' + data.hydraulics + '',
                text: '' + data.hydraulics_name + ''
            });
        $('#ddslickBbMileage').ddslick('selectByValue',
            {
                index: '' + data.mileage_id + '',
                text: '' + data.mileage_type_name + ''
            }
        );
        $('#ddslickBbMonths').ddslick('selectByValue',
            {
                index: '' + data.month_id + '',
                text: '' + data.month_name + ''
            }
        );
        return false;
    }


/**
* Tradeback Matrix
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.inserttbMatrix = function () {
        $("#loadingImage_tbInfo").loadImager('removeLoadImage');
        $("#loadingImage_tbInfo").loadImager('appendImage');

        // var cst_purchaselastupdate = $('#txt-location-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysbbInfo',

                name: bbMatrix_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Tradeback Matrix Ekleme İşlemi Başarısız...',
                    'Buyback Tradeback Matrix Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysbbInfo" servis hatası->' + textStatus);
                $("#loadingImage_tbInfo").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#tradebackbackInfoForm')[0].reset();

                        $("#loadingImage_tbInfo").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Buyback Tradeback Matrix Kay�t ��lemi Ba�ar�l�...',
                    'Buyback Tradeback Matrix kay�t i�lemini ger�ekle�tirdiniz... ',
                    data);
                $("#loadingImage_tbInfo").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Tradeback Matrix Kayıt İşlemi Başarısız...',
                    'Buyback Tradeback Matrix kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbInfo" servis datası boştur!!');
                $("#loadingImage_tbInfo").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Tradeback Matrix İşlemi Başarısız...',
                    'Buyback Tradeback Matrix kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbInfo" servis datası boştur!!');
                $("#loadingImage_tbInfo").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loadingImage_tbInfo").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $("#loadingImage_tbInfo").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Buyback Tradeback Matrix İşlemi Başarısız...',
                    'Aynı isim ile Buyback Tradeback Matrix  kaydı yapılmıştır, yeni bir Buyback Tradeback Matrix kaydı deneyiniz... ');
                $("#loadingImage_tbInfo").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
/**
* reset Tradeback Matrix Form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.resetTbMatrixForm = function () {
        $("#loadingImage_tbInfo").loadImager('removeLoadImage');
        $("#loadingImage_tbInfo").loadImager('appendImage');

        $('#tradebackInfoForm').validationEngine('hide');
        //$('#ddslickTonnage').ddslick('select', { index: String(0) });
        //$('#ddslickContractType').ddslick('select', { index: String(0) });
        $('#ddslickTbCustomerType').ddslick('select', { index: String(0) });
        $('#ddslickTbComfortSuper').ddslick('select', { index: String(0) });
        $('#ddslickTbOffRoad').ddslick('select', { index: String(0) });
        $('#ddslickTbTruckType').ddslick('select', { index: String(0) });
        $('#ddslickTbHydraulics').ddslick('select', { index: String(0) });
        $('#ddslickTbMileage').ddslick('select', { index: String(0) });
        $('#ddslickTbMonths').ddslick('select', { index: String(0) });

        $("#loadingImage_tbInfo").loadImager('removeLoadImage');

        return false;
    }


/**
* insert Tradeback Matrix Wrapper
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.insertTbMatrixWrapper = function (e) {
        e.preventDefault();

        if ($("#tradebackInfoForm").validationEngine('validate')) {

            insertTbMatrix();
        }
        return false;
    }


/**
* Fill Tradeback Matrix form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.fillTbMatrixForm = function (data) {
        $("#loadingImage_tbInfo").loadImager('removeLoadImage');
        $("#loadingImage_tbInfo").loadImager('appendImage');

        document.getElementById("txt-TbMatrix-price").value = data.price;

        $("#loadingImage_tbInfo").loadImager('removeLoadImage');
        //$('#ddslickTonnage').ddslick('select', { index: 3 });        
        $('#ddslickTbCustomerType').ddslick('selectByValue',
            {
                index: '' + data.customer_type_id + '',
                text: '' + data.customer_type_name + ''
            }
        );
        $('#ddslickTbComfortSuper').ddslick('selectByValue',
            {
                index: '' + data.comfort_super_id + '',
                text: '' + data.comfort_super_name + ''
            }
        );
        $('#ddslickTbOffRoad').ddslick('selectByValue',
            {
                index: '' + data.terrain_id + '',
                text: '' + data.terrain_name + ''
            }
        );

        $('#ddslickTbTruckType').ddslick('selectByValue',
            {
                index: '' + data.model_id + '',
                text: '' + data.vahicle_description + ''
            }
        );
        $('#ddslickTbHydraulics').ddslick('selectByValue',
            {
                index: '' + data.hydraulics + '',
                text: '' + data.hydraulics_name + ''
            });
        $('#ddslickTbMileage').ddslick('selectByValue',
            {
                index: '' + data.mileage_id + '',
                text: '' + data.mileage_type_name + ''
            }
        )
        $('#ddslickTbMonths').ddslick('selectByValue',
            {
                index: '' + data.month_id + '',
                text: '' + data.month_name + ''
            }
        );

        return false;
    }

});

