$(document).ready(function () {

    //buyBack tab form elements begin

    // buyback list grid
    var buyBackGridDataSource = {
        store: {
            type: 'array',
            data: [{ "OrderNumber": "R35703", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/12" },
            { "OrderNumber": "R35706", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/14" },
            { "OrderNumber": "R35709", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/18" },
            { "OrderNumber": "R35711", "Customer": "R35703", "Salesman": "R35709", "Employee": "Jim Packard", "OrderDate": "2013/11/22" },
            { "OrderNumber": "R35714", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/30" },
            { "OrderNumber": "R35789", "Customer": "R35703", "Salesman": "R35709", "Employee": "Clark Morgan", "OrderDate": "2013/12/01" },
            { "OrderNumber": "R35983", "Customer": "R35703", "Salesman": "R35709", "Employee": "Todd Hoffman", "OrderDate": "2013/12/03" },
            { "OrderNumber": "R36488", "Customer": "R35703", "Salesman": "R35709", "Employee": "Todd Hoffman", "OrderDate": "2013/12/05" },
            { "OrderNumber": "R36987", "Customer": "R35703", "Salesman": "R35709", "Employee": "Clark Morgan", "OrderDate": "2013/12/07" },
            { "OrderNumber": "R37642", "Customer": "R35703", "Salesman": "R35709", "Employee": "Clark Morgan", "OrderDate": "2013/12/08" },
            { "OrderNumber": "R38466", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/12/10" },
            { "OrderNumber": "R38775", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/12/15" }]
        }
    };
    //DevExpress.localization.locale("en");
    //alert($('#langCode').val());
    //alert(window.lang.translate("Search"));
    DevExpress.localization.locale($('#langCode').val());
    $("#gridContainer_BuyBack").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        showBorders: true,
        // dataSource: orders,
        dataSource: buyBackGridDataSource,
        columnHidingEnabled: false,
        editing: {
            //mode: "batch"
            mode: "row",
            //allowAdding: false,
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
            //placeholder: "Search..."
            placeholder: window.lang.translate("Search")
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
            caption: "32 Mon.",
            //width: 130
        },
        {
            caption: "36 Mon.",
            dataField: "Customer"
        },
        {
            caption: "42 Mon.",
            dataField: "Salesman"
        }
        ],
        customizeColumns: function (columns) {
            //columns[5].format = { type: "currency", currency: "EUR" };
        },


    });

    //buyBack tab form elements end

    //tradeBack tab form elements begin

    // tradeback list grid
    var tradeBackGridDataSource = {
        store: {
            type: 'array',
            data: [{ "OrderNumber": "R35703", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/12" },
            { "OrderNumber": "R35706", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/14" },
            { "OrderNumber": "R35709", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/18" },
            { "OrderNumber": "R35711", "Customer": "R35703", "Salesman": "R35709", "Employee": "Jim Packard", "OrderDate": "2013/11/22" },
            { "OrderNumber": "R35714", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/30" },
            { "OrderNumber": "R35789", "Customer": "R35703", "Salesman": "R35709", "Employee": "Clark Morgan", "OrderDate": "2013/12/01" },
            { "OrderNumber": "R35983", "Customer": "R35703", "Salesman": "R35709", "Employee": "Todd Hoffman", "OrderDate": "2013/12/03" },
            { "OrderNumber": "R36488", "Customer": "R35703", "Salesman": "R35709", "Employee": "Todd Hoffman", "OrderDate": "2013/12/05" },
            { "OrderNumber": "R36987", "Customer": "R35703", "Salesman": "R35709", "Employee": "Clark Morgan", "OrderDate": "2013/12/07" },
            { "OrderNumber": "R37642", "Customer": "R35703", "Salesman": "R35709", "Employee": "Clark Morgan", "OrderDate": "2013/12/08" },
            { "OrderNumber": "R38466", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/12/10" },
            { "OrderNumber": "R38775", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/12/15" }]
        }
    };
    //DevExpress.localization.locale("en");
    $("#gridContainer_TradeBack").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        showBorders: true,
        // dataSource: orders,
        dataSource: tradeBackGridDataSource,
        columnHidingEnabled: false,
        editing: {
            //mode: "batch"
            mode: "row",
            //allowAdding: false,
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
            caption: "32 Mon.",
            //width: 130
        },
        {
            caption: "36 Mon.",
            dataField: "Customer"
        },
        {
            caption: "42 Mon.",
            dataField: "Salesman"
        }
        ],
        customizeColumns: function (columns) {
            //columns[5].format = { type: "currency", currency: "EUR" };
        },


    });

    //tradeBack tab form elements end

    /* devexgrid */
    /*var orders = new DevExpress.data.CustomStore({
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
    });*/

    // deal list grid
    var dealGridDataSource = {
        store: {
            type: 'array',
            data: [{ "OrderNumber": 35703, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Harv Mudd", "OrderDate": "2013/11/12" },
            { "OrderNumber": 35706, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Harv Mudd", "OrderDate": "2013/11/14" },
            { "OrderNumber": 35709, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Harv Mudd", "OrderDate": "2013/11/18" },
            { "OrderNumber": 35711, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Jim Packard", "OrderDate": "2013/11/22" },
            { "OrderNumber": 35714, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Harv Mudd", "OrderDate": "2013/11/30" },
            { "OrderNumber": 35789, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Clark Morgan", "OrderDate": "2013/12/01" },
            { "OrderNumber": 35983, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Todd Hoffman", "OrderDate": "2013/12/03" },
            { "OrderNumber": 36488, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Todd Hoffman", "OrderDate": "2013/12/05" },
            { "OrderNumber": 36987, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Clark Morgan", "OrderDate": "2013/12/07" },
            { "OrderNumber": 37642, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Clark Morgan", "OrderDate": "2013/12/08" },
            { "OrderNumber": 38466, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Harv Mudd", "OrderDate": "2013/12/10" },
            { "OrderNumber": 38775, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Harv Mudd", "OrderDate": "2013/12/15" }]
        }
    };
    //DevExpress.localization.locale("en");
    $("#gridContainer_vehicle").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        showBorders: true,
        // dataSource: orders,
        dataSource: dealGridDataSource,
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
            caption: "Salesman",
            dataField: "Salesman"
        },
            "Employee",
        {
            dataField: "OrderDate",
            dataType: "date"
        }, {
            dataField: "Customer",

        }],
        customizeColumns: function (columns) {
            //columns[5].format = { type: "currency", currency: "EUR" };
        },
        summary: {
            totalItems: [{
                column: "OrderNumber",
                summaryType: "count"
            }, /*{
                column: "SaleAmount",
                summaryType: "sum",
                valueFormat: "currency"
            }*/]
        }

    });


});