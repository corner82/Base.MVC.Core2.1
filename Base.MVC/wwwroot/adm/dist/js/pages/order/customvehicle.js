$(document).ready(function () {

    //Validation
    $('#customVehicleForm').validationEngine(); 
    $("#loadingImage_customVehicle").loadImager();

    var customVehicleID;


    $("#btn-customVehicle-save").on("click", function (e) {
        e.preventDefault();

        if ($("#customVehicleForm").validationEngine('validate')) {
            
            if ($('#txt-customVehicle-orderNo').val() == '') {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', "Please insert Order No Value",
                    "Please insert Order No Value");
            }
            else {
                var orderno = $('#txt-customVehicle-orderNo').val();
            }

            if ($('#txt-customVehicle-estimatedCost').val() == '') {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', "Please insert Estimated Cost Value",
                    window.lang.translate("Please insert Estimated Cost Value"));
            }
            else {
                var estimated_cost = $('txt-customVehicle-estimatedCost').val();
            }
            

            var fileManec = $('#txt-stockBo-fileManec').val();
            var fileBrochure = $('#txt-stockBo-fileBrochure').val();
            var fileNatis = $('#txt-stockBo-fileNatis').val();

            if (!customVehicleID == "") {//update
                var ajax_InsertcustomVehicle = $('#ajaxACL-customVehicle').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_customVehicle",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_infocustomvehicleorder)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_infocustomvehicleorder)"),

                    proxy: '/Order/AddCustomVehicle',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_infocustomvehicleorder",
                        id: stockBoID,
                        orderno: orderno,
                        estimated_cost: estimated_cost,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertcustomVehicle.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetParkoffForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_customVehicleList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertcustomVehicle.ajaxCallWidget('call');
            }
            else { //insert
                var ajax_InsertcustomVehicle = $('#ajaxACL-stockBo').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_stockBo",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_infocustomvehicleorder)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_infocustomvehicleorder)"),

                    proxy: '/Order/AddCustomVehicle',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_infocustomvehicleorder",
                        orderno: orderno,
                        estimated_cost: estimated_cost,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertcustomVehicle.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetCustomVehicleForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_customVehicleList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertcustomVehicle.ajaxCallWidget('call');
            }

            return false;
        }
    })

    $("#btn-customVehicle-clear").on("click", function (e) {
        e.preventDefault();
        resetCustomVehicleForm();
        return false;
    })

    var resetCustomVehicleForm = function () {
        $("#loadingImage_customVehicle").loadImager('removeLoadImage');
        $("#loadingImage_customVehicle").loadImager('appendImage');

        $('#customVehicleForm')[0].reset();
        $('#customVehicleForm').validationEngine('hide');

        $('#txt-customVehicle-orderNo').val('');
        $('#txt-customVehicle-estimatedCost').val('');

        $("#loadingImage_customVehicle").loadImager('removeLoadImage');

        return false;
    }

    window.fillCustomVehicleForm = function (data) {
        $("#loadingImage_customVehicle").loadImager('removeLoadImage');
        $("#loadingImage_customVehicle").loadImager('appendImage');
        
        $('#txt-customVehicle-orderNo').val(data.order_no);
        $('#txt-customVehicle-estimatedCost').val(data.estimated_price);

        $("#loadingImage_stockBo").loadImager('removeLoadImage');
        return false;
    }

    //truckstogo grid
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillTtGoGridx_systruckstogovehicles&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var customvehicle = new DevExpress.data.CustomStore({
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
                url: '/Order/CustomVehicleGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillCustomVehicleOrderGridx_infocustomvehicleorder",
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
                url: '/Order/DeleteCustomVehicleGrid',
                dataType: "json",
                data: JSON.stringify({
                    id: truckstogoID,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_infocustomvehicleorder"
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
    $("#gridContainer_customVehicleList").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: customvehicle,
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
            fileName: "customvehicle"
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
            caption: window.lang.translate('Active/Passive'),
            width: 40,
            alignment: 'center',

            cellTemplate: function (container, options) {
                var fieldHtml;
                var customVehicle_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepassiveCustomVehicle(customVehicle_id, options.data.active);

                    }).appendTo(container);
                } else if (options.data.active === 0) {

                    //passive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepassiveCustomVehicle(customVehicle_id, options.data.active);

                    }).appendTo(container);
                }
            }

        },{
            caption: "Order no...",
            encodeHtml: false,
            dataField: "order_no"
        }, {
            caption: "Estimated Price...",
            encodeHtml: false,
            dataField: "estimated_price"
        }, {
            caption: "Econ File...",
            encodeHtml: false,
            dataField: "econ_file_road",
            cellTemplate: function (container, options) {
                $("<div>")
                    .append($("<a>", { "href": options.value, "class": "dx-link dx-link-download dx-icon-download", "target": "_blank"}))
                    .appendTo(container);
            }
        }, {
            caption: "Manec File...",
            encodeHtml: false,
            dataField: "manec_file_road",
            cellTemplate: function (container, options) {
                $("<div>")
                    .append($("<a>", { "href": options.value, "class": "dx-link dx-link-download dx-icon-download", "target":"_blank" }))
                    .appendTo(container);
            }
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                customVehicleID = data.id;
                //filldropdown = true;
                fillCustomVehicleForm(data);
            }
        },
        onRowRemoving: function (e) {
            truckstogoID = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_customVehicleList").dxDataGrid("instance").refresh();
        },
    });


    //Vehicle active/passive
    window.activepassiveCustomVehicle = function (cunstomVehicle_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassivecustomVehiclelist = $('#ajaxACL-customVehicleList').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-vehiclegrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_infocustomvehicleorder)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_infocustomvehicleorder)"),
            proxy: '/Order/ActivePassiveCustomVehicle',
            type: "POST",
            data: JSON.stringify({
                id: cunstomVehicle_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_infocustomvehicleorder"
            }),

        });
        ajax_activepassivecustomVehiclelist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {
            },

            onAfterSuccess: function (event, data) {
                $("#gridContainer_customVehicleList").dxDataGrid("instance").refresh();
                $("#loadingImage_customVehicle").loadImager('removeLoadImage');
            }

        })
        ajax_activepassivecustomVehiclelist.ajaxCallWidget('call');

    }
});