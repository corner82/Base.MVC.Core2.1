/*
* Stock hos  Form
* @author Ceydacan Seyrek
* @since 17/10/2018
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
    * Stock hos LoadImager
    * @author Ceydacan Seyrek
    * @since 17/10/2018
    */
    //to Stock bo form
    $("#loadingImage_DdslickModel").loadImager();
    $("#loadingImage_DdslickVehicle").loadImager();
    $("#loadingImage_DdslickVehicleList").loadImager();

    //to Stock hos form grid loading-image
    $("#loadingImage_DdslickStockStockHosGrid").loadImager();
    $("#loadingImage_DdslickDemoStockHosGrid").loadImager();
    $("#loadingImage_DdslickTruckstogoStockHosGrid").loadImager();

    var langCode = $("#langCode").val();
    var QuotaMonthID;
    //alert(langCode);

    $('#stockHosForm').validationEngine();

    //vehicle list
    $('#loadingImage_DdslickVehicleList').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleList").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkStockListTypesDdList_sysstocklisttypes&language_code=en&pk=GsZVzEYe50uGgNM&acc_body_types_id=5
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
            url: "pkStockListTypesDdList_sysstocklisttypes",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_VehicleList.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datavehiclelist) {

            var cbdata_vehiclelist = $.parseJSON(datavehiclelist);
            cbdata_vehiclelist.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickVehicleList').ddslick({
                data: cbdata_vehiclelist,
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
    $('#stockStockHosRefresh').click(function () {

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillSisMonthlyQuotasGridx_syssismonthlyquotas&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        var stockHos = new DevExpress.data.CustomStore({
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

        $("#gridContainer_stockStockHos").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: stockHos,
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
                fileName: "stockHos"
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
            //columnWidth: {
            //    autoWidth: true
            //},
            columns: [{
            //    caption: window.lang.translate('Active/Passive'),
            //    width: 40,
            //    alignment: 'center',
            //    encodeHtml: false,

            //    cellTemplate: function (container, options) {
            //        var fieldHtml;
            //        var quotamonth_id = options.data.id;

            //        if (options.data.active === 1) {
            //            //active
            //            $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
            //                activepasiveQuotaMonth(quotamonth_id, options.data.active);
            //                //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
            //            }).appendTo(container);
            //        } else if (options.data.active === 0) {
            //            //pasive
            //            $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
            //                activepasiveQuotaMonth(quotamonth_id, options.data.active);
            //                //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
            //            }).appendTo(container);
            //        }
            //    }
            //}, {
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
                caption: window.lang.translate('Park Off') + "...",
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
                caption: window.lang.translate('Price') + "...",
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
                caption: window.lang.translate('Channel') + "...",
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
            }],

            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    //QuotaMonthID = data.id;
                    //fillMonthlyQuotaForm(data);
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
    });

    $('#stockStockHosRefresh').click();
// Stock Grid End

// Demo Grid
    $('#demoStockHosRefresh').click(function () {

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillSisMonthlyQuotasGridx_syssismonthlyquotas&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        var demoHos = new DevExpress.data.CustomStore({
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

        $("#gridContainer_demoStockHos").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: demoHos,
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
                fileName: "demostockHos"
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
            //columnWidth: {
            //    autoWidth: true
            //},
            columns: [{
                //    caption: window.lang.translate('Active/Passive'),
                //    width: 40,
                //    alignment: 'center',
                //    encodeHtml: false,

                //    cellTemplate: function (container, options) {
                //        var fieldHtml;
                //        var quotamonth_id = options.data.id;

                //        if (options.data.active === 1) {
                //            //active
                //            $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                //                activepasiveQuotaMonth(quotamonth_id, options.data.active);
                //                //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                //            }).appendTo(container);
                //        } else if (options.data.active === 0) {
                //            //pasive
                //            $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                //                activepasiveQuotaMonth(quotamonth_id, options.data.active);
                //                //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                //            }).appendTo(container);
                //        }
                //    }
                //}, {
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
                caption: window.lang.translate('Park Off') + "...",
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
                caption: window.lang.translate('Price') + "...",
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
                caption: window.lang.translate('Channel') + "...",
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
            }],

            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    //QuotaMonthID = data.id;
                    //fillMonthlyQuotaForm(data);
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
    });

    $('#demoStockHosRefresh').click();
// Demo Grid End

// Demo Grid
    $('#truckstogoStockHosRefresh').click(function () {

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillSisMonthlyQuotasGridx_syssismonthlyquotas&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        var truckstogoHos = new DevExpress.data.CustomStore({
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

        $("#gridContainer_truckstogoStockHos").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: truckstogoHos,
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
                fileName: "truckstogostockHos"
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
            //columnWidth: {
            //    autoWidth: true
            //},
            columns: [{
                //    caption: window.lang.translate('Active/Passive'),
                //    width: 40,
                //    alignment: 'center',
                //    encodeHtml: false,

                //    cellTemplate: function (container, options) {
                //        var fieldHtml;
                //        var quotamonth_id = options.data.id;

                //        if (options.data.active === 1) {
                //            //active
                //            $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                //                activepasiveQuotaMonth(quotamonth_id, options.data.active);
                //                //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                //            }).appendTo(container);
                //        } else if (options.data.active === 0) {
                //            //pasive
                //            $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                //                activepasiveQuotaMonth(quotamonth_id, options.data.active);
                //                //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                //            }).appendTo(container);
                //        }
                //    }
                //}, {
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
                caption: window.lang.translate('Park Off') + "...",
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
                caption: window.lang.translate('Price') + "...",
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
                caption: window.lang.translate('Channel') + "...",
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
            }],

            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    //QuotaMonthID = data.id;
                    //fillMonthlyQuotaForm(data);
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
    });

    $('#truckstogoStockHosRefresh').click();
// Demo Grid End

});

