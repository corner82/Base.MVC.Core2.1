﻿/*
* Buyback Quota Form
* @author Ceydacan Seyrek
* @since 17/09/2018
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


/*
* Buyback Quota LoadImager
* @author Ceydacan Seyrek
* @since 17/09/2018
*/
//to Buyback Quota form
    $("#loadingImage_buybackQuota").loadImager();
    $("#loadingImage_DdslickVehicleModel").loadImager();
    $("#loadingImage_DdslickContractType").loadImager();
    $("#loadingImage_DdslickCustomerType").loadImager();
    $("#loadingImage_DdslickComfortSuper").loadImager();
    $("#loadingImage_DdslickOffRoad").loadImager();
    $("#loadingImage_DdslickTruckType").loadImager();
    $("#loadingImage_DdslickHydraulics").loadImager();
    $("#loadingImage_DdslickMileage").loadImager();
    $("#loadingImage_DdslickMonths").loadImager();

//to Buyback Quota form grid loading-image


    var langCode = $("#langCode").val();
    //alert(langCode);

    var cbdata_country = [{}];

    var cbdata_yesNo = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Yes",
            value: 2,
            selected: false
        },
        {
            text: "No",
            value: 3,
            selected: false
        }
    ];

//VehicleModel
    var cbdata_VehicleModel = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "26.xxx",
            value: 2,
            selected: false
        },
        {
            text: "27.xxx",
            value: 3,
            selected: false
        },
        {
            text: "33.xxx",
            value: 4,
            selected: false
        }
    ];

    $('#loadingImage_DdslickVehicleModel').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleModel").loadImager('appendImage');

    var ajaxACLResources_VehicleModel = $('#ajax_DdslickVehicleModel').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_VehicleModel.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_Ddslick').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickVehicleModel').ddslick({
                //height: 150,
                data: cbdata_VehicleModel,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickVehicleModel").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleModel').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Tonaj bulunamamıştır...'), window.lang.translate('Tonaj  bulunamamıştır...'));
        },
    })
    ajaxACLResources_VehicleModel.ajaxCallWidget('call');
//VehicleModel end

//Contract Type
    var cbdata_contractType = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Buyback",
            value: 2,
            selected: false
        },
        {
            text: "Tradeback",
            value: 3,
            selected: false
        }
    ];

    $('#loadingImage_DdslickContractType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickContractType").loadImager('appendImage');

    var ajaxACLResources_ContractType = $('#ajax_DdslickContractType').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_ContractType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickContractType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickContractType').ddslick({
                //height: 150,
                data: cbdata_contractType,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickContractType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickContractType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Contract type bulunamamıştır...'), window.lang.translate('Contract type  bulunamamıştır...'));
        },
    })
    ajaxACLResources_ContractType.ajaxCallWidget('call');
//Contract Type End
    
//Customer Type
    var cbdata_customerType = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Retail",
            value: 2,
            selected: false
        },
        {
            text: "Key Account",
            value: 3,
            selected: false
        }
    ];

    $('#loadingImage_DdslickCustomerType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCustomerType").loadImager('appendImage');

    var ajaxACLResources_CustomerType = $('#ajax_DdslickCustomerType').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_CustomerType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomerType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickCustomerType').ddslick({
                //height: 150,
                data: cbdata_customerType,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickCustomerType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomerType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Customer type bulunamamıştır...'), window.lang.translate('Customer type  bulunamamıştır...'));
        },
    })
    ajaxACLResources_CustomerType.ajaxCallWidget('call');
//Customer Type End

//ComfortSuper
    $('#loadingImage_DdslickComfortSuper').loadImager('removeLoadImage');
    $("#loadingImage_DdslickComfortSuper").loadImager('appendImage');

    var ajaxACLResources_ComfortSuper = $('#ajax_DdslickComfortSuper').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_ComfortSuper.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickComfortSuper').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickComfortSuper').ddslick({
                //height: 150,
                data: cbdata_yesNo,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickComfortSuper").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickComfortSuper').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('ComfortSuper bulunamamıştır...'), window.lang.translate('ComfortSuper bulunamamıştır...'));
        },
    })
    ajaxACLResources_ComfortSuper.ajaxCallWidget('call');
//ComfortSuper End

//OffRoad
    var cbdata_offRoad = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Less than 5%",
            value: 2,
            selected: false
        },
        {
            text: "More than 5%",
            value: 3,
            selected: false
        }
    ];

    $('#loadingImage_DdslickOffRoad').loadImager('removeLoadImage');
    $("#loadingImage_DdslickOffRoad").loadImager('appendImage');

    var ajaxACLResources_OffRoad = $('#ajax_DdslickOffRoad').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_OffRoad.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickOffRoad').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickOffRoad').ddslick({
                //height: 150,
                data: cbdata_offRoad,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickOffRoad").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickOffRoad').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('OffRoad bulunamamıştır...'), window.lang.translate('OffRoad bulunamamıştır...'));
        },
    })
    ajaxACLResources_OffRoad.ajaxCallWidget('call');
//OffRoad End

//TruckType
    var cbdata_truckType = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "TGS 26.440 6X4 BLS LX",
            value: 2,
            selected: false
        },
        {
            text: "TGS 26.480 6X4 BLS LX EL ACC",
            value: 3,
            selected: false
        },
        {
            text: "TGS 27.440 6X4 BBS L STEEL",
            value: 4,
            selected: false
        },
        {
            text: "TGS 33.440 6X4 BBS L",
            value: 5,
            selected: false
        },
        {
            text: "TGS 33.480 6X4 BBS L",
            value: 6,
            selected: false
        }
    ];

    $('#loadingImage_DdslickTruckType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTruckType").loadImager('appendImage');

    var ajaxACLResources_TruckType = $('#ajax_DdslickTruckType').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_TruckType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTruckType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickTruckType').ddslick({
                //height: 150,
                data: cbdata_truckType,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickTruckType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTruckType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Truck Type bulunamamıştır...'), window.lang.translate('Truck Type bulunamamıştır...'));
        },
    })
    ajaxACLResources_TruckType.ajaxCallWidget('call');
//TruckType End

//Hydraulics
    $('#loadingImage_DdslickHydraulics').loadImager('removeLoadImage');
    $("#loadingImage_DdslickHydraulics").loadImager('appendImage');

    var ajaxACLResources_Hydraulics = $('#ajax_DdslickHydraulics').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_Hydraulics.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickHydraulics').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickHydraulics').ddslick({
                //height: 150,
                data: cbdata_yesNo,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickHydraulics").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickHydraulics').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Hydraulics bulunamamıştır...'), window.lang.translate('Hydraulics bulunamamıştır...'));
        },
    })
    ajaxACLResources_Hydraulics.ajaxCallWidget('call');
//Hydraulics End

//Mileage
    var cbdata_mileage = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "40.000",
            value: 2,
            selected: false
        },
        {
            text: "60.000",
            value: 3,
            selected: false
        },
        {
            text: "80.000",
            value: 4,
            selected: false
        },
        {
            text: "100.000",
            value: 5,
            selected: false
        },
        {
            text: "120.000",
            value: 6,
            selected: false
        }
    ];

    $('#loadingImage_DdslickMileage').loadImager('removeLoadImage');
    $("#loadingImage_DdslickMileage").loadImager('appendImage');

    var ajaxACLResources_Mileage = $('#ajax_DdslickMileage').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_Mileage.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickMileage').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickMileage').ddslick({
                //height: 150,
                data: cbdata_mileage,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickMileage").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickMileage').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Mileage bulunamamıştır...'), window.lang.translate('Mileage bulunamamıştır...'));
        },
    })
    ajaxACLResources_Mileage.ajaxCallWidget('call');
//Mileage End

//Months
    var cbdata_months = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "36",
            value: 2,
            selected: false
        },
        {
            text: "42",
            value: 3,
            selected: false
        },
        {
            text: "48",
            value: 4,
            selected: false
        },
        {
            text: "54",
            value: 5,
            selected: false
        },
        {
            text: "60",
            value: 6,
            selected: false
        }
    ];

    $('#loadingImage_DdslickMonths').loadImager('removeLoadImage');
    $("#loadingImage_DdslickMonths").loadImager('appendImage');

    var ajaxACLResources_Months = $('#ajax_DdslickMonths').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_Months.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickMonths').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickMonths').ddslick({
                //height: 150,
                data: cbdata_months,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickMonths").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickMonths').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Months bulunamamıştır...'), window.lang.translate('Months bulunamamıştır...'));
        },
    })
    ajaxACLResources_Months.ajaxCallWidget('call');
//Months End



    /* devexgrid */
    var orders = new DevExpress.data.CustomStore({
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
                url: "https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems",
                dataType: "json",
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


    $("#gridContainer_bbTbMatrix").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        showBorders: true,

        dataSource: orders,

        columnHidingEnabled: true,

        selection: {
            mode: "single"
        },

        hoverStateEnabled: true,

        editing: {
            //mode: "batch"
            mode: "form",
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },

        "export": {
            enabled: true,
            fileName: "buybacktradebackMatrix"
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
            caption: window.lang.translate('VehicleModel') + "...",
            dataField: "StoreCity"
        }, {
            caption: window.lang.translate('Contract type') + "...",
            dataField: "StoreState"
        }, {
            caption: window.lang.translate('Customer type') + "...",
            dataField: "Employee"
        }, {
            caption: window.lang.translate('ComfortSuper') + "...",
            dataField: "StoreCity"
        }, {
            caption: window.lang.translate('% Off road') + "...",
            dataField: "Employee"
        }, {
            caption: window.lang.translate('Truck Type') + "...",
            dataField: "StoreState"
        }, {
            caption: window.lang.translate('Hydraulics') + "...",
            dataField: "StoreCity"
        }, {
            caption: window.lang.translate('Mileage per annum (km)') + "...",
            dataField: "OrderNumber"
        }, {
            caption: window.lang.translate('Months') + "...",
            dataField: "OrderNumber"
        }, {
            caption: window.lang.translate('Price') + "...",
            dataField: "SaleAmount"
        }, {
            name: 'Active/Passive',
            caption: "Active/Passive",
            //dataField: "active",
            dataType: "boolean"
        }],
        rowPrepared: function (rowElement, rowInfo) {
            if (rowInfo.data.key == 1)
                rowElement.css('background', 'green');
            else if (rowInfo.data.key == 0)
                rowElement.css('background', 'yellow');

        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillbbTbMatrixForm(data);
            }
        },
        editingColumnExtensions:
            {
                columnName: 'Active/Passive',
            }
    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


 /**
 * Buyback Tradeback Matrix
 * @author Ceydacan Seyrek
 * @since 10/09/2018
 */

    window.insertbbTbMatrix = function () {
        $("#loadingImage_buybackQuota").loadImager('removeLoadImage');
        $("#loadingImage_buybackQuota").loadImager('appendImage');

       // var cst_purchaselastupdate = $('#txt-location-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysbbTbQuota',

                name: bbTbMatrix_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Tradeback Matrix Ekleme İşlemi Başarısız...',
                    'Buyback Tradeback Matrix Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysbbTbQuota" servis hatası->' + textStatus);
                $("#loadingImage_buybackQuota").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#buybackQuotaForm')[0].reset();

                        $("#loadingImage_buybackQuota").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Buyback Tradeback Matrix Kayıt işlemi Başarılı...',
                    'Buyback Tradeback Matrix kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loadingImage_buybackQuota").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Tradeback Matrix Kayıt İşlemi Başarısız...',
                    'Buyback Tradeback Matrix kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbQuota" servis datası boştur!!');
                $("#loadingImage_buybackQuota").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Tradeback Matrix İşlemi Başarısız...',
                    'Buyback Tradeback Matrix kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbQuota" servis datası boştur!!');
                $("#loadingImage_buybackQuota").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loadingImage_buybackQuota").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $("#loading-imagelocation").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Buyback Tradeback Matrix İşlemi Başarısız...',
                    'Aynı isim ile Buyback Tradeback Matrix  kaydı yapılmıştır, yeni bir Buyback Tradeback Matrix kaydı deneyiniz... ');
                $("#loadingImage_buybackQuota").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
/**
* reset Buyback Tradeback Matrix Form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.resetBbTbMatrixForm = function () {
        $("#loadingImage_buybackQuota").loadImager('removeLoadImage');
        $("#loadingImage_buybackQuota").loadImager('appendImage');

        $('#buybackTradebackQuotaForm').validationEngine('hide');
        $('#ddslickVehicleModel').ddslick('select', { index: String(0) });
        $('#ddslickContractType').ddslick('select', { index: String(0) });
        $('#ddslickCustomerType').ddslick('select', { index: String(0) });
        $('#ddslickComfortSuper').ddslick('select', { index: String(0) });
        $('#ddslickOffRoad').ddslick('select', { index: String(0) });
        $('#ddslickTruckType').ddslick('select', { index: String(0) });
        $('#ddslickHydraulics').ddslick('select', { index: String(0) });
        $('#ddslickMileage').ddslick('select', { index: String(0) });
        $('#ddslickMonths').ddslick('select', { index: String(0) });

        $("#loadingImage_buybackQuota").loadImager('removeLoadImage');

        return false;
    }


/**
* insert Buyback Tradeback Matrix Wrapper
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.insertBbTbMatrixWrapper = function (e) {
        e.preventDefault();

        if ($("#buybackQuotaForm").validationEngine('validate')) {

            insertBbTbMatrix();
        }
        return false;
    }


/**
* Fill Buyback Tradeback Matrix form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.fillbbTbMatrixForm = function (data) {
        $("#loadingImage_buybackQuota").loadImager('removeLoadImage');
        $("#loadingImage_buybackQuota").loadImager('appendImage');

        document.getElementById("txt-BbTbMatrix-price").value = data.SaleAmount;

        $("#loadingImage_buybackQuota").loadImager('removeLoadImage');
        $('#ddslickVehicleModel').ddslick('select', { index: 3 });
        $('#ddslickContractType').ddslick('select', { index: 2 });
        $('#ddslickCustomerType').ddslick('select', { index: 2 });
        $('#ddslickComfortSuper').ddslick('select', { index: 1 });
        $('#ddslickOffRoad').ddslick('select', { index: 2 });
        $('#ddslickTruckType').ddslick('select', { index: 5 });
        $('#ddslickHydraulics').ddslick('select', { index: 2 });
        $('#ddslickMileage').ddslick('select', { index: 5 });
        $('#ddslickMonths').ddslick('select', { index: 4 });

        return false;
    }
});

