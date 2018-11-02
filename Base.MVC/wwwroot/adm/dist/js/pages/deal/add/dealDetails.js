$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------
    
    //----------------------------------loadImager end-------------------------------------------------

    
    window.openDetails = function (data) {
        var rowData = data;
        var dataID = $("#deal_hidden").deal("getDealID");
        
        if ($("#row_hidden").css('display') == 'none') {
            /*alert('hidden');
            alert(dataID);*/
            hidden_block1_controller = 2;
            $("#row_hidden").animate({ height: 'toggle' }, 1000);
            $("#row_hidden_title").html(window.lang.translate('Deal summ.'));

        } else {
            /*alert('not hidden');
            alert(dataID);*/
            $("#row_hidden").css('display', 'none');
            $("#row_hidden").animate({ height: 'toggle' }, 1000);
            //$("#gridContainer_det1").dxDataGrid('instance').refresh();


            $("#gridContainer_det1").dxDataGrid("dispose");
            //$("#gridContainer_det1").remove();
            var deals_grid_datasource = new DevExpress.data.CustomStore({
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
                        url: '/DefaultPost/DefaultGridPostModel',
                        dataType: "json",
                        data: JSON.stringify({
                            language_code: $("#langCode").val(),
                            pk: "GsZVzEYe50uGgNM",
                            url: "pkFillDealDetail1Gridx_infoproject",
                            pkIdentity: $("#publicKey").val(),
                            project_id: parseInt(dataID),
                            page: "",
                            rows: "",
                            sort: "",
                            order: "",
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
                }
            });
            DevExpress.localization.locale($("#langCode").val());
            $("#gridContainer_det1").dxDataGrid({
                showColumnLines: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                dataSource: deals_grid_datasource,
                columnHidingEnabled: true,
                
                "export": {
                    enabled: true,
                    fileName: "DealDetails"
                },
                grouping: {
                    contextMenuEnabled: true,
                    expandMode: "rowClick"
                },
                groupPanel: {
                    emptyPanelText: window.lang.translate("Use the context menu of header columns to group data"),
                    visible: true
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto"
                },
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: window.lang.translate("Search")
                },
                headerFilter: {
                    visible: true
                },
                columnChooser: {
                    enabled: true,
                    mode: "select"
                },
                onRowClick: function (selectedItems) {
                },
                selection: {
                    mode: "single"
                },
                columns: [
                    {
                        caption: "",
                        dataField: "name"
                    },
                    {
                        caption: "",
                        dataField: "detail"
                    },

                ],
                customizeColumns: function (columns) {
                    //columns[5].format = { type: "currency", currency: "EUR" };
                },
                summary: {
                    totalItems: [{
                        column: "OrderNumber",
                        summaryType: "count"
                    }, ]
                }

            });


            $("#gridContainer_det2").dxDataGrid("dispose");
            var deals_grid_datasource = new DevExpress.data.CustomStore({
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
                        url: '/DefaultPost/DefaultGridPostModel',
                        dataType: "json",
                        data: JSON.stringify({
                            language_code: $("#langCode").val(),
                            pk: "GsZVzEYe50uGgNM",
                            url: "pkFillDealDetail2Gridx_infoproject",
                            pkIdentity: $("#publicKey").val(),
                            project_id: parseInt(dataID),
                            page: "",
                            rows: "",
                            sort: "",
                            order: "",
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
                }
            });
            DevExpress.localization.locale($("#langCode").val());
            $("#gridContainer_det2").dxDataGrid({
                showColumnLines: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                dataSource: deals_grid_datasource,
                columnHidingEnabled: true,

                "export": {
                    enabled: true,
                    fileName: "DealDetails"
                },
                grouping: {
                    contextMenuEnabled: true,
                    expandMode: "rowClick"
                },
                groupPanel: {
                    emptyPanelText: window.lang.translate("Use the context menu of header columns to group data"),
                    visible: true
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto"
                },
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: window.lang.translate("Search")
                },
                headerFilter: {
                    visible: true
                },
                columnChooser: {
                    enabled: true,
                    mode: "select"
                },
                onRowClick: function (selectedItems) {
                },
                selection: {
                    mode: "single"
                },
                columns: [
                    {
                        caption: "",
                        dataField: "name"
                    },
                    {
                        caption: "",
                        dataField: "detail"
                    },

                ],
                customizeColumns: function (columns) {
                    //columns[5].format = { type: "currency", currency: "EUR" };
                },
                summary: {
                    totalItems: [{
                        column: "OrderNumber",
                        summaryType: "count"
                    },]
                }

            });

            $("#gridContainer_det3").dxDataGrid("dispose");
            var deals_grid_datasource = new DevExpress.data.CustomStore({
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
                        url: '/DefaultPost/DefaultGridPostModel',
                        dataType: "json",
                        data: JSON.stringify({
                            language_code: $("#langCode").val(),
                            pk: "GsZVzEYe50uGgNM",
                            url: "pkFillDealDetail3Gridx_infoproject",
                            pkIdentity: $("#publicKey").val(),
                            project_id: parseInt(dataID),
                            page: "",
                            rows: "",
                            sort: "",
                            order: "",
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
                }
            });
            DevExpress.localization.locale($("#langCode").val());
            $("#gridContainer_det3").dxDataGrid({
                showColumnLines: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                dataSource: deals_grid_datasource,
                columnHidingEnabled: true,

                "export": {
                    enabled: true,
                    fileName: "DealDetails"
                },
                grouping: {
                    contextMenuEnabled: true,
                    expandMode: "rowClick"
                },
                groupPanel: {
                    emptyPanelText: window.lang.translate("Use the context menu of header columns to group data"),
                    visible: true
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto"
                },
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: window.lang.translate("Search")
                },
                headerFilter: {
                    visible: true
                },
                columnChooser: {
                    enabled: true,
                    mode: "select"
                },
                onRowClick: function (selectedItems) {
                },
                selection: {
                    mode: "single"
                },
                columns: [
                    {
                        caption: "",
                        dataField: "name"
                    },
                    {
                        caption: "",
                        dataField: "detail"
                    },

                ],
                customizeColumns: function (columns) {
                    //columns[5].format = { type: "currency", currency: "EUR" };
                },
                summary: {
                    totalItems: [{
                        column: "OrderNumber",
                        summaryType: "count"
                    },]
                }

            });

            $("#gridContainer_det4").dxDataGrid("dispose");
            var deals_grid_datasource = new DevExpress.data.CustomStore({
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
                        url: '/DefaultPost/DefaultGridPostModel',
                        dataType: "json",
                        data: JSON.stringify({
                            language_code: $("#langCode").val(),
                            pk: "GsZVzEYe50uGgNM",
                            url: "pkFillDealDetail4Gridx_infoproject",
                            pkIdentity: $("#publicKey").val(),
                            project_id: parseInt(dataID),
                            page: "",
                            rows: "",
                            sort: "",
                            order: "",
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
                }
            });
            DevExpress.localization.locale($("#langCode").val());
            $("#gridContainer_det4").dxDataGrid({
                showColumnLines: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                dataSource: deals_grid_datasource,
                columnHidingEnabled: true,

                "export": {
                    enabled: true,
                    fileName: "DealDetails"
                },
                grouping: {
                    contextMenuEnabled: true,
                    expandMode: "rowClick"
                },
                groupPanel: {
                    emptyPanelText: window.lang.translate("Use the context menu of header columns to group data"),
                    visible: true
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto"
                },
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: window.lang.translate("Search")
                },
                headerFilter: {
                    visible: true
                },
                columnChooser: {
                    enabled: true,
                    mode: "select"
                },
                onRowClick: function (selectedItems) {
                },
                selection: {
                    mode: "single"
                },
                columns: [
                    {
                        caption: "",
                        dataField: "name"
                    },
                    {
                        caption: "",
                        dataField: "detail"
                    },

                ],
                customizeColumns: function (columns) {
                    //columns[5].format = { type: "currency", currency: "EUR" };
                },
                summary: {
                    totalItems: [{
                        column: "OrderNumber",
                        summaryType: "count"
                    },]
                }

            });

            $("#gridContainer_det5").dxDataGrid("dispose");
            var deals_grid_datasource = new DevExpress.data.CustomStore({
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
                        url: '/DefaultPost/DefaultGridPostModel',
                        dataType: "json",
                        data: JSON.stringify({
                            language_code: $("#langCode").val(),
                            pk: "GsZVzEYe50uGgNM",
                            url: "pkFillDealDetail5Gridx_infoproject",
                            pkIdentity: $("#publicKey").val(),
                            project_id: parseInt(dataID),
                            page: "",
                            rows: "",
                            sort: "",
                            order: "",
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
                }
            });
            DevExpress.localization.locale($("#langCode").val());
            $("#gridContainer_det5").dxDataGrid({
                showColumnLines: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                dataSource: deals_grid_datasource,
                columnHidingEnabled: true,

                "export": {
                    enabled: true,
                    fileName: "DealDetails"
                },
                grouping: {
                    contextMenuEnabled: true,
                    expandMode: "rowClick"
                },
                groupPanel: {
                    emptyPanelText: window.lang.translate("Use the context menu of header columns to group data"),
                    visible: true
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto"
                },
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: window.lang.translate("Search")
                },
                headerFilter: {
                    visible: true
                },
                columnChooser: {
                    enabled: true,
                    mode: "select"
                },
                onRowClick: function (selectedItems) {
                },
                selection: {
                    mode: "single"
                },
                columns: [
                    {
                        caption: "",
                        dataField: "name"
                    },
                    {
                        caption: "",
                        dataField: "detail"
                    },

                ],
                customizeColumns: function (columns) {
                    //columns[5].format = { type: "currency", currency: "EUR" };
                },
                summary: {
                    totalItems: [{
                        column: "OrderNumber",
                        summaryType: "count"
                    },]
                }

            });


        }

    }

});