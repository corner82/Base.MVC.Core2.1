$(document).ready(function () {
    var ajaxTest = $('#key-account-table').ajaxCallWidget({
        failureLoadImage: true,
        //loadingImageID: "loading-image-wrName",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error(pkHosTargetsKADashboard_dashboard)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data(pkHosTargetsKADashboard_dashboard)"),
        proxy: '/Dashboard/AsmData',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkHosTargetsKADashboard_dashboard"
        })
    });

    ajaxTest.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datatarget) {
            var data = $.parseJSON(datatarget);

            $.each(data.items, function (index, value) {

                $('#key-account-table #or-mon-actual').html(value.orderintake_ac_actual);
                $('#key-account-table #or-mon-target').html(value.orderintake_ac_target);
                $('#key-account-table #or-yr-actual').html(value.orderintake_ytd_actual);
                $('#key-account-table #or-yr-target').html(value.orderintake_ytd_target);
                $('#key-account-table #sl-mon-actual').html(value.sales_ac_actual);
                $('#key-account-table #sl-mon-target').html(value.sales_ac_target);
                $('#key-account-table #sl-yr-actual').html(value.sales_ytd_actual);
                $('#key-account-table #sl-yr-target').html(value.sales_ytd_target);
            });
            //$('#loading-image-wrName').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            // $('#loading-image-wrName').loadImager('removeLoadImage');
        }
    });

    ajaxTest.ajaxCallWidget('call');

    var ajaxTest = $('#pcd-table').ajaxCallWidget({
        failureLoadImage: true,
        //loadingImageID: "loading-image-wrName",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error(pkHosTargetsPCDDashboard_dashboard)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data(pkHosTargetsPCDDashboard_dashboard)"),
        proxy: '/Dashboard/AsmData',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkHosTargetsPCDDashboard_dashboard"
        })
    });

    ajaxTest.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datatarget) {
            var data = $.parseJSON(datatarget);

            $.each(data.items, function (index, value) {

                $('#pcd-table #or-mon-actual').html(value.orderintake_ac_actual);
                $('#pcd-table #or-mon-target').html(value.orderintake_ac_target);
                $('#pcd-table #or-yr-actual').html(value.orderintake_ytd_actual);
                $('#pcd-table #or-yr-target').html(value.orderintake_ytd_target);
                $('#pcd-table #sl-mon-actual').html(value.sales_ac_actual);
                $('#pcd-table #sl-mon-target').html(value.sales_ac_target);
                $('#pcd-table #sl-yr-actual').html(value.sales_ytd_actual);
                $('#pcd-table #sl-yr-target').html(value.sales_ytd_target);
            });
            //$('#loading-image-wrName').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            // $('#loading-image-wrName').loadImager('removeLoadImage');
        }
    });

    ajaxTest.ajaxCallWidget('call');

    var ajaxTest = $('#retail-table').ajaxCallWidget({
        failureLoadImage: true,
        //loadingImageID: "loading-image-wrName",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Dashboard/AsmData',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkHosTargetsREDashboard_dashboard"
        })
    });

    ajaxTest.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datatarget) {
            var data = $.parseJSON(datatarget);

            $.each(data.items, function (index, value) {

                $('#retail-table #or-mon-actual').html(value.orderintake_ac_actual);
                $('#retail-table #or-mon-target').html(value.orderintake_ac_target);
                $('#retail-table #or-yr-actual').html(value.orderintake_ytd_actual);
                $('#retail-table #or-yr-target').html(value.orderintake_ytd_target);
                $('#retail-table #sl-mon-actual').html(value.sales_ac_actual);
                $('#retail-table #sl-mon-target').html(value.sales_ac_target);
                $('#retail-table #sl-yr-actual').html(value.sales_ytd_actual);
                $('#retail-table #sl-yr-target').html(value.sales_ytd_target);
            });
            //$('#loading-image-wrName').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            // $('#loading-image-wrName').loadImager('removeLoadImage');
        }
    });

    ajaxTest.ajaxCallWidget('call');

    var ajaxTest = $('.bo-activites').ajaxCallWidget({
        failureLoadImage: true,
        //loadingImageID: "loading-image-wrName",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Dashboard/AsmData',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkHosActivitiesDashboard_dashboard"
        })
    });

    ajaxTest.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datatarget) {
            var data = $.parseJSON(datatarget);

            $('#bo-activites-planned h3').html(data.items[0].planned_activity);
            $('#bo-activites-completed h3').html(data.items[0].completed_activity);
            //$('#loading-image-wrName').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            // $('#loading-image-wrName').loadImager('removeLoadImage');
        }
    });

    ajaxTest.ajaxCallWidget('call');

    var announcements = new DevExpress.data.CustomStore({
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
                url: "/Dashboard/AsmDataGridList",
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkHosAnnouncementsDashboard_dashboard",
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
                timeout: 5000
            });

            return deferred.promise();
        }
    });

    $("#gridContainer_announcements").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        showBorders: true,

        dataSource: announcements,

        columnHidingEnabled: true,

        selection: {
            mode: "single"
        },

        hoverStateEnabled: true,

        editing: {
            //mode: "batch"
            mode: "form",
            allowAdding: false,
            allowUpdating: false,
            allowDeleting: false,
            useIcons: false
        },

        "export": {
            enabled: true,
            fileName: "Orders"
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
            caption: "Date",
            dataField: "announcement_date"
        }, {
            caption: "Description",
            dataField: "announcement_description"
        }, {
            caption: "Link",
            dataField: "announcement_link"
        }
        ],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillSegmentForm(data);
            }
        }
    });

    var stock = new DevExpress.data.CustomStore({
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
                url: "/Dashboard/AsmDataGridList",
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkHosStockDashboard_dashboard",
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
                timeout: 5000
            });

            return deferred.promise();
        }
    });

    $("#gridContainer_stock").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        showBorders: true,

        dataSource: stock,

        columnHidingEnabled: true,

        selection: {
            mode: "single"
        },

        hoverStateEnabled: true,

        editing: {
            //mode: "batch"
            mode: "form",
            allowAdding: false,
            allowUpdating: false,
            allowDeleting: false,
            useIcons: false
        },

        "export": {
            enabled: true,
            fileName: "Orders"
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
            caption: "Model Name",
            dataField: "model_name"
        }, {
            caption: "Pipeline",
            dataField: "in_pipeline"
        }, {
            caption: "In Stock",
            dataField: "in_stock"
        }
        ],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillSegmentForm(data);
            }
        }
    });
});