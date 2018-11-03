$(document).ready(function () {
    var ajaxTest = $('.keyaccount-channel-head-targets').ajaxCallWidget({
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
            url: "pkKacTargetsDashboard_dashboard"
        })
    });

    ajaxTest.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datatarget) {
            var data = $.parseJSON(datatarget);
            $.each(data.items, function (index, value) {

                template = '<div class="row" >' +
                        '<table class="table table-striped" id = "keyaccountchannelhead-target-table" > ' +
                            '<thead> ' +
                                '<tr>' +
                                    '<th scope="col" rowspan="2">Key Account Name</th>' +
                                    '<th class="text-center" scope = "col" colspan = "2"> Actual</th> ' +
                                    '<th class="text-center" scope = "col" colspan = "2"> YTD</th> ' +
                                '</tr> ' +
                                '<tr> ' +
                                    '<th class="text-center" scope = "col" > Actual</th> ' +
                                    '<th class="text-center" scope = "col" > Target</th> ' +
                                    '<th class="text-center" scope = "col" > Actual</th> ' +
                                    '<th class="text-center" scope = "col" > Target</th> ' +
                                '</tr> ' +
                            '</thead> ' +
                            '<tbody> ' +
                                '<tr>' +
                                    '<th scope="row">Order In Take</th>' +
                                        '<td class="text-center" id = "or-mon-actual" >' + value.orderintake_ac_actual + '</td> ' +
                                        '<td class="text-center" id = "or-mon-target" >' + value.orderintake_ac_target + '</td> ' +
                                        '<td class="text-center" id = "or-yr-actual" >' + value.orderintake_ytd_actual + '</td> ' +
                                        '<td class="text-center" id = "or-yr-target" >' + value.orderintake_ytd_target + '</td> ' +
                                    '</tr> ' +
                                '<tr> ' +
                                    '<th scope = "row" > Sales</th > ' +
                                    '<td class="text-center" id = "sl-mon-actual" >' + value.sales_ac_actual + '</td> ' +
                                    '<td class="text-center" id = "sl-mon-target" >' + value.sales_ac_target + '</td> ' +
                                    '<td class="text-center" id = "sl-yr-actual" >' + value.sales_ytd_actual + '</td> ' +
                                    '<td class="text-center" id = "sl-yr-target" >' + value.sales_ytd_target + '</td> ' +
                                '</tr> ' +
                            '</tbody>' +
                        '</table>' +
                    '</div>';
                $('.keyaccount-channel-head-targets').append(template);
            });
            //$('#loading-image-wrName').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            // $('#loading-image-wrName').loadImager('removeLoadImage');
        }
    });

    ajaxTest.ajaxCallWidget('call');

    var activity = new DevExpress.data.CustomStore({
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
                    url: "pkKacActivitiesDashboard_dashboard",
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

    $("#gridContainer_activities").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        showBorders: true,

        dataSource: activity,

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
            caption: "Name",
            dataField: "name"
        }, {
            caption: "Planned Activity",
                dataField: "planned_activity"
        }, {
            caption: "Completed Activity",
            dataField: "completed_activity"
        }
        ],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillSegmentForm(data);
            }
        }
    });

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
                    url: "pkKacActivationsDashboard_dashboard",
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
                    url: "pkKacStockDashboard_dashboard",
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
                    url: "pkKacAnnouncementsDashboard_dashboard",
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