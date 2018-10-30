$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'Ýþleme devam et'
    });

    /*
    * datepicker format
    * @author Ceydacan Seyrek
    * @since 08/08/2018
    */
    $('#end-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#start-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });
    /*
    * Fxrate LoadImager
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */
    //to Fxrate form
    $("#loading-image-Fxrate").loadImager();

    //to Fxrate form grid loading-image
    $("#loading-image-FxrateGrid").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);
    var fxrateID;

    $('#FxrateForm').validationEngine();


    /* devexgrid */

    DevExpress.localization.locale(langCode);

    $('#fxrateListRefresh').click(function () {
        $("#gridContainer_Fxrate").dxDataGrid("instance").refresh();
    });
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillCurrencyFixGridx_syscurrencyfix&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var fxrate = new DevExpress.data.CustomStore({
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
                    url: "pkFillCurrencyFixGridx_syscurrencyfix",
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
        }
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
    $("#gridContainer_Fxrate").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: fxrate,
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
                var fxrate_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveFxRate(fxrate_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveFxRate(fxrate_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                    }).appendTo(container);
                }
            }
        }, {
            caption: window.lang.translate('Fxrate') + "...",
            dataField: "fix",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Fxrate start date') + "...",
            dataField: "start_date",
            encodeHtml: false,
            dataType: "date"
        }, {
            caption: window.lang.translate('Fxrate end date') + "...",
            dataField: "end_date",
            encodeHtml: false,
            dataType: "date"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fxrateID = data.id;
                fillFxrateForm(data);
            }
        },
        //onRowRemoving: function (e) {
        //    //QuotaMonthID = e.key.id;
        //    //deleteTrName(trName_id);
        //},
        //onRowRemoved: function (e) {
        //    $("#gridContainer_QuotaMonth").dxDataGrid("instance").refresh();
        //},
    });

/**
 * insert Fxrate
 * @returns {undefined}
 * @author Ceydacan Seyrek
 * @since 14/08/2018
 */
    /**
* Monthly Quota Form
* @author Ceydacan Seyrek
* @since 17/09/2018
*/

    $("#btn-fxrate-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#FxrateForm").validationEngine('validate')) {

            $("#loading-image-Fxrate").loadImager('removeLoadImage');
            $("#loading-image-Fxrate").loadImager('appendImage');

            var endDate = $('#start-datepicker').val();
            var startDate = $('#end-datepicker').val();
            var fxrate = $('#txt-fxrate-fxrate').val();


            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syscurrencyfix&currency_id=2&start_date=2018-10-10&end_date=2018-12-12&fix=5&pk=GsZVzEYe50uGgNM
            if (!fxrateID == "") {//update
                var ajax_InsertFxrate = $('#ajaxACL-fxrate').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-Fxrate",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Sys/AddFxrate',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_syscurrencyfix",
                        id: fxrateID,
                        end_date: endDate,
                        start_date: startDate,
                        fix: fxrate,
                        pk: "GsZVzEYe50uGgNM",
                    })
                });
                ajax_InsertFxrate.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetFxrateForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_Fxrate").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertFxrate.ajaxCallWidget('call');
            }
            else {//insert
                var ajax_InsertFxrate = $('#ajaxACL-fxrate').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-Fxrate",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Sys/AddFxrate',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_syscurrencyfix",
                        end_date: endDate,
                        start_date: startDate,
                        fix: fxrate,
                        pk: "GsZVzEYe50uGgNM",
                    })
                });
                ajax_InsertFxrate.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetFxrateForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_Fxrate").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertFxrate.ajaxCallWidget('call');
            }
            fxrateID = "";
            return false;
        }
    })
    /**
    * reset Fxrate Form
    * @returns {undefined}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    $("#btn-fxrate-clear").on("click", function (e) {
        e.preventDefault();
        resetFxrateForm();
        return false;
    })

    var resetFxrateForm = function () {
        $("#loading-image-Fxrate").loadImager('removeLoadImage');
        $("#loading-image-Fxrate").loadImager('appendImage');

        $('#FxrateForm')[0].reset();
        $('#FxrateForm').validationEngine('hide');

        $("#loading-image-Fxrate").loadImager('removeLoadImage');
        return false;
    }

    /**
    * Fill Fxrate form
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.fillFxrateForm = function (data) {
        $("#loading-image-Fxrate").loadImager('removeLoadImage');
        $("#loading-image-Fxrate").loadImager('appendImage');

        document.getElementById("start-datepicker").value = data.start_date;
        document.getElementById("end-datepicker").value = data.end_date;
        document.getElementById("txt-fxrate-fxrate").value = data.fix;
        

        $("#loading-image-Fxrate").loadImager('removeLoadImage');

        return false;
    }

    /**
    * Active/passive Fxrate form
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */ 

    window.activepasiveFxRate = function (fxrate_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syscurrencyfix&pk=GsZVzEYe50uGgNM&id=88
        var ajax_activepasivefxrate = $('#ajaxACL-fxratelist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-Fxrate",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Training/SysActivePasiveTrName',
            type: "POST",
            data: JSON.stringify({
                id: fxrate_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syscurrencyfix"
            }),

        });
        ajax_activepasivefxrate.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_Fxrate").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasivefxrate.ajaxCallWidget('call');
    }
});

