$(document).ready(function () {

    

    

    /* 
     * deal grid data source
     * @author Mustafa Zeynel dağlı
     * @since 09/10/2018
     * */
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
                url: '/Deal/GetDealListProxyService',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillProjectGridx_infoproject",
                    pkIdentity: $("#publicKey").val(),
                    //project_id: dealID,
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

     /* 
     * deal grid 
     * @author Mustafa Zeynel dağlı
     * @since 09/10/2018
     * */
    DevExpress.localization.locale($("#langCode").val());
    $("#gridContainer_vehicle").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        showBorders: true,
        //dataSource: dealGridDataSource,
        dataSource: deals_grid_datasource,
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
            fileName: "Deals"
        },
        grouping: {
            contextMenuEnabled: true,
            expandMode: "rowClick"
        },
        groupPanel: {
            emptyPanelText: window.lang.translate("Use the context menu of header columns to group data"),
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
            placeholder: window.lang.translate("Search")
        },
        headerFilter: {
            visible: true
        },
        columnChooser: {
            enabled: true,
            mode: "select"
        },
        columns: [
        {
        caption: "Deal name",
        dataField: "deal_name"
        },
        {
            caption: "Customer",
            dataField: "registration_name"
        },
        /*{
            allowGrouping: false,
            dataField: "discount_rate",
            caption: "Discount rate",
            width: 130
        },*/
        {
            dataField: "state_active",
            caption: "Active / Passive",
        },
        {
            dataField: "date_saved",
            dataType: "date",
            caption: "Date",
        }, {
            dataField: "reliability_name",
            caption: "Reliability",
            }
        ],
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

    window.getSelectedDDslickValueOrDefaultVal = function (id) {
        var customerType;
        var ddDataCustomerType = $('#' + id + '').data("ddslick")
        if (ddDataCustomerType) {
            if (ddDataCustomerType.selectedData.value < 0) {
                customerType = 0;
            } else {
                customerType = ddDataCustomerType.selectedData.value;
            }
        } else {
            customerType = 0;
        }
        return customerType;
    }


    var getSelectedCustomerType = function(id) {
        var customerType;
        var ddDataCustomerType = $('#'+id+'').data("ddslick")
        if (ddDataCustomerType) {
            if (ddDataCustomerType.selectedData.value < 0) {
                customerType = 0;
            } else {
                customerType = ddDataCustomerType.selectedData.value;
            }
        } else {
            customerType = 0;
        }
        return customerType;
    }
    var getSelectedTerrainType = function (id) {
        var terrainType;
        var ddDataTerrainType = $('#'+id+'').data("ddslick")
        if (ddDataTerrainType) {
            if (ddDataTerrainType.selectedData.value < 0) {
                terrainType = 0;
            } else {
                terrainType = ddDataTerrainType.selectedData.value;
            }
        } else {
            terrainType = 0;
        }
        return terrainType;
    }
    var getSelectedRepMainType = function (id) {
        var repmainType;
        var ddDataRepMainType = $('#'+id+'').data("ddslick")
        if (ddDataRepMainType) {
            if (ddDataRepMainType.selectedData.value < 0) {
                repmainType = 0;
            } else {
                repmainType = ddDataRepMainType.selectedData.value;
            }
        } else {
            repmainType = 0;
        }
        return repmainType;
    }
    var getSelectedHydraType = function (id) {
        var hydraType;
        var ddDataHydraType = $('#'+id+'').data("ddslick")
        if (ddDataHydraType) {
            if (ddDataHydraType.selectedData.value < 0) {
                hydraType = 0;
            } else {
                hydraType = ddDataHydraType.selectedData.value;
            }
        } else {
            hydraType = 0;
        }
        return hydraType;
    }


});