
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Continue')
    });


    /*
    * warranty LoadImager
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */
    //to warranty form
    $("#loadingImage_factoryWarrantyform").loadImager();

    //to model form
    $("#loadingImage_DdslickModel").loadImager();
    $("#loadingImage_DdslickVehicle").loadImager();
    $("#loadingImage_DdslickApplicationType").loadImager();
    $("#loading-image-wrType").loadImager();
    $("#loading-image-vhModel").loadImager();
    $("#loading-image-wrMil").loadImager();
    $("#loading-image-wrMonth").loadImager();
    $("#loading-image-rm").loadImager();

    //to warranty form grid loading-image
    $("#loading-image-factoryWarrantyGrid").loadImager();

    var UniqueCode = "";
    var VhType = "";
    var Model = "";
    var ModelId = "";
    var Mil1 = "";
    var Mil2 = "";
    var WrType = "";
    var WrRM = "";
    var VhTypeId = ""; 

    var langCode = $("#langCode").val();

    var warrantyInfoID;

    var filldropdown = false;

    var ddslick_modelId = 0;
    var ddslick_model_name = "";
    var ddslick_warrantyId = 0;
    var ddslick_warranty_name = "";
    var ddslick_modelId = 0;
    var ddslick_model_name = "";
    var ddslick_vehicleId = 0;
    var ddslick_vehicle_name = "";

    $('#factoryWarrantyForm').validationEngine();


//model
    $('#loading-image-modelName').loadImager('removeLoadImage');
    $("#loading-image-modelName").loadImager('appendImage');

    var ajaxACLResources_modelName = $('#ajaxACL-modelName').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-modelName",
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

    ajaxACLResources_modelName.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datamodelname) {

            var cbdata_modelname = $.parseJSON(datamodelname);
            cbdata_modelname.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownModelName').ddslick({
                data: cbdata_modelname,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                }
            })
            $('#loading-image-modelName').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loading-image-modelName').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_modelName.ajaxCallWidget('call');
//Model End

//Model type(TGS,TGM...)
    //Model Group --> warranty name --> Vehicle End Group
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

                    $('#ddslickWarranty').ddslick('destroy');
                    $('#ddslickVehicle').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {
                        ddslick_modelId = selectedData.selectedData.value;
                        VhType = selectedData.selectedData.text;
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
                    }
                    else {
                        VhType = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = "Factory" + VhType + Model + Mil1 + Mil2 + WrType + WrRM;
                }

            })
            $('#loadingImage_DdslickModel').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickModel').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_model.ajaxCallWidget('call');
    //Model Group --> Vehicle End Group End
//Model type End

//Config type
    $('#loading-image-vhModel').loadImager('removeLoadImage');
    $("#loading-image-vhModel").loadImager('appendImage');

    var ajaxACLResources_vhModel = $('#ajaxACL-vhModel').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-vhModel",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkVehicleConfigTypesDdList_sysvehicleconfigtypes)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkVehicleConfigTypesDdList_sysvehicleconfigtypes)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleConfigTypesDdList_sysvehicleconfigtypes",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_vhModel.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datavhModel) {

            var cbdata_vhModel = $.parseJSON(datavhModel);
            cbdata_vhModel.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownVhModel').ddslick({
                data: cbdata_vhModel,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        Model = selectedData.selectedData.text;
                    }
                    else {
                        Model = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = "Factory" + VhType + Model + Mil1 + Mil2 + WrType + WrRM;
                }
            })
            $('#loading-image-vhModel').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loading-image-vhModel').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_vhModel.ajaxCallWidget('call');
//Config type End


//wrType
    $('#loading-image-wrType').loadImager('removeLoadImage');
    $("#loading-image-wrType").loadImager('appendImage');

    var ajaxACLResources_wrType = $('#ajaxACL-wrType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-wrType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkWarrantyTypesDdList_syswarrantytypes)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkWarrantyTypesDdList_syswarrantytypes)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkWarrantyTypesDdList_syswarrantytypes",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_wrType.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datawrType) {

            var cbdata_wrType = $.parseJSON(datawrType);
            cbdata_wrType.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownWrType').ddslick({
                data: cbdata_wrType,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        Mil1 = selectedData.selectedData.text + "KM";
                    }
                    else {
                        Mil1 = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = "Factory" +  VhType + Model + Mil1 + Mil2 + WrType + WrRM;
                }
            })
            $('#loading-image-wrType').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loading-image-wrType').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_wrType.ajaxCallWidget('call');
//wrType End

//wrMil
    $('#loading-image-wrMil').loadImager('removeLoadImage');
    $("#loading-image-wrMil").loadImager('appendImage');

    var ajaxACLResources_wrMil = $('#ajaxACL-wrMil').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-wrMil",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkMileagesWarrantyDdList_sysmileages)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkMileagesWarrantyDdList_sysmileages)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkMileagesWarrantyDdList_sysmileages",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_wrMil.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datawrMil) {

            var cbdata_wrMil = $.parseJSON(datawrMil);
            cbdata_wrMil.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownWrMil').ddslick({
                data: cbdata_wrMil,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        Mil1 = selectedData.selectedData.text + "KM";
                    }
                    else {
                        Mil1 = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = "Factory" +  VhType + Model + Mil1 + Mil2 + WrType + WrRM;
                    }
                })
            $('#loading-image-wrMil').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loading-image-wrMil').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_wrMil.ajaxCallWidget('call');
//wrMil End

//wrMonth
    $('#loading-image-wrMonth').loadImager('removeLoadImage');
    $("#loading-image-wrMonth").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkWarrantyMonthsDdList_sysmonths&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_wrMonth = $('#ajaxACL-wrMonth').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-wrMonth",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkWarrantyMonthsDdList_sysmonths)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkWarrantyMonthsDdList_sysmonths)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkWarrantyMonthsDdList_sysmonths",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_wrMonth.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datawrMonth) {

            var cbdata_wrMonth = $.parseJSON(datawrMonth);
            cbdata_wrMonth.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownWrMonth').ddslick({
                data: cbdata_wrMonth,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        Mil2 = selectedData.selectedData.text + "MONTHS";
                    }
                    else {
                        Mil2 = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = "Factory" +  VhType + Model + Mil1 + Mil2 + WrType + WrRM;
                }
            })
            $('#loading-image-wrMonth').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loading-image-wrMonth').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_wrMonth.ajaxCallWidget('call');
//wrMonth End

//rm
    $('#loading-image-rm').loadImager('removeLoadImage');
    $("#loading-image-rm").loadImager('appendImage');

    var ajaxACLResources_rm = $('#ajaxACL-rm').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-rm",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (fillYesNoTypes_sysSpecificDefinitions)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (fillYesNoTypes_sysSpecificDefinitions)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "fillYesNoTypes_sysSpecificDefinitions",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_rm.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datarm) {

            var cbdata_rm = $.parseJSON(datarm);
            cbdata_rm.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownRm').ddslick({
                data: cbdata_rm,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value < 2) {
                        WrRM = selectedData.selectedData.text;
                    }
                    else {
                        WrRM = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = "Factory" +  VhType + Model + Mil1 + Mil2 + WrType + WrRM;
                }
            })
            $('#loading-image-rm').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loading-image-rm').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_rm.ajaxCallWidget('call');
//rm End

//ApplicationType
    $('#loadingImage_DdslickApplicationType').loadImager('removeLoadImage');
    $('#loadingImage_DdslickApplicationType').loadImager('appendImage');

    var ajaxACLResources_applicationtype = $('#ajax_DdslickApplicationType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickApplicationType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkVehicleAppTypesDdList_sysvehicleapptypes)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkVehicleAppTypesDdList_sysvehicleapptypes)"),
        proxy: '/Vehicle/SysVehicleAppTypes/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleAppTypesDdList_sysvehicleapptypes",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_applicationtype.ajaxCallWidget({
        onSuccess: function (event, cbdata_app) {
            var cbdata_apptype = $.parseJSON(cbdata_app);
            cbdata_apptype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickApplicationType').ddslick({
                data: cbdata_apptype,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            //$('#ddslickApplicationType').ddslick('disable');
            //$('#ddslickApplicationType').ddslick('enable');

            $("#loadingImage_DdslickApplicationType").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_DdslickApplicationType").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_applicationtype.ajaxCallWidget('call');

// ApplicationType end


    /* devexgrid */
    DevExpress.localization.locale(langCode);

    $('#factoryWarrantyListRefresh').click(function () {
        $("#gridContainer_factoryWarranty").dxDataGrid("instance").refresh();
    });

    //warranty matrix  warrantyListRefresh
    var wrmatrix = new DevExpress.data.CustomStore({
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
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillWarrantyMatrixFGridx_syswarrantymatrix&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
            $.ajax({
                url: '/Warranty/SysWarrantiesTypeGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillWarrantyMatrixFGridx_syswarrantymatrix",
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
                    deferred.reject("Data Loading Error (pkFillWarrantyMatrixFGridx_syswarrantymatrix)");
                },
                timeout: 10000
            });
            return deferred.promise();
        },
            remove: function (key) {
                var deferred = $.Deferred();
                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syswarranties&id=9&pk=GsZVzEYe50uGgNM
                return $.ajax({
                    url: '/Warranty/SysDeleteWarranty',
                    dataType: "json",
                    data: JSON.stringify({
                        id: warrantyInfoID,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_syswarrantymatrix"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error (pkDeletedAct_syswarrantymatrix)");
                    },
                    timeout: 10000
                });
            }
    });

    $("#gridContainer_factoryWarranty").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: wrmatrix,
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
            fileName: window.lang.translate('Warranty information')
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
        OnCellPrepared: function (options) {
            var fieldData = options.value;
            fieldHtml = "";

            fieldHtml = fieldData.value;
            options.cellElement.html(fieldHtml);
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
            caption: window.lang.translate('Active/Pasive'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var wrMatrix_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveWrMatrix(wrMatrix_id, options.data.active);
                       // dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveWrMatrix(wrMatrix_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                    }).appendTo(container);
                }
            }
        }, {
            caption: window.lang.translate('Warranty unique code') + "...",
            encodeHtml: false,
            dataField: "unique_code"
        }, {
            caption: window.lang.translate('Vehicle model group') + "...",
            encodeHtml: false,
            dataField: "vehicle_group" 
        }, {
            caption: window.lang.translate('Vehicle model') + "...",
            encodeHtml: false,
            dataField: "model_description"
        }, {
            caption: window.lang.translate('Application type') + "...",
            encodeHtml: false,
            dataField: "vehicle_app_type_name"
        }, {
            caption: window.lang.translate('Vehicle model name') + "...",
            encodeHtml: false,
            dataField: "vehicle_config_name"
        }, {
            caption: window.lang.translate('Warranty name') + "...",
            encodeHtml: false,
            dataField: "vehicle_group_name"
        }, {
            caption: window.lang.translate('Warranty price') + "...",
            encodeHtml: false,
            dataField: "price_in_euros"
        }, {
            caption: window.lang.translate('Warranty type') + "...",
            encodeHtml: false,
            dataField: "warranty_type_name"
        }, {
            caption: window.lang.translate('Warranty mileage') + "...",
            encodeHtml: false,
            dataField: "mileages1"
        }, {  
            caption: window.lang.translate('Warranty month') + "...",
            encodeHtml: false,
            dataField: "month_value"
        }, {
            caption: window.lang.translate('Repair&maintenance') + "...",
            encodeHtml: false,
            dataField: "maintenance" 
        }],
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                warrantyInfoID = data.id;
                fillwarrantyForm(data);
            }
        },
        onRowRemoving: function (e) {
            warrantyInfoID = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_factoryWarranty").dxDataGrid("instance").refresh();
        },
    });


/////////////////////////Warranty Info//////////////////////////////

    /**
 * insertwarranty
 * @returns {undefined}
 * @author Ceydacan Seyrek
 * @since 14/08/2018
 */
    $("#btn-warrantyInfo-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#factoryWarrantyForm").validationEngine('validate')) {
            // window.insertwarranty = function () {
            $("#loadingImage_factoryWarrantyform").loadImager('removeLoadImage');
            $("#loadingImage_factoryWarrantyform").loadImager('appendImage');

            //var cst_purchaselastupdate = $('#txt-model-name').val();
            //var warranty_id = warrantyNameId;

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
                var vehicle_gt_model_id = "";
            }
            else {
                var vehicle_gt_model_id = ddDataVehicleId.selectedData.value;
            }

            var ddDataApplicationTypeId = $('#ddslickApplicationType').data('ddslick');
            if (!ddDataApplicationTypeId.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select application type"),
                    window.lang.translate("Please select application type"));
            }
            else {
                var vehicle_app_types_id = ddDataApplicationTypeId.selectedData.value;
            }

            var ddDataWrConfigId = $('#dropdownVhModel').data('ddslick');
            if (!ddDataWrConfigId.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select config "),
                    window.lang.translate("Please select config"));
            }
            else {
                var vehicle_config_type_id = ddDataWrConfigId.selectedData.value;
            }

            var ddDataWrMonthId = $('#dropdownWrMonth').data('ddslick');
            if (!ddDataWrMonthId.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select month "),
                    window.lang.translate("Please select month"));
            }
            else {
                var months1_id = ddDataWrMonthId.selectedData.value;
            }
          

            var ddDataWrMilId = $('#dropdownWrMil').data('ddslick');
            if (!ddDataWrMonthId.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select mil "),
                    window.lang.translate("Please select mil"));
            }
            else {
                var mileages1_id = ddDataWrMilId.selectedData.value;
            }

            var ddDataWrTypeId = $('#dropdownWrType').data('ddslick');
            if (!ddDataWrTypeId.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select warranty type "),
                    window.lang.translate("Please select warranty type"));
            }
            else {
                var warranty_types_id = ddDataWrTypeId.selectedData.value;
            }

            var ddDataIsmaintenance = $('#dropdownRm').data('ddslick');
            if (!ddDataIsmaintenance.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select R&M "),
                    window.lang.translate("Please select R&M"));
            }
            else {
                var ismaintenance = ddDataIsmaintenance.selectedData.value;
            }

            //var unique_code = $('#txt-wrUnique-name').val();
            var unique_code ="Factory";

            var price_in_euros = $('#txt-wrPrice-name').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syswarrantymatrix
            //& warranty_id=6 
            //& vehicle_config_type_id=2
            //& months1_id=4
            //& mileages1_id=9 
            //& warranty_types_id=6
            //& ismaintenance=1
            //& unique_code=XHCV4X4400000KM24MONTHSDrivelineNo
            //& price_in_euros=10000.0000 
            //& pk=GsZVzEYe50uGgNM
            //vehicle_gt_model_id:
            //vehicle_app_types_id:
            //is_factory: 
            if (!warrantyInfoID == "") {
                var ajax_InsertWarrantyInfo = $('#ajaxACL-insertFactoryWarranty').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_factoryWarrantyform",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_syswarrantymatrix)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_syswarrantymatrix)"),

                    proxy: '/Warranty/AddWarrantyInfo',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_syswarrantymatrix",
                        id: warrantyInfoID,
                        vehicle_group_id: vehicle_group_id,
                        vehicle_config_type_id: vehicle_config_type_id,
                        months1_id: months1_id,
                        mileages1_id: mileages1_id,
                        warranty_types_id: warranty_types_id,
                        ismaintenance: ismaintenance,
                        unique_code: unique_code,
                        price_in_euros: price_in_euros,
                        vehicle_gt_model_id: vehicle_gt_model_id,
                        vehicle_app_types_id: vehicle_app_types_id,
                        is_factory:1,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertWarrantyInfo.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetwarrantyForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_factoryWarranty").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertWarrantyInfo.ajaxCallWidget('call');
            }
            else {
                var ajax_InsertWarrantyInfo = $('#ajaxACL-insertFactoryWarranty').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_factoryWarrantyform",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_syswarrantymatrix)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_syswarrantymatrix)"),

                    proxy: '/Warranty/AddWarrantyInfo',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_syswarrantymatrix",
                        vehicle_group_id: vehicle_group_id,
                        vehicle_config_type_id: vehicle_config_type_id,
                        months1_id : months1_id,
                        mileages1_id: mileages1_id,
                        warranty_types_id : warranty_types_id,
                        ismaintenance : ismaintenance,
                        unique_code : unique_code,
                        price_in_euros: price_in_euros,
                        vehicle_gt_model_id: vehicle_gt_model_id,
                        vehicle_app_types_id: vehicle_app_types_id,
                        is_factory: 1 ,
                        pk : "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertWarrantyInfo.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetwarrantyForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_factoryWarranty").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertWarrantyInfo.ajaxCallWidget('call');
            }
            warrantyInfoID = "";
            return false;
        }
    })

/**
* reset model Form
* @returns {undefined}
* @author Ceydacan Seyrek
* @since 14/08/2018
*/

    window.resetwarrantyForm = function (data) {
        $("#loadingImage_factoryWarrantyform").loadImager('removeLoadImage');
        $("#loadingImage_factoryWarrantyform").loadImager('appendImage');

        $('#factoryWarrantyForm')[0].reset();
        $('#factoryWarrantyForm').validationEngine('hide');

        $('#ddslickModel').ddslick('select', { index: String(0) });
        $('#ddslickVehicle').ddslick('destroy');
        $('#ddslickApplicationType').ddslick('select', { index: String(0) });
        $('#dropdownWrType').ddslick('select', { index: String(0) });
        $('#dropdownWrMil').ddslick('select', { index: String(0) });
        $('#dropdownWrMonth').ddslick('select', { index: String(0) });
        $('#dropdownRm').ddslick('select', { index: String(0) });
        $("#loadingImage_factoryWarrantyform").loadImager('removeLoadImage');
        
       // $("#warranty_tab").organizeTabs('activatePrevTab');
       // $("#warranty_tab").organizeTabs('disableAllTabs');
        return false;
    }

/**
* Fill model form
* @returns {Boolean}
* @author Ceydacan Seyrek
* @since 14/08/2018
*/

    window.fillwarrantyForm = function (data) {
        //$("#loadingImage_factoryWarrantyform").loadImager('removeLoadImage');
        //$("#loadingImage_factoryWarrantyform").loadImager('appendImage');

        ddslick_modelId = data.vehicle_group_id;
        ddslick_model_name = data.vehicle_group;

        ddslick_vehicleId = data.vehicle_gt_model_id;
        ddslick_vehicle_name = data.model_description;

        $('#ddslickModel').ddslick('selectByValue',
            {
                index: '' + data.vehicle_group_id + '',
                text: '' + data.vehicle_group + ''
            }
        );
        
        $('#ddslickApplicationType').ddslick('selectByValue',
            {
                index: '' + data.vehicle_app_types_id + '',
                text: '' + data.vehicle_app_type_name + ''
            }
        );

        $('#dropdownVhModel').ddslick('selectByValue',
            {
                index: '' + data.vehicle_config_type_id + '',
                text: '' + data.vehicle_config_name + ''
            }
        );
        //$('#dropdownWrName').ddslick('select', { index: data.id });
        $('#dropdownWrType').ddslick('selectByValue',
            {
                index: '' + data.warranty_types_id + '',
                text: '' + data.warranty_type_name + ''
            }
        );
        $('#dropdownWrMil').ddslick('selectByValue',
            {
                index: '' + data.mileages1_id + '',
                text: '' + data.maintenance + ''
            }
        );
        $('#dropdownWrMonth').ddslick('selectByValue',
            {
                index: '' + data.months1_id + '',
                text: '' + data.month_value + ''
            }
        );
        $('#dropdownRm').ddslick('selectByValue',
            {
                index: '' + data.ismaintenance + '',
                text: '' + data.maintenance + ''
            }
        );
        $('#dropdownModel').ddslick('selectByValue',
            {
                index: '' + data.vehicle_group_id + '',
                text: '' + data.vehicle_group + ''
            }
        );


        document.getElementById("txt-wrPrice-name").value = data.price_in_euros;
        //document.getElementById("txt-wrName-VhType").value = data.vehicle_group_id;
        //document.getElementById("txt-wrName-WrName").value = data.vehicle_group_name;
        document.getElementById("txt-wrUnique-name").value = data.unique_code;
       // $("#loadingImage_factoryWarrantyform").loadImager('removeLoadImage');
        return false;
    }

//ActivePasive Warranty Info

    window.activepasiveWrMatrix = function (wrMatrix_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_sysaccessoryoptions&id=1&pk=GsZVzEYe50uGgNM
            var ajax_activepasiveWrMatrix = $('#ajaxACL-factoryWarrantyList').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-factoryWarrantyGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
                transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_syswarrantymatrix)"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_syswarrantymatrix)"),
            proxy: '/Warranty/SysActivePasiveWrName',
            type: "POST",
            data: JSON.stringify({
                id: wrMatrix_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syswarrantymatrix"
            }),

        });
        ajax_activepasiveWrMatrix.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_factoryWarranty").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveWrMatrix.ajaxCallWidget('call');
        //$('#warrantyListRefresh').click();
    }

});
