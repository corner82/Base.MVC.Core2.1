/*
* topused stock Form
* @author Ceydacan Seyrek
* @since 20/10/2018
*/
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Continue')
    });

    /*
    * topused stock LoadImager
    * @author Ceydacan Seyrek
    * @since 20/10/2018
    */
    //to topused stock form
    $("#loadingImage_topUsedStock").loadImager();
    $("#loadingImage_DdslickStockType").loadImager();
    $("#loadingImage_DdslickVehicleStock").loadImager();
    $("#loadingImage_DdslickIntake").loadImager();
    $("#loadingImage_DdslickVehicleLocation").loadImager();
    $("#loadingImage_DdslickSold").loadImager();
    $("#loadingImage_topUsedStock2").loadImager();

    //to topused stock form grid loading-image
    $("#loadingImage_TopUsedStockGrid").loadImager();
    $("#loading-image-costGrid").loadImager();
    $("#loading-image-rentalGrid").loadImager();
    $("#loading-image-repairCostGrid").loadImager();

    var langCode = $("#langCode").val();
    var topusedStockID;
    //alert(langCode);


    /*
    * datepicker format
    * @author Ceydacan Seyrek
    * @since 29/08/2016
    */
    $('#dateinStock-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });
    $('#drivilineDate-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#topUsedStockForm').validationEngine();


//stock type model
    $('#loadingImage_DdslickStockType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickStockType").loadImager('appendImage');

    var ajaxACLResources_StockType = $('#ajax_DdslickStockType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickStockType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkVehicleGroupsDdList_sysvehiclegroups)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkVehicleGroupsDdList_sysvehiclegroups)"),
        proxy: '/Vehicle/SysVehicleGroups',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_StockType.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataStockType) {

            var cbdata_StockType = $.parseJSON(dataStockType);
            cbdata_StockType.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickStockType').ddslick({
                data: cbdata_StockType,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                }
            })
            $('#loadingImage_DdslickStockType').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickStockType').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_StockType.ajaxCallWidget('call');
//stock type end

//VehicleStock
    $('#loadingImage_DdslickVehicleStock').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleStock").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustYearsDdList_sysmonths&pk=GsZVzEYe50uGgNM&id=55
    var ajaxACLResources_VehicleStock = $('#ajax_DdslickVehicleStock').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleStock",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkJustYearsDdList_sysmonths)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkJustYearsDdList_sysmonths)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkJustYearsDdList_sysmonths",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_VehicleStock.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataVehicleStock) {

            var cbdata_VehicleStock = $.parseJSON(dataVehicleStock);
            cbdata_VehicleStock.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickVehicleStock').ddslick({
                data: cbdata_VehicleStock,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickVehicleStock').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickVehicleStock').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_VehicleStock.ajaxCallWidget('call');
//VehicleStock End

//Intake
    $('#loadingImage_DdslickIntake').loadImager('removeLoadImage');
    $("#loadingImage_DdslickIntake").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustMonthsDdList_sysmonths&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_Intake = $('#ajax_DdslickIntake').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickIntake",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkJustMonthsDdList_sysmonths)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkJustMonthsDdList_sysmonths)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkJustMonthsDdList_sysmonths",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Intake.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataIntake) {

            var cbdata_Intake = $.parseJSON(dataIntake);
            cbdata_Intake.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickIntake').ddslick({
                data: cbdata_Intake,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickIntake').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickIntake').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Intake.ajaxCallWidget('call');
//Intake End

//VehicleLocation
    $('#loadingImage_DdslickVehicleLocation').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleLocation").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkSisQuotasDdList_syssisquotas&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_VehicleLocation = $('#ajax_DdslickVehicleLocation').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleLocation",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkSisQuotasDdList_syssisquotas)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkSisQuotasDdList_syssisquotas)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkSisQuotasDdList_syssisquotas",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_VehicleLocation.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataVehicleLocation) {

            var cbdata_VehicleLocation = $.parseJSON(dataVehicleLocation);
            cbdata_VehicleLocation.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickVehicleLocation').ddslick({
                data: cbdata_VehicleLocation,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickVehicleLocation').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickVehicleLocation').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_VehicleLocation.ajaxCallWidget('call');
//VehicleLocation End

//Sold
    $('#loadingImage_DdslickSold').loadImager('removeLoadImage');
    $("#loadingImage_DdslickSold").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkSisQuotasDdList_syssisquotas&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_Sold = $('#ajax_DdslickSold').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickSold",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (fillYesNoTypes_sysSpecificDefinitions)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (fillYesNoTypes_sysSpecificDefinitions)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "fillYesNoTypes_sysSpecificDefinitions",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Sold.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataSold) {

            var cbdata_Sold = $.parseJSON(dataSold);
            cbdata_Sold.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickSold').ddslick({
                data: cbdata_Sold,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickSold').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickSold').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Sold.ajaxCallWidget('call');
//Sold End


    /* devexgrid */
DevExpress.localization.locale(langCode);

 /**
 * Grid
 * @returns {undefined}
 * @author Ceydacan Seyrek
 * @since 19/10/2018
 */
//Stock grid
    $('#topUsedStockRefresh').click(function () {
        $("#gridContainer_topUsedStock").dxDataGrid("instance").refresh();
    });
        //stock Grid
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillSisMonthlyQuotasGridx_syssismonthlyquotas&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        var quotaMonth = new DevExpress.data.CustomStore({
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
            remove: function (key) {
                var deferred = $.Deferred();
                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syssismonthlyquotas&id=33&pk=GsZVzEYe50uGgNM
                return $.ajax({
                    url: '/Sys/SysDeleteYearlyQuota',
                    dataType: "json",
                    data: JSON.stringify({
                        id: QuotaMonthID,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_syssismonthlyquotas"
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
        //stock Grid
        $("#gridContainer_topUsedStock").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: quotaMonth,
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
                allowDeleting: true,
                useIcons: true
            },
            "export": {
                enabled: true,
                fileName: "quotaMonth"
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
                caption: window.lang.translate('Stock type') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Embrace U number') + "...",
                dataField: "vehicle_groups_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Chassis number') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Full chassis number') + "...",
                dataField: "month_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Tracking Beam unit number') + "...",
                dataField: "quantity",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Warranty') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Vehicle stock') + "...",
                dataField: "vehicle_groups_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Date in stock') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Make') + "...",
                dataField: "month_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Model') + "...",
                dataField: "quantity",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Year') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('KM reading') + "...",
                dataField: "vehicle_groups_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Driviline expiry date') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Registration number') + "...",
                dataField: "month_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Traded from') + "...",
                dataField: "quantity",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Intake') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Vehicle location') + "...",
                dataField: "vehicle_groups_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Movement status') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Memo') + "...",
                dataField: "month_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Acquisition cost') + "...",
                dataField: "quantity",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Over allowance') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Buyback/FML/RPU Cost Adj to market value') + "...",
                dataField: "vehicle_groups_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Evaluation repairs completed') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('BB change in provision') + "...",
                dataField: "month_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Market revaluation 1') + "...",
                dataField: "quantity",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Market revaluation 2') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Gross book value') + "...",
                dataField: "vehicle_groups_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Net book value/finance') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Provision for repairs') + "...",
                dataField: "month_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Retail') + "...",
                dataField: "quantity",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Min price') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Offer price') + "...",
                dataField: "vehicle_groups_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Sold/Unsold') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Invoice amount') + "...",
                dataField: "month_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Days in stock') + "...",
                dataField: "quantity",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Park Off') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Total cost') + "...",
                dataField: "vehicle_groups_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Net book value') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Sub total') + "...",
                dataField: "month_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('YTD rental income') + "...",
                dataField: "quantity",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Total repair cost') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Depreciation') + "...",
                dataField: "vehicle_groups_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('YTD Total depreciation') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Diff min price') + "...",
                dataField: "month_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('SIV') + "...",
                dataField: "quantity",
            }, {
                caption: window.lang.translate('Diff min price and SIV excluding depr') + "...",
                dataField: "name",
                encodeHtml: false
            }],

            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    QuotaMonthID = data.id;
                    fillMonthlyQuotaForm(data);
                }
            },
            onRowRemoving: function (e) {
                QuotaMonthID = e.key.id;
                //deleteTrName(trName_id);
            },
            onRowRemoved: function (e) {
                $("#gridContainer_topUsedStock").dxDataGrid("instance").refresh();
            },
        });
    //});

    //$('#topUsedStockRefresh').click();
//Stock grid End

//Cost Grid
    $('#costList').click(function () {

        /* devexgrid */
        var costData = new DevExpress.data.CustomStore({
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
                    timeout: 30000
                });

                return deferred.promise();
            },

            remove: function (key) {
                var deferred = $.Deferred();
                //alert(selectedVehicleId);

                return $.ajax({
                    url: '/Vehicle/DeleteVehicleBTDesc',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedVehicleBTDescId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysvehiclestrade"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error");
                    },
                    timeout: 30000
                });
            },
        });

        DevExpress.localization.locale(langCode);

        $(function () {
            $("#gridContainer_costGrid").dxDataGrid({

                showColumnLines: true,
                showRowLines: true,
                showBorders: true,
                dataSource: costData,
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
                    fileName: "Cost list"
                },
                grouping: {
                    contextMenuEnabled: true,
                    expandMode: "rowClick"
                },
                groupPanel: {
                    emptyPanelText: window.lang.translate('Use the context menu of header columns to group data'),
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
                columns: [
                    {
                    //    caption: window.lang.translate('Active/Passive'),
                    //    width: 40,
                    //    alignment: 'center',

                    //    cellTemplate: function (container, options) {
                    //        var fieldHtml;
                    //        var vehiclebtdesc_id = options.data.id;

                    //        if (options.data.active === 1) {
                    //            //active
                    //            $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                    //                activepassiveVehicleBTDesc(vehiclebtdesc_id, options.data.active);

                    //            }).appendTo(container);
                    //        } else if (options.data.active === 0) {

                    //            //passive
                    //            $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                    //                activepassiveVehicleBTDesc(vehiclebtdesc_id, options.data.active);

                    //            }).appendTo(container);
                    //        }

                    //        //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                    //        //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                    //        //}).appendTo(container); 

                    //    }

                    //}, {
                        caption: window.lang.translate('month'),
                        dataField: "month_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('year'),
                        dataField: "month_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('cost'),
                        dataField: "month_name",
                        encodeHtml: false
                    }, {//openAddProposalAksesuarPopUp
                        caption: window.lang.translate('Active/Passive'),
                        width: 40,
                        alignment: 'center',

                        cellTemplate: function (container, options) {
                            var fieldHtml;
                            var vehiclebtdesc_id = options.data.id;
                            //active
                            $('<div />').addClass('dx-link').attr('class', "fa fa-plus").on('click', function () {
                                openAddCostPopUp();

                            }).appendTo(container);

                        }
                    }
                ],
                rowPrepared: function (rowElement, rowInfo) {
                    return false;
                    //if (rowInfo.data.key === 1)
                    //    rowElement.css('background', 'green');
                    //else if (rowInfo.data.key === 0)
                    //    rowElement.css('background', 'yellow');

                },

                onSelectionChanged: function (selectedItems) {
                    var data = selectedItems.selectedRowsData[0];
                    if (data) {
                        //selectedVehicleBTDescId = data.id;
                        //alert("z " + selectedVehicleBTDescId);
                        //filldropdown = true;
                    }
                }

            });
        });
    })

    $('#costList').click();
//Cost Grid End

//Rental Grid
    $('#rentalList').click(function () {

        /* devexgrid */
        var rentalData = new DevExpress.data.CustomStore({
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
                    timeout: 30000
                });

                return deferred.promise();
            },

            remove: function (key) {
                var deferred = $.Deferred();
                //alert(selectedVehicleId);

                return $.ajax({
                    url: '/Vehicle/DeleteVehicleBTDesc',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedVehicleBTDescId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysvehiclestrade"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error");
                    },
                    timeout: 30000
                });
            },
        });

        DevExpress.localization.locale(langCode);

        $(function () {
            $("#gridContainer_rentalGrid").dxDataGrid({

                showColumnLines: true,
                showRowLines: true,
                showBorders: true,
                dataSource: rentalData,
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
                    fileName: "rental list"
                },
                grouping: {
                    contextMenuEnabled: true,
                    expandMode: "rowClick"
                },
                groupPanel: {
                    emptyPanelText: window.lang.translate('Use the context menu of header columns to group data'),
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
                columns: [
                    {
                        //    caption: window.lang.translate('Active/Passive'),
                        //    width: 40,
                        //    alignment: 'center',

                        //    cellTemplate: function (container, options) {
                        //        var fieldHtml;
                        //        var vehiclebtdesc_id = options.data.id;

                        //        if (options.data.active === 1) {
                        //            //active
                        //            $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        //                activepassiveVehicleBTDesc(vehiclebtdesc_id, options.data.active);

                        //            }).appendTo(container);
                        //        } else if (options.data.active === 0) {

                        //            //passive
                        //            $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        //                activepassiveVehicleBTDesc(vehiclebtdesc_id, options.data.active);

                        //            }).appendTo(container);
                        //        }

                        //        //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                        //        //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                        //        //}).appendTo(container); 

                        //    }

                        //}, {
                        caption: window.lang.translate('month'),
                        dataField: "month_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('year'),
                        dataField: "month_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('cost'),
                        dataField: "month_name",
                        encodeHtml: false
                    }, {//openAddProposalAksesuarPopUp
                        caption: window.lang.translate('Active/Passive'),
                        width: 40,
                        alignment: 'center',

                        cellTemplate: function (container, options) {
                            var fieldHtml;
                            var vehiclebtdesc_id = options.data.id;
                            //active
                            $('<div />').addClass('dx-link').attr('class', "fa fa-plus").on('click', function () {
                                openAddRentalPopUp();

                            }).appendTo(container);

                        }
                    }
                ],
                rowPrepared: function (rowElement, rowInfo) {
                    return false;
                    //if (rowInfo.data.key === 1)
                    //    rowElement.css('background', 'green');
                    //else if (rowInfo.data.key === 0)
                    //    rowElement.css('background', 'yellow');

                },

                onSelectionChanged: function (selectedItems) {
                    var data = selectedItems.selectedRowsData[0];
                    if (data) {
                        //selectedVehicleBTDescId = data.id;
                        //alert("z " + selectedVehicleBTDescId);
                        //filldropdown = true;
                    }
                }

            });
        });
    })

    $('#rentalList').click();

//Rental Grid End

//Repair Cost Grid
    $('#repairCostList').click(function () {

        /* devexgrid */
        var repaircostData = new DevExpress.data.CustomStore({
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
                    timeout: 30000
                });

                return deferred.promise();
            },

            remove: function (key) {
                var deferred = $.Deferred();
                //alert(selectedVehicleId);

                return $.ajax({
                    url: '/Vehicle/DeleteVehicleBTDesc',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedVehicleBTDescId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysvehiclestrade"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error");
                    },
                    timeout: 30000
                });
            },
        });

        DevExpress.localization.locale(langCode);

        $(function () {
            $("#gridContainer_repairCostGrid").dxDataGrid({

                showColumnLines: true,
                showRowLines: true,
                showBorders: true,
                dataSource: repaircostData,
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
                    fileName: "repair cost list"
                },
                grouping: {
                    contextMenuEnabled: true,
                    expandMode: "rowClick"
                },
                groupPanel: {
                    emptyPanelText: window.lang.translate('Use the context menu of header columns to group data'),
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
                columns: [
                    {
                        //    caption: window.lang.translate('Active/Passive'),
                        //    width: 40,
                        //    alignment: 'center',

                        //    cellTemplate: function (container, options) {
                        //        var fieldHtml;
                        //        var vehiclebtdesc_id = options.data.id;

                        //        if (options.data.active === 1) {
                        //            //active
                        //            $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        //                activepassiveVehicleBTDesc(vehiclebtdesc_id, options.data.active);

                        //            }).appendTo(container);
                        //        } else if (options.data.active === 0) {

                        //            //passive
                        //            $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        //                activepassiveVehicleBTDesc(vehiclebtdesc_id, options.data.active);

                        //            }).appendTo(container);
                        //        }

                        //        //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                        //        //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                        //        //}).appendTo(container); 

                        //    }

                        //}, {
                        caption: window.lang.translate('month'),
                        dataField: "month_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('year'),
                        dataField: "month_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('cost'),
                        dataField: "month_name",
                        encodeHtml: false
                    }, {//openAddProposalAksesuarPopUp
                        caption: window.lang.translate('Active/Passive'),
                        width: 40,
                        alignment: 'center',

                        cellTemplate: function (container, options) {
                            var fieldHtml;
                            var vehiclebtdesc_id = options.data.id;
                            //active
                            $('<div />').addClass('dx-link').attr('class', "fa fa-plus").on('click', function () {
                                openAddRepairCostPopUp();

                            }).appendTo(container);

                        }
                    }
                ],
                rowPrepared: function (rowElement, rowInfo) {
                    return false;
                    //if (rowInfo.data.key === 1)
                    //    rowElement.css('background', 'green');
                    //else if (rowInfo.data.key === 0)
                    //    rowElement.css('background', 'yellow');

                },

                onSelectionChanged: function (selectedItems) {
                    var data = selectedItems.selectedRowsData[0];
                    if (data) {
                        //selectedVehicleBTDescId = data.id;
                        //alert("z " + selectedVehicleBTDescId);
                        //filldropdown = true;
                    }
                }

            });
        });
    })

    $('#repairCostList').click();
//Repair Cost Grid End




    /**
    * topused stock Form
    * @author Ceydacan Seyrek
    * @since 20/10/2018
    */

    $("#btn-topUsedStock-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#monthlyQuotaForm").validationEngine('validate')) {

            $("#loadingImage_monthlyQuota").loadImager('removeLoadImage');
            $("#loadingImage_monthlyQuota").loadImager('appendImage');

            var ddDataQuotaType = $('#ddslickQuotaType').data('ddslick');
            if (!ddDataQuotaType.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Quota type"),
                    window.lang.translate("Please select Quota type"));
                $('#loadingImage_DdslickQuotaType').loadImager('removeLoadImage');
                return false;
            }
            var sis_quota_id = ddDataQuotaType.selectedData.value;

            var ddDataVehicleModel = $('#ddslickVehicleModel').data('ddslick');
            if (!ddDataVehicleModel.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Vehicle Model"),
                    window.lang.translate("Please select Quota type"));
                $('#loadingImage_DdslickVehicleModel').loadImager('removeLoadImage');
                return false;
            }
            var model_id = ddDataVehicleModel.selectedData.value;

            var ddDataQuotayear = $('#ddslickQuotaYear').data('ddslick');
            if (!ddDataQuotayear.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Quota year"),
                    window.lang.translate("Please select Quota year"));
                $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
                return false;
            }
            var year = ddDataQuotayear.selectedData.value;

            var ddDataQuotamonth = $('#ddslickQuotaMonth').data('ddslick');
            if (!ddDataQuotamonth.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Quota month"),
                    window.lang.translate("Please select Quota year"));
                $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
                return false;
            }
            var month_id = ddDataQuotamonth.selectedData.value;

            var quantity = $('#txt-QuotaMonth-limit').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
            //url=pkInsertAct_syssismonthlyquotas
            //&sis_quota_id=1--
            //&model_id=2--
            //&year=2018--
            //&month_id=12
            //&quantity=12--
            //&pk=GsZVzEYe50uGgNM

            var ajax_InsertYearlyQuota = $('#ajaxACL-monthlyQuota').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loadingImage_monthlyQuota",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_syssismonthlyquotas)"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_syssismonthlyquotas)"),

                proxy: '/Sys/AddMonthlyQuota',
                type: 'POST',
                data: JSON.stringify({
                    url: "pkInsertAct_syssismonthlyquotas",
                    sis_quota_id: sis_quota_id,
                    model_id: model_id,
                    year: year,
                    month_id: month_id,
                    quantity: quantity,
                    pk: "GsZVzEYe50uGgNM",
                })
            });
            ajax_InsertYearlyQuota.ajaxCallWidget({
                onReset: function (event, data) {
                    resetQuotaMonthForm();
                },
                onAfterSuccess: function (event, data) {
                    $("#gridContainer_QuotaMonth").dxDataGrid("instance").refresh();
                }
            })
            ajax_InsertYearlyQuota.ajaxCallWidget('call');
            return false;
        }
    })

    /**
    * reset topused stock Form
    * @author Ceydacan Seyrek
    * @since 20/10/2018
    */
    $("#btn-topUsedStock-clear").on("click", function (e) {
        e.preventDefault();
        resetQuotaMonthForm();
        return false;
    })

    var resetQuotaMonthForm = function () {
        $("#loadingImage_monthlyQuota").loadImager('removeLoadImage');
        $("#loadingImage_monthlyQuota").loadImager('appendImage');

        $('#monthlyQuotaForm').validationEngine('hide');
        $('#ddslickVehicleModel').ddslick('select', { index: String(0) });
        $('#ddslickQuotaYear').ddslick('select', { index: String(0) });
        $('#ddslickQuotaMonth').ddslick('select', { index: String(0) });
        $('#ddslickQuotaType').ddslick('select', { index: String(0) });

        $("#loadingImage_MonthlyQuota").loadImager('removeLoadImage');

        return false;
    }

    /**
    * Fill topused stock form
    * @author Ceydacan Seyrek
    * @since 20/10/2018
    */

    window.fillMonthlyQuotaForm = function (data) {
        $("#loadingImage_MonthlyQuota").loadImager('removeLoadImage');
        $("#loadingImage_MonthlyQuota").loadImager('appendImage');

        $('#ddslickVehicleModel').ddslick('select', { index: 3 });
        $('#ddslickQuotaYear').ddslick('select', { index: 2 });
        $('#ddslickQuotaMonth').ddslick('select', { index: 2 });
        document.getElementById("txt-QuotaMonth-limit").value = data.quantity;

        //$('#ddslickQuotaType').ddslick('selectByValue',
        //    {
        //        index: '' + data.id + '',
        //        text: '' + data.name + ''
        //    }
        //);

        $('#ddslickQuotaYear').ddslick('selectByValue',
            {
                index: '' + data.year + ''
            }
        );
        $('#ddslickQuotaMonth').ddslick('selectByValue',
            {
                index: '' + data.month_id + ''
            }
        );

        $("#loadingImage_MonthlyQuota").loadImager('removeLoadImage');
        return false;
    }

    /**
* Active Passive topused stock Form
* @author Ceydacan Seyrek
* @since 20/10/2018 
*/
    window.activepasiveQuotaMonth = function (quotamonth_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syssismonthlyquotas&id=29&pk=GsZVzEYe50uGgNM
        var ajax_activepasiveTrInfolist = $('#ajaxACL-QuotaMonth').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loadingImage_DdslickQuotaMonthGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_syssismonthlyquotas)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_syssismonthlyquotas)"),
            proxy: '/Sys/SysActivePassiveYearlyQuota',
            type: "POST",
            data: JSON.stringify({
                id: quotamonth_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syssismonthlyquotas"
            }),

        });
        ajax_activepasiveTrInfolist.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_QuotaMonth").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveTrInfolist.ajaxCallWidget('call');
    }


/**
* add Cost price button
* @author Ceydacan Seyrek
* @since 19/10/2018
* */

    $("#btn-costadd-save").on("click", function (e) {
        e.preventDefault();
        openAddCostPopUp();
        return false;
    })
    //----------------------------------popup begin-------------------------------------------------

    /**
     * add Cost price popup insert wrapper
     * @author Ceydacan Seyrek
     * @since 19/10/2018
     * */
    window.openAddCostPopUpWrapper = function (e) {
        //alert("popup submit click");

        if ($("#topUsedStockForm").validationEngine('validate')) {
            alert('test mest 1');
        } else {
            alert('test mest 2');
        }
        e.preventDefault();
        return false;
    }

    /**
     * add Cost price popup window opener
     * @author Ceydacan Seyrek
     * @since 19/10/2018
     * */
    window.openAddCostPopUp = function () {
        BootstrapDialog.show({
            title: window.lang.translate("Add Cost"),
            message: function (dialogRef) {
                var dialogRef = dialogRef;
                var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loadingImage_AddCost" class="box box-primary">\n\
                                                     <form id="costForm" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                           <label class="col-sm-2 control-label">Year</label>\n\
                                                            <div id="ajax_DdslickYear" class="col-sm-10">\n\
                                                                <div id="loadingImage_DdslickYear" class="input-group zeyn-load-imager">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-truck"></i>\n\
                                                                    </div>\n\
                                                                    <div data-prompt-position="topLeft:70" id="ddslickYear" class="form-control"></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Month</label>\n\
                                                            <div id="ajax_DdslickMonth" class="col-sm-10">\n\
                                                                <div id="loadingImage_DdslickMonth" class="input-group zeyn-load-imager">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-truck"></i>\n\
                                                                    </div>\n\
                                                                    <div data-prompt-position="topLeft:70" id="ddslickMonth" class="form-control"></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Cost</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="cost_popup" id="cost_popup" placeholder=""></textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="add_cost" class="btn btn-primary" type="button" onclick="return openAddCostPopUpWrapper(event);" >\n\
                                                                 <i class="fa fa-save"></i> Save </button>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                 </form>\n\
                                             </div>\n\
                                         </div>\n\
                                     </div>');
                return $message;
            },
            type: BootstrapDialog.TYPE_PRIMARY,
            onshow: function (dialogRef) {

            },
            onshown: function () {
                $('#topUsedStockForm').validationEngine();
                //$('#loadingImage_AddAksesuarProposal').loadImager();
                //$('#loadingImage_AddAksesuarProposal').loadImager("appendImage");

//Year
                $('#loadingImage_DdslickYear').loadImager();
                $("#loadingImage_DdslickYear").loadImager('appendImage');
                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustYearsDdList_sysmonths&pk=GsZVzEYe50uGgNM&id=55
                var ajaxACLResources_Year = $('#ajax_DdslickYear').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_DdslickYear",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkJustYearsDdList_sysmonths)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkJustYearsDdList_sysmonths)"),
                    proxy: '/DefaultPost/DefaultPostModel',
                    type: "POST",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkJustYearsDdList_sysmonths",
                        pkIdentity: $("#publicKey").val()
                    })
                });

                ajaxACLResources_Year.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onSuccess: function (event, datayear) {

                        var cbdata_year = $.parseJSON(datayear);
                        cbdata_year.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );

                        $('#ddslickYear').ddslick({
                            data: cbdata_year,
                            width: '100%',
                            //search: true,
                            //searchText: window.lang.translate('Search'),
                        })
                        $('#loadingImage_DdslickYear').loadImager('removeLoadImage');
                    },
                    onAfterSuccess: function (event, data) {
                        $('#loadingImage_DdslickYear').loadImager('removeLoadImage');
                    }
                })
                ajaxACLResources_Year.ajaxCallWidget('call');
//Year End
//Month
                $('#loadingImage_DdslickMonth').loadImager();
                $("#loadingImage_DdslickMonth").loadImager('appendImage');
                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustMonthsDdList_sysmonths&language_code=en&pk=GsZVzEYe50uGgNM
                var ajaxACLResources_Month = $('#ajax_DdslickMonth').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_DdslickMonth",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkJustMonthsDdList_sysmonths)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkJustMonthsDdList_sysmonths)"),
                    proxy: '/DefaultPost/DefaultPostModel',
                    type: "POST",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkJustMonthsDdList_sysmonths",
                        pkIdentity: $("#publicKey").val()
                    })
                });

                ajaxACLResources_Month.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onSuccess: function (event, datayear) {

                        var cbdata_year = $.parseJSON(datayear);
                        cbdata_year.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );

                        $('#ddslickMonth').ddslick({
                            data: cbdata_year,
                            width: '100%',
                            //search: true,
                            //searchText: window.lang.translate('Search'),
                        })
                        $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
                    },
                    onAfterSuccess: function (event, data) {
                        $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
                    }
                })
                ajaxACLResources_Month.ajaxCallWidget('call');
//Month End
                
            },
            onhide: function () {
                //alert('onhide popup');

            },
        });
    }

    //----------------------------------popup end-------------------------------------------------

//Rental

    /**
    * add Rental price button
    * @author Ceydacan Seyrek
    * @since 19/10/2018
    * */

    $("#btn-rentaladd-save").on("click", function (e) {
        e.preventDefault();
        openAddRentalPopUp();
        return false;
    })
    //----------------------------------popup begin-------------------------------------------------

    /**
     * add rental price popup insert wrapper
     * @author Ceydacan Seyrek
     * @since 19/10/2018
     * */
    window.openAddRentalPopUpWrapper = function (e) {
        //alert("popup submit click");

        if ($("#topUsedStockForm").validationEngine('validate')) {
            alert('test mest 1');
        } else {
            alert('test mest 2');
        }
        e.preventDefault();
        return false;
    }

    /**
     * add rental price popup window opener
     * @author Ceydacan Seyrek
     * @since 19/10/2018
     * */
    window.openAddRentalPopUp = function () {
        BootstrapDialog.show({
            title: window.lang.translate("Add Rental"),
            message: function (dialogRef) {
                var dialogRef = dialogRef;
                var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loadingImage_AddRental" class="box box-primary">\n\
                                                     <form id="rentalForm" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                           <label class="col-sm-2 control-label">Year</label>\n\
                                                            <div id="ajax_DdslickYear" class="col-sm-10">\n\
                                                                <div id="loadingImage_DdslickYear" class="input-group zeyn-load-imager">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-truck"></i>\n\
                                                                    </div>\n\
                                                                    <div data-prompt-position="topLeft:70" id="ddslickYear" class="form-control"></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Month</label>\n\
                                                            <div id="ajax_DdslickMonth" class="col-sm-10">\n\
                                                                <div id="loadingImage_DdslickMonth" class="input-group zeyn-load-imager">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-truck"></i>\n\
                                                                    </div>\n\
                                                                    <div data-prompt-position="topLeft:70" id="ddslickMonth" class="form-control"></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Rental</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="rental_popup" id="rental_popup" placeholder=""></textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="add_cost" class="btn btn-primary" type="button" onclick="return openAddRentalPopUpWrapper(event);" >\n\
                                                                 <i class="fa fa-save"></i> Save </button>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                 </form>\n\
                                             </div>\n\
                                         </div>\n\
                                     </div>');
                return $message;
            },
            type: BootstrapDialog.TYPE_PRIMARY,
            onshow: function (dialogRef) {

            },
            onshown: function () {
                $('#topUsedStockForm').validationEngine();
                //$('#loadingImage_AddAksesuarProposal').loadImager();
                //$('#loadingImage_AddAksesuarProposal').loadImager("appendImage");

                //Year
                $('#loadingImage_DdslickYear').loadImager();
                $("#loadingImage_DdslickYear").loadImager('appendImage');
                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustYearsDdList_sysmonths&pk=GsZVzEYe50uGgNM&id=55
                var ajaxACLResources_Year = $('#ajax_DdslickYear').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_DdslickYear",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkJustYearsDdList_sysmonths)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkJustYearsDdList_sysmonths)"),
                    proxy: '/DefaultPost/DefaultPostModel',
                    type: "POST",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkJustYearsDdList_sysmonths",
                        pkIdentity: $("#publicKey").val()
                    })
                });

                ajaxACLResources_Year.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onSuccess: function (event, datayear) {

                        var cbdata_year = $.parseJSON(datayear);
                        cbdata_year.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );

                        $('#ddslickYear').ddslick({
                            data: cbdata_year,
                            width: '100%',
                            //search: true,
                            //searchText: window.lang.translate('Search'),
                        })
                        $('#loadingImage_DdslickYear').loadImager('removeLoadImage');
                    },
                    onAfterSuccess: function (event, data) {
                        $('#loadingImage_DdslickYear').loadImager('removeLoadImage');
                    }
                })
                ajaxACLResources_Year.ajaxCallWidget('call');
                //Year End
                //Month
                $('#loadingImage_DdslickMonth').loadImager();
                $("#loadingImage_DdslickMonth").loadImager('appendImage');
                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustMonthsDdList_sysmonths&language_code=en&pk=GsZVzEYe50uGgNM
                var ajaxACLResources_Month = $('#ajax_DdslickMonth').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_DdslickMonth",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkJustMonthsDdList_sysmonths)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkJustMonthsDdList_sysmonths)"),
                    proxy: '/DefaultPost/DefaultPostModel',
                    type: "POST",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkJustMonthsDdList_sysmonths",
                        pkIdentity: $("#publicKey").val()
                    })
                });

                ajaxACLResources_Month.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onSuccess: function (event, datayear) {

                        var cbdata_year = $.parseJSON(datayear);
                        cbdata_year.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );

                        $('#ddslickMonth').ddslick({
                            data: cbdata_year,
                            width: '100%',
                            //search: true,
                            //searchText: window.lang.translate('Search'),
                        })
                        $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
                    },
                    onAfterSuccess: function (event, data) {
                        $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
                    }
                })
                ajaxACLResources_Month.ajaxCallWidget('call');
                //Month End

            },
            onhide: function () {
                //alert('onhide popup');

            },
        });
    }

    //----------------------------------popup end-------------------------------------------------

//Repair Cost
    /**
    * add repair price button
    * @author Ceydacan Seyrek
    * @since 19/10/2018
    * */

    $("#btn-repaircostadd-save").on("click", function (e) {
        e.preventDefault();
        openAddRepairCostPopUp();
        return false;
    })
    //----------------------------------popup begin-------------------------------------------------

    /**
     * add repair price popup insert wrapper
     * @author Ceydacan Seyrek
     * @since 19/10/2018
     * */
    window.openAddRepairCostPopUpWrapper = function (e) {
        //alert("popup submit click");

        if ($("#topUsedStockForm").validationEngine('validate')) {
            alert('test mest 1');
        } else {
            alert('test mest 2');
        }
        e.preventDefault();
        return false;
    }

    /**
     * add repair price popup window opener
     * @author Ceydacan Seyrek
     * @since 19/10/2018
     * */
    window.openAddRepairCostPopUp = function () {
        BootstrapDialog.show({
            title: window.lang.translate("Add Repair Cost"),
            message: function (dialogRef) {
                var dialogRef = dialogRef;
                var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loadingImage_AddRepairCost" class="box box-primary">\n\
                                                     <form id="repairCostForm" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                           <label class="col-sm-2 control-label">Year</label>\n\
                                                            <div id="ajax_DdslickYear" class="col-sm-10">\n\
                                                                <div id="loadingImage_DdslickYear" class="input-group zeyn-load-imager">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-truck"></i>\n\
                                                                    </div>\n\
                                                                    <div data-prompt-position="topLeft:70" id="ddslickYear" class="form-control"></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Month</label>\n\
                                                            <div id="ajax_DdslickMonth" class="col-sm-10">\n\
                                                                <div id="loadingImage_DdslickMonth" class="input-group zeyn-load-imager">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-truck"></i>\n\
                                                                    </div>\n\
                                                                    <div data-prompt-position="topLeft:70" id="ddslickMonth" class="form-control"></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Retail Cost</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="retail_popup" id="retail_popup" placeholder=""></textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="add_Repaircost" class="btn btn-primary" type="button" onclick="return openAddRepairCostPopUpWrapper(event);" >\n\
                                                                 <i class="fa fa-save"></i> Save </button>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                 </form>\n\
                                             </div>\n\
                                         </div>\n\
                                     </div>');
                return $message;
            },
            type: BootstrapDialog.TYPE_PRIMARY,
            onshow: function (dialogRef) {

            },
            onshown: function () {
                $('#topUsedStockForm').validationEngine();
                //$('#loadingImage_AddAksesuarProposal').loadImager();
                //$('#loadingImage_AddAksesuarProposal').loadImager("appendImage");

                //Year
                $('#loadingImage_DdslickYear').loadImager();
                $("#loadingImage_DdslickYear").loadImager('appendImage');
                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustYearsDdList_sysmonths&pk=GsZVzEYe50uGgNM&id=55
                var ajaxACLResources_Year = $('#ajax_DdslickYear').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_DdslickYear",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkJustYearsDdList_sysmonths)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkJustYearsDdList_sysmonths)"),
                    proxy: '/DefaultPost/DefaultPostModel',
                    type: "POST",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkJustYearsDdList_sysmonths",
                        pkIdentity: $("#publicKey").val()
                    })
                });

                ajaxACLResources_Year.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onSuccess: function (event, datayear) {

                        var cbdata_year = $.parseJSON(datayear);
                        cbdata_year.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );

                        $('#ddslickYear').ddslick({
                            data: cbdata_year,
                            width: '100%',
                            //search: true,
                            //searchText: window.lang.translate('Search'),
                        })
                        $('#loadingImage_DdslickYear').loadImager('removeLoadImage');
                    },
                    onAfterSuccess: function (event, data) {
                        $('#loadingImage_DdslickYear').loadImager('removeLoadImage');
                    }
                })
                ajaxACLResources_Year.ajaxCallWidget('call');
                //Year End
                //Month
                $('#loadingImage_DdslickMonth').loadImager();
                $("#loadingImage_DdslickMonth").loadImager('appendImage');
                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustMonthsDdList_sysmonths&language_code=en&pk=GsZVzEYe50uGgNM
                var ajaxACLResources_Month = $('#ajax_DdslickMonth').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_DdslickMonth",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkJustMonthsDdList_sysmonths)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkJustMonthsDdList_sysmonths)"),
                    proxy: '/DefaultPost/DefaultPostModel',
                    type: "POST",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkJustMonthsDdList_sysmonths",
                        pkIdentity: $("#publicKey").val()
                    })
                });

                ajaxACLResources_Month.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onSuccess: function (event, datayear) {

                        var cbdata_year = $.parseJSON(datayear);
                        cbdata_year.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );

                        $('#ddslickMonth').ddslick({
                            data: cbdata_year,
                            width: '100%',
                            //search: true,
                            //searchText: window.lang.translate('Search'),
                        })
                        $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
                    },
                    onAfterSuccess: function (event, data) {
                        $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
                    }
                })
                ajaxACLResources_Month.ajaxCallWidget('call');
                //Month End

            },
            onhide: function () {
                //alert('onhide popup');

            },
        });
    }

    //----------------------------------popup end-------------------------------------------------

});



