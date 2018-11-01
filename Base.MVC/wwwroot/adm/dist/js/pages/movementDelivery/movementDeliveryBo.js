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
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });

    var truckstogoID;

    //var ddslick_chassisId = 0;
    //var ddslick_chassis_name = "";

/*
* datepicker format
* @author Ceydacan Seyrek
* @since 23/10/2016
*/
    $('#return-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    //Loading image
    $("#loadingImage_truckstogo").loadImager();

    $("#loadingImage_DdslickChassis").loadImager();
    $("#loadingImage_DdslickStatu").loadImager();

    //Loading image grid
    $("#loadingImage_DdslickTruckstogoList").loadImager();

    //Validation
    $('#truckstogoForm').validationEngine(); 

    //Chassis
    $("#loadingImage_DdslickChassis").loadImager('removeLoadImage');
    $("#loadingImage_DdslickChassis").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVasSaseShortDdList_sysvasxml&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_chassis = $('#ajax_DdslickChassis').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickChassis",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
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


//Statu
    $("#loadingImage_DdslickStatu").loadImager('removeLoadImage');
    $("#loadingImage_DdslickStatu").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleTtogoTypeDdList_sysvehiclettogotype&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_statu = $('#ajax_DdslickStatu').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickStatu",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleTtogoTypeDdList_sysvehiclettogotype",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_statu.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datastatu) {

            var cbdata_statu = $.parseJSON(datastatu);
            cbdata_statu.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickStatu').ddslick({
                data: cbdata_statu,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickStatu').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickStatu').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_statu.ajaxCallWidget('call');
//Statu End


    /* devexgrid */

    $('#fcListRefresh').click(function () {
        $("#gridContainer_truckstogoList").dxDataGrid("instance").refresh();
    });

//truckstogo grid
//http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillTtGoGridx_systruckstogovehicles&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var truckstogo = new DevExpress.data.CustomStore({
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
        },
        remove: function (key) {
            var deferred = $.Deferred();
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_systruckstogovehicles&id=6&pk=GsZVzEYe50uGgNM
            return $.ajax({
                url: '/Truckstogo/DeleteTruckstogo',
                dataType: "json",
                data: JSON.stringify({
                    id: truckstogoID,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_systruckstogovehicles"
                }),
                type: 'POST',
                contentType: 'application/json',
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data remove Error");
                },
                timeout: 10000
            });
        }
    });

        //truckstogo Info dxDataGrid
    $("#gridContainer_truckstogoList").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: truckstogo,
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
            fileName: "truckstogo"
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
            caption: window.lang.translate('Chassis') + "...",
            encodeHtml: false,
            dataField: "chassis_no"               
        }, {
            caption: window.lang.translate('Extras') + "...",
            encodeHtml: false,
            dataField: "description"
        }, {
            caption: window.lang.translate('Vehicle Return date') + "...",
            encodeHtml: false,
            dataField: "etd_date",
            dataType: "date"
        }, {
            caption: window.lang.translate('Vehicle Status') + "...",
            encodeHtml: false,
            dataField: "truckstogo_type_name"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                truckstogoID = data.id;
                //filldropdown = true;
                fillTruckstogo(data);
            }
        },
        onRowRemoving: function (e) {
            truckstogoID = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_truckstogoList").dxDataGrid("instance").refresh();
        },
    });

    //});

    //$('#fcListRefresh').click();

    /**
    * insert Fixed Cost
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    $("#btn-truckstogo-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#truckstogoForm").validationEngine('validate')) {

            //window.insertTrainingInfo = function () {
            $("#loadingImage_truckstogo").loadImager('removeLoadImage');
            $("#loadingImage_truckstogo").loadImager('appendImage');

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
            if (!truckstogoID == "") {//Update
                var ajax_InsertTruckstogo = $('#ajaxACL-truckstogoList').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_truckstogo",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Truckstogo/AddTruckstogo',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_systruckstogovehicles",
                        id: truckstogoID,
                        stock_id: chassis_id,
                        truckstogo_type_id: statu_id,
                        description: extras,
                        etd_date: return_date,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertTruckstogo.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetTruckstogoForm();
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
                    loadingImageID: "loadingImage_truckstogo",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

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
                        resetTruckstogoForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_truckstogoList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertTruckstogo.ajaxCallWidget('call');
            }
            truckstogoID = "";
            return false;
        }
    })

    /**
    * reset truckstogo Form
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    $("#btn-truckstogo-clear").on("click", function (e) {
        e.preventDefault();
        resetTruckstogoForm();
        return false;
    })

    var resetTruckstogoForm = function () {
        $("#loadingImage_truckstogo").loadImager('removeLoadImage');
        $("#loadingImage_truckstogo").loadImager('appendImage');

        $('#truckstogoForm')[0].reset();
        $('#truckstogoForm').validationEngine('hide');

        $('#ddslickChassis').ddslick('select', { index: String(0) });
        $('#ddslickStatu').ddslick('select', { index: String(0) });

        $("#loadingImage_truckstogo").loadImager('removeLoadImage');
        return false;
    }

    /**
    * Fill truckstogo form
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    window.fillTruckstogo = function (data) {
        $("#loadingImage_truckstogo").loadImager('removeLoadImage');
        $("#loadingImage_truckstogo").loadImager('appendImage');

        //document.getElementById("txt-bbreturn-price").value = data.SaleAmount;
        document.getElementById("txt-truckstogo-extras").value = data.description;
        document.getElementById("return-datepicker").value = data.etd_date;

        $('#ddslickChassis').ddslick('selectByValue',
            {
                index: '' + data.stock_id + '',
                text: '' + data.chassis_no + ''
            }
        );

        $('#ddslickStatu').ddslick('selectByValue',
            {
                index: '' + data.truckstogo_type_id + '',
                text: '' + data.truckstogo_type_name + ''
            }
        );

        $("#loadingImage_truckstogo").loadImager('removeLoadImage');

        return false;
    }
});

