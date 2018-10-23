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

    var ddslick_chassisId = 0;
    var ddslick_chassis_name = "";
    var ddslick_vehiclelistId = 0;
    var ddslick_vehiclelist_name = "";
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

    $("#loadingImage_DdslickVehicleList").loadImager();
    $("#loadingImage_DdslickChassis").loadImager();
    $("#loadingImage_DdslickStatu").loadImager();

    //Loading image grid
    $("#loadingImage_DdslickTruckstogoList").loadImager();

    //Validation
    $('#truckstogoForm').validationEngine(); 

//VehicleList
    $("#loadingImage_DdslickVehicleList").loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleList").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkTruckstogoTypeDdList_systruckstogotypes&language_code=en&pk=GsZVzEYe50uGgNM&project_id=80
    var ajaxACLResources_vehicleList = $('#ajax_DdslickVehicleList').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleList",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkTruckstogoTypeDdList_systruckstogotypes",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_vehicleList.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datavehicleList) {

            var cbdata_vehicleList = $.parseJSON(datavehicleList);
            cbdata_vehicleList.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickVehicleList').ddslick({
                data: cbdata_vehicleList,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {

                    $('#ddslickChassis').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {

                        //Chassis
                        $("#loadingImage_DdslickChassis").loadImager('removeLoadImage');
                        $("#loadingImage_DdslickChassis").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCurrencyTypesDdList_syscurrencytypes&language_code=en&pk=GsZVzEYe50uGgNM
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
                                url: "pkCurrencyTypesDdList_syscurrencytypes",
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
                                    //search: true,
                                    //searchText: window.lang.translate('Search'),
                                })
                                $('#loadingImage_DdslickChassis').loadImager('removeLoadImage');
                            },
                            onAfterSuccess: function (event, data) {
                                $('#loadingImage_DdslickChassis').loadImager('removeLoadImage');
                            }
                        })
                        ajaxACLResources_chassis.ajaxCallWidget('call');
                        //Chassis End
                    }
                }
            })
            $('#loadingImage_DdslickVehicleList').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickVehicleList').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_vehicleList.ajaxCallWidget('call');
//VehicleList End

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
//http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFixedSalesCostsGridx_sysfixedsalescosts&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
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
                    id: truckstogoID,
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
        //    caption: window.lang.translate('Active/Passive'),
        //    width: 40,
        //    alignment: 'center',
        //    encodeHtml: false,

        //    cellTemplate: function (container, options) {
        //        var fieldHtml;
        //        var fcInfo_id = options.data.id;

        //        if (options.data.active === 1) {
        //            //active
        //            $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
        //                activepasivefcInfo(fcInfo_id, options.data.active);
        //                //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
        //            }).appendTo(container);
        //        } else if (options.data.active === 0) {
        //            //pasive
        //            $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
        //                activepasivefcInfo(fcInfo_id, options.data.active);
        //                //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
        //            }).appendTo(container);
        //        }
        //    }
        //}, {
            caption: window.lang.translate('Vehicle List') + "...",
            encodeHtml: false,
            dataField: "vehicle_gruop_name"
        }, {
            caption: window.lang.translate('Chassis') + "...",
            encodeHtml: false,
                dataField: "model_description"
        //}, {
            //caption: window.lang.translate('All Vehicle'),
            //width: 40,
            //alignment: 'center',
            //encodeHtml: false,

            //cellTemplate: function (container, options) {
            //    var fieldHtml;
            //    var fcInfo_id = options.data.id;

            //    if (options.data.is_all_vehicle === 1) {
            //        //active
            //        $('<div />').addClass('dx-link').attr('class', "fa fa-check").on('click', function () {
            //            // activepasivefcInfo(fcInfo_id, options.data.active);
            //            //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
            //        }).appendTo(container);
            //    }
            //}
               
        }, {
            caption: window.lang.translate('Extras') + "...",
            encodeHtml: false,
            dataField: "name"
        }, {
            caption: window.lang.translate('Vehicle Return date') + "...",
            encodeHtml: false,
            dataField: "start_date",
            dataType: "date"
        }, {
            caption: window.lang.translate('Vehicle Status') + "...",
            encodeHtml: false,
            dataField: "warranty_matrix_name"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                truckstogoID = data.id;
                filldropdown = true;
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

            var ajax_InsertTruckstogo = $('#ajaxACL-truckstogoList').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loadingImage_truckstogo",
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
            ajax_InsertTruckstogo.ajaxCallWidget({
                onReset: function (event, data) {
                    resetTruckstogoForm();
                },
                onAfterSuccess: function (event, data) {
                    $("#gridContainer_truckstogoList").dxDataGrid("instance").refresh();
                }
            })
            ajax_InsertTruckstogo.ajaxCallWidget('call');
            //$('#fcListRefresh').click();
            
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

        $('#ddslickChassis').ddslick('destroy');
        $('#ddslickVehicleList').ddslick('select', { index: String(0) });
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
        document.getElementById("txt-truckstogo-extras").value = data.name;

        ddslick_chassisId = data.vehicle_gruop_id;
        ddslick_chassis_name = data.vehicle_gruop_name;

        ddslick_vehiclelistId = data.vehicle_second_group_id;
        ddslick_vehiclelist_name = data.model_description;


        $('#ddslickVehicleList').ddslick('selectByValue',
            {
                index: '' + data.vehicle_gruop_id + '',
                text: '' + data.vehicle_gruop_name + ''
            }
        );

        $('#ddslickStatu').ddslick('selectByValue',
            {
                index: '' + data.currency_type_id + '',
                text: '' + data.currency_name + ''
            }
        );

        $("#loadingImage_truckstogo").loadImager('removeLoadImage');

        return false;
    }

//ActivePasive truckstogo Info

    //window.activepasivefcInfo = function (fcInfo_id, active) {

    //    var transactionSuccessMessage;

    //    if (active === 1) {
    //        //active
    //        transactionSuccessMessage = window.lang.translate('Active successful');
    //    } else {
    //        //pasive
    //        transactionSuccessMessage = window.lang.translate('Pasive successful');
    //    }

    //    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_sysfixedsalescosts&id=29&pk=GsZVzEYe50uGgNM
    //    var ajax_activepasiveTrInfolist = $('#ajaxACL-fixedCostList').ajaxCallWidget({
    //        failureLoadImage: true,
    //        loadingImageID: "loadingImage_DdslickFixedCostList",
    //        triggerSuccessAuto: true,
    //        transactionSuccessText: window.lang.translate('Transaction successful'),
    //        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
    //        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
    //        proxy: '/Sys/SysActivePassiveFixedCost',
    //        type: "POST",
    //        data: JSON.stringify({
    //            id: fcInfo_id,
    //            pk: "GsZVzEYe50uGgNM",
    //            url: "pkUpdateMakeActiveOrPassive_sysfixedsalescosts"
    //        }),

    //    });
    //    ajax_activepasiveTrInfolist.ajaxCallWidget({
    //        onReset: function (event, data) {

    //        },
    //        onAfterSuccess: function (event, data) {
    //            $("#gridContainer_fixedCostList").dxDataGrid("instance").refresh();
    //        }
    //    })
    //    ajax_activepasiveTrInfolist.ajaxCallWidget('call');
    //    //$('#trListRefresh').click();
    //}

});

