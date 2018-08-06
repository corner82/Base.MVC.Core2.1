$(document).ready(function () {

    "use strict";

    /*
    * jquery lang master created dynamically
    */
    $("#langCode").jsLangMaster();


    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });


    /*
    * Customer Info insert form validation engine attached to work
    * @since 02/08/2016
    */
    $('#customerInfoForm').validationEngine();
    $('#customerPurchaseForm').validationEngine();
 

    /* Geçici data */
    //Dropdown plugin data

    var cbdata = [
        {
            text: "Seçiniz...",
            value: 1,
            selected: true
        },
        {
            text: "South Africa",
            value: 2,
            selected: false
        },
        {
            text: "Turkey",
            value: 3,
            selected: false
        },
        {
            text: "Germany",
            value: 4,
            selected: false
        }
    ];

    $("#loading-image-country").loadImager();
    $("#loading-image-country").loadImager('appendImage');  

    var ajaxACLResources_country = $('#loading-image-country').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

     });

    ajaxACLResources_country.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-country').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCountry').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-country").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-country').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Ülke Bulunamamıştır...', 'Ülke  bulunamamıştır...');
        },
    })
    ajaxACLResources_country.ajaxCallWidget('call');

    $("#loading-image-city").loadImager();
    $("#loading-image-city").loadImager('appendImage');  

    var ajaxACLResources_city = $('#loading-image-city').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_city.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-city').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCity').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-city").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-city').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_city.ajaxCallWidget('call');


    $("#loading-image-reliabilityrate").loadImager();
    $("#loading-image-reliabilityrate").loadImager('appendImage');

    var ajaxACLResources_reliabilityRate = $('#loading-image-reliabilityrate').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_reliabilityRate.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-reliabilityrate').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownReliabilityRate').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-reliabilityrate").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-reliabilityrate').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_reliabilityRate.ajaxCallWidget('call');



    $("#loading-image-sector").loadImager();
    $("#loading-image-sector").loadImager('appendImage');

    var ajaxACLResources_sector = $('#loading-image-sector').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_sector.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-sector').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownSector').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-sector").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-sector').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_sector.ajaxCallWidget('call');


    $("#loading-image-segment").loadImager();
    $("#loading-image-segment").loadImager('appendImage');

    var ajaxACLResources_segment = $('#loading-image-segment').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_segment.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-segment').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownSegment').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-segment").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-segment').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_segment.ajaxCallWidget('call');

    $("#loading-image-customergroup").loadImager();
    $("#loading-image-customergroup").loadImager('appendImage');

    var ajaxACLResources_customergroup = $('#loading-image-customergroup').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_customergroup.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-customergroup').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCustomerGroup').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-customergroup").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-customergroup').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_customergroup.ajaxCallWidget('call');

    $("#loading-image-totalvehicles").loadImager();
    $("#loading-image-totalvehicles").loadImager('appendImage');

    var ajaxACLResources_totalvehicles = $('#loading-image-totalvehicles').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_totalvehicles.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-totalvehicles').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownTotalVehicles').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-totalvehicles").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-totalvehicles').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_totalvehicles.ajaxCallWidget('call');


    $("#loading-image-totalemployees").loadImager();
    $("#loading-image-totalemployees").loadImager('appendImage');

    var ajaxACLResources_totalemployees = $('#loading-image-totalemployees').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_totalemployees.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-totalemployees').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownTotalEmployees').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-totalemployees").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-totalemployees').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_totalemployees.ajaxCallWidget('call');


    $("#loading-image-annuelrevenue").loadImager();
    $("#loading-image-annuelrevenue").loadImager('appendImage');

    var ajaxACLResources_annuelrevenue = $('#loading-image-annuelrevenue').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_annuelrevenue.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-annuelrevenue').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownAnnuelRevenue').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-annuelrevenue").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-annuelrevenue').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_annuelrevenue.ajaxCallWidget('call');

    /* Purchase Plans loading services */


    $("#loading-image-lastpurchasedbrand").loadImager();
    $("#loading-image-lastpurchasedbrand").loadImager('appendImage');

    var ajaxACLResources_lastpurchasedbrand = $('#loading-image-lastpurchasedbrand').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_lastpurchasedbrand.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-lastpurchasedbrand').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownLastPurchaseBrand').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-lastpurchasedbrand").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-lastpurchasedbrand').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_lastpurchasedbrand.ajaxCallWidget('call');


    $("#loading-image-purchasedecision").loadImager();
    $("#loading-image-purchasedecision").loadImager('appendImage');

    var ajaxACLResources_purchasedecision = $('#loading-image-purchasedecision').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_purchasedecision.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-purchasedecision').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownPurchaseDecision').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-purchasedecision").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-purchasedecision').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_purchasedecision.ajaxCallWidget('call');


    $("#loading-image-dateofpurchaseplan").loadImager();
    $("#loading-image-dateofpurchaseplan").loadImager('appendImage');

    var ajaxACLResources_dateofpurchaseplan = $('#loading-image-dateofpurchaseplan').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_dateofpurchaseplan.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-dateofpurchaseplan').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownDateofPurchasePlan').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-dateofpurchaseplan").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-dateofpurchaseplan').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_dateofpurchaseplan.ajaxCallWidget('call');


    $("#loading-image-numberofvehiclestopurchase").loadImager();
    $("#loading-image-numberofvehiclestopurchase").loadImager('appendImage');

    var ajaxACLResources_numberofvehiclestopurchase = $('#loading-image-numberofvehiclestopurchase').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_numberofvehiclestopurchase.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-numberofvehiclestopurchase').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownNumberofVehiclestoP').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-numberofvehiclestopurchase").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-numberofvehiclestopurchase').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_numberofvehiclestopurchase.ajaxCallWidget('call');


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

    DevExpress.localization.locale("en");


    $("#gridContainer_customer").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        showBorders: true,

        dataSource: orders,

        columnHidingEnabled: true,

        selection: {
            mode: "single"
        },

        hoverStateEnabled: true,

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
        },

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {

                fillCustomerInfoForm(data);

                //alert("gridContainer_customer - onSelectionChanged :" + data);
                //$(".employeeNotes").text(data.Notes);
                //$(".employeePhoto").attr("src", data.Picture);
            }
        }

    });

    $("#gridContainer_contactaddress").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        rowAlternationEnabled: true,

        showBorders: true,

        dataSource: orders,

        columnHidingEnabled: true,
        editing: {
            mode: "form",
            allowUpdating: true,
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

    $("#gridContainer_contactphone").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        rowAlternationEnabled: true,

        showBorders: true,

        dataSource: orders,

        columnHidingEnabled: true,
        editing: {
            mode: "form",
            allowUpdating: true,
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


    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }

    //Contact Person dxDataGrid

    $("#gridContainer_contactperson").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        rowAlternationEnabled: true,

        showBorders: true,

        dataSource: orders,

        columnHidingEnabled: true,
        editing: {
            mode: "form",
            allowUpdating: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },

        "export": {
            enabled: true,
            fileName: "ContactPerson"
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
            caption: "First Name",
            dataField: "City",      
            validationRules: [{ type: "required" }],
            width: 130
        }, {
            caption: "Last Name",
            dataField: "StoreCity",
            validationRules: [{ type: "required" }]
        }, {
            caption: "GSM",
            dataField: "OrderNumber"    
        }, {
            caption: "Phone",
            dataField: "OrderNumber"
        }, {
            caption: "E-mail",
            dataField: "StoreState",
            validationRules: [{ type: "required" }, { type: "email" }]
        },{
            caption: "Birthday",
            dataField: "OrderDate",
            dataType: "date",
            validationRules: [{ type: "date" }]
        }, {
            dataField: "SaleAmount",
            format: "currency"
        }],

        onEditingStart: function (e) {
            alert("EditingStart - gridContainer_contactperson");
            logEvent("EditingStart");
        },
        onInitNewRow: function (e) {
            alert("InitNewRow - gridContainer_contactperson");
            logEvent("InitNewRow");
        },
        onRowInserting: function (e) {
            alert("RowInserting - gridContainer_contactperson");
            logEvent("RowInserting");
        },
        onRowInserted: function (e) {
            alert("RowInserted - gridContainer_contactperson");
            logEvent("RowInserted");
        },
        onRowUpdating: function (e) {
            alert("RowUpdating - gridContainer_contactperson");
            logEvent("RowUpdating");
        },
        onRowUpdated: function (e) {
            alert("RowUpdated - gridContainer_contactperson");
            logEvent("RowUpdated");
        },
        onRowRemoving: function (e) {
            alert("RowRemoving - gridContainer_contactperson");
            logEvent("RowRemoving");
        },
        onRowRemoved: function (e) {
            alert("RowRemoved - gridContainer_contactperson");
            logEvent("RowRemoved");
        }

    });


    //Seçili Müşteriye ait Aktiviteler Listelenir
    
    $("#gridContainer_activity").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        rowAlternationEnabled: true,

        showBorders: true,

        dataSource: orders,

        columnHidingEnabled: true,
        editing: {
            mode: "form",
            allowUpdating: true,
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
            dataField: "City",
            caption: "First Name",
            width: 130
        }, {
            caption: "Last Name",
            dataField: "StoreCity"
        }, {
            caption: "GSM",
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
        if (target == "#tab_1") {
            
           
            //alert("#tab_1");
        }
        if (target == "#tab_2") {
            // grid refresh olması gerektiği için kullanıldı.
            $(gridContainer_contactaddress).dxDataGrid("updateDimensions");
            $(gridContainer_contactphone).dxDataGrid("updateDimensions");
            //alert("#tab_2");
        }
        if (target == "#tab_3") {
            //Müşteri seçili ise
            //PurchasePlan görüntüle
            //alert("#tab_3");
        }
        if (target == "#tab_4") {
            // grid refresh olması gerektiği için kullanıldı.
            $(gridContainer_contactperson).dxDataGrid("updateDimensions");
            //alert("#tab_4");
        }
        if (target == "#tab_5") {
            // grid refresh olması gerektiği için kullanıldı.
            $(gridContainer_activity).dxDataGrid("updateDimensions");
            //alert("#tab_5");
        }
    });


    $('#registration-datepicker').datepicker({
        //autoclose: true,
        locale: 'en',
        format : 'yyyy/mm/dd'
    });

    $('#lastpurchase-datepicker').datepicker({
        //autoclose: true,
        locale: 'en',
        format: 'yyyy/mm/dd'
    });


    /**
    * insert CustomerInfo Wrapper
    * @returns {Boolean}
    * @since 02/08/2018
    */

    window.insertCustomerInfoWrapper = function (e) {
        e.preventDefault();
        
        if ($("#customerInfoForm").validationEngine('validate')) {

            insertCustomerInfo();
        }
        return false;
    }

    /**
    * insert CustomerInfo
    * @returns {undefined}
    * @since 02/08/2018
    */

    window.insertCustomerInfo = function () {

        var loaderInsertBlock = $("#loading-image-cstInfo").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        var cst_name = $('#txt-cst-name').val();

        var ddData_country = $('#dropdownCountry').data('ddslick')
        var country_id = ddData_country.selectedData.value;

        var ddData_city = $('#dropdownCity').data('ddslick')
        var city_id = ddData_city.selectedData.value;

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysCustomerInfo',
                name: cst_name,
                country_id: country_id,
                city_id: city_id,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Ekleme İşlemi Başarısız...',
                    'Müşteri Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#customerInfoForm')[0].reset();

                        loaderInsertBlock.loadImager('removeLoadImage');

                        var loaderInsertBlock = $("#loading-image-cstInfoGrid").loadImager();
                        loaderInsertBlock.loadImager('appendImage');

                        $('#gridContainer_customer').refresh();   //test edilecek!

                        loaderInsertBlock.loadImager('removeLoadImage');

                        /*
                         * devex grid refresh yapılacak
                         * 
                         * 
                        $('#gridContainer_customer').datagrid({
                            queryParams: {
                                pk: $('#pk').val(),
                                subject: 'datagrid',
                                url: 'pkFillPrivilegesList_sysAclPrivilege',
                                sort: 'id',
                                order: 'desc',
                            },
                        });
                        $('#tt_grid_dynamic').datagrid('enableFilter');
                        $('#tt_grid_dynamic').datagrid('reload');
                        */
                    }
                });
                sm.successMessage('show', 'Müşteri Kayıt İşlemi Başarılı...',
                    'Müşteri kayıt işlemini gerçekleştirdiniz... ',
                    data);
                loaderInsertBlock.loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kayıt İşlemi Başarısız...',
                    'Müşteri kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datası boştur!!');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kayıt İşlemi Başarısız...',
                    'Müşteri kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datası boştur!!');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerInfoForm')[0].reset();
                        loaderInsertBlock.loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'ACL Yetki Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri  kaydı yapılmıştır, yeni bir Müşteri kaydı deneyiniz... ');
                loaderInsertBlock.loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }


    /**
    * reset button function for Customer Info insert form
    * @returns null
    * @since 14/07/2016
    */
    window.resetCustomerInfoForm = function () {

        var loaderInsertBlock = $("#loading-image-cstInfo").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        $('#customerInfoForm').validationEngine('hide');
        
        $('#dropdownCountry').ddslick('select', { index: String(0) });
        $('#dropdownCity').ddslick('select', { index: String(0) });
        $('#dropdownSector').ddslick('select', { index: String(0) });
        $('#dropdownSegment').ddslick('select', { index: String(0) });
        $('#dropdownReliabilityRate').ddslick('select', { index: String(0) });
        $('#dropdownCustomerGroup').ddslick('select', { index: String(0) });
        $('#dropdownTotalVehicles').ddslick('select', { index: String(0) });
        $('#dropdownTotalEmployees').ddslick('select', { index: String(0) });
        $('#dropdownAnnuelRevenue').ddslick('select', { index: String(0) });
        
        loaderInsertBlock.loadImager('removeLoadImage');

        return false;
    }


    window.fillCustomerInfoForm = function (data) {
        //örnektir...
        var loaderInsertBlock = $("#loading-image-cstInfo").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        document.getElementById("txt-cst-name").value = data.Employee;
        document.getElementById("txt-cst-email").value = data.Employee;
        document.getElementById("txt-cst-website").value = data.Employee;
        document.getElementById("txt-cst-phone").value = data.Employee;
        document.getElementById("txt-cst-vatnumber").value = data.Employee;
        document.getElementById("txt-cst-regnumber").value = data.Employee;

        document.getElementById("registration-datepicker").value = Date();
        
        $('#dropdownCountry').ddslick('select', { index: 3 });
        $('#dropdownCity').ddslick('select', { index: 2 });
        $('#dropdownSector').ddslick('select', { index: 3 });
        $('#dropdownSegment').ddslick('select', { index: 2 });
        $('#dropdownReliabilityRate').ddslick('select', { index: 3 });
        $('#dropdownCustomerGroup').ddslick('select', { index: 2 });
        $('#dropdownTotalVehicles').ddslick('select', { index: 3 });
        $('#dropdownTotalEmployees').ddslick('select', { index: 2 });
        $('#dropdownAnnuelRevenue').ddslick('select', { index: 2 });
        
        //document.getElementById("dropdownCity").SelectedIndex = 2; //data.cityId;
        //document.getElementById("dropdownSector").value = data.sectorId;
        //document.getElementById("dropdownSegment").value = data.segmentId;
        
        loaderInsertBlock.loadImager('removeLoadImage');
        return false;
    }



    window.insertCustomerPurchaseWrapper = function (e) {
        e.preventDefault();

        if ($("#customerPurchaseForm").validationEngine('validate')) {

            insertCustomerPurchase();
        }
        return false;
    }
    /**
 * insert CustomerPurchase
 * @returns {undefined}
 * @since 06/08/2018
 */

    window.insertCustomerPurchase = function () {

        var loaderInsertBlock = $("#loading-image-cstPurchase").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        //Customer_id alınacak
        var cst_id = 1;
        var cst_lastpurchase = $('#lastpurchase-datepicker').val();
        var cst_purchaselastupdate = $('#txt-cst-purchaselastupdate').val();

        var ddData_lastPurchaseBrand = $('#dropdownLastPurchaseBrand').data('ddslick')
        var lastPurchaseBrand_id = ddData_lastPurchaseBrand.selectedData.value;

        var ddData_purchaseDecision = $('#dropdownPurchaseDecision').data('ddslick')
        var purchaseDecision_id = ddData_purchaseDecision.selectedData.value;

        var ddData_dateofPurchasePlan = $('#dropdownDateofPurchasePlan').data('ddslick')
        var dateofPurchasePlan_id = ddData_dateofPurchasePlan.selectedData.value;

        var ddData_numberofVehiclestoP = $('#dropdownNumberofVehiclestoP').data('ddslick')
        var numberofVehiclestoP_id = ddData_numberofVehiclestoP.selectedData.value;


        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysCustomerPurchase',
                cst_id: cst_id,
                cst_lastpurchase: cst_lastpurchase,
                cst_purchaselastupdate: cst_purchaselastupdate,
                lastPurchaseBrand_id: lastPurchaseBrand_id,
                purchaseDecision_id: purchaseDecision_id,
                dateofPurchasePlan_id: dateofPurchasePlan_id,
                numberofVehiclestoP_id: numberofVehiclestoP_id,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Yatırım Planı Ekleme İşlemi Başarısız...',
                    'Müşteri Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#customerPurchaseForm')[0].reset();

                        loaderInsertBlock.loadImager('removeLoadImage');
                        
                    }
                });
                sm.successMessage('show', 'Müşteri Yatırım Planı Kayıt İşlemi Başarılı...',
                    'Müşteri kayıt işlemini gerçekleştirdiniz... ',
                    data);
                loaderInsertBlock.loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Yatırım Planı Kayıt İşlemi Başarısız...',
                    'Müşteri Yatırım Planı kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerPurchase" servis datası boştur!!');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Yatırım Planı Kayıt İşlemi Başarısız...',
                    'Müşteri Yatırım Planı kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerPurchase" servis datası boştur!!');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerPurchaseForm')[0].reset();
                        loaderInsertBlock.loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri  kaydı yapılmıştır, yeni bir Müşteri kaydı deneyiniz... ');
                loaderInsertBlock.loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }

    window.resetCustomerPurchaseForm = function () {

        var loaderInsertBlock = $("#loading-image-cstPurchase").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        $('#customerPurchaseForm').validationEngine('hide');

        $('#dropdownLastPurchaseBrand').ddslick('select', { index: String(0) });
        $('#dropdownPurchaseDecision').ddslick('select', { index: String(0) });
        $('#dropdownDateofPurchasePlan').ddslick('select', { index: String(0) });
        $('#dropdownNumberofVehiclestoP').ddslick('select', { index: String(0) });
  
        loaderInsertBlock.loadImager('removeLoadImage');

        return false;
    }

    window.fillCustomerPuchaseForm = function (data) {
        //örnektir...
        var loaderInsertBlock = $("#loading-image-cstPurchase").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        document.getElementById("lastpurchase-datepicker").value = Date();
        document.getElementById("txt-cst-purchaselastupdate").value = Date();

        $('#dropdownLastPurchaseBrand').ddslick('select', { index: 3 });
        $('#dropdownPurchaseDecision').ddslick('select', { index: 2 });
        $('#dropdownDateofPurchasePlan').ddslick('select', { index: 3 });
        $('#dropdownNumberofVehiclestoP').ddslick('select', { index: 2 });

        //document.getElementById("dropdownCity").SelectedIndex = 2; //data.cityId;
        //document.getElementById("dropdownSector").value = data.sectorId;
        //document.getElementById("dropdownSegment").value = data.segmentId;

        loaderInsertBlock.loadImager('removeLoadImage');
        return false;
    }

});

