///*
//* Fixed Cost Form
//* @author Ceydacan Seyrek
//* @since 12/10/2018
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

/*
* datepicker format
* @author Ceydacan Seyrek
* @since 29/08/2016
*/
    $('#start-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#FixedCostForm').validationEngine(); 

    //Loading image
    $("#loadingImage_FixedCost").loadImager();

    $("#loadingImage_DdslickModel").loadImager();
    $("#loadingImage_DdslickVehicle").loadImager();
    $("#loadingImage_DdslickCurrency").loadImager();
    $("#loadingImage_DdslickWarranty").loadImager();

    var filldropdown = false;

    var ddslick_modelId = 0;
    var ddslick_model_name = "";
    var ddslick_warrantyId = 0;
    var ddslick_warranty_name = "";
    var ddslick_vehicleId = 0;
    var ddslick_vehicle_name = "";
    var fixedCostId;

    //Model Group --> warranty name --> Vehicle End Group
    $("#loadingImage_DdslickModel").loadImager('removeLoadImage');
    $("#loadingImage_DdslickModel").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleGroupsDdList_sysvehiclegroups&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_model = $('#ajax_DdslickModel').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickModel",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleGroups',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_model.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datamodel) {

            var cbdata_model = $.parseJSON(datamodel);
            cbdata_model.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickModel').ddslick({
                data: cbdata_model,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {

                    $('#ddslickWarranty').ddslick('destroy');
                    $('#ddslickVehicle').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {
                        ddslick_modelId = selectedData.selectedData.value;

                        //Vehicle
                        $("#loadingImage_DdslickVehicle").loadImager('removeLoadImage');
                        $("#loadingImage_DdslickVehicle").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups&language_code=en&pk=GsZVzEYe50uGgNM&vehicle_groups_id=1
                        var ajaxACLResources_vehicle = $('#ajax_DdslickVehicle').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickVehicle",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Vehicle/SysVehicleEndGroup',
                            type: "POST",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups",
                                vehicle_group_id: ddslick_modelId,
                                pkIdentity: $("#publicKey").val()
                            })
                        });

                        ajaxACLResources_vehicle.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onSuccess: function (event, datavehicle) {

                                var cbdata_vehicle = $.parseJSON(datavehicle);
                                cbdata_vehicle.splice(0, 0,
                                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                );

                                $('#ddslickVehicle').ddslick({
                                    data: cbdata_vehicle,
                                    width: '100%',
                                    //search: true,
                                    //searchText: window.lang.translate('Search'),
                                })
                                if (filldropdown === true) {
                                    $('#ddslickVehicle').ddslick('selectByValue',
                                        {
                                            index: '' + ddslick_vehicleId + '',
                                            value: '' + ddslick_vehicle_name + ''
                                        });
                                    filldropdown = false;
                                }
                                $('#loadingImage_DdslickVehicle').loadImager('removeLoadImage');
                            },
                            onAfterSuccess: function (event, data) {
                                $('#loadingImage_DdslickVehicle').loadImager('removeLoadImage');
                            }
                        })
                        ajaxACLResources_vehicle.ajaxCallWidget('call');
                        //Vehicle End

                        //Warranty
                        $("#loadingImage_DdslickWarranty").loadImager('removeLoadImage');
                        $("#loadingImage_DdslickWarranty").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkWarrantiesParentsDdList_syswarranties&vehicle_group_id=8&language_code=en&pk=GsZVzEYe50uGgNM
                        var ajaxACLResources_vehicle = $('#ajax_DdslickWarranty').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickWarranty",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Warranty/SysVehicleWarranty',
                            type: "POST",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkWarrantiesParentsDdList_syswarranties",
                                vehicle_group_id: ddslick_modelId,
                                pkIdentity: $("#publicKey").val()
                            })
                        });

                        ajaxACLResources_vehicle.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onSuccess: function (event, datawarranty) {

                                var cbdata_warranty = $.parseJSON(datawarranty);
                                cbdata_warranty.splice(0, 0,
                                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                );

                                $('#ddslickWarranty').ddslick({
                                    data: cbdata_warranty,
                                    width: '100%',
                                    //search: true,
                                    //searchText: window.lang.translate('Search'),
                                })
                                if (filldropdown === true) {
                                    $('#ddslickWarranty').ddslick('selectByValue',
                                        {
                                            index: '' + ddslick_warrantyId + '',
                                            value: '' + ddslick_warranty_name + ''
                                        });
                                    filldropdown = false;
                                }
                                $('#loadingImage_DdslickWarranty').loadImager('removeLoadImage');
                            },
                            onAfterSuccess: function (event, data) {
                                $('#loadingImage_DdslickWarranty').loadImager('removeLoadImage');
                            }
                        })
                        ajaxACLResources_vehicle.ajaxCallWidget('call');
                        //Warranty End

                    }
                }
            })
            $('#loadingImage_DdslickModel').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickModel').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_model.ajaxCallWidget('call');
    //Model Group --> warranty name --> Vehicle End Group End



    //Currency
    $("#loadingImage_DdslickCurrency").loadImager('removeLoadImage');
    $("#loadingImage_DdslickCurrency").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCurrencyTypesDdList_syscurrencytypes&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_currency = $('#ajax_DdslickCurrency').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickCurrency",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
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


    /* devexgrid */

    $('#fcListRefresh').click(function () {
        $("#gridContainer_fixedCostList").dxDataGrid("instance").refresh();
    });

        //Fixed Cost grid
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFixedSalesCostsGridx_sysfixedsalescosts&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        var fixedCost = new DevExpress.data.CustomStore({
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
                    url: '/Sys/SysFixedSalesCostsGrid',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFixedSalesCostsGridx_sysfixedsalescosts",
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
                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_sysfixedsalescosts&id=33&pk=GsZVzEYe50uGgNM
                return $.ajax({
                    url: '/Sys/SysDeleteFixedCost',
                    dataType: "json",
                    data: JSON.stringify({
                        id: fixedCostId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysfixedsalescosts"
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

        //Fixed Cost Info dxDataGrid
        $("#gridContainer_fixedCostList").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: fixedCost,
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
                fileName: "fixedCost"
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
            columnWidth: {
                autoWidth: false
            },
            columns: [{
                caption: window.lang.translate('Active/Passive'),
                width: 40,
                alignment: 'center',
                encodeHtml: false,

                cellTemplate: function (container, options) {
                    var fieldHtml;
                    var fcInfo_id = options.data.id;

                    if (options.data.active === 1) {
                        //active
                        $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                            activepasivefcInfo(fcInfo_id, options.data.active);
                            //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                        }).appendTo(container);
                    } else if (options.data.active === 0) {
                        //pasive
                        $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                            activepasivefcInfo(fcInfo_id, options.data.active);
                            //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                        }).appendTo(container);
                    }
                }
            }, {
                caption: window.lang.translate('Model group') + "...",
                encodeHtml: false,
                dataField: "vehicle_gruop_name"
            }, {
                caption: window.lang.translate('Vehicle') + "...",
                encodeHtml: false,
                    dataField: "model_description"
            }, {
                caption: window.lang.translate('All Vehicle'),
                width: 40,
                alignment: 'center',
                encodeHtml: false,

                cellTemplate: function (container, options) {
                    var fieldHtml;
                    var fcInfo_id = options.data.id;

                    if (options.data.is_all_vehicle === 1) {
                        //active
                        $('<div />').addClass('dx-link').attr('class', "fa fa-check").on('click', function () {
                           // activepasivefcInfo(fcInfo_id, options.data.active);
                            //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                        }).appendTo(container);
                    }
                }
               
            }, {
                caption: window.lang.translate('Fixed cost name') + "...",
                encodeHtml: false,
                dataField: "name"
            }, {
                caption: window.lang.translate('Fixed cost price') + "...",
                encodeHtml: false,
                dataField: "vvalue"
            }, {
                caption: window.lang.translate('Currency') + "...",
                encodeHtml: false,
                dataField: "currency_name"
            }, {
                caption: window.lang.translate('Fixed cost start date') + "...",
                encodeHtml: false,
                dataField: "start_date",
                dataType: "date"
            }, {
                caption: window.lang.translate('Warranty') + "...",
                encodeHtml: false,
                dataField: "warranty_matrix_name"
            }],

            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    fixedCostId = data.id;
                    filldropdown = true;
                    fillFixedCost(data);
                }
            },
            onRowRemoving: function (e) {
                fixedCostId = e.key.id;
            },
            onRowRemoved: function (e) {
                $("#gridContainer_fixedCostList").dxDataGrid("instance").refresh();
            },
    });

    //});

    //$('#fcListRefresh').click();

    /**
    * insert Fixed Cost
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    $("#btn-fixedCost-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#FixedCostForm").validationEngine('validate')) {

            //window.insertTrainingInfo = function () {
            $("#loadingImage_FixedCost").loadImager('removeLoadImage');
            $("#loadingImage_FixedCost").loadImager('appendImage');


            var ddDataModel = $('#ddslickModel').data('ddslick');
            var model_id;
            if (ddDataModel.selectedData.value > 0) {
                model_id = ddDataModel.selectedData.value;
            }

            var ddDataVhc = $('#ddslickVehicle').data('ddslick');
            var vhc_id ;
            if (ddDataVhc.selectedData.value > 0) {
                vhc_id = ddDataVhc.selectedData.value;
            }
            else {
                vhc_id = "";
            }

            var ddDataCry = $('#ddslickCurrency').data('ddslick');
            var cry_id;
            if (ddDataCry.selectedData.value > 0) {
                cry_id = ddDataCry.selectedData.value;
            }

            var ddDataWr = $('#ddslickWarranty').data('ddslick');
            var wr_id ;
            if (ddDataWr.selectedData.value > 0) {
                wr_id = ddDataWr.selectedData.value;
            }
            else {
                wr_id = "";
            }

            var price = $('#txt-fc-price').val();
            var fc_name = $('#txt-fc-name').val();

            var start_date = $('#start-datepicker').val();

            var is_all_vehicle = 2;

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
            //url=pkInsertAct_sysfixedsalescosts
            //&name=gitgel%20cost
            //&vehicle_gruop_id=1--
            //&vehicle_second_group_id=--
            //&vvalue=1111=&--
            //currency_type_id=16--
            //&start_date=2018-10-10--
            //&is_all_vehicle=1--
            //warranty_matrix_id=--
            //&pk=GsZVzEYe50uGgNM--
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_sysfixedsalescosts&name=gitgel%20cost&vehicle_gruop_id=1&vehicle_second_group_id=&vvalue=1111=&currency_type_id=16&start_date=2018-10-10&is_all_vehicle=1=warranty_matrix_id=&pk=GsZVzEYe50uGgNM&id=4
            if (!fixedCostId == "") {//update
                var ajax_InsertFixedCost = $('#ajaxACL-fixedCostList').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_FixedCost",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Sys/AddFixedCost',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_sysfixedsalescosts",
                        id: fixedCostId,
                        name: fc_name,
                        vehicle_gruop_id: model_id,
                        vehicle_second_group_id: vhc_id,
                        currency_type_id: cry_id,
                        start_date: start_date,
                        vvalue: price,
                        warranty_matrix_id: wr_id,
                        is_all_vehicle: is_all_vehicle,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertFixedCost.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetFixedCostForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_fixedCostList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertFixedCost.ajaxCallWidget('call');
            }
            else {//insert
                var ajax_InsertFixedCost = $('#ajaxACL-fixedCostList').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_FixedCost",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Sys/AddFixedCost',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_sysfixedsalescosts",
                        name: fc_name,
                        vehicle_gruop_id: model_id,
                        vehicle_second_group_id: vhc_id,
                        currency_type_id: cry_id,
                        start_date: start_date,
                        vvalue: price,
                        warranty_matrix_id: wr_id,
                        is_all_vehicle: is_all_vehicle,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertFixedCost.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetFixedCostForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_fixedCostList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertFixedCost.ajaxCallWidget('call');
            }
            fixedCostId = "";
            return false;
        }
    })

    /**
    * reset Fixed Cost Form
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    $("#btn-fixedCost-clear").on("click", function (e) {
        e.preventDefault();
        resetFixedCostForm();
        return false;
    })

    var resetFixedCostForm = function () {
        $("#loadingImage_FixedCost").loadImager('removeLoadImage');
        $("#loadingImage_FixedCost").loadImager('appendImage');

        $('#FixedCostForm')[0].reset();
        $('#FixedCostForm').validationEngine('hide');

        $('#ddslickVehicle').ddslick('destroy');
        $('#ddslickWarranty').ddslick('destroy');
        $('#ddslickModel').ddslick('select', { index: String(0) });

        $("#loadingImage_FixedCost").loadImager('removeLoadImage');
        return false;
    }

    /**
    * Fill Fixed Cost form
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    window.fillFixedCost = function (data) {
        $("#loadingImage_FixedCost").loadImager('removeLoadImage');
        $("#loadingImage_FixedCost").loadImager('appendImage');

        //document.getElementById("txt-bbreturn-price").value = data.SaleAmount;
        document.getElementById("txt-fc-name").value = data.name;
        document.getElementById("txt-fc-price").value = data.vvalue;
        document.getElementById("start-datepicker").value = data.start_date;

        ddslick_modelId = data.vehicle_gruop_id;
        ddslick_model_name = data.vehicle_gruop_name;

        ddslick_vehicleId = data.vehicle_second_group_id;
        ddslick_vehicle_name = data.model_description;

        ddslick_warrantyId = data.warranty_matrix_id;
        ddslick_warranty_name = data.warranty_matrix_name;

        $('#ddslickModel').ddslick('selectByValue',
            {
                index: '' + data.vehicle_gruop_id + '',
                text: '' + data.vehicle_gruop_name + ''
            }
        );

        $('#ddslickCurrency').ddslick('selectByValue',
            {
                index: '' + data.currency_type_id + '',
                text: '' + data.currency_name + ''
            }
        );

        $("#loadingImage_FixedCost").loadImager('removeLoadImage');

        return false;
    }

//ActivePasive Fixed Cost Info

    window.activepasivefcInfo = function (fcInfo_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_sysfixedsalescosts&id=29&pk=GsZVzEYe50uGgNM
        var ajax_activepasiveTrInfolist = $('#ajaxACL-fixedCostList').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loadingImage_DdslickFixedCostList",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Sys/SysActivePassiveFixedCost',
            type: "POST",
            data: JSON.stringify({
                id: fcInfo_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysfixedsalescosts"
            }),

        });
        ajax_activepasiveTrInfolist.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_fixedCostList").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveTrInfolist.ajaxCallWidget('call');
        //$('#trListRefresh').click();
    }

});

