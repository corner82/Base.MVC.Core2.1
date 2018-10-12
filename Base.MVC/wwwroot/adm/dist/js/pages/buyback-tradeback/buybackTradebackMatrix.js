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
    var buybackId;
    var tradebackId;
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
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkTerrainsBuybackDdList_systerrains&language_code=en&pk=GsZVzEYe50uGgNM

    var ajaxACLResources_BbOffRoad = $('#ajax_DdslickBbOffRoad').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickBbOffRoad",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/BuybackTradeback/SysBbTerrains',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkTerrainsBuybackDdList_systerrains",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_BbOffRoad.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, databboffroad) {

            var cbdata_bboffroad = $.parseJSON(databboffroad);
            cbdata_bboffroad.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickBbOffRoad').ddslick({
                data: cbdata_bboffroad,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickBbOffRoad').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickBbOffRoad').loadImager('removeLoadImage');
        }
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

    var ajaxACLResources_BbOffRoad = $('#ajax_DdslickBbCustomerType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickBbCustomerType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysCustomerType/',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerTypesDdList_syscustomertypes",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_BbOffRoad.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, databboffroad) {

            var cbdata_bboffroad = $.parseJSON(databboffroad);
            cbdata_bboffroad.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickBbCustomerType').ddslick({
                data: cbdata_bboffroad,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickBbCustomerType').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickBbCustomerType').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_BbOffRoad.ajaxCallWidget('call');

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
//http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkTerrainsTradebackDdList_systerrains&language_code=en&pk=GsZVzEYe50uGgNM
    $('#loadingImage_DdslickTbOffRoad').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTbOffRoad").loadImager('appendImage');

    var ajaxACLResources_BbOffRoad = $('#ajax_DdslickTbOffRoad').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickTbOffRoad",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/BuybackTradeback/SysBbTerrains',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkTerrainsTradebackDdList_systerrains",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_BbOffRoad.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, databboffroad) {

            var cbdata_bboffroad = $.parseJSON(databboffroad);
            cbdata_bboffroad.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickTbOffRoad').ddslick({
                data: cbdata_bboffroad,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickTbOffRoad').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickTbOffRoad').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_BbOffRoad.ajaxCallWidget('call');

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

    var ajaxACLResources_BbOffRoad = $('#ajax_DdslickTbCustomerType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickTbCustomerType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysCustomerType/',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerTypesDdList_syscustomertypes",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_BbOffRoad.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, databboffroad) {

            var cbdata_bboffroad = $.parseJSON(databboffroad);
            cbdata_bboffroad.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickTbCustomerType').ddslick({
                data: cbdata_bboffroad,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickTbCustomerType').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickTbCustomerType').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_BbOffRoad.ajaxCallWidget('call');
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
    DevExpress.localization.locale(langCode);
    //Buyback Grid
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillBuybackMatrixGridx_sysbuybackmatrix&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_sysbuybackmatrix&id=8&pk=GsZVzEYe50uGgNM
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
                url: '/BuybackTradeback/SysBbMatrixGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillBuybackMatrixGridx_sysbuybackmatrix",
                    pkIdentity: $("#publicKey").val(),
                    page: "",
                    rows: "",
                    sort: "",
                    order: "", //args.orderby,
                    skip: args.skip,
                    take: args.take
                }),
                type: 'POST',
                contentType: 'application/json',
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data Loading Error");
                },
                timeout: 10000
            });
            return deferred.promise();
        },
        remove: function (key) {
            var deferred = $.Deferred();

            return $.ajax({
                url: '/BuybackTradeback/SysDeleteBbTb',
                dataType: "json",
                data: JSON.stringify({
                    id: buybackId,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_sysbuybackmatrix"
                }),
                type: 'POST',
                contentType: 'application/json',
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data remove Error");
                },
                timeout: 10000
            });
        }
    });

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
        columnWidth: {
            autoWidth: false
        },
        columns: [{
            caption: window.lang.translate('Active/Passive'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var buyback_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveBuyback(buyback_id, options.data.active);
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveBuyback(buyback_id, options.data.active);
                    }).appendTo(container);
                }
            }
        }, {
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
                buybackId = data.id;
                fillBbMatrixForm(data);
            }
        },
        onRowRemoving: function (e) {
            buybackId = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_bbMatrix").dxDataGrid("instance").refresh();
        },
    });

    //Tradeback Grid
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillTradebackMatrixGridx_sysbuybackmatrix&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_sysbuybackmatrix&id=8&pk=GsZVzEYe50uGgNM
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
                url: '/BuybackTradeback/SysTbMatrixGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillTradebackMatrixGridx_sysbuybackmatrix",
                    pkIdentity: $("#publicKey").val(),
                    page: "",
                    rows: "",
                    sort: "",
                    order: "", //args.orderby,
                    skip: args.skip,
                    take: args.take
                }),
                type: 'POST',
                contentType: 'application/json',
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data Loading Error");
                },
                timeout: 10000
            });
            return deferred.promise();
        },
        remove: function (key) {
            var deferred = $.Deferred();

            return $.ajax({
                url: '/BuybackTradeback/SysDeleteBbTb',
                dataType: "json",
                data: JSON.stringify({
                    id: tradebackId,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_sysbuybackmatrix"
                }),
                type: 'POST',
                contentType: 'application/json',
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data remove Error");
                },
                timeout: 10000
            });
        }
    });

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
            fileName: window.lang.translate('Tradeback List')
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
        columnWidth: {
            autoWidth: false
        },
        columns: [{
            caption: window.lang.translate('Active/Passive'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var tradeback_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveTradeback(tradeback_id, options.data.active);
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveTradeback(tradeback_id, options.data.active);
                    }).appendTo(container);
                }
            }
        }, {
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
                tradebackId = data.id;
                filltbMatrixForm(data);
            }
        },
        onRowRemoving: function (e) {
            tradebackId = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_tbMatrix").dxDataGrid("instance").refresh();
        },
    });

//Buyback Grid
    $('#buybackListRefresh').click(function () {
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
                    url: '/BuybackTradeback/SysBbMatrixGrid',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillBuybackMatrixGridx_sysbuybackmatrix",
                        pkIdentity: $("#publicKey").val(),
                        page: "",
                        rows: "",
                        sort: "",
                        order: "", //args.orderby,
                        skip: args.skip,
                        take: args.take
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data Loading Error");
                    },
                    timeout: 10000
                });
                return deferred.promise();
            },
            remove: function (key) {
                var deferred = $.Deferred();

                return $.ajax({
                    url: '/BuybackTradeback/SysDeleteBbTb',
                    dataType: "json",
                    data: JSON.stringify({
                        id: buybackId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysbuybackmatrix"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error");
                    },
                    timeout: 10000
                });
            }
        });

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
        OnCellPrepared: function (options) {

            var fieldData = options.value;
            fieldHtml = "";

            fieldHtml = fieldData.value;
            options.cellElement.html(fieldHtml);

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
        columnWidth: {
            autoWidth: false
        },
        columns: [{
            caption: window.lang.translate('Active/Passive'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var buyback_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveBuyback(buyback_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveBuyback(buyback_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                    }).appendTo(container);
                }
            }
        }, {
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
                buybackId = data.id;
                fillBbMatrixForm(data);
            }
        },
        onRowRemoving: function (e) {
            buybackId = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_bbMatrix").dxDataGrid("instance").refresh();
        },

    });
    });

//Buyback Grid End

//Tradeback Grid
    $('#tradebackListRefresh').click(function () {
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
                    url: '/BuybackTradeback/SysTbMatrixGrid',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillTradebackMatrixGridx_sysbuybackmatrix",
                        pkIdentity: $("#publicKey").val(),
                        page: "",
                        rows: "",
                        sort: "",
                        order: "", //args.orderby,
                        skip: args.skip,
                        take: args.take
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data Loading Error");
                    },
                    timeout: 10000
                });
                return deferred.promise();
            },
            remove: function (key) {
                var deferred = $.Deferred();

                return $.ajax({
                    url: '/BuybackTradeback/SysDeleteBbTb',
                    dataType: "json",
                    data: JSON.stringify({
                        id: tradebackId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysbuybackmatrix"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error");
                    },
                    timeout: 10000
                });
            }
        });

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
                fileName: window.lang.translate('Tradeback List')
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
            OnCellPrepared: function (options) {

                var fieldData = options.value;
                fieldHtml = "";

                fieldHtml = fieldData.value;
                options.cellElement.html(fieldHtml);

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
            columnWidth: {
                autoWidth: false
            },
            columns: [{
                caption: window.lang.translate('Active/Passive'),
                width: 40,
                alignment: 'center',
                encodeHtml: false,

                cellTemplate: function (container, options) {
                    var fieldHtml;
                    var tradeback_id = options.data.id;

                    if (options.data.active === 1) {
                        //active
                        $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                            activepasiveTradeback(tradeback_id, options.data.active);
                            //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                        }).appendTo(container);
                    } else if (options.data.active === 0) {
                        //pasive
                        $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                            activepasiveTradeback(tradeback_id, options.data.active);
                            //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                        }).appendTo(container);
                    }
                }
            }, {
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
                    tradebackId = data.id;
                    fillTbMatrixForm(data);
                }
            },
            onRowRemoving: function (e) {
                tradebackId = e.key.id;
            },
            onRowRemoved: function (e) {
                $("#gridContainer_tbMatrix").dxDataGrid("instance").refresh();
            },
        });
    });

    //$('#buybackListRefresh').click();
    //$('#tradebackListRefresh').click();




    ///////////////////////BUYBACK MATRİS /////////////////////

/**
* reset Buyback Matrix Form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    $("#btn-bbMatrix-clear").on("click", function (e) {
        e.preventDefault();
        resetBbMatrixForm();
        return false;
    })

    var resetBbMatrixForm = function () {
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
    $("#btn-bbMatrix-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#buybackInfoForm").validationEngine('validate')) {

            //window.insertTrainingName = function () {

            $("#loadingImage_bbInfo").loadImager('removeLoadImage');
            $("#loadingImage_bbInfo").loadImager('appendImage');

            var ddDataCusType = $('#ddslickBbCustomerType').data('ddslick');
            var customer_type_id  = ddDataCusType.selectedData.value;

            var ddDataComSup = $('#ddslickBbComfortSuper').data('ddslick');
            var comfort_super_id  = ddDataComSup.selectedData.value;

            var ddDataOffRoad = $('#ddslickBbOffRoad').data('ddslick');
            var terrain_id = ddDataOffRoad.selectedData.value;

            var ddDataTruck = $('#ddslickBbTruckType').data('ddslick');
            var model_id = ddDataTruck.selectedData.value;

            var ddDataHyd = $('#ddslickBbHydraulics').data('ddslick');
            var hydraulics = ddDataHyd.selectedData.value;

            var ddDataMil = $('#ddslickBbMileage').data('ddslick');
            var mileage_id = ddDataMil.selectedData.value;

            var ddDataMonth = $('#ddslickBbMonths').data('ddslick');
            var month_id = ddDataMonth.selectedData.value;

            var price = $('#txt-BbMatrix-price').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?urlpkInsertTBAct_sysbuybackmatrix
            //& model_id=2 +
            //& buyback_type_id=2 
            //& terrain_id=2 +
            //& month_id=23 +
            //& mileage_id=23 +
            //& price=123 +
            //& pk=GsZVzEYe50uGgNM
            //comfort_super_id 
            //hydraulics
            //customer_type_id 

            var ajax_InsertMatrix = $('#ajaxACL-insertBuyback').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loadingImage_bbInfo",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                proxy: '/BuybackTradeBack/AddMatrix',
                type: 'POST',
                data: JSON.stringify({
                    url: "pkInsertBBAct_sysbuybackmatrix",
                    model_id: model_id,
                    terrain_id: terrain_id,
                    month_id: month_id,
                    mileage_id: mileage_id,
                    price: price,
                    comfort_super_id: comfort_super_id,
                    hydraulics: hydraulics,
                    customer_type_id: customer_type_id,
                    pk: "GsZVzEYe50uGgNM"
                })
            });
            ajax_InsertMatrix.ajaxCallWidget({
                onReset: function (event, data) {
                    resetBbMatrixForm();
                },
            })
            ajax_InsertMatrix.ajaxCallWidget('call');
           // $('#buybackListRefresh').click();
            return false;
        }
    })



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
* activa passive Buyback Matrix form
* @author Ceydacan Seyrek
* @since 11/10/2018
*/

    window.activepasiveBuyback = function (buyback_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_sysbuybackmatrix&id=29&pk=GsZVzEYe50uGgNM
        var ajax_activepasiveBuyback = $('#ajaxACL-buybackList').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loadingImage_DdslickBbMatrixGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Training/SysActivePasiveTrName',
            type: "POST",
            data: JSON.stringify({
                id: buyback_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysbuybackmatrix"
            }),

        });
        ajax_activepasiveBuyback.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_bbMatrix").dxDataGrid("instance").refresh();
                //$('#trListRefresh').click();
            }
        })
        ajax_activepasiveBuyback.ajaxCallWidget('call');
        $('#buybackListRefresh').click();
    }


    ///////////////////////TRADEBACK MATRİS /////////////////////

/**
* Tradeback Matrix
* @author Ceydacan Seyrek
* @since 10/09/2018
*/
    $("#btn-tbMatrix-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#tradebackInfoForm").validationEngine('validate')) {

            //window.insertTrainingName = function () {

            $("#loadingImage_tbInfo").loadImager('removeLoadImage');
            $("#loadingImage_tbInfo").loadImager('appendImage');

            var ddDataCusType = $('#ddslickTbCustomerType').data('ddslick');
            var customer_type_id = ddDataCusType.selectedData.value;

            var ddDataComSup = $('#ddslickTbComfortSuper').data('ddslick');
            var comfort_super_id = ddDataComSup.selectedData.value;

            var ddDataOffRoad = $('#ddslickTbOffRoad').data('ddslick');
            var terrain_id = ddDataOffRoad.selectedData.value;

            var ddDataTruck = $('#ddslickTbTruckType').data('ddslick');
            var model_id = ddDataTruck.selectedData.value;

            var ddDataHyd = $('#ddslickTbHydraulics').data('ddslick');
            var hydraulics = ddDataHyd.selectedData.value;

            var ddDataMil = $('#ddslickTbMileage').data('ddslick');
            var mileage_id = ddDataMil.selectedData.value;

            var ddDataMonth = $('#ddslickTbMonths').data('ddslick');
            var month_id = ddDataMonth.selectedData.value;

            var price = $('#txt-TbMatrix-price').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?urlpkInsertTBAct_sysbuybackmatrix
            //& model_id=2 +
            //& buyback_type_id=2 
            //& terrain_id=2 +
            //& month_id=23 +
            //& mileage_id=23 +
            //& price=123 +
            //& pk=GsZVzEYe50uGgNM
            //comfort_super_id 
            //hydraulics
            //customer_type_id 

            var ajax_InsertMatrix = $('#ajaxACL-insertTradeback').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loadingImage_tbInfo",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                proxy: '/BuybackTradeBack/AddMatrix',
                type: 'POST',
                data: JSON.stringify({
                    url: "pkInsertTBAct_sysbuybackmatrix",
                    model_id: model_id,
                    terrain_id: terrain_id,
                    month_id: month_id,
                    mileage_id: mileage_id,
                    price: price,
                    comfort_super_id: comfort_super_id,
                    hydraulics: hydraulics,
                    customer_type_id: customer_type_id,
                    pk: "GsZVzEYe50uGgNM"
                })
            });
            ajax_InsertMatrix.ajaxCallWidget({
                onReset: function (event, data) {
                    resetTbMatrixForm();
                },
            })
            ajax_InsertMatrix.ajaxCallWidget('call');
            // $('#buybackListRefresh').click();
            return false;
        }
    })

/**
* reset Tradeback Matrix Form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/
    $("#btn-tbMatrix-clear").on("click", function (e) {
        e.preventDefault();
        resetTbMatrixForm();
        return false;
    })

    var resetTbMatrixForm = function () {
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

/**
* Active passive Tradeback Matrix form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.activepasiveTradeback = function (tradeback_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_sysbuybackmatrix&id=29&pk=GsZVzEYe50uGgNM
        var ajax_activepasiveTradeback = $('#ajaxACL-tradebackList').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loadingImage_DdslickTbMatrixGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Training/SysActivePasiveTrName',
            type: "POST",
            data: JSON.stringify({
                id: tradeback_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysbuybackmatrix"
            }),

        });
        ajax_activepasiveTradeback.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_tbMatrix").dxDataGrid("instance").refresh();
                //$('#trListRefresh').click();
            }
        })
        ajax_activepasiveTradeback.ajaxCallWidget('call');
        $('#tradebackListRefresh').click();
    }

});

