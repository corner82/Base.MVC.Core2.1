/*
* VehicleOrderTracking Form
* @author Ceydacan Seyrek
* @since 26/10/2018
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

    /*
    * VehicleOrderTracking LoadImager
    * @author Ceydacan Seyrek
    * @since 26/10/2018
    */
    //to VehicleOrderTracking form
    $("#loadingImage_VehicleOrderTracking").loadImager();

    //to VehicleOrderTracking form grid loading-image
    $("#loadingImage_DdslickVehicleOrderTrackingGrid").loadImager();


    var langCode = $("#langCode").val();
    //var QuotaMonthID;
    //alert(langCode);

    $('#VehicleOrderTrackingForm').validationEngine();

    /* devexgrid */
    DevExpress.localization.locale(langCode);

// VehicleOrderTracking Grid
    $('#VehicleOrderTrackingRefresh').click(function () {
        $("#gridContainer_VehicleOrderTracking").dxDataGrid("instance").refresh();
    });

    //VehicleOrderTracking Grid
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillSisMonthlyQuotasGridx_syssismonthlyquotas&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var VehicleOrderTracking = new DevExpress.data.CustomStore({
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
    });
    //VehicleOrderTracking  Grid
    $("#gridContainer_VehicleOrderTracking").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: VehicleOrderTracking,
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
            fileName: "stockSm"
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
            caption: window.lang.translate('Order no') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Short chassis no') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Freeze date') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Fx Rate') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Net CKD Price') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Plan date') + "...",
            dataField: "quantity",
            dataType: "date",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Actual date') + "...",
            dataField: "quantity",
            dataType: "date",
            encodeHtml: false
        }, {
            caption: window.lang.translate('ShipBooked') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Expected arrival') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Online date') + "...",
            dataField: "quantity",
            dataType: "date",
            encodeHtml: false           
        }, {
            caption: window.lang.translate('Offline date') + "...",
            dataField: "quantity",
            dataType: "date",
            encodeHtml: false
        }, {
            caption: window.lang.translate('CBU date') + "...",
            dataField: "quantity",
            dataType: "date",
            encodeHtml: false
        }, {
            caption: window.lang.translate('EngineType') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('GearboxType') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('FrontTyreMake') + "...",
            dataField: "quantity",
            encodeHtml: false
        }, {
            caption: window.lang.translate('WIP') + "...",
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
    });


// Stock Grid End


});

