///*
//* Trucks to go Form
//* @author Ceydacan Seyrek
//* @since 23/10/2018
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
    
    var movementDeliveryID;

    //var ddslick_chassisId = 0;
    //var ddslick_chassis_name = "";

/*
* datepicker format
* @author Ceydacan Seyrek
* @since 23/10/2016
*/
    $('#movementDelivery-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    //Loading image
    $("#loadingImage_movementDelivery").loadImager();

    $("#loadingImage_DdslickChassis").loadImager();
    $("#loadingImage_DdslickReqType").loadImager();
    $("#loadingImage_DdslickDeliver").loadImager();

    //Loading image grid
    $("#loadingImage_movementDeliveryList").loadImager();
    $("#loadingImage_vehicleList").loadImager();

    //Validation
    $('#movementDeliveryForm').validationEngine(); 

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
            })
            $('#loadingImage_DdslickChassis').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickChassis').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_chassis.ajaxCallWidget('call');
 //Chassis End

//reqtype
    $("#loadingImage_DdslickReqType").loadImager('removeLoadImage');
    $("#loadingImage_DdslickReqType").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleTtogoTypeDdList_sysvehiclettogotype&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_reqtype = $('#ajax_DdslickReqType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickReqType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkVehicleTtogoTypeDdList_sysvehiclettogotype)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkVehicleTtogoTypeDdList_sysvehiclettogotype)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleTtogoTypeDdList_sysvehiclettogotype",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_reqtype.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datareqtype) {

            var cbdata_reqtype = $.parseJSON(datareqtype);
            cbdata_reqtype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickReqType').ddslick({
                data: cbdata_reqtype,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickReqType').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickReqType').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_reqtype.ajaxCallWidget('call');
//reqtype End

    //Deliver
    $("#loadingImage_DdslickDeliver").loadImager('removeLoadImage');
    $("#loadingImage_DdslickDeliver").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleTtogoTypeDdList_sysvehiclettogotype&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_deliver = $('#ajax_DdslickDeliver').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickDeliver",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkVehicleTtogoTypeDdList_sysvehiclettogotype)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkVehicleTtogoTypeDdList_sysvehiclettogotype)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleTtogoTypeDdList_sysvehiclettogotype",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_deliver.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datadeliver) {

            var cbdata_deliver = $.parseJSON(datadeliver);
            cbdata_deliver.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickDeliver').ddslick({
                data: cbdata_deliver,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickDeliver').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickDeliver').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_deliver.ajaxCallWidget('call');
//Deliver End


    /* devexgrid */

    $('#fcListRefresh').click(function () {
        $("#gridContainer_movementDeliveryList").dxDataGrid("instance").refresh();
    });

//truckstogo grid
//http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillTtGoGridx_systruckstogovehicles&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var movementDelivery = new DevExpress.data.CustomStore({
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
        //remove: function (key) {
        //    var deferred = $.Deferred();
        //    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_systruckstogovehicles&id=6&pk=GsZVzEYe50uGgNM
        //    return $.ajax({
        //        url: '/Truckstogo/DeleteTruckstogo',
        //        dataType: "json",
        //        data: JSON.stringify({
        //            id: movementDeliveryID,
        //            pk: "GsZVzEYe50uGgNM",
        //            url: "pkDeletedAct_systruckstogovehicles"
        //        }),
        //        type: 'POST',
        //        contentType: 'application/json',
        //        success: function (result) {
        //            deferred.resolve(result.items, { totalCount: result.totalCount });
        //        },
        //        error: function () {
        //            deferred.reject("Data remove Error");
        //        },
        //        timeout: 10000
        //    });
        //}
    });

        //movementDelivery Info dxDataGrid
    $("#gridContainer_movementDeliveryList").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: movementDelivery,
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
            allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: "movementDelivery"
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
            caption: window.lang.translate('Deal Name') + "...",
            encodeHtml: false,
            dataField: "chassis_no"               
        }, {
            caption: window.lang.translate('Deal number') + "...",
            encodeHtml: false,
            dataField: "description"
        }, {
            caption: window.lang.translate('Deal date') + "...",
            encodeHtml: false,
            dataField: "etd_date",
            dataType: "date"
        }, {
            caption: window.lang.translate('Customer') + "...",
            encodeHtml: false,
            dataField: "truckstogo_type_name"
        }, {
            caption: window.lang.translate('Contact person name') + "...",
            encodeHtml: false,
            dataField: "truckstogo_type_name"
        }, {
            caption: window.lang.translate('Email') + "...",
            encodeHtml: false,
            dataField: "truckstogo_type_name"
        }, {
            caption: window.lang.translate('Phone number') + "...",
            encodeHtml: false,
            dataField: "truckstogo_type_name"
        }, {
            caption: window.lang.translate('Address 1') + "...",
            encodeHtml: false,
            dataField: "truckstogo_type_name"
        }, {
            caption: window.lang.translate('Address 2') + "...",
            encodeHtml: false,
            dataField: "truckstogo_type_name"
        }, {
            caption: window.lang.translate('Address 3') + "...",
            encodeHtml: false,
            dataField: "truckstogo_type_name"

        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                movementDeliveryID = data.id;
                //filldropdown = true;
                fillMovementDelivery(data);
            }
        },
        onRowRemoving: function (e) {
            movementDeliveryID = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_movementDeliveryList").dxDataGrid("instance").refresh();
        },
    });

    //});

    //$('#fcListRefresh').click();

    /**
    * insert Fixed Cost
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    $("#btn-movementDelivery-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#movementDeliveryForm").validationEngine('validate')) {

            //window.insertTrainingInfo = function () {
            $("#loadingImage_movementDelivery").loadImager('removeLoadImage');
            $("#loadingImage_movementDelivery").loadImager('appendImage');

            var ddDataChassis = $('#ddslickChassis').data('ddslick');
            if (!ddDataChassis.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Chassis "),
                    window.lang.translate("Please select Chassis"));
            }
            else {
                var chassis_id = ddDataChassis.selectedData.value;
            }

            var ddDataStutus = $('#ddslickStatu').data('ddslick');
            if (!ddDataStutus.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Status "),
                    window.lang.translate("Please select Status"));
            }
            else {
                var statu_id = ddDataStutus.selectedData.value;
            }

            var extras = $('#txt-truckstogo-extras').val();
            var return_date = $('#return-datepicker').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
            //url=pkInsertAct_systruckstogovehicles
            //&truckstogo_type_id=2
            //&stock_id=1
            //&description=
            //&etd_date=2018-12-12
            //&pk=GsZVzEYe50uGgNM
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_systruckstogovehicles&truckstogo_type_id=2&stock_id=1&description=&etd_date=2018-12-12&pk=GsZVzEYe50uGgNM&id=2
            if (!movementDeliveryID == "") {//Update
                var ajax_InsertTruckstogo = $('#ajaxACL-truckstogoList').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_movementDelivery",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_systruckstogovehicles)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_systruckstogovehicles)"),

                    proxy: '/Truckstogo/AddTruckstogo',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_systruckstogovehicles",
                        id: movementDeliveryID,
                        stock_id: chassis_id,
                        truckstogo_type_id: statu_id,
                        description: extras,
                        etd_date: return_date,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertTruckstogo.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetMovementDeliveryForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_truckstogoList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertTruckstogo.ajaxCallWidget('call');
            }
            else {//insert
                var ajax_InsertTruckstogo = $('#ajaxACL-truckstogoList').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_movementDelivery",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_systruckstogovehicles)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_systruckstogovehicles)"),

                    proxy: '/Truckstogo/AddTruckstogo',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_systruckstogovehicles",                       
                        stock_id: chassis_id,
                        truckstogo_type_id: statu_id,
                        description: extras,
                        etd_date: return_date,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertTruckstogo.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetMovementDeliveryForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_truckstogoList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertTruckstogo.ajaxCallWidget('call');
            }
            movementDeliveryID = "";
            return false;
        }
    })

    /**
    * reset truckstogo Form
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    $("#btn-movementDelivery-clear").on("click", function (e) {
        e.preventDefault();
        resetMovementDeliveryForm();
        return false;
    })

    var resetMovementDeliveryForm = function () {
        $("#loadingImage_movementDelivery").loadImager('removeLoadImage');
        $("#loadingImage_movementDelivery").loadImager('appendImage');

        $('#movementDeliveryForm')[0].reset();
        $('#movementDeliveryForm').validationEngine('hide');

        $('#ddslickChassis').ddslick('select', { index: String(0) });
        $('#ddslickStatu').ddslick('select', { index: String(0) });

        $("#loadingImage_movementDelivery").loadImager('removeLoadImage');
        return false;
    }

    /**
    * Fill truckstogo form
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    window.fillMovementDelivery = function (data) {
        $("#loadingImage_movementDelivery").loadImager('removeLoadImage');
        $("#loadingImage_movementDelivery").loadImager('appendImage');

        //document.getElementById("txt-bbreturn-price").value = data.SaleAmount;
        document.getElementById("txt-movementDelivery-cusName").value = data.description;
        document.getElementById("txt-movementDelivery-contName").value = data.description;
        document.getElementById("txt-movementDelivery-email").value = data.description;
        document.getElementById("txt-movementDelivery-adr1").value = data.description;
        document.getElementById("txt-movementDelivery-adr2").value = data.description;
        document.getElementById("txt-movementDelivery-adr3").value = data.description;
        document.getElementById("txt-movementDelivery-telNo").value = data.description;
        document.getElementById("movementDelivery-datepicker").value = data.etd_date;

        $('#ddslickChassis').ddslick('selectByValue',
            {
                index: '' + data.stock_id + '',
                text: '' + data.chassis_no + ''
            }
        );

        $('#ddslickReqType').ddslick('selectByValue',
            {
                index: '' + data.truckstogo_type_id + '',
                text: '' + data.truckstogo_type_name + ''
            }
        );

        $('#ddslickDeliver').ddslick('selectByValue',
            {
                index: '' + data.truckstogo_type_id + '',
                text: '' + data.truckstogo_type_name + ''
            }
        );

        $("#loadingImage_movementDelivery").loadImager('removeLoadImage');

        FillChassissInfoForm();
        return false;
    }

    //vehicle Info  
    $('#vehicleListRefresh').click(function () {
            //$("#gridContainer_vehicleList").dxDataGrid("instance").refresh();
        FillChassissInfoForm();
    });

    var FillChassissInfoForm = function () {

        //vehicle grid
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillTtGoGridx_systruckstogovehicles&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        var vehicleList = new DevExpress.data.CustomStore({
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

        //vehicle Info dxDataGrid
        $("#gridContainer_vehicleList").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: vehicleList,
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
                fileName: "vehicleListMovementDelivery"
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
                caption: window.lang.translate('Statu') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Chassis number') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Request type') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Customer name') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Contact Person') + "...",
                encodeHtml: false,
                dataField: "chassis_no"
            }, {
                caption: window.lang.translate('Email') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Phone number') + "...",
                encodeHtml: false,
                dataField: "chassis_no"
            }, {
                caption: window.lang.translate('Address 1') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Address 2') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Address 3') + "...",
                encodeHtml: false,
                dataField: "description"
            }, {
                caption: window.lang.translate('Delivery date') + "...",
                encodeHtml: false,
                dataField: "etd_date",
                dataType: "date"
            }, {
                caption: window.lang.translate('Attachment') + "...",
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

});

