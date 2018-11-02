$(document).ready(function () {

    var ajaxTest = $('#salesman-target-table').ajaxCallWidget({
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
            url: "pkSalesmanTargetsDashboard_dashboard"
        })
    });

    ajaxTest.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datatarget) {
            var data = $.parseJSON(datatarget);

            $.each(data.items, function (index, value) {

                $('#or-mon-actual').html(value.orderintake_ac_actual);
                $('#or-mon-target').html(value.orderintake_ac_target);
                $('#or-yr-actual').html(value.orderintake_ytd_actual);
                $('#or-yr-target').html(value.orderintake_ytd_target);
                $('#sl-mon-actual').html(value.sales_ac_actual);
                $('#sl-mon-target').html(value.sales_ac_target);
                $('#sl-yr-actual').html(value.sales_ytd_actual);
                $('#sl-yr-target').html(value.sales_ytd_target);
            });
            //$('#loading-image-wrName').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            // $('#loading-image-wrName').loadImager('removeLoadImage');
        }
    });

    ajaxTest.ajaxCallWidget('call');


    var ajaxTest = $('.salesman-activites').ajaxCallWidget({
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
            url: "pkSalesmanActivitiesDashboard_dashboard"
        })
    });

    ajaxTest.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datatarget) {
            var data = $.parseJSON(datatarget);

            $('#salesman-activites-planned h3').html(data.items[0].planned_activity);
            $('#salesman-activites-completed h3').html(data.items[0].completed_activity);
            //$('#loading-image-wrName').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            // $('#loading-image-wrName').loadImager('removeLoadImage');
        }
    });

    ajaxTest.ajaxCallWidget('call');


    /* devexgrid */

    var dailyactivity = new DevExpress.data.CustomStore({
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
                    url: "pkSalesmanActivationsDashboard_dashboard",
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

    $("#gridContainer_dailyactivity").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        showBorders: true,

        dataSource: dailyactivity,

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
            caption: "Customer",
            dataField: "customer_name"
        }, {
            caption: "Date + Time",
            dataField: "act_date"
        }, {
            caption: "Activity Type",
            dataField: "activation_type_name"
        }
        ],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillSegmentForm(data);
            }
        }
    });


    /* devexgrid */

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
                    url: "pkSalesmanAnnouncementsDashboard_dashboard",
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
});