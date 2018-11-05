/*
* Yearly Quota Form
* @author Ceydacan Seyrek
* @since 18/09/2018
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
    * retyuLoadImager
    * @author Ceydacan Seyrek
    * @since 18/09/2018
    */
    //to Yearly Quota form
    $("#loadingImage_yearlyQuota").loadImager();
    $("#loadingImage_DdslickQuotaYear").loadImager();
    $("#loadingImage_DdslickQuotaType").loadImager();

    //to Yearly Quota form grid loading-image
    $("#loadingImage_DdslickQuotaYearGrid").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);
    var QuotaYearID;

    $("#yearlyQuotaForm").validationEngine('validate')

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

    //Quota Type
    $('#loadingImage_DdslickQuotaType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickQuotaType").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkSisQuotasDdList_syssisquotas&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_quotatype = $('#ajax_DdslickQuotaType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickQuotaType",
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

    $('#QuotaYearRefresh').click(function () {
        //Quota year Grid
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillQuotasMatrixGridx_syssisquotasmatrix&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        var QuotaYear = new DevExpress.data.CustomStore({
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
                        url: "pkFillQuotasMatrixGridx_syssisquotasmatrix",
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
                        deferred.reject("Data Loading Error (pkFillQuotasMatrixGridx_syssisquotasmatrix)");
                    },
                    timeout: 10000
                });
                return deferred.promise();
            },
            remove: function (key) {
                var deferred = $.Deferred();
                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syssisquotasmatrix&id=33&pk=GsZVzEYe50uGgNM
                return $.ajax({
                    url: '/Sys/SysDeleteYearlyQuota',
                    dataType: "json",
                    data: JSON.stringify({
                        id: QuotaYearID,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_syssisquotasmatrix"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error (pkDeletedAct_syssisquotasmatrix)");
                    },
                    timeout: 10000
                });
            }
        });
        //Quota year Grid
        $("#gridContainer_QuotaYear").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: QuotaYear,
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
                fileName: "QuotaYear"
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
                    var quotaYear_id = options.data.id;

                    if (options.data.active === 1) {
                        //active
                        $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                            activepasiveQuotaYear(quotaYear_id, options.data.active);
                            //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                        }).appendTo(container);
                    } else if (options.data.active === 0) {
                        //pasive
                        $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                            activepasiveQuotaYear(quotaYear_id, options.data.active);
                            //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                        }).appendTo(container);
                    }
                }
            }, {
                caption: window.lang.translate('Quota Type name') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Quota Year') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Quota limit') + "...",
                dataField: "value",
                encodeHtml: false
            }],

            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    QuotaYearID = data.id;
                    fillYearlyQuotaForm(data);
                }
            },
            onRowRemoving: function (e) {
                QuotaYearID = e.key.id;
                //deleteTrName(trName_id);
            },
            onRowRemoved: function (e) {
                $("#gridContainer_QuotaYear").dxDataGrid("instance").refresh();
            },
        });
    });

    $('#QuotaYearRefresh').click();

    /**
    * Yearly Quota Form
    * @author Ceydacan Seyrek
    * @since 16/10/2018
    */

    $("#btn-quota-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#yearlyQuotaForm").validationEngine('validate')) {

            //window.insertTrainingName = function () {

            $("#loadingImage_yearlyQuota").loadImager('removeLoadImage');
            $("#loadingImage_yearlyQuota").loadImager('appendImage');


            var ddDataQuotaType = $('#ddslickQuotaType').data('ddslick');
            if (!ddDataQuotaType.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Quota type"),
                    window.lang.translate("Please select Quota type"));
                $('#loadingImage_DdslickQuotaType').loadImager('removeLoadImage');
                return false;
            }
            var sis_quota_id = ddDataQuotaType.selectedData.value;

            var ddDataQuotayear = $('#ddslickQuotaYear').data('ddslick');
            if (!ddDataQuotayear.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Quota year"),
                    window.lang.translate("Please select Quota year"));
                $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
                return false;
            }
            var year = ddDataQuotayear.selectedData.text;

            var value = $('#txt-QuotaYear-limit').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syssisquotasmatrix&sis_quota_id=1&year=2017&value=150&id=4&pk=GsZVzEYe50uGgNM
            //&sis_quota_id=1
            //&year=2017
            //&value=150&
            //id=4
            //&pk=GsZVzEYe50uGgNM  
            if (!QuotaYearID == "") {//update
                var ajax_InsertYearlyQuota = $('#ajaxACL-yearlyQuota').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_yearlyQuota",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_syssisquotasmatrix)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_syssisquotasmatrix)"),

                    proxy: '/Sys/AddYearlyQuota',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_syssisquotasmatrix",
                        id: QuotaYearID,
                        sis_quota_id: sis_quota_id,
                        year: year,
                        value: value,
                        pk: "GsZVzEYe50uGgNM",
                    })
                });
                ajax_InsertYearlyQuota.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetQuotaYearForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_QuotaYear").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertYearlyQuota.ajaxCallWidget('call');
            }
            else {//insert
                var ajax_InsertYearlyQuota = $('#ajaxACL-yearlyQuota').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_yearlyQuota",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_syssisquotasmatrix)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_syssisquotasmatrix)"),

                    proxy: '/Sys/AddYearlyQuota',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_syssisquotasmatrix",
                        sis_quota_id: sis_quota_id,
                        year: year,
                        value: value,
                        pk: "GsZVzEYe50uGgNM",
                    })
                });
                ajax_InsertYearlyQuota.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetQuotaYearForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_QuotaYear").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertYearlyQuota.ajaxCallWidget('call');
            }

            QuotaYearID = "";
            return false;
        }
    })
    /**
    * reset Yearly Quota Form
    * @author Ceydacan Seyrek
    * @since 16/10/2018
    */
    $("#btn-quota-clear").on("click", function (e) {
        e.preventDefault();
        resetQuotaYearForm();
        return false;
    })

    var resetQuotaYearForm = function () {
        $("#loadingImage_yearlyQuota").loadImager('removeLoadImage');
        $("#loadingImage_yearlyQuota").loadImager('appendImage');

        $('#yearlyQuotaForm').validationEngine('hide');
        $('#ddslickQuotaYear').ddslick('select', { index: String(0) });
        $('#ddslickQuotaType').ddslick('select', { index: String(0) });

        $("#loadingImage_yearlyQuota").loadImager('removeLoadImage');

        return false;
    }

    /**
    * Fill  Yearly Quota Form
    * @author Ceydacan Seyrek
    * @since 16/10/2018
    */

    window.fillYearlyQuotaForm = function (data) {
        $("#loadingImage_yearlyQuota").loadImager('removeLoadImage');
        $("#loadingImage_yearlyQuota").loadImager('appendImage');

        document.getElementById("txt-QuotaYear-limit").value = data.value;

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
        $("#loadingImage_yearlyQuota").loadImager('removeLoadImage');
        return false;
    }

/**
* Active Passive Yearly Quota Form
* @author Ceydacan Seyrek
* @since 16/10/2018
*/
    window.activepasiveQuotaYear = function (quotaYear_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syssisquotasmatrix&id=29&pk=GsZVzEYe50uGgNM
        var ajax_activepasiveTrInfolist = $('#ajaxACL-QuotaYear').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loadingImage_DdslickQuotaYearGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_syssisquotasmatrix)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_syssisquotasmatrix)"),
            proxy: '/Sys/SysActivePassiveYearlyQuota',
            type: "POST",
            data: JSON.stringify({
                id: quotaYear_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syssisquotasmatrix"
            }),

        });
        ajax_activepasiveTrInfolist.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_QuotaYear").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveTrInfolist.ajaxCallWidget('call');
    }

});

