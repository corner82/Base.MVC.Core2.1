/*
* R&M Matrix Form
* @author Ceydacan Seyrek
* @since 25/10/2018
*/
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Continue')
    });
   
    var rmId;

    var filldropdown = false;

    var ddslick_modelId = 0;
    var ddslick_model_name = "";
    var ddslick_vehicleId = 0;
    var ddslick_vehicle_name = "";
    var ddslick_vehicletypeId = 0;
    var ddslick_vehicletype_name = "";
/*
* R&M  Matrix LoadImager
* @author Ceydacan Seyrek
* @since 25/10/2018
*/
//to R&M Matrix form
    $("#loadingImage_rmInfo").loadImager();
    $("#loadingImage_DdslickModel").loadImager();
    $("#loadingImage_DdslickVehicle").loadImager();
    $("#loadingImage_DdslickVehicleType").loadImager();
    $("#loadingImage_DdslickContractType").loadImager();
    $("#loadingImage_DdslickMileage").loadImager();
    $("#loadingImage_DdslickMonths").loadImager();

//to R&M Matrix form grid loading-image
    $('#rmInfoForm').validationEngine();

    var langCode = $("#langCode").val();
    //alert(langCode);

//Buyback Dropdown Data
    //Model Group --> vehicle type --> Vehicle End Group
    $("#loadingImage_DdslickModel").loadImager('removeLoadImage');
    $("#loadingImage_DdslickModel").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleGroupsDdList_sysvehiclegroups&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_model = $('#ajax_DdslickModel').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickModel",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkVehicleGroupsDdList_sysvehiclegroups)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkVehicleGroupsDdList_sysvehiclegroups)"),
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

                    $('#ddslickVehicleType').ddslick('destroy');
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
                            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups)"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups)"),
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
                                    width: '100%'
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
                        if (ddslick_modelId == 3) {
//VehicleType
                            $('#loadingImage_DdslickVehicleType').loadImager('removeLoadImage');
                            $("#loadingImage_DdslickVehicleType").loadImager('appendImage');
                            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkRmTypesDdList_sysrmtypes&language_code=en&pk=GsZVzEYe50uGgNM

                            var ajaxACLResources_VehicleType = $('#ajax_DdslickVehicleType').ajaxCallWidget({
                                failureLoadImage: true,
                                loadingImageID: "loadingImage_DdslickVehicleType",
                                triggerSuccessAuto: true,
                                transactionSuccessText: window.lang.translate('Transaction successful'),
                                transactionFailureText: window.lang.translate("Service URL not found, please report error (pkRmTypesDdList_sysrmtypes)"),
                                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkRmTypesDdList_sysrmtypes)"),
                                proxy: '/DefaultPost/DefaultPostModel',
                                type: "POST",
                                data: JSON.stringify({
                                    language_code: $("#langCode").val(),
                                    pk: "GsZVzEYe50uGgNM",
                                    url: "pkRmTypesDdList_sysrmtypes",
                                    pkIdentity: $("#publicKey").val()
                                })
                            });

                            ajaxACLResources_VehicleType.ajaxCallWidget({
                                onReset: function (event, data) {

                                },
                                onSuccess: function (event, datavehicletype) {

                                    var cbdata_vehicletype = $.parseJSON(datavehicletype);
                                    cbdata_vehicletype.splice(0, 0,
                                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                    );

                                    $('#ddslickVehicleType').ddslick({
                                        data: cbdata_vehicletype,
                                        width: '100%',
                                        //search: true,
                                        //searchText: window.lang.translate('Search'),
                                    })
                                    if (filldropdown === true) {
                                        $('#ddslickVehicleType').ddslick('selectByValue',
                                            {
                                                index: '' + ddslick_vehicletypeId + '',
                                                value: '' + ddslick_vehicletype_name + ''
                                            });
                                        filldropdown = false;
                                    }
                                    $('#loadingImage_DdslickVehicleType').loadImager('removeLoadImage');
                                },
                                onAfterSuccess: function (event, data) {
                                    $('#loadingImage_DdslickVehicleType').loadImager('removeLoadImage');
                                }
                            })
                            ajaxACLResources_VehicleType.ajaxCallWidget('call');
//VehicleType End

                        }
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
    //Model Group --> vehicle type  --> Vehicle End Group End

//Mil
    $('#ajaxACLResources_Mileage').loadImager('removeLoadImage');
    $("#ajaxACLResources_Mileage").loadImager('appendImage');
  //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkMileagesRmDdList_sysmileages&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_Mileage = $('#ajax_DdslickMileage').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "ajaxACLResources_BbMileage",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkMileagesRmDdList_sysmileages)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkMileagesRmDdList_sysmileages)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkMileagesRmDdList_sysmileages",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Mileage.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, cbdata_mil) {

            var cbdata_mileage = $.parseJSON(cbdata_mil);
            cbdata_mileage.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickMileage').ddslick({
                data: cbdata_mileage,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#ajaxACLResources_Mileage').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#ajaxACLResources_Mileage').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Mileage.ajaxCallWidget('call');

//Mil End

//Month
    $('#loadingImage_DdslickMonths').loadImager('removeLoadImage');
    $("#loadingImage_DdslickMonths").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkRmMonthsDdList_sysmonths&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_Months = $('#ajax_DdslickMonths').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickMonths",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkRmMonthsDdList_sysmonths)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkRmMonthsDdList_sysmonths)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkRmMonthsDdList_sysmonths",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Months.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, cbdata_month) {
            //var data = $.parseJSON(cbdata);
            var cbdata_months = $.parseJSON(cbdata_month);
            cbdata_months.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickMonths').ddslick({
                //height: 150,
                data: cbdata_months,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickMonths').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickMonths').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Months.ajaxCallWidget('call');
//Month End

//ContractType
    $('#loadingImage_DdslickContractType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickContractType").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkComfortCareTypesDdList_syscustomertypes&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_ContractType = $('#ajax_DdslickContractType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickContractType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkComfortCareTypesDdList_syscustomertypes)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkComfortCareTypesDdList_syscustomertypes)"),
        proxy: '/Customer/SysCustomerType/',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkComfortCareTypesDdList_syscustomertypes",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_ContractType.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, databboffroad) {

            var cbdata_bboffroad = $.parseJSON(databboffroad);
            cbdata_bboffroad.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickContractType').ddslick({
                data: cbdata_bboffroad,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickContractType').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickContractType').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_ContractType.ajaxCallWidget('call');

//ContractType End


//R&M Dropdown Data End


    /* devexgrid */
    DevExpress.localization.locale(langCode);

//RM Grid
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillRmMatrixGridx_sysrmmatrix&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_sysrmmatrix&id=6&pk=GsZVzEYe50uGgNM

    $('#rmListRefresh').click(function () {
        $("#gridContainer_rmMatrix").dxDataGrid("instance").refresh();
    });

    var rmGrid = new DevExpress.data.CustomStore({
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
                url: '/RepairMaintenance/RepairMaintenanceMatrixGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillRmMatrixGridx_sysrmmatrix",
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

            return $.ajax({
                url: '/RepairMaintenance/DeleteRepairMaintenanceMatrix',
                dataType: "json",
                data: JSON.stringify({
                    id: rmId,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_sysrmmatrix"
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

    $("#gridContainer_rmMatrix").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: rmGrid,
        columnHidingEnabled: true,
        selection: {
            mode: "single"
        },
        hoverStateEnabled: true,
        editing: {
            //mode: "batch"
            mode: "form",
            //allowAdding: true,
            //allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: "rmMatrix"
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
                var rm_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveRm(rm_id, options.data.active);
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveRm(rm_id, options.data.active);
                    }).appendTo(container);
                }
            }
        }, {
            caption: window.lang.translate('Vehicle model group') + "...",
            encodeHtml: false,
            dataField: "vehicle_group_name"
        }, {
            caption: window.lang.translate('Vehicle end model group') + "...",
            encodeHtml: false,
            dataField: "vehicle_gt_model_name"
        }, {
            caption: window.lang.translate('Application type') + "...",
            encodeHtml: false,
            dataField: "rm_type_name"
        }, {
            caption: window.lang.translate('Contract Type') + "...",
            encodeHtml: false,
            dataField: "comfort_super_name"
        }, {
            caption: window.lang.translate('Mileage per annum (km)') + "...",
            encodeHtml: false,
            dataField: "mileage"
        }, {
            caption: window.lang.translate('Months') + "...",
            encodeHtml: false,
            dataField: "month"
        }, {
            caption: window.lang.translate('CPK Price') + "...",
            encodeHtml: false,
            dataField: "cpk_price"
         }, {
            caption: window.lang.translate('Monthly Price') + "...",
            encodeHtml: false,
            dataField: "mothly_price"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                rmId = data.id;
                fillRmMatrixForm(data);
            }
        },
        onRowRemoving: function (e) {
            rmId = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_rmMatrix").dxDataGrid("instance").refresh();
        },
    });

//RM Grid End


    ///////////////////////R&M MATRİX /////////////////////

/**
* R&M Matrix
* @author Ceydacan Seyrek
* @since 25/10/2018
*/
    $("#btn-rmMatrix-save").on("click", function (e) {
        e.preventDefault();

        if ($("#rmInfoForm").validationEngine('validate')) {

            $("#loadingImage_rmInfo").loadImager('removeLoadImage');
            $("#loadingImage_rmInfo").loadImager('appendImage');

            var ddDataModelId = $('#ddslickModel').data('ddslick');
            if (!ddDataModelId.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Model "),
                window.lang.translate("Please select Model"));
            }
            else {
                var vehicle_group_id = ddDataModelId.selectedData.value;
            }

            var ddDataVehicleId = $('#ddslickVehicle').data('ddslick');
            if (!ddDataVehicleId.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select end Model "),
                window.lang.translate("Please select end Model"));
            }
            else {
                var vehicle_gt_model_id = ddDataVehicleId.selectedData.value;
            }

            if (vehicle_group_id == 3) {
                var ddDataVehicleTypeId = $('#ddslickVehicleType').data('ddslick');
                if (ddDataVehicleTypeId.selectedData.value > 0) {
                    var vehicle_type_id = ddDataVehicleTypeId.selectedData.value;
                }
                else {
                    var vehicle_type_id = "";
                }
            }
            else {
                var vehicle_type_id = "";
            }

            var ddDataContractType = $('#ddslickContractType').data('ddslick');
            if (!ddDataContractType.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Contract Type "),
                    window.lang.translate("Please select Contract Type"));
            }
            else {
                var contractType_id = ddDataContractType.selectedData.value;
            }

            var ddDataMil = $('#ddslickMileage').data('ddslick');
            if (!ddDataMil.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select mileage "),
                window.lang.translate("Please select mileage"));
            }
            else {
                var mileage_id = ddDataMil.selectedData.value;
            }

            var ddDataMonth = $('#ddslickMonths').data('ddslick');
            if (!ddDataMonth.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select mileage "),
                window.lang.translate("Please select mileage"));
            }
            else {
                var month_id = ddDataMonth.selectedData.value;
            }

            var price = $('#txt-rmMatrix-price').val();
            var cpkPrice = $('#txt-rmMatrix-cpkPrice').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_sysrmmatrix&vehicle_group_id=1&vehicle_gt_model_id=2&rm_type_id=2&comfort_super_id=2&month_id=25&mileage_id=27&cpk_price=0.45&mothly_price=2401&pk=GsZVzEYe50uGgNM
            //& model_id=2 +
            //& buyback_type_id=2 
            //& terrain_id=2 +
            //& month_id=23 +
            //& mileage_id=23 +
            //& price=123 +
            //& pk=GsZVzEYe50uGgNM
            //comfort_super_id 
            //hydraulics
            //customer_type_id 
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_sysrmmatrix&vehicle_group_id=1&vehicle_gt_model_id=2&rm_type_id=2&comfort_super_id=2&month_id=25&mileage_id=27&cpk_price=0.45&mothly_price=2401&pk=GsZVzEYe50uGgNM&id=2
            if (!rmId == "") {//update
                var ajax_InsertMatrix = $('#ajaxACL-insertRm').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_rmInfo",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_sysrmmatrix)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_sysrmmatrix)"),

                    proxy: '/RepairMaintenance/AddRepairMaintenanceMatrix',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_sysrmmatrix",
                        id: rmId,
                        vehicle_group_id: vehicle_group_id,
                        vehicle_gt_model_id: vehicle_gt_model_id,
                        rm_type_id: vehicle_type_id,
                        comfort_super_id: contractType_id,
                        month_id: month_id,
                        mileage_id: mileage_id,
                        mothly_price: price,
                        cpk_price: cpkPrice,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertMatrix.ajaxCallWidget({
                    onReset: function (event, data) {
                        //resetTbMatrixForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_rmMatrix").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertMatrix.ajaxCallWidget('call');
            }
            else {//insert
                var ajax_InsertMatrix = $('#ajaxACL-insertRm').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_rmInfo",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_sysrmmatrix)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_sysrmmatrix)"),

                    proxy: '/RepairMaintenance/AddRepairMaintenanceMatrix',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_sysrmmatrix",
                        vehicle_group_id: vehicle_group_id,
                        vehicle_gt_model_id: vehicle_gt_model_id,
                        rm_type_id: vehicle_type_id,
                        comfort_super_id: contractType_id,
                        month_id: month_id,
                        mileage_id: mileage_id,
                        mothly_price: price,
                        cpk_price: cpkPrice,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertMatrix.ajaxCallWidget({
                    onReset: function (event, data) {
                        //resetTbMatrixForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_rmMatrix").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertMatrix.ajaxCallWidget('call');
            }
            return false;
        }
    })

/**
* reset r&m Matrix Form
* @author Ceydacan Seyrek
* @since 25/10/2018
*/
    $("#btn-rmMatrix-clear").on("click", function (e) {
        e.preventDefault();
        resetTbMatrixForm();
        return false;
    })

    var resetTbMatrixForm = function () {
        $("#loadingImage_rmInfo").loadImager('removeLoadImage');
        $("#loadingImage_rmInfo").loadImager('appendImage');

        $('#factoryWarrantyForm')[0].reset();
        $('#factoryWarrantyForm').validationEngine('hide');

        $('#ddslickModel').ddslick('select', { index: String(0) });
        $('#ddslickVehicle').ddslick('destroy');
        $('#ddslickVehicleType').ddslick('destroy');
        $('#ddslickContractType').ddslick('select', { index: String(0) });
        $('#ddslickMileage').ddslick('select', { index: String(0) });
        $('#ddslickMonths').ddslick('select', { index: String(0) });

        $("#loadingImage_rmInfo").loadImager('removeLoadImage');

        return false;
    }

/**
* Fill R&M Matrix form
* @author Ceydacan Seyrek
* @since 25/10/2018
*/

    window.fillRmMatrixForm = function (data) {
        $("#loadingImage_rmInfo").loadImager('removeLoadImage');
        $("#loadingImage_rmInfo").loadImager('appendImage');

        document.getElementById("txt-rmMatrix-cpkPrice").value = data.cpk_price;
        document.getElementById("txt-rmMatrix-price").value = data.mothly_price;

        ddslick_modelId = data.vehicle_group_id;
        ddslick_model_name = data.vehicle_group_name;

        ddslick_vehicleId = data.vehicle_gt_model_id;
        ddslick_vehicle_name = data.vehicle_gt_model_name;

        ddslick_vehicletypeId = data.rm_type_id;
        ddslick_vehicletype_name = data.rm_type_name;

        $('#ddslickModel').ddslick('selectByValue',
            {
                index: '' + data.vehicle_group_id + '',
                text: '' + data.vehicle_group + ''
            }
        );
        $('#ddslickMileage').ddslick('selectByValue',
            {
                index: '' + data.mileage_id + '',
                text: '' + data.mileage + ''
            }
        );
        $('#ddslickMonths').ddslick('selectByValue',
            {
                index: '' + data.month_id + '',
                text: '' + data.month + ''
            }
        );
        $('#ddslickContractType').ddslick('selectByValue',
            {
                index: '' + data.comfort_super_id + '',
                text: '' + data.comfort_super_name + ''
            }
        );

        $("#loadingImage_rmInfo").loadImager('removeLoadImage');
        return false;
    }

/**
* Active passive R&M Matrix form
* @author Ceydacan Seyrek
* @since 25/10/2018
*/

    window.activepasiveRm = function (rm_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_sysrmmatrix&id=29&pk=GsZVzEYe50uGgNM
        var ajax_activepasiveRm = $('#ajaxACL-rmList').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loadingImage_DdslickRmMatrixGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_sysrmmatrix)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_sysrmmatrix)"),
            proxy: '/Training/SysActivePasiveTrName',
            type: "POST",
            data: JSON.stringify({
                id: rm_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysrmmatrix"
            }),

        });
        ajax_activepasiveRm.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_rmMatrix").dxDataGrid("instance").refresh();
                //$('#trListRefresh').click();
            }
        })
        ajax_activepasiveRm.ajaxCallWidget('call');
    }

});

