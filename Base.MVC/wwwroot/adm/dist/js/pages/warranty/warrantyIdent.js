
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
    $("#loading-image-warranty").loadImager();
    $("#loading-image-warrantyName").loadImager();
    $("#loading-image-modelName").loadImager();

    //to model form
    $("#loading-image-model").loadImager();
    $("#loading-image-vhModel").loadImager();
    $("#loading-image-wrName").loadImager();
    $("#loading-image-wrType").loadImager();
    $("#loading-image-wrMil").loadImager();
    $("#loading-image-wrMonth").loadImager();
    $("#loading-image-rm").loadImager();

    //to warranty form grid loading-image
    $("#loading-image-warrantyGrid").loadImager();
    $("#loading-image-warrantyNameGrid").loadImager();

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

    var warrantyNameID;
    var warrantyInfoID;
    var vehicle_group_id;


    var filldropdown = false;

    var ddslick_modelId = 0;
    var ddslick_model_name = "";
    var ddslick_warrantyId = 0;
    var ddslick_warranty_name = "";

    var tabOrganizer = $("#warranty_tab").organizeTabs({ tabID: "warranty_tab" });

    //$("#warranty_tab").organizeTabs('disableAllTabs');

    $('#warrantyForm').validationEngine();
    $('#warrantyNameForm').validationEngine();

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
    $("#loading-image-model").loadImager('removeLoadImage');
    $("#loading-image-model").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleGroupsDdList_sysvehiclegroups&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_model = $('#ajaxACL-model').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-model",
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

            $('#dropdownModel').ddslick({
                data: cbdata_model,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {

                    $('#dropdownWrName').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {
                        VhType = selectedData.selectedData.text;
                        ddslick_modelId = selectedData.selectedData.value;

                        //Warranty
                        $("#loading-image-wrName").loadImager('removeLoadImage');
                        $("#loading-image-wrName").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkWarrantiesParentsDdList_syswarranties&vehicle_group_id=8&language_code=en&pk=GsZVzEYe50uGgNM
                        var ajaxACLResources_vehicle = $('#ajaxACL-wrName').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-wrName",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkWarrantiesParentsDdList_syswarranties)"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkWarrantiesParentsDdList_syswarranties)"),
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

                                $('#dropdownWrName').ddslick({
                                    data: cbdata_warranty,
                                    width: '100%',
                                    //search: true,
                                    //searchText: window.lang.translate('Search'),
                                })
                                if (filldropdown === true) {
                                    $('#dropdownWrName').ddslick('selectByValue',
                                        {
                                            index: '' + ddslick_warrantyId + '',
                                            value: '' + ddslick_warranty_name + ''
                                        });
                                    filldropdown = false;
                                }
                                $('#loading-image-wrName').loadImager('removeLoadImage');
                            },
                            onAfterSuccess: function (event, data) {
                                $('#loading-image-wrName').loadImager('removeLoadImage');
                            }
                        })
                        ajaxACLResources_vehicle.ajaxCallWidget('call');
                        //Warranty End

                    }
                    else {
                        VhType = "";
                    }
                     document.getElementById("txt-wrUnique-name").value = VhType + Model + Mil1 + Mil2 + WrType + WrRM;
                }
            })
            $('#loading-image-model').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loading-image-model').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_model.ajaxCallWidget('call');
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
                    document.getElementById("txt-wrUnique-name").value = VhType + Model + Mil1 + Mil2 + WrType + WrRM;
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
                    document.getElementById("txt-wrUnique-name").value = VhType + Model + Mil1 + Mil2 + WrType + WrRM;
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
                    document.getElementById("txt-wrUnique-name").value = VhType + Model + Mil1 + Mil2 + WrType + WrRM;
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
                    document.getElementById("txt-wrUnique-name").value = VhType + Model + Mil1 + Mil2 + WrType + WrRM;
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
                    document.getElementById("txt-wrUnique-name").value = VhType + Model + Mil1 + Mil2 + WrType + WrRM;
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

    /* devexgrid */
    DevExpress.localization.locale(langCode);

    //warranty name   wrNameListRefresh
    $('#wrNameListRefresh').click(function () {
        $("#gridContainer_warrantyName").dxDataGrid("instance").refresh();
    });
    var wrname = new DevExpress.data.CustomStore({
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
//http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillWarrantiesGridx_syswarranties&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
            $.ajax({
                url: '/Warranty/SysWarrantiesGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillWarrantiesGridx_syswarranties",
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
                    deferred.reject("Data Loading Error (pkFillWarrantiesGridx_syswarranties)");
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
                    id: warrantyNameID,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_syswarranties"
                }),
                type: 'POST',
                contentType: 'application/json',
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data remove Error (pkDeletedAct_syswarranties)");
                },
                timeout: 10000
            });
        }
    });

    $("#gridContainer_warrantyName").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: wrname,
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
            fileName: window.lang.translate('Warranty name')
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
            caption: window.lang.translate('Active/Passive'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var wrName_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveWrName(wrName_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveWrName(wrName_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                    }).appendTo(container);
                }
            }
        }, {
            caption: window.lang.translate('Vehicle model name') + "...",
            encodeHtml: false,
            dataField: "vehicle_group_name"
        }, {
            caption: window.lang.translate('Warranty name') + "...",
            encodeHtml: false,
            dataField: "name"
        }],

        onSelectionChanged: function(selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                warrantyNameID = data.id;
                filldropdown = true;
                fillwarrantyNameForm(data);
            }
        },
        onRowRemoving: function (e) {
            warrantyNameID = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_warrantyName").dxDataGrid("instance").refresh();
        },
    });

    //warranty matrix  warrantyListRefresh
    $('#warrantyListRefresh').click(function () {
        $("#gridContainer_warranty").dxDataGrid("instance").refresh();
    });

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
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillWarrantyMatrixGridx_syswarrantymatrix&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
            $.ajax({
                url: '/Warranty/SysWarrantiesTypeGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillWarrantyMatrixGridx_syswarrantymatrix",
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
                    deferred.reject("Data Loading Error (pkFillWarrantyMatrixGridx_syswarrantymatrix)");
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

    $("#gridContainer_warranty").dxDataGrid({
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
            caption: window.lang.translate('Vehicle type name') + "...",
            encodeHtml: false,
            dataField: "vehicle_group" 
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
                filldropdown = true;
                fillwarrantyForm(data);
            }
        },
        onRowRemoving: function (e) {
            warrantyInfoID = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_warranty").dxDataGrid("instance").refresh();
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
        if ($("#warrantyNameForm").validationEngine('validate')) {
            // window.insertwarranty = function () {
            $("#loading-image-warranty").loadImager('removeLoadImage');
            $("#loading-image-warranty").loadImager('appendImage');

            //var cst_purchaselastupdate = $('#txt-model-name').val();
            //var warranty_id = warrantyNameId;

            var ddDataWrConfigId = $('#dropdownVhModel').data('ddslick');
            if (!ddDataWrConfigId.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select model "),
                    window.lang.translate("Please select model"));
            }
            else {
                var vehicle_config_type_id = ddDataWrConfigId.selectedData.value;
            }

            var ddDataWrNameId = $('#dropdownWrName').data('ddslick');
            if (!ddDataWrNameId.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select warranty name "),
                    window.lang.translate("Please select warranty name"));
            }
            else {
                var warranty_id = ddDataWrNameId.selectedData.value;
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

            var unique_code = $('#txt-wrUnique-name').val();
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

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_syswarrantymatrix&warranty_id=1&vehicle_config_type_id=8&months1_id=22&mileages1_id=5&warranty_types_id=1&ismaintenance=1&unique_code=asdasdasd&price_in_euros=56&pk=GsZVzEYe50uGgNM&id=2

            if (!warrantyInfoID == "") {
                var ajax_InsertWarrantyInfo = $('#ajaxACL-insertwarrantyName').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-warranty",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_syswarrantymatrix)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_syswarrantymatrix)"),

                    proxy: '/Warranty/AddWarrantyInfo',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_syswarrantymatrix",
                        id: warrantyInfoID,
                        warranty_id: warranty_id,
                        vehicle_config_type_id: vehicle_config_type_id,
                        months1_id: months1_id,
                        mileages1_id: mileages1_id,
                        warranty_types_id: warranty_types_id,
                        ismaintenance: ismaintenance,
                        unique_code: unique_code,
                        price_in_euros: price_in_euros,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertWarrantyInfo.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetwarrantyForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_warranty").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertWarrantyInfo.ajaxCallWidget('call');
            }
            else {
                var ajax_InsertWarrantyInfo = $('#ajaxACL-insertwarrantyName').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-warranty",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_syswarrantymatrix)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_syswarrantymatrix)"),

                    proxy: '/Warranty/AddWarrantyInfo',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_syswarrantymatrix",
                        warranty_id: warranty_id,
                        vehicle_config_type_id: vehicle_config_type_id,
                        months1_id: months1_id,
                        mileages1_id: mileages1_id,
                        warranty_types_id: warranty_types_id,
                        ismaintenance: ismaintenance,
                        unique_code: unique_code,
                        price_in_euros: price_in_euros,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertWarrantyInfo.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetwarrantyForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_warranty").dxDataGrid("instance").refresh();
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
        $("#loading-image-warranty").loadImager('removeLoadImage');
        $("#loading-image-warranty").loadImager('appendImage');

        $('#warrantyForm').validationEngine('hide');
        $('#dropdownModel').ddslick('select', { index: String(0) });
        $('#dropdownVhModel').ddslick('select', { index: String(0) });
        ddslick_warrantyId = 0;
        ddslick_warranty_name = "";
        $('#dropdownWrType').ddslick('select', { index: String(0) });
        $('#dropdownWrMil').ddslick('select', { index: String(0) });
        $('#dropdownWrMonth').ddslick('select', { index: String(0) });
        $('#dropdownRm').ddslick('select', { index: String(0) });
        $("#loading-image-warranty").loadImager('removeLoadImage');
        
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
        $("#loading-image-warranty").loadImager('removeLoadImage');
        $("#loading-image-warranty").loadImager('appendImage');

        ddslick_modelId = data.vehicle_group_id;
        ddslick_model_name = data.vehicle_group;

        ddslick_warrantyId = data.warranty_id;
        ddslick_warranty_name = data.vehicle_group_name;

        $('#dropdownModel').ddslick('selectByValue',
            {
                index: '' + data.vehicle_group_id + '',
                text: '' + data.vehicle_group + ''
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
        $("#loading-image-warranty").loadImager('removeLoadImage');
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
            var ajax_activepasiveWrMatrix = $('#ajaxACL-warrantyList').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-warrantyGrid",
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
                $("#gridContainer_warranty").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveWrMatrix.ajaxCallWidget('call');
        $('#warrantyListRefresh').click();
    }



/////////////////////////Warranty Name//////////////////////////////
/**
* insert traning name
* @returns {undefined}
* @since 29/08/2018
*/
    $("#btn-warrantyName-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#warrantyNameForm").validationEngine('validate')) {
            //window.insertwarrantyName = function () {

            $("#loading-image-warrantyName").loadImager('removeLoadImage');
            $("#loading-image-warrantyName").loadImager('appendImage');

            var ddData = $('#dropdownModelName').data('ddslick');
            if (!ddData.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Model "),
                window.lang.translate("Please select Model"));
            }
            else {
                var vehicle_group_id = ddData.selectedData.value;
            }
            var warrantyName = $('#txt-wrName-name').val();

            // http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syswarranties&name=dennee&vehicle_group_id=8&pk=GsZVzEYe50uGgNM
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_syswarranties&name=denneea&vehicle_group_id=8&id=5&pk=GsZVzEYe50uGgNM
            if (!warrantyNameID == "") {
                var ajax_InsertWarrantyName = $('#ajaxACL-insertwarrantyName').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-warrantyName",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_syswarranties)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_syswarranties)"),

                    proxy: '/Warranty/AddWarrantyName',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_syswarranties",
                        id: warrantyNameID,
                        name: warrantyName,
                        vehicle_group_id: vehicle_group_id,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertWarrantyName.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetwarrantyNameForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_warrantyName").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertWarrantyName.ajaxCallWidget('call');
            }
            else { 
                var ajax_InsertWarrantyName = $('#ajaxACL-insertwarrantyName').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-warrantyName",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_syswarranties)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_syswarranties)"),

                    proxy: '/Warranty/AddWarrantyName',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_syswarranties",
                        name: warrantyName,
                        vehicle_group_id: vehicle_group_id,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertWarrantyName.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetwarrantyNameForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_warrantyName").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertWarrantyName.ajaxCallWidget('call');
            }
            warrantyNameID = "";
            return false;
        }
    })

/**
* Fill model form
* @returns {Boolean}
* @author Ceydacan Seyrek
* @since 14/08/2018
*/
var warrantyNameId = "";
    window.fillwarrantyNameForm = function (data) {
        $("#loading-image-warrantyName").loadImager('removeLoadImage');
        $("#loading-image-warrantyName").loadImager('appendImage');

        $('#dropdownModelName').ddslick('selectByValue',
            {
                index: '' + data.vehicle_group_id + '',
                text: '' + data.name + ''
            }
        );
        document.getElementById("txt-wrName-name").value = data.name;
        //document.getElementById("txt-wrName-VhType").value = data.vehicle_group_name;
        //document.getElementById("txt-wrName-WrName").value = data.name;

        $("#loading-image-warrantyName").loadImager('removeLoadImage');

        warrantyNameId = data.id;
        VhType = data.vehicle_group_name;
        //$("#warranty_tab").organizeTabs('enableAllTabs');
        //tab_active();
        return false;
    }

/**
* reset model Form
* @returns {undefined}
* @author Ceydacan Seyrek
* @since 14/08/2018
*/
    $("#btn-warrantyName-clear").on("click", function (e) {
        e.preventDefault();
        resetwarrantyNameForm();
        return false;
    })

    var resetwarrantyNameForm = function () {
        $("#loading-image-warrantyName").loadImager('removeLoadImage');
        $("#loading-image-warrantyName").loadImager('appendImage');

        $('#warrantyNameForm')[0].reset();
        $('#warrantyNameForm').validationEngine('hide');
        $('#dropdownModelName').ddslick('select', { index: String(0) });

        $("#loading-image-warrantyName").loadImager('removeLoadImage');

        //tab_disable();
        return false;
    }

//ActivePasive Warranty Name

    window.activepasiveWrName = function (wrName_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syswarranties&id=29&pk=GsZVzEYe50uGgNM
        var ajax_activepasiveWrName = $('#ajaxACL-wrNameList').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-warrantyNameGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_syswarranties)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_syswarranties)"),
            proxy: '/Warranty/SysActivePasiveWrName',
            type: "POST",
            data: JSON.stringify({
                id: wrName_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syswarranties"
            }),

        });
        ajax_activepasiveWrName.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_warantyName").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveWrName.ajaxCallWidget('call');
        $('#wrNameListRefresh').click();
    }

});
