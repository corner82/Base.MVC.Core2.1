/*
* Monthly Quota Form
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
        actionButtonLabel: 'Ýþleme devam et'
    });

    var filldropdown = false;

    var ddslick_modelId = 0;
    var ddslick_model_name = "";
    var ddslick_vehicleId = 0;
    var ddslick_vehicle_name = "";
    /*
    * Monthly Quota LoadImager
    * @author Ceydacan Seyrek
    * @since 17/09/2018
    */
    //to Monthly Quota form
    $("#loadingImage_DdslickModel").loadImager();
    $("#loadingImage_DdslickVehicle").loadImager();
    $("#loadingImage_DdslickVehicleList").loadImager();

    //to Monthly Quota form grid loading-image
    $("#loadingImage_DdslickStockHosGrid").loadImager();

    var langCode = $("#langCode").val();
    var QuotaMonthID;
    //alert(langCode);

    $('#monthlyQuotaForm').validationEngine();

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

    $('#StockHosRefresh').click(function () {
        //Quota month Grid
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
        //Quota month Grid
        $("#gridContainer_stockHos").dxDataGrid({

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
                caption: window.lang.translate('EngineType') + "...",
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

    $('#StockHosRefresh').click();

//    /**
//    * Monthly Quota Form
//    * @author Ceydacan Seyrek
//    * @since 17/09/2018
//    */

//    $("#btn-QuotaMonth-save").on("click", function (e) {
//        e.preventDefault();
//        //alert("geldim click");
//        if ($("#monthlyQuotaForm").validationEngine('validate')) {

//            $("#loadingImage_monthlyQuota").loadImager('removeLoadImage');
//            $("#loadingImage_monthlyQuota").loadImager('appendImage');

//            var ddDataQuotaType = $('#ddslickQuotaType').data('ddslick');
//            if (!ddDataQuotaType.selectedData.value > 0) {
//                wm.warningMessage('resetOnShown');
//                wm.warningMessage('show', window.lang.translate("Please select Quota type"),
//                    window.lang.translate("Please select Quota type"));
//                $('#loadingImage_DdslickQuotaType').loadImager('removeLoadImage');
//                return false;
//            }
//            var sis_quota_id = ddDataQuotaType.selectedData.value;

//            var ddDataVehicleModel = $('#ddslickVehicleModel').data('ddslick');
//            if (!ddDataVehicleModel.selectedData.value > 0) {
//                wm.warningMessage('resetOnShown');
//                wm.warningMessage('show', window.lang.translate("Please select Vehicle Model"),
//                    window.lang.translate("Please select Quota type"));
//                $('#loadingImage_DdslickVehicleModel').loadImager('removeLoadImage');
//                return false;
//            }
//            var model_id = ddDataVehicleModel.selectedData.value;

//            var ddDataQuotayear = $('#ddslickQuotaYear').data('ddslick');
//            if (!ddDataQuotayear.selectedData.value > 0) {
//                wm.warningMessage('resetOnShown');
//                wm.warningMessage('show', window.lang.translate("Please select Quota year"),
//                    window.lang.translate("Please select Quota year"));
//                $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
//                return false;
//            }
//            var year = ddDataQuotayear.selectedData.value;

//            var ddDataQuotamonth = $('#ddslickQuotaMonth').data('ddslick');
//            if (!ddDataQuotamonth.selectedData.value > 0) {
//                wm.warningMessage('resetOnShown');
//                wm.warningMessage('show', window.lang.translate("Please select Quota month"),
//                    window.lang.translate("Please select Quota year"));
//                $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
//                return false;
//            }
//            var month_id = ddDataQuotamonth.selectedData.value;

//            var quantity = $('#txt-QuotaMonth-limit').val();

//            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
//            //url=pkInsertAct_syssismonthlyquotas
//            //&sis_quota_id=1--
//            //&model_id=2--
//            //&year=2018--
//            //&month_id=12
//            //&quantity=12--
//            //&pk=GsZVzEYe50uGgNM

//            var ajax_InsertYearlyQuota = $('#ajaxACL-monthlyQuota').ajaxCallWidget({
//                failureLoadImage: true,
//                loadingImageID: "loadingImage_monthlyQuota",
//                triggerSuccessAuto: true,
//                transactionSuccessText: window.lang.translate('Transaction successful'),
//                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
//                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

//                proxy: '/Sys/AddMonthlyQuota',
//                type: 'POST',
//                data: JSON.stringify({
//                    url: "pkInsertAct_syssismonthlyquotas",
//                    sis_quota_id: sis_quota_id,
//                    model_id: model_id,
//                    year: year,
//                    month_id: month_id,
//                    quantity: quantity,
//                    pk: "GsZVzEYe50uGgNM",
//                })
//            });
//            ajax_InsertYearlyQuota.ajaxCallWidget({
//                onReset: function (event, data) {
//                    resetQuotaMonthForm();
//                },
//                onAfterSuccess: function (event, data) {
//                    $("#gridContainer_QuotaMonth").dxDataGrid("instance").refresh();
//                }
//            })
//            ajax_InsertYearlyQuota.ajaxCallWidget('call');
//            return false;
//        }
//    })

//    /**
//    * reset Monthly Quota Form
//    * @author Ceydacan Seyrek
//    * @since 10/09/2018
//    */
//    $("#btn-QuotaMonth-clear").on("click", function (e) {
//        e.preventDefault();
//        resetQuotaMonthForm();
//        return false;
//    })

//    var resetQuotaMonthForm = function () {
//        $("#loadingImage_monthlyQuota").loadImager('removeLoadImage');
//        $("#loadingImage_monthlyQuota").loadImager('appendImage');

//        $('#monthlyQuotaForm').validationEngine('hide');
//        $('#ddslickVehicleModel').ddslick('select', { index: String(0) });
//        $('#ddslickQuotaYear').ddslick('select', { index: String(0) });
//        $('#ddslickQuotaMonth').ddslick('select', { index: String(0) });
//        $('#ddslickQuotaType').ddslick('select', { index: String(0) });

//        $("#loadingImage_MonthlyQuota").loadImager('removeLoadImage');

//        return false;
//    }

//    /**
//    * Fill Monthly Quota Form form
//    * @author Ceydacan Seyrek
//    * @since 17/09/2018
//    */

//    window.fillMonthlyQuotaForm = function (data) {
//        $("#loadingImage_MonthlyQuota").loadImager('removeLoadImage');
//        $("#loadingImage_MonthlyQuota").loadImager('appendImage');

//        $('#ddslickVehicleModel').ddslick('select', { index: 3 });
//        $('#ddslickQuotaYear').ddslick('select', { index: 2 });
//        $('#ddslickQuotaMonth').ddslick('select', { index: 2 });
//        document.getElementById("txt-QuotaMonth-limit").value = data.quantity;

//        //$('#ddslickQuotaType').ddslick('selectByValue',
//        //    {
//        //        index: '' + data.id + '',
//        //        text: '' + data.name + ''
//        //    }
//        //);

//        $('#ddslickQuotaYear').ddslick('selectByValue',
//            {
//                index: '' + data.year + ''
//            }
//        );
//        $('#ddslickQuotaMonth').ddslick('selectByValue',
//            {
//                index: '' + data.month_id + ''
//            }
//        );

//        $("#loadingImage_MonthlyQuota").loadImager('removeLoadImage');
//        return false;
//    }

//    /**
//* Active Passive Monthly Quota Form
//* @author Ceydacan Seyrek
//* @since 16/10/2018 activepasiveQuotaMonth(quotamonth_id,
//*/
//    window.activepasiveQuotaMonth = function (quotamonth_id, active) {

//        var transactionSuccessMessage;

//        if (active === 1) {
//            //active
//            transactionSuccessMessage = window.lang.translate('Active successful');
//        } else {
//            //pasive
//            transactionSuccessMessage = window.lang.translate('Pasive successful');
//        }

//        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syssismonthlyquotas&id=29&pk=GsZVzEYe50uGgNM
//        var ajax_activepasiveTrInfolist = $('#ajaxACL-QuotaMonth').ajaxCallWidget({
//            failureLoadImage: true,
//            loadingImageID: "loadingImage_DdslickQuotaMonthGrid",
//            triggerSuccessAuto: true,
//            transactionSuccessText: window.lang.translate('Transaction successful'),
//            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
//            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
//            proxy: '/Sys/SysActivePassiveYearlyQuota',
//            type: "POST",
//            data: JSON.stringify({
//                id: quotamonth_id,
//                pk: "GsZVzEYe50uGgNM",
//                url: "pkUpdateMakeActiveOrPassive_syssismonthlyquotas"
//            }),

//        });
//        ajax_activepasiveTrInfolist.ajaxCallWidget({
//            onReset: function (event, data) {

//            },
//            onAfterSuccess: function (event, data) {
//                $("#gridContainer_stockHos").dxDataGrid("instance").refresh();
//            }
//        })
//        ajax_activepasiveTrInfolist.ajaxCallWidget('call');
//    }
});

