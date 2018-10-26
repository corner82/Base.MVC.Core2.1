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
        actionButtonLabel: 'İşleme devam et'
    });

    /*
    * Monthly Quota LoadImager
    * @author Ceydacan Seyrek
    * @since 17/09/2018
    */
    //to Monthly Quota form
    $("#loadingImage_onthlyQuota").loadImager();
    $("#loadingImage_DdslickVehicleModel").loadImager();
    $("#loadingImage_DdslickQuotaYear").loadImager();
    $("#loadingImage_DdslickQuotaMonth").loadImager();
    $("#loadingImage_DdslickQuotaType").loadImager();
    $("#loadingImage_monthlyQuota").loadImager();

    //to Monthly Quota form grid loading-image
    $("#loadingImage_DdslickQuotaMonthGrid").loadImager();

    var langCode = $("#langCode").val();
    var QuotaMonthID;
    //alert(langCode);

    $('#monthlyQuotaForm').validationEngine();

    //Vehicle model
    $('#loadingImage_DdslickVehicleModel').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleModel").loadImager('appendImage');

    var ajaxACLResources_VehicleModel = $('#ajax_DdslickVehicleModel').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleModel",
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

    ajaxACLResources_VehicleModel.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datamodelname) {

            var cbdata_modelname = $.parseJSON(datamodelname);
            cbdata_modelname.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickVehicleModel').ddslick({
                data: cbdata_modelname,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                }
            })
            $('#loadingImage_DdslickVehicleModel').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickVehicleModel').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_VehicleModel.ajaxCallWidget('call');

    //VehicleModel end

    //Quota Year
//Quota Year
    $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
    $("#loadingImage_DdslickQuotaYear").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustYearsDdList_sysmonths&pk=GsZVzEYe50uGgNM&id=55
    var ajaxACLResources_QuotaYear = $('#ajax_DdslickQuotaYear').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickQuotaYear",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkJustYearsDdList_sysmonths",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_QuotaYear.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataquotayear) {

            var cbdata_quotayear = $.parseJSON(dataquotayear);
            cbdata_quotayear.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickQuotaYear').ddslick({
                data: cbdata_quotayear,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_QuotaYear.ajaxCallWidget('call');
    //Quota Year End

    //Quota Month
    $('#loadingImage_DdslickQuotaMonth').loadImager('removeLoadImage');
    $("#loadingImage_DdslickQuotaMonth").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustMonthsDdList_sysmonths&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_QuotaMonth = $('#ajax_DdslickQuotaMonth').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickQuotaMonth",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkJustMonthsDdList_sysmonths",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_QuotaMonth.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataquotayear) {

            var cbdata_quotayear = $.parseJSON(dataquotayear);
            cbdata_quotayear.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickQuotaMonth').ddslick({
                data: cbdata_quotayear,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickQuotaMonth').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickQuotaMonth').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_QuotaMonth.ajaxCallWidget('call');

    //Quota Month End

//Quota Type
    $('#loadingImage_DdslickQuotaType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickQuotaType").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkSisQuotasDdList_syssisquotas&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_quotatype = $('#ajax_DdslickQuotaType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickQuotaType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkSisQuotasDdList_syssisquotas",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_quotatype.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataquotatype) {

            var cbdata_quotatype = $.parseJSON(dataquotatype);
            cbdata_quotatype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickQuotaType').ddslick({
                data: cbdata_quotatype,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickQuotaType').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickQuotaType').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_quotatype.ajaxCallWidget('call');
    //Quota Type End

    /* devexgrid */
DevExpress.localization.locale(langCode);

    $('#QuotaMonthRefresh').click(function () {
        //Quota month Grid
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
        //Quota month Grid
        $("#gridContainer_QuotaMonth").dxDataGrid({

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
                caption: window.lang.translate('Active/Passive'),
                width: 40,
                alignment: 'center',
                encodeHtml: false,

                cellTemplate: function (container, options) {
                    var fieldHtml;
                    var quotamonth_id = options.data.id;

                    if (options.data.active === 1) {
                        //active
                        $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                            activepasiveQuotaMonth(quotamonth_id, options.data.active);
                            //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                        }).appendTo(container);
                    } else if (options.data.active === 0) {
                        //pasive
                        $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                            activepasiveQuotaMonth(quotamonth_id, options.data.active);
                            //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                        }).appendTo(container);
                    }
                }
            }, {
                caption: window.lang.translate('Quota Type name') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Quota Vehicle Type') + "...",
                dataField: "vehicle_groups_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Quota Year') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Quota month') + "...",
                dataField: "month_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Quota limit') + "...",
                dataField: "quantity",
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
                $("#gridContainer_QuotaMonth").dxDataGrid("instance").refresh();
            },
        });
    });

    $('#QuotaMonthRefresh').click();

    /**
    * Monthly Quota Form
    * @author Ceydacan Seyrek
    * @since 17/09/2018
    */

    $("#btn-QuotaMonth-save").on("click", function (e) {
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
            //pkInsertAct_syssismonthlyquotas
            if (!QuotaMonthID == "") {//update
                var ajax_InsertYearlyQuota = $('#ajaxACL-monthlyQuota').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_monthlyQuota",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Sys/AddMonthlyQuota',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_syssismonthlyquotas",
                        id: QuotaMonthID,
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
            }
            else  {//insert
                var ajax_InsertYearlyQuota = $('#ajaxACL-monthlyQuota').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "pkInsertAct_syssismonthlyquotas",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

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
            }
            QuotaMonthID = "";
            return false;
        }
    })

    /**
    * reset Monthly Quota Form
    * @author Ceydacan Seyrek
    * @since 10/09/2018
    */
    $("#btn-QuotaMonth-clear").on("click", function (e) {
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
    * Fill Monthly Quota Form form
    * @author Ceydacan Seyrek
    * @since 17/09/2018
    */

    window.fillMonthlyQuotaForm = function (data) {
        $("#loadingImage_MonthlyQuota").loadImager('removeLoadImage');
        $("#loadingImage_MonthlyQuota").loadImager('appendImage');

        $('#ddslickVehicleModel').ddslick('select', { index: 3 });
        $('#ddslickQuotaYear').ddslick('select', { index: 2 });
        $('#ddslickQuotaMonth').ddslick('select', { index: 2 });
        document.getElementById("txt-QuotaMonth-limit").value = data.quantity;

        $('#ddslickQuotaType').ddslick('selectByValue',
            {
                index: '' + data.sis_quota_id + '',
                text: '' + data.name + ''
            }
        );

        $('#ddslickQuotaYear').ddslick('selectByValue',
            {
                index: '' + data.year + '',
                text: '' + data.year + ''
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
* Active Passive Monthly Quota Form
* @author Ceydacan Seyrek
* @since 16/10/2018 activepasiveQuotaMonth(quotamonth_id,
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
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
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
});

