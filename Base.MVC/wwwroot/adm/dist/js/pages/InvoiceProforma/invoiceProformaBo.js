///*
//* invoiceProformaBo Form
//* @author Ceydacan Seyrek
//* @since 31/10/2018
//*/
$(document).ready(function () {
    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Continue')
    });

    var proformaID;
    var chassisID;

/*
* datepicker format
* @author Ceydacan Seyrek
* @since 31/10/2016
*/
    $('#return-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    //Loading image
    $("#loadingImage_invoiceProformaBo").loadImager();

    $("#loadingImage_DdslickChassis").loadImager();
    $("#loadingImage_DdslickCurrency").loadImager();
    $("#loadingImage_DdslickVat").loadImager();

    //Loading image grid
    $("#loadingImage_InvoiceProformaBoList").loadImager();
    $("#loadingImage_chassisList").loadImager();

    //Validation
    $('#invoiceProformaBoForm').validationEngine(); 

    //Currency      curency seçimine göre price hesaplanacak!!!!!!!!!!!!!!!
    $("#loadingImage_DdslickCurrency").loadImager('removeLoadImage');
    $("#loadingImage_DdslickCurrency").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCurrencyTypesDdList_syscurrencytypes&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_currency = $('#ajax_DdslickCurrency').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickCurrency",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkCurrencyTypesDdList_syscurrencytypes)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkCurrencyTypesDdList_syscurrencytypes)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCurrencyTypesDdList_syscurrencytypes",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_currency.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datacurrency) {

            var cbdata_currency = $.parseJSON(datacurrency);
            //cbdata_currency.splice(0, 0,
            //    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            //);

            $('#ddslickCurrency').ddslick({
                data: cbdata_currency,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickCurrency').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickCurrency').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_currency.ajaxCallWidget('call');
    //Currency End

    //VAT
    $("#loadingImage_DdslickVat").loadImager('removeLoadImage');
    $("#loadingImage_DdslickVat").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCurrencyTypesDdList_syscurrencytypes&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_vat = $('#ajax_DdslickVat').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVat",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkCurrencyTypesDdList_syscurrencytypes)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkCurrencyTypesDdList_syscurrencytypes)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCurrencyTypesDdList_syscurrencytypes",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_vat.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datavat) {

            var cbdata_vat = $.parseJSON(datavat);
            cbdata_vat.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickVat').ddslick({
                data: cbdata_vat,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickVat').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickVat').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_vat.ajaxCallWidget('call');
    //VAT End

    /* devexgrid */

    $('#invoiceProformaBoListRefresh').click(function () {
        $("#gridContainer_InvoiceProformaBoList").dxDataGrid("instance").refresh();
    });

//invoiceProformaBo grid
//http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillTtGoGridx_systruckstogovehicles&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var proforma = new DevExpress.data.CustomStore({
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
                url: '/Truckstogo/TruckstogoGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillTtGoGridx_systruckstogovehicles",
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
        }
    });

//invoiceProformaBo Info dxDataGrid
    $("#gridContainer_InvoiceProformaBoList").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: proforma,
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
            fileName: "proformaInvoice"
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
        //    autoWidth: false
        //},
        columns: [{
            caption: window.lang.translate('Deal name') + "...",
            encodeHtml: false,
            dataField: "description"               
        }, {
            caption: window.lang.translate('Customer') + "...",
            encodeHtml: false,
            dataField: "description"      
        }, {
            caption: window.lang.translate('Type') + "...",
            encodeHtml: false,
            dataField: "description"    
        }, {            
            caption: window.lang.translate('Customer category') + "...",
            encodeHtml: false,
            dataField: "description"
        }, {
            caption: window.lang.translate('OTP numbers') + "...",
            encodeHtml: false,
            dataField: "description"
        }, {
            caption: window.lang.translate('Deal date') + "...",
            encodeHtml: false,
            dataField: "etd_date",
            dataType: "date"
        }, {
            caption: window.lang.translate('Invoice/Proforma amount total') + "...",
            encodeHtml: false,
            dataField: "chassis_no"            
        }, {
            caption: window.lang.translate('Order management Embrace numbers') + "...",
            encodeHtml: false,
            dataField: "description"             
        }, {
            caption: window.lang.translate('Topused Embrace numbers') + "...",
            encodeHtml: false,
            dataField: "description"
        }, {           
            caption: window.lang.translate('Centurion Embrace numbers') + "...",
            encodeHtml: false,
            dataField: "description"
        }, {           
            caption: window.lang.translate('Other Embrace numbers') + "...",
            encodeHtml: false,
            dataField: "description"
        }, {           
            caption: window.lang.translate('Deposit Attachment') + "...",
            encodeHtml: false,
            dataField: "description"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                proformaID = data.id;
                //filldropdown = true;
                fillInvoiceProforma(data);
            }
        },
    });

    //});

    //$('#fcListRefresh').click();

    /**
    * insert invoiceProformaBo
    * @author Ceydacan Seyrek
    * @since 31/10/2018
    */
    var stateInvoiceProforma;
    $("#btn-invoiceProformaBo-reject").on("click", function (e) {
        e.preventDefault();
        stateInvoiceProforma = 1;
        InvoiceProformaBoForm();
        return false;
    })

    $("#btn-invoiceProformaBo-approval").on("click", function (e) {
        e.preventDefault();
        stateInvoiceProforma = 2;
        InvoiceProformaBoForm();
        return false;
    })

    var InvoiceProformaBoForm = function () {
        $("#loadingImage_invoiceProformaBo").loadImager('removeLoadImage');
        $("#loadingImage_invoiceProformaBo").loadImager('appendImage');

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
    //        //url=pkInsertAct_systruckstogovehicles
    //        //&truckstogo_type_id=2
    //        //&stock_id=1
    //        //&description=
    //        //&etd_date=2018-12-12
    //        //&pk=GsZVzEYe50uGgNM
    //        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_systruckstogovehicles&truckstogo_type_id=2&stock_id=1&description=&etd_date=2018-12-12&pk=GsZVzEYe50uGgNM&id=2
    //        if (!truckstogoID == "") {//Update
    //            var ajax_InsertTruckstogo = $('#ajaxACL-truckstogoList').ajaxCallWidget({
    //                failureLoadImage: true,
    //                loadingImageID: "loadingImage_invoiceProformaBo",
    //                triggerSuccessAuto: true,
    //                transactionSuccessText: window.lang.translate('Transaction successful'),
    //                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
    //                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

    //                proxy: '/Truckstogo/AddTruckstogo',
    //                type: 'POST',
    //                data: JSON.stringify({
    //                    url: "pkUpdateAct_systruckstogovehicles",
    //                    id: truckstogoID,
    //                    stock_id: chassis_id,
    //                    truckstogo_type_id: statu_id,
    //                    description: extras,
    //                    etd_date: return_date,
    //                    pk: "GsZVzEYe50uGgNM"
    //                })
    //            });
    //            ajax_InsertTruckstogo.ajaxCallWidget({
    //                onReset: function (event, data) {
    //                    resetInvoiceProformaBoForm();
    //                },
    //                onAfterSuccess: function (event, data) {
    //                    $("#gridContainer_InvoiceProformaBoList").dxDataGrid("instance").refresh();
    //                }
    //            })
    //            ajax_InsertTruckstogo.ajaxCallWidget('call');
    //        }
    //        else {//insert
    //            var ajax_InsertTruckstogo = $('#ajaxACL-truckstogoList').ajaxCallWidget({
    //                failureLoadImage: true,
    //                loadingImageID: "loadingImage_invoiceProformaBo",
    //                triggerSuccessAuto: true,
    //                transactionSuccessText: window.lang.translate('Transaction successful'),
    //                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
    //                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

    //                proxy: '/Truckstogo/AddTruckstogo',
    //                type: 'POST',
    //                data: JSON.stringify({
    //                    url: "pkInsertAct_systruckstogovehicles",                       
    //                    stock_id: chassis_id,
    //                    truckstogo_type_id: statu_id,
    //                    description: extras,
    //                    etd_date: return_date,
    //                    pk: "GsZVzEYe50uGgNM"
    //                })
    //            });
    //            ajax_InsertTruckstogo.ajaxCallWidget({
    //                onReset: function (event, data) {
    //                    resetInvoiceProformaBoForm();
    //                },
    //                onAfterSuccess: function (event, data) {
    //                    $("#gridContainer_InvoiceProformaBoList").dxDataGrid("instance").refresh();
    //                }
    //            })
    //            ajax_InsertTruckstogo.ajaxCallWidget('call');
    //        }
    //        truckstogoID = "";
    //        return false;

        $("#loadingImage_invoiceProformaBo").loadImager('removeLoadImage');
        return false;
    }

    /**
    * reset InvoiceProforma Form
    * @author Ceydacan Seyrek
    * @since 31/10/2018
    */

    $("#btn-invoiceProformaBo-clear").on("click", function (e) {
        e.preventDefault();
        resetInvoiceProformaBoForm();
        return false;
    })

    var resetInvoiceProformaBoForm = function () {
        $("#loadingImage_invoiceProformaBo").loadImager('removeLoadImage');
        $("#loadingImage_invoiceProformaBo").loadImager('appendImage');

        $('#invoiceProformaBoForm')[0].reset();
        $('#invoiceProformaBoForm').validationEngine('hide');

        $('#ddslickChassis').ddslick('select', { index: String(0) });
        $('#ddslickCurrency').ddslick('select', { index: String(0) });

        $("#loadingImage_invoiceProformaBo").loadImager('removeLoadImage');
        return false;
    }

    /**
    * Fill InvoiceProforma form
    * @author Ceydacan Seyrek
    * @since 31/10/2018
    */
    var deal_id = "";
    var chassis_id = "";
    window.fillInvoiceProforma = function (data) {
        $("#loadingImage_invoiceProformaBo").loadImager('removeLoadImage');
        $("#loadingImage_invoiceProformaBo").loadImager('appendImage');

        document.getElementById("txt-invoiceProformaBo-cusName").value = data.description;
        document.getElementById("txt-invoiceProformaBo-type").value = data.description;
        document.getElementById("txt-invoiceProformaBo-cusCat").value = data.description;
        document.getElementById("txt-invoiceProformaBo-OtpNo").value = data.description;
        document.getElementById("txt-invoiceProformaBo-OrderManNo").value = data.description;
        document.getElementById("txt-invoiceProformaBo-TopusedNo").value = data.description;
        document.getElementById("txt-invoiceProformaBo-CenturionNo").value = data.description;
        document.getElementById("txt-invoiceProformaBo-OtherNo").value = data.description;
        document.getElementById("txt-invoiceProformaBo-total").value = data.chassis_no;

        //$('#ddslickChassis').ddslick('selectByValue',
        //    {
        //        index: '' + data.stock_id + '',
        //        text: '' + data.chassis_no + ''
        //    }
        //);

        $("#loadingImage_invoiceProformaBo").loadImager('removeLoadImage');


        deal_id = data.chassis_no;//düzelt
        FillChassissForm();
        return false;
    }

    //deal chassis dropdown

    var FillChassissForm = function () {
        //Chassis
        $("#loadingImage_DdslickChassis").loadImager('removeLoadImage');
        $("#loadingImage_DdslickChassis").loadImager('appendImage');

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVasSaseShortDdList_sysvasxml&language_code=en&pk=GsZVzEYe50uGgNM
        var ajaxACLResources_chassis = $('#ajax_DdslickChassis').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loadingImage_DdslickChassis",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkVasSaseShortDdList_sysvasxml)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkVasSaseShortDdList_sysvasxml)"),
            proxy: '/DefaultPost/DefaultPostModel',
            type: "POST",
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkVasSaseShortDdList_sysvasxml",
                pkIdentity: $("#publicKey").val()
            })
        });

        ajaxACLResources_chassis.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onSuccess: function (event, datachassis) {

                var cbdata_chassis = $.parseJSON(datachassis);
                cbdata_chassis.splice(0, 0,
                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                );

                $('#ddslickChassis').ddslick({
                    data: cbdata_chassis,
                    width: '100%',
                    search: true,
                    searchText: window.lang.translate('Search'),
                    onSelected: function (selectedData) {

                        if (selectedData.selectedData.value > 0) {
                            chassis_id = selectedData.selectedData.value;
                            FillChassissInfoForm();
                        }
                    }
                })
                $('#loadingImage_DdslickChassis').loadImager('removeLoadImage');
            },
            onAfterSuccess: function (event, data) {
                $('#loadingImage_DdslickChassis').loadImager('removeLoadImage');
               
            }
        })
        ajaxACLResources_chassis.ajaxCallWidget('call');
        //Chassis End
        return false;
    }

    //Chassis Info 
    var FillChassissInfoForm = function () {
        $('#chassisListRefresh').click(function () {
            $("#gridContainer_chassisList").dxDataGrid("instance").refresh();
        });

        //invoiceProformaBo grid
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillTtGoGridx_systruckstogovehicles&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        var proformaDetail = new DevExpress.data.CustomStore({
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
                    url: '/Truckstogo/TruckstogoGrid',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillTtGoGridx_systruckstogovehicles",
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
            }
        });

        //invoiceProformaBo Info dxDataGrid
        $("#gridContainer_chassisList").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: proformaDetail,
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
                fileName: "proformaInvoice"
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
            //    autoWidth: false
            //},
            columns: [{
                caption: window.lang.translate('Delivery country') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Delivery province') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Delivery city') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Delivery address') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Delivery VAT number') + "...",
                encodeHtml: false,
                dataField: "chassis_no"
            }, {
                caption: window.lang.translate('Payment method') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Financial institution') + "...",
                encodeHtml: false,
                dataField: "chassis_no"
            }, {
                caption: window.lang.translate('Bank contact person') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Bank address') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Bank contact telephone number') + "...",
                encodeHtml: false,
                dataField: "description"
           }],

            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    chassisID = data.id;
                    //filldropdown = true;
                    //fillInvoiceProforma(data);
                }
            },
        });

        return false;
    }


    //Deposit control
    window.depositOnChange = function () {
        var deposit = document.getElementById("txt-invoiceProformaBo-deposit").value;
        if (!deposit == "") {
            document.getElementById("txt-invoiceProformaBo-file").disabled = false;
        }
        else {
            document.getElementById("txt-invoiceProformaBo-file").disabled = true;
        }
    }
});

