/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/
"use strict";

$(function () {

    /* devexgrid */
    var orders = new DevExpress.data.CustomStore({
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
                url: "https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems",
                dataType: "json",
                data: args,
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

    DevExpress.localization.locale("de");

    alert('test');
    alert("x");

    $("#gridContainer").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        rowAlternationEnabled: true,

        showBorders: true,

        dataSource: orders,

        columnHidingEnabled: true,

        editing: {
            //mode: "batch"
            mode: "row",
            //allowAdding: true,
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
            placeholder: "Search..."
        },

        headerFilter: {
            visible: true
        },

        columnChooser: {
            enabled: true,
            mode: "select"
        },

        columns: [{
            allowGrouping: false,
            dataField: "OrderNumber",
            caption: "Invoice Number",
            width: 130
        }, {
            caption: "City",
            dataField: "StoreCity"
        }, {
            caption: "State",
            dataField: "StoreState"
        },
            "Employee", {
            dataField: "OrderDate",
            dataType: "date"
        }, {
            dataField: "SaleAmount", 
                
         }],

        customizeColumns: function (columns) {
            columns[5].format = { type: "currency", currency: "EUR" };
        },

        summary: {
            totalItems: [{
                column: "OrderNumber",
                summaryType: "count"
            }, {
                column: "SaleAmount",
                summaryType: "sum",
                valueFormat: "currency"
            }]
        }

    });


    $("#gridContainer_tab").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        rowAlternationEnabled: true,

        showBorders: true,

        dataSource: orders,

        columnHidingEnabled: true,

        editing: {
            //mode: "batch"
            mode: "row",
            //allowAdding: true,
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
            placeholder: "Search..."
        },

        headerFilter: {
            visible: true
        },

        columnChooser: {
            enabled: true,
            mode: "select"
        },

        columns: [{
            allowGrouping: false,
            dataField: "OrderNumber",
            caption: "Invoice Number",
            width: 130
        }, {
            caption: "City",
            dataField: "StoreCity"
        }, {
            caption: "State",
            dataField: "StoreState"
        },
            "Employee", {
            dataField: "OrderDate",
            dataType: "date"
        }, {
            dataField: "SaleAmount",
            format: "currency"

        }],

        customizeColumns: function (columns) {
            columns[5].format = { type: "currency", currency: "EUR" };
        },

        summary: {
            totalItems: [{
                column: "OrderNumber",
                summaryType: "count"
            }, {
                column: "SaleAmount",
                summaryType: "sum",
                valueFormat: "currency"
            }]
        }

    });


    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
        if (target == "#tab_2-2") {
            // grid refresh olmasý gerektiði için kullanýldý.
            $(gridContainer_tab).dxDataGrid("updateDimensions");
        }
    });

});

