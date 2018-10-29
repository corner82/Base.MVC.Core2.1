/*
* Stock Form
* @author Ceydacan Seyrek
* @since 18/10/2018
*/
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'Ýþleme devam et'
    });

    var filldropdown = false;

    var ddslick_modelId = 0;
    var ddslick_model_name = "";
    var ddslick_vehicleId = 0;
    var ddslick_vehicle_name = "";
    /*
    * Stock LoadImager
    * @author Ceydacan Seyrek
    * @since 18/10/2018
    */
    //to Stock form
    $("#loadingImage_DdslickModel").loadImager();
    $("#loadingImage_DdslickVehicle").loadImager();
    $("#loadingImage_DdslickVehicleList").loadImager();

    //to Stock form grid loading-image
    $("#loadingImage_DdslickStockStockBoGrid").loadImager();
    $("#loadingImage_DdslickDemoStockBoGrid").loadImager();
    $("#loadingImage_DdslickTruckstogoStockBoGrid").loadImager();

    var langCode = $("#langCode").val();
    var stockBoID;

    //alert(langCode);

    $('#stockBackOfficeForm').validationEngine();

    //vehicle list
    $('#loadingImage_DdslickVehicleList').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleList").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkAccBodyDeffDdList_sysaccbodydeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_VehicleList = $('#ajax_DdslickVehicleList').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleList",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkAccBodyDeffDdList_sysaccbodydeff",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_VehicleList.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataquotayear) {

            var cbdata_quotayear = $.parseJSON(dataquotayear);
            cbdata_quotayear.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickVehicleList').ddslick({
                data: cbdata_quotayear,
                width: '100%'
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickVehicleList').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickVehicleList').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_VehicleList.ajaxCallWidget('call');
    //vehicle list End

    //Model Group --> Vehicle End Group
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
                                    width: '100%'
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
    //Model Group --> Vehicle End Group End

    /* devexgrid */
    DevExpress.localization.locale(langCode);

// Stock Grid
    $('#stockStockBoRefresh').click(function () {
        $("#gridContainer_stockStockBo").dxDataGrid("instance").refresh();
    });
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillSisMonthlyQuotasGridx_syssismonthlyquotas&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var stockBo = new DevExpress.data.CustomStore({
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
                url: '/Sys/SysYearlyQuotaGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillSisMonthlyQuotasGridx_syssismonthlyquotas",
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
        //remove: function (key) {
        //    var deferred = $.Deferred();
        //    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syssismonthlyquotas&id=33&pk=GsZVzEYe50uGgNM
        //    return $.ajax({
        //        url: '/Sys/SysDeleteYearlyQuota',
        //        dataType: "json",
        //        data: JSON.stringify({
        //            id: QuotaMonthID,
        //            pk: "GsZVzEYe50uGgNM",
        //            url: "pkDeletedAct_syssismonthlyquotas"
        //        }),
        //        type: 'POST',
        //        contentType: 'application/json',
        //        success: function (result) {
        //            deferred.resolve(result.items, { totalCount: result.totalCount });
        //        },
        //        error: function () {
        //            deferred.reject("Data remove Error");
        //        },
        //        timeout: 10000
        //    });
        //}
    });
        
    $("#gridContainer_stockStockBo").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: stockBo,
        columnHidingEnabled: true,
        selection: {
            mode: "single"
        },
        hoverStateEnabled: true,
        editing: {
            //mode: "batch"
            mode: "row",
            //allowAdding: true,
            //allowUpdating: true,
            //allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: "stockBo"
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

        columns: [{
            caption: window.lang.translate('KP no') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Chassis no') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Order no') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Body&extra') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Expected CBU Date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Days in stock') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Production date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Expected ship arrival date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('expected CBU date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Soll reg date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Required delivery date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Expected online date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Location') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Sold/unsold') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Comment') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Retail price') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Cost') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('ASM price') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Salesman price') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Dealer billing') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Campaign price 1') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Campaign price 2') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('potential CM2') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('TBA1') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('TBA2') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('EngineType') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Gearbox type') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('FrontTyreMake') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Salesman') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Dealer') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('MANEC') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('PDF') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('NATIS') + "...",
            dataField: "quantity",
            encodeHtml: false
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                stockBoID = data.id;
                filldropdown = true;
                fillStockBoForm(data);
            }
        },
        onRowRemoving: function (e) {
            //QuotaMonthID = e.key.id;
            //deleteTrName(trName_id);
        },
        onRowRemoved: function (e) {
            //$("#gridContainer_QuotaMonth").dxDataGrid("instance").refresh();
        },
    });
// Stock Grid End

// Demo Grid
    $('#demoStockBoRefresh').click(function () {
        $("#gridContainer_demoStockBo").dxDataGrid("instance").refresh();
    });
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillSisMonthlyQuotasGridx_syssismonthlyquotas&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var demoBo = new DevExpress.data.CustomStore({
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
                url: '/Sys/SysYearlyQuotaGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillSisMonthlyQuotasGridx_syssismonthlyquotas",
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
        //remove: function (key) {
        //    var deferred = $.Deferred();
        //    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syssismonthlyquotas&id=33&pk=GsZVzEYe50uGgNM
        //    return $.ajax({
        //        url: '/Sys/SysDeleteYearlyQuota',
        //        dataType: "json",
        //        data: JSON.stringify({
        //            id: QuotaMonthID,
        //            pk: "GsZVzEYe50uGgNM",
        //            url: "pkDeletedAct_syssismonthlyquotas"
        //        }),
        //        type: 'POST',
        //        contentType: 'application/json',
        //        success: function (result) {
        //            deferred.resolve(result.items, { totalCount: result.totalCount });
        //        },
        //        error: function () {
        //            deferred.reject("Data remove Error");
        //        },
        //        timeout: 10000
        //    });
        //}
    });
        
    $("#gridContainer_demoStockBo").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: demoBo,
        columnHidingEnabled: true,
        selection: {
            mode: "single"
        },
        hoverStateEnabled: true,
        editing: {
            //mode: "batch"
            mode: "row",
            //allowAdding: true,
            //allowUpdating: true,
            //allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: "demostockBo"
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

        columns: [{
            caption: window.lang.translate('KP no') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Chassis no') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Order no') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Body&extra') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Expected CBU Date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Days in stock') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Production date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Expected ship arrival date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('expected CBU date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Soll reg date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Required delivery date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Expected online date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Location') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Sold/unsold') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Comment') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Retail price') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Cost') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('ASM price') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Salesman price') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Dealer billing') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Campaign price 1') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Campaign price 2') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('potential CM2') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('TBA1') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('TBA2') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('EngineType') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Gearbox type') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('FrontTyreMake') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Salesman') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Dealer') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('MANEC') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('PDF') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('NATIS') + "...",
            dataField: "quantity",
                encodeHtml: false
        }, {
            caption: window.lang.translate('Website') + "...",
            dataField: "quantity",
            encodeHtml: false
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                stockBoID = data.id;
                filldropdown = true;
                fillStockBoForm(data);
            }
        },
        onRowRemoving: function (e) {
            //QuotaMonthID = e.key.id;
            //deleteTrName(trName_id);
        },
        onRowRemoved: function (e) {
            //$("#gridContainer_QuotaMonth").dxDataGrid("instance").refresh();
        },
    });
// Demo Grid End

// trucks to go Grid
    $('#truckstogoStockBoRefresh').click(function () {
        $("#gridContainer_truckstogoStockBo").dxDataGrid("instance").refresh();
    });
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillSisMonthlyQuotasGridx_syssismonthlyquotas&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var truckstogoBo = new DevExpress.data.CustomStore({
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
                url: '/Sys/SysYearlyQuotaGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillSisMonthlyQuotasGridx_syssismonthlyquotas",
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
        //remove: function (key) {
        //    var deferred = $.Deferred();
        //    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syssismonthlyquotas&id=33&pk=GsZVzEYe50uGgNM
        //    return $.ajax({
        //        url: '/Sys/SysDeleteYearlyQuota',
        //        dataType: "json",
        //        data: JSON.stringify({
        //            id: QuotaMonthID,
        //            pk: "GsZVzEYe50uGgNM",
        //            url: "pkDeletedAct_syssismonthlyquotas"
        //        }),
        //        type: 'POST',
        //        contentType: 'application/json',
        //        success: function (result) {
        //            deferred.resolve(result.items, { totalCount: result.totalCount });
        //        },
        //        error: function () {
        //            deferred.reject("Data remove Error");
        //        },
        //        timeout: 10000
        //    });
        //}
    });
        
    $("#gridContainer_truckstogoStockBo").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: truckstogoBo,
        columnHidingEnabled: true,
        selection: {
            mode: "single"
        },
        hoverStateEnabled: true,
        editing: {
            //mode: "batch"
            mode: "row",
            //allowAdding: true,
            //allowUpdating: true,
            //allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: "truckstogostockBo"
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

        columns: [{
            caption: window.lang.translate('Trucks to go website'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var trInfo_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square").on('click', function () {
                        goWebsiteTruckstogo(trInfo_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square").on('click', function () {
                        goWebsiteTruckstogo(trInfo_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                    }).appendTo(container);
                }
            }
        }, {
            caption: window.lang.translate('KP no') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Chassis no') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Order no') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Body&extra') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Expected CBU Date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Days in stock') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Production date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Expected ship arrival date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('expected CBU date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Soll reg date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Required delivery date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Expected online date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Location') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Sold/unsold') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Comment') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Retail price') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Cost') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('ASM price') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Salesman price') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Dealer billing') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Campaign price 1') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Campaign price 2') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('potential CM2') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('TBA1') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('TBA2') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('EngineType') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Gearbox type') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('FrontTyreMake') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Salesman') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Dealer') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('MANEC') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('PDF') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('NATIS') + "...",
            dataField: "quantity",
            encodeHtml: false
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                stockBoID = data.id;
                filldropdown = true;
                fillStockBoForm(data);
            }
        },
        onRowRemoving: function (e) {
            //QuotaMonthID = e.key.id;
            //deleteTrName(trName_id);
        },
        onRowRemoved: function (e) {
            //$("#gridContainer_QuotaMonth").dxDataGrid("instance").refresh();
        },
    });
// trucks to go Grid End

    /**
* insert Stock pdf
* @author Ceydacan Seyrek
* @since 29/10/2018
*/

    $("#btn-stockBo-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#stockBackOfficeForm").validationEngine('validate')) {

            //window.insertTrainingInfo = function () {
            $("#loadingImage_stockBo").loadImager('removeLoadImage');
            $("#loadingImage_stockBo").loadImager('appendImage');

            var ddDataVehicleList = $('#ddslickVehicleList').data('ddslick');
            if (!ddDataVehicleList.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Park off Type "),
                    window.lang.translate("Please select Park off Type"));
            }
            else {
                var vehicleList_id = ddDataVehicleList.selectedData.value;
            }

            var ddDataModel = $('#ddslickModel').data('ddslick');
            if (!ddDataModel.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Branch"),
                    window.lang.translate("Please select Branch"));
            }
            else {
                var model_id = ddDataModel.selectedData.value;
            }

            var ddDataVehicle= $('#ddslickVehicle').data('ddslick');
            if (!ddDataVehicle.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Chassis"),
                    window.lang.translate("Please select Chassis"));
            }
            else {
                var vehicle_id = ddDataVehicle.selectedData.value;
            }

            var fileManec = $('#txt-stockBo-fileManec').val();
            var fileBrochure = $('#txt-stockBo-fileBrochure').val();
            var fileNatis = $('#txt-stockBo-fileNatis').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
            //url=pkInsertAct_infostockparkoff
            //&stock_id=1
            //&start_date=2018-08-08
            //&end_date=
            //&parkoff_type_id=2
            //&is_complete=0
            //&pk=GsZVzEYe50uGgNM
            if (!parkoffId == "") {//update
                var ajax_Insertparkoff = $('#ajaxACL-stockBo').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_stockBo",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/ParkOff/AddParkoff',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_infostockparkoff",
                        id: stockBoID,
                        vehicleList_id: vehicleList_id,
                        model_id: model_id,
                        vehicle_id: vehicle_id,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_Insertparkoff.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetParkoffForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_parkoffList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_Insertparkoff.ajaxCallWidget('call');
            }
            else { //insert
                var ajax_Insertparkoff = $('#ajaxACL-stockBo').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_stockBo",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/ParkOff/AddParkoff',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_infostockparkoff",
                        vehicleList_id: vehicleList_id,
                        model_id: model_id,
                        vehicle_id: vehicle_id,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_Insertparkoff.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetParkoffForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_parkoffList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_Insertparkoff.ajaxCallWidget('call');
            }

            return false;
        }
    })

    /**
    * reset Stock Bo Form
    * @author Ceydacan Seyrek
    * @since 10/09/2018
    */
    $("#btn-stockBo-clear").on("click", function (e) {
        e.preventDefault();
        resetStockBoForm();
        return false;
    })

    var resetStockBoForm = function () {
        $("#loadingImage_stockBo").loadImager('removeLoadImage');
        $("#loadingImage_stockBo").loadImager('appendImage');

        $('#stockBackOfficeForm')[0].reset();
        $('#stockBackOfficeForm').validationEngine('hide');

        $('#ddslickVehicleList').ddslick('select', { index: String(0) });
        $('#ddslickVehicle').ddslick('destroy');
        $('#ddslickModel').ddslick('select', { index: String(0) });

        $("#loadingImage_stockBo").loadImager('removeLoadImage');

        return false;
    }

    /**
    * Fill Stock bo form
    * @author Ceydacan Seyrek
    * @since 17/09/2018
    */

    window.fillStockBoForm = function (data) {
        $("#loadingImage_MonthlyQuota").loadImager('removeLoadImage');
        $("#loadingImage_MonthlyQuota").loadImager('appendImage');

        ddslick_modelId = data.vehicle_gruop_id;
        ddslick_model_name = data.vehicle_gruop_name;

        ddslick_vehicleId = data.vehicle_second_group_id;
        ddslick_vehicle_name = data.model_description;

        $('#ddslickModel').ddslick('selectByValue',
            {
                index: '' + data.vehicle_gruop_id + '',
                text: '' + data.vehicle_gruop_name + ''
            }
        );

        $("#loadingImage_MonthlyQuota").loadImager('removeLoadImage');
        return false;
    }

// Trucks to Go website info
    window.goWebsiteTruckstogo = function (trInfo_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syseducationssalesman&id=29&pk=GsZVzEYe50uGgNM
        var ajax_activepasiveTrInfolist = $('#ajaxACL-stockTruckstogoBo').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loadingImage_DdslickTruckstogoStockBoGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Training/SysDeleteTrInfo',
            type: "POST",
            data: JSON.stringify({
                id: trInfo_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syseducationssalesman"
            }),

        });
        ajax_activepasiveTrInfolist.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_truckstogoStockBo").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveTrInfolist.ajaxCallWidget('call');
    }

});

