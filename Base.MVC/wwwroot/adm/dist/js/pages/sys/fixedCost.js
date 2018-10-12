/*
* Buyback Return Form
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

//Loading image
    $("#loadingImage_DdslickModel").loadImager();
    $("#loadingImage_DdslickVehicle").loadImager();
    $("#loadingImage_DdslickCurrency").loadImager();
    $("#loadingImage_DdslickWarranty").loadImager();

    var filldropdown = false;

    var ddslick_modelId = 0;
    var ddslick_model_name = "";
    var ddslick_warrantyId = 0;
    var ddslick_warranty_name = "";
    var ddslick_vehicleId = 0;
    var ddslick_vehicle_name = "";

//Model Group --> warranty name --> Vehicle End Group
    $("#loadingImage_DdslickModel").loadImager('removeLoadImage');
    $("#loadingImage_DdslickModel").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleGroupsDdList_sysvehiclegroups&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_model = $('#ajax_DdslickModel').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickModel",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleGroups',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_model.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datamodel) {

            var cbdata_model = $.parseJSON(datamodel);
            cbdata_model.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickModel').ddslick({
                data: cbdata_model,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {

                    $('#ddslickWarranty').ddslick('destroy');
                    $('#ddslickVehicle').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {
                        ddslick_modelId = selectedData.selectedData.value;

                        //Vehicle
                        $("#loadingImage_DdslickVehicle").loadImager('removeLoadImage');
                        $("#loadingImage_DdslickVehicle").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups&language_code=en&pk=GsZVzEYe50uGgNM&vehicle_groups_id=1
                        var ajaxACLResources_vehicle = $('#ajax_DdslickVehicle').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickVehicle",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Vehicle/SysVehicleEndGroup',
                            type: "POST",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups",
                                vehicle_group_id: ddslick_modelId,
                                pkIdentity: $("#publicKey").val()
                            })
                        });

                        ajaxACLResources_vehicle.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onSuccess: function (event, datavehicle) {

                                var cbdata_vehicle = $.parseJSON(datavehicle);
                                cbdata_vehicle.splice(0, 0,
                                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                );

                                $('#ddslickVehicle').ddslick({
                                    data: cbdata_vehicle,
                                    width: '100%',
                                    //search: true,
                                    //searchText: window.lang.translate('Search'),
                                })
                                if (filldropdown === true) {
                                    $('#ddslickVehicle').ddslick('selectByValue',
                                        {
                                            index: '' + ddslick_vehicleId + '',
                                            value: '' + ddslick_vehicle_name + ''
                                        });
                                    filldropdown = false;
                                }
                                $('#loadingImage_DdslickVehicle').loadImager('removeLoadImage');
                            },
                            onAfterSuccess: function (event, data) {
                                $('#loadingImage_DdslickVehicle').loadImager('removeLoadImage');
                            }
                        })
                        ajaxACLResources_vehicle.ajaxCallWidget('call');
//Vehicle End

//Warranty
                        $("#loadingImage_DdslickWarranty").loadImager('removeLoadImage');
                        $("#loadingImage_DdslickWarranty").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkWarrantiesParentsDdList_syswarranties&vehicle_group_id=8&language_code=en&pk=GsZVzEYe50uGgNM
                        var ajaxACLResources_vehicle = $('#ajax_DdslickWarranty').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickWarranty",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Warranty/SysVehicleWarranty',
                            type: "POST",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkWarrantiesParentsDdList_syswarranties",
                                vehicle_group_id: ddslick_modelId,
                                pkIdentity: $("#publicKey").val()
                            })
                        });

                        ajaxACLResources_vehicle.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onSuccess: function (event, datawarranty) {

                                var cbdata_warranty = $.parseJSON(datawarranty);
                                cbdata_warranty.splice(0, 0,
                                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                );

                                $('#ddslickWarranty').ddslick({
                                    data: cbdata_warranty,
                                    width: '100%',
                                    //search: true,
                                    //searchText: window.lang.translate('Search'),
                                })
                                if (filldropdown === true) {
                                    $('#ddslickWarranty').ddslick('selectByValue',
                                        {
                                            index: '' + ddslick_warrantyId + '',
                                            value: '' + ddslick_warranty_name + ''
                                        });
                                    filldropdown = false;
                                }
                                $('#loadingImage_DdslickWarranty').loadImager('removeLoadImage');
                            },
                            onAfterSuccess: function (event, data) {
                                $('#loadingImage_DdslickWarranty').loadImager('removeLoadImage');
                            }
                        })
                        ajaxACLResources_vehicle.ajaxCallWidget('call');
//Warranty End

                    }
                }
            })
            $('#loadingImage_DdslickModel').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickModel').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_model.ajaxCallWidget('call');
//Model Group --> warranty name --> Vehicle End Group End



//Currency
    $("#loadingImage_DdslickCurrency").loadImager('removeLoadImage');
    $("#loadingImage_DdslickCurrency").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehiclesEndgroupsCostDdList_sysvehiclesendgroups&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_currency = $('#ajax_DdslickCurrency').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickCurrency",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleGroups',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehiclesEndgroupsCostDdList_sysvehiclesendgroups",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_currency.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datacurrency) {

            var cbdata_currency = $.parseJSON(datacurrency);
            cbdata_currency.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickCurrency').ddslick({
                data: cbdata_currency,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickCurrency').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickCurrency').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_currency.ajaxCallWidget('call');
    //Currency End


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


    $("#gridContainer_fixedCostList").dxDataGrid({

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
            fileName: "buybackReturn"
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
            caption: window.lang.translate('Deal Number') + "...",
            dataField: "StoreCity"
        }, {
            caption: window.lang.translate('Deal date') + "...",
            dataField: "OrderDate"
        }],
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillBbreturnForm(data);
            }
        }
    });


 /**
 * Buyback Return
 * @author Ceydacan Seyrek
 * @since 10/09/2018
 */

    window.insertBbreturn = function () {
        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_BbReturnInfo").loadImager('appendImage');

       // var cst_purchaselastupdate = $('#txt-location-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysbbTbInfo',

                name: bbreturn_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback return Ekleme İşlemi Başarısız...',
                    'Buyback return Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysbbTbInfo" servis hatası->' + textStatus);
                $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#buybackReturnVehicleInfoForm')[0].reset();

                        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Buyback return kayıt işlemi başarılı...',
                    'Buyback return kayıt işlemini gerçekleştirniz... ',
                    data);
                $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback return Kayıt İşlemi Başarısız...',
                    'Buyback return kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbInfo" servis datası boştur!!');
                $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback return İşlemi Başarısız...',
                    'Buyback return kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbInfo" servis datası boştur!!');
                $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $("#loading-imagelocation").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Buyback return İşlemi Başarısız...',
                    'Aynı isim ile Buyback return  kaydı yapılmıştır, yeni bir Buyback return kaydı deneyiniz... ');
                $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
/**
* reset Buyback Return Form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.resetBbreturnForm = function () {
        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_BbReturnInfo").loadImager('appendImage');

        $('#buybackReturnVehicleInfoForm').validationEngine('hide');
        $('#ddslickReturn').ddslick('select', { index: String(0) });

        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');

        return false;
    }


/**
* insert Buyback Return Wrapper
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.insertBbreturnWrapper = function (e) {
        e.preventDefault();

        if ($("#buybackReturnVehicleInfoForm").validationEngine('validate')) {

            insertBbreturn();
        }
        return false;
    }


/**
* Fill Buyback Return form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.fillBbreturnForm = function (data) {
        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_BbReturnInfo").loadImager('appendImage');

        //document.getElementById("txt-bbreturn-price").value = data.SaleAmount;
        document.getElementById("txt-bbreturn-dealNo").value = data.SaleAmount;
        document.getElementById("txt-bbreturn-dealDate").value = data.OrderDate;
        

        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $('#ddslickReturn').ddslick('select', { index: 2 });

        tab_active();
        return false;
    }



    window.fillVehicleBuybackForm = function (data) {
        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_BbReturnInfo").loadImager('appendImage');

        //document.getElementById("txt-bbreturn-price").value = data.SaleAmount;
        //document.getElementById("txt-bbreturn-dealNo").value = data.SaleAmount;
        //document.getElementById("txt-bbreturn-dealDate").value = data.OrderDate;

        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $('#ddslickReturn').ddslick('select', { index: 3 });
        document.getElementById("txt-bbreturn-vehicle").value = 'WAGP21ZZ2FT022928';

        tab_active();
        return false;
    }

});

