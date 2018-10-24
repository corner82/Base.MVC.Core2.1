/*
* vehiclekittype Form
* @author Gül Özdemir
* @since 14/08/2016
*/
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });

    var filldropdown = false;

    var ddslick_vehicleKitId = 0;

    /*
    * vehiclekitmodel LoadImager
    * @author Gül Özdemir
    * @since 23/10/2018
    */
    //to vehiclekitmodel form
    $("#loadingImage_DdslickVehicleKitType").loadImager();

    $("#loading-image-vehiclekitmodel").loadImager();
    //to ehicle kit-model form grid loading-image
    $("#loading-image-vehiclekitmodelGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#vehiclekitmodelForm').validationEngine();



    $('#loadingImage_DdslickVehicleKitType').loadImager('removeLoadImage');
    $('#loadingImage_DdslickVehicleKitType').loadImager('appendImage');
    //CKD / CBU
    var ajaxACLResources_vehiclekittype = $('#ajax_DdslickVehicleKitType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleKitType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleCKDCBU/',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleCkdCbuDdList_sysvehicleckdcbu",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_vehiclekittype.ajaxCallWidget({
        onSuccess: function (event, datakittype) {
            var cbdata_kittype = $.parseJSON(datakittype);
            cbdata_kittype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickVehicleKitType').ddslick({
                data: cbdata_kittype,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);
                        vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }

                }
            });

            $("#loadingImage_DdslickVehicleKitType").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_DdslickVehicleKitType").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_vehiclekittype.ajaxCallWidget('call');


    //////////////////////////////////////////////////////////////////////////////////////////////
    /**
    * vehicleBTDescList Refresh
    * @returns 
    * @author Gül Özdemir
    * @since 03/09/2018
    */

    $('#vehicleBTDescList').click(function () {

        /* devexgrid */
        var vehicleeBTDesc_data = new DevExpress.data.CustomStore({
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
                    url: '/Vehicle/VehicleBTDescGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillVehiclesTradeNamesGridx_sysvehiclestrade",
                        pkIdentity: $("#publicKey").val(),
                        page: "",
                        rows: "",
                        sort: "",
                        order: "", //args.orderby,
                        skip: args.skip,
                        take: args.take,
                        vehicle_gt_model_id: ddslick_vehicleModelGrTypeTonajId
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
            },

            remove: function (key) {
                var deferred = $.Deferred();
                //alert(selectedVehicleId);

                return $.ajax({
                    url: '/Vehicle/DeleteVehicleBTDesc',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedVehicleBTDescId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysvehiclestrade"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error");
                    },
                    timeout: 30000
                });
            },

            insert: function (values) {
                var deferred = $.Deferred();

                return $.ajax({
                    url: '/Vehicle/InsertVehicleBTDesc',
                    dataType: "json",
                    data: JSON.stringify({
                        description: ddslick_vehicleModelGrTypeTonajName + " " + values["trade_name"],
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkInsertAct_sysvehiclestrade",
                        vehicle_gt_model_id: ddslick_vehicleModelGrTypeTonajId
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                        alert("success");
                    },
                    error: function () {
                        deferred.reject("Data insert Error");
                    },
                    timeout: 30000
                });
            },

            update: function (key, values) {
                var deferred = $.Deferred();

                //alert("update k" + key["id"]);
                var updatekeyId = key["id"];

                return $.ajax({
                    url: '/Vehicle/UpdateVehicleBTDesc',
                    dataType: "json",
                    data: JSON.stringify({
                        description: values["trade_name"],
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkUpdateAct_sysvehiclestrade",
                        id: updatekeyId,
                        vehicle_gt_model_id: ddslick_vehicleModelGrTypeTonajId
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                        alert("success");
                    },
                    error: function () {
                        deferred.reject("Data update Error");
                    },
                    timeout: 30000
                });
            }
        });

        DevExpress.localization.locale(langCode);

        $(function () {
            $("#gridContainer_vehicleBTDesc").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: vehicleeBTDesc_data,

                columnHidingEnabled: true,

                selection: {
                    mode: "single"
                },

                hoverStateEnabled: true,

                editing: {
                    //mode: "batch"
                    mode: "form",
                    allowAdding: true,
                    allowUpdating: true,
                    allowDeleting: true,
                    useIcons: true
                },

                "export": {
                    enabled: true,
                    fileName: window.lang.translate('VehicleBuybackTradebackDescriptionsList')
                },

                grouping: {
                    contextMenuEnabled: true,
                    expandMode: "rowClick"
                },

                groupPanel: {
                    emptyPanelText: window.lang.translate('Use the context menu of header columns to group data'),
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

                columns: [
                    {
                        caption: window.lang.translate('Active/Passive'),
                        width: 40,
                        alignment: 'center',

                        cellTemplate: function (container, options) {
                            var fieldHtml;
                            var vehiclebtdesc_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveVehicleBTDesc(vehiclebtdesc_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveVehicleBTDesc(vehiclebtdesc_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, {
                        caption: window.lang.translate('Vehicle buyback tradeback description'),
                        dataField: "trade_name",
                        encodeHtml: false
                    }
                ],
                rowPrepared: function (rowElement, rowInfo) {
                    return false;
                    //if (rowInfo.data.key === 1)
                    //    rowElement.css('background', 'green');
                    //else if (rowInfo.data.key === 0)
                    //    rowElement.css('background', 'yellow');

                },

                onSelectionChanged: function (selectedItems) {
                    var data = selectedItems.selectedRowsData[0];
                    if (data) {
                        selectedVehicleBTDescId = data.id;
                        //alert("z " + selectedVehicleBTDescId);
                        //filldropdown = true;
                    }
                },

                onInitNewRow: function (e) {
                    //alert("InitNewRow");
                    //e.key.trade_name.value = "zzzzzzzzzzzzzzz";
                },

                onModifying: function () {
                    // Your code goes here
                    //selectedVehicleBTDescId = e.key.id;
                    //alert("m " + selectedVehicleBTDescId);
                },

                onRowRemoving: function (e) {
                    selectedVehicleBTDescId = e.key.id;
                    //alert("x " + selectedVehicleBTDescId);
                },

                onRowRemoved: function (e) {
                    $("#gridContainer_vehicleBTDesc").dxDataGrid("instance").refresh();
                },

                onRowEditing: function (e) {
                    //    selectedVehicleBTDescId = e.key.id;
                    //    alert("y " + selectedVehicleBTDescId);
                },

            });
        });
    })

    $('#vehicleBTDescList').click();

    $('#vehicleList').click();


    /**
 * insert / Update Vehicle Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 15/10/2018
 */

    $("#btn-vehicle-save").on("click", function (e) {
        e.preventDefault();

        if ($("#vehicleForm").validationEngine('validate')) {

            $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
            $("#loadingImage_FormVehicle").loadImager('appendImage');

            var vehicle_name = $('#txt-vehicle-name').val();
            var gfz = $('#txt-gfz').val();
            //var gfz-vehicletype = $('#txt-gfz-vehicletype').val();
            var modeldescription = $('#txt-modeldescription').val();

            var ddData_VehicleKitType = $('#ddslickVehicleKitType').data('ddslick');
            var vehicleKitTypeId = ddData_VehicleKitType.selectedData.value;

            var ddData_VehicleModel = $('#ddslickVehicleModel').data('ddslick');
            var vehicleModelId = ddData_VehicleModel.selectedData.value;

            var ddData_VehicleModelGr = $('#ddslickVehicleModelGr').data('ddslick');
            var vehicleModelGrId = ddData_VehicleModelGr.selectedData.value;

            var ddData_VehicleModelGrTonaj = $('#ddslickVehicleModelGrTonaj').data('ddslick');
            var vehicleModelGrTonajId = ddData_VehicleModelGrTonaj.selectedData.value;

            var ddData_Horsepower = $('#ddslickHorsepower').data('ddslick');
            var horsepowerId = ddData_Horsepower.selectedData.value;

            var ddData_Config = $('#ddslickConfig').data('ddslick');
            var configId = ddData_Config.selectedData.value;

            var ddData_VehicleVariant = $('#ddslickVehicleVariant').data('ddslick');
            var vehicleVariantId = ddData_VehicleVariant.selectedData.value;

            var ddData_Cab = $('#ddslickCab').data('ddslick');
            var cabId = ddData_Cab.selectedData.value;

            var ddData_KPNo = $('#ddslickKPNo').data('ddslick');
            var kpNoId = ddData_KPNo.selectedData.value;

            var ddData_BTOBTS = $('#ddslickBTOBTS').data('ddslick');
            var btobtsId = ddData_BTOBTS.selectedData.value;

            var ddData_ApplicationType = $('#ddslickApplicationType').data('ddslick');
            var applicationTypeId = ddData_ApplicationType.selectedData.value;

            //alert(selectedVehicleId);

            var ajax;
            if (selectedVehicleId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-vehicle').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_FormVehicle",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                    proxy: '/Vehicle/InsertVehicle',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertAct_sysvehicles",
                        description: modeldescription,
                        factorymodel_name: vehicle_name,
                        gfz: gfz,
                        ckdcbu_type_id: vehicleKitTypeId,
                        vehicle_gt_model_id: vehicleModelId,
                        model_variant_id: vehicleVariantId,
                        config_type_id: configId,
                        cap_type_id: cabId,
                        vehicle_app_type_id: applicationTypeId,
                        kpnumber_id: kpNoId,
                        btsbto_type_id: btobtsId,
                        roadtype_id: "0",
                        language_code: "en",
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_vehicle").dxDataGrid("instance").refresh();
                        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-vehicle').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_FormVehicle",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Vehicle/UpdateVehicle',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedVehicleId,
                                url: "pkUpdateAct_sysvehicles",
                                description: modeldescription,
                                factorymodel_name: vehicle_name,
                                gfz: gfz,
                                ckdcbu_type_id: vehicleKitTypeId,
                                vehicle_gt_model_id: vehicleModelId,
                                model_variant_id: vehicleVariantId,
                                config_type_id: configId,
                                cap_type_id: cabId,
                                vehicle_app_type_id: applicationTypeId,
                                kpnumber_id: kpNoId,
                                btsbto_type_id: btobtsId,
                                roadtype_id: "0",
                                language_code: "en",
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_vehicle").dxDataGrid("instance").refresh();
                                $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Vehicle is update! Are you sure?', 'Vehicle is update! Are you sure?');
            }
        }
        return false;

    })

    /**
    * reset vehicle Form
    * @returns {undefined}
    * @author Gül Özdemir
    * @since 15/08/2018
    */

    window.resetVehicleForm = function () {
        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
        $("#loadingImage_FormVehicle").loadImager('appendImage');

        selectedVehicleId = 0;
        selectedVehicleBTDescId = 0;

        ddslick_vehicleModelId = 0;
        ddslick_vehicleModelName = "";

        ddslick_vehicleModelGrTypeId = 0;
        ddslick_vehicleModelGrTypeName = "";

        ddslick_vehicleModelGrTypeTonajId = 0;
        ddslick_vehicleModelGrTypeTonajName = "";

        $('#vehicleForm').validationEngine('hide');

        $('#ddslickVehicleKitType').ddslick('select', { index: String(0) });
        $('#ddslickVehicleModel').ddslick('select', { index: String(0) });
        $('#ddslickVehicleModelGr').ddslick('destroy');
        $('#ddslickVehicleModelGrTonaj').ddslick('destroy');
        $('#ddslickHorsepower').ddslick('select', { index: String(0) });
        $('#ddslickConfig').ddslick('select', { index: String(0) });
        $('#ddslickVehicleVariant').ddslick('select', { index: String(0) });
        $('#ddslickCab').ddslick('select', { index: String(0) });
        $('#ddslickKPNo').ddslick('select', { index: String(0) });
        $('#ddslickBTOBTS').ddslick('select', { index: String(0) });
        $('#ddslickApplicationType').ddslick('select', { index: String(0) });

        $("#gridContainer_vehicleBTDesc").dxDataGrid("instance").refresh();

        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');

        return false;
    }


    /**
    * Fill Vehicle form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 15/08/2018
    */

    //"id": "10", "apid": 10, 
    //"ckdcbu_type_id": 1, 
    //"cbuckd_name": "CBU", 
    //"vehicle_gt_model_id": 3, 
    //"gt_model_name": "19.360", 
    //"model_variant_id": 1, 
    //"variant_name": "Tipper", 
    //"config_type_id": 1, 
    //"config_type_name": "4 X 2", 
    //"cap_type_id": 2, 
    //"cap_type_name": "L", 
    //"vehicle_app_type_id": 1, 
    //"app_type_name": "Traction\/Distribution", 
    //"kpnumber_id": 1, 
    //"kp_name": "KP000404", 
    //"btsbto_type_id": 1, 
    //"btobts_name": "BTO", 
    //"gfz": "xxxx", 
    //"factorymodel_name": "TGS-mmmmm", 
    //"road_type_name": "mmmmm", 
    //"horsepower_id": 2, 
    //"horse_power": "19.360", 
    //vehicle_group_types_id: 4
    //vehicle_group_types_name: "L72W"
    //vehicle_groups_id: 3
    //vehicle_groups_name: "TGS"
    //vehicle_gt_model_id: 3 <<==================>> model type tonaj id
    //gt_model_name: "19.360"
    //"op_username": "mustafa.zeynel.admin@ostim.com.tr", "state_active": "Active", "date_saved": "2018-10-15 09:59:18", "date_modified": null, "language_code": "en", "active": 0, "op_user_id": 16, "language_id": "385", "language_name": "English"


    window.fillVehicleForm = function (data) {

        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
        $("#loadingImage_FormVehicle").loadImager('appendImage');

        resetVehicleForm();

        selectedVehicleId = data.id;

        document.getElementById("txt-vehicle-name").value = data.vehicle_name;
        document.getElementById("txt-gfz").value = data.gfz;
        document.getElementById("txt-gfz-vehicletype").value = data.gfz;
        document.getElementById("txt-modeldescription").value = data.factorymodel_name;

        $('#ddslickVehicleKitType').ddslick('selectByValue',
            {
                index: '' + data.ckdcbu_type_id + '',
                value: '' + data.cbuckd_name + ''
            }
        );

        ddslick_vehicleModelId = data.vehicle_groups_id;
        ddslick_vehicleModelName = data.vehicle_groups_name;

        ddslick_vehicleModelGrTypeId = data.vehicle_group_types_id;
        ddslick_vehicleModelGrTypeName = data.vehicle_group_types_name;

        ddslick_vehicleModelGrTypeTonajId = data.vehicle_gt_model_id;
        ddslick_vehicleModelGrTypeTonajName = data.gt_model_name;

        $('#ddslickVehicleModel').ddslick('selectByValue',
            {
                index: ddslick_vehicleModelId,
                value: ddslick_vehicleModelName
            }
        );
        //vehicleModelGrTyp ve vehicleModelGrTypeTonaj otomatik tetikleniyor.

        $('#ddslickHorsepower').ddslick('selectByValue',
            {
                index: data.horsepower_id,
                value: data.horse_power
            }
        );

        $('#ddslickConfig').ddslick('selectByValue',
            {
                index: data.config_type_id,
                value: data.config_type_name
            }
        );

        $('#ddslickVehicleVariant').ddslick('selectByValue',
            {
                index: data.model_variant_id,
                value: data.variant_name
            }
        );

        $('#ddslickCab').ddslick('selectByValue',
            {
                index: data.cap_type_id,
                value: data.cap_type_name
            }
        );

        $('#ddslickKPNo').ddslick('selectByValue',
            {
                index: data.kpnumber_id,
                value: data.kp_name
            }
        );

        $('#ddslickBTOBTS').ddslick('selectByValue',
            {
                index: data.btsbto_type_id,
                value: data.btobts_name
            }
        );

        $('#ddslickApplicationType').ddslick('selectByValue',
            {
                index: data.vehicle_app_type_id,
                value: data.app_type_name
            }
        );

        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');

        return false;
    }

    /**
    * Model Description On Change
    * @returns 
    * @author Gül Özdemir
    * @since 17/08/2018
    */

    window.modelDescOnChange = function () {

        document.getElementById("txt-vehicle-name").value = vehicleModel + "-" + document.getElementById("txt-modeldescription").value;
    }

    /**
    * GFZ text value On Change
    * @returns 
    * @author Gül Özdemir
    * @since 17/08/2018
    */
    window.gfzOnChange = function () {

        document.getElementById("txt-gfz-vehicletype").value = vehicleType + document.getElementById("txt-gfz").value;
    }


    /**
    *.vehicleKitType On Change - CBU / CKD
    * @returns 
    * @author Gül Özdemir
    * @since 17/08/2018
    */
    window.vehicleKitTypeForDefineFields = function (kittype) {

        //alert(kittype);

        if (kittype === "CBU") {
            document.getElementById("txt-gfz").value = "";
            document.getElementById("txt-gfz").disabled = true;

            $('#ddslickKPNo').ddslick('select', { index: String(0) });
            /* $('#ddslickKPNo').ddslick('disable');*/
            $('#ddslickBTOBTS').ddslick('select', { index: String(0) });
            /* $('#ddslickStockInfo').ddslick('disable');*/
        }
        else {
            document.getElementById("txt-gfz").disabled = false;
            //document.getElementById("ddslickKPNo").disabled = false;
            //document.getElementById("ddslickStockInfo").disabled = false;
            //$('#ddslickStockInfo').ddslick('enable');
        }
    }

    //Vehicle active/passive
    window.activepassiveVehicle = function (vehicle_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassivevehiclelist = $('#ajaxACL-vehiclelist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-vehiclegrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Vehicle/ActivePassiveVehicle',
            type: "POST",
            data: JSON.stringify({
                id: vehicle_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysvehicles"
            }),

        });
        ajax_activepassivevehiclelist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {
            },

            onAfterSuccess: function (event, data) {
                $("#gridContainer_vehicle").dxDataGrid("instance").refresh();
                $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
            }

        })
        ajax_activepassivevehiclelist.ajaxCallWidget('call');

    }


    window.activepassiveVehicleBTDesc = function (vehicleBTDesc_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassivevehicleBTDesclist = $('#ajaxACL-vehicleBTDesclist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-vehicleBTDescGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Vehicle/ActivePassiveVehicleBTDesc',
            type: "POST",
            data: JSON.stringify({
                id: vehicleBTDesc_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysvehiclestrade"
            }),

        });
        ajax_activepassivevehicleBTDesclist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {
            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_vehicleBTDesc").dxDataGrid("instance").refresh();
                $("#loading-image-vehicleBTDescGrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassivevehicleBTDesclist.ajaxCallWidget('call');

    }

});

