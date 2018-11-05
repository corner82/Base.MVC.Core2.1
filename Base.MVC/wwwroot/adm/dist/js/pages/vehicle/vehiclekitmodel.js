/*
* vehiclekittype Form
* @author Gül Özdemir
* @since 31/10/2018
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

    var selectedVehicleKitModelId = 0;
    /*
    * vehiclekitmodel LoadImager
    * @author Gül Özdemir
    * @since 23/10/2018
    */
    //to vehiclekitmodel form
    $("#loadingImage_DdslickVehicleKitType").loadImager();

    $("#loadingImage_purposeof").loadImager();

    $("#loadingImage_vehiclekitmodel").loadImager();
    

    //to ehicle kit-model form grid loading-image
    $("#loading-image-vehiclekitmodelGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#vehiclekitmodelForm').validationEngine();


    $('#loadingImage_purposeof').loadImager('removeLoadImage');
    $('#loadingImage_purposeof').loadImager('appendImage');
    //Vehicle Order / General
    var ajaxACLResources_purposeof = $('#ajax_DdslickPurposeOf').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_purposeof",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkPlaceOfUseDdList_sysplaceofuse)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkPlaceOfUseDdList_sysplaceofuse)"),
        proxy: '/Vehicle/SysVehiclePurposeOf/',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkPlaceOfUseDdList_sysplaceofuse",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_purposeof.ajaxCallWidget({
        onSuccess: function (event, datapurposeof) {
            var cbdata_purposeof = $.parseJSON(datapurposeof);
            cbdata_purposeof.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickPurposeOf').ddslick({
                data: cbdata_purposeof,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);
                        
                    }

                }
            });

            $("#loadingImage_purposeof").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_purposeof").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_purposeof.ajaxCallWidget('call');



    $('#loadingImage_DdslickVehicleKitType').loadImager('removeLoadImage');
    $('#loadingImage_DdslickVehicleKitType').loadImager('appendImage');
    //CKD / CBU
    var ajaxACLResources_vehiclekittype = $('#ajax_DdslickVehicleKitType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleKitType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkVehicleCkdCbuDdList_sysvehicleckdcbu)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkVehicleCkdCbuDdList_sysvehicleckdcbu)"),
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

    DevExpress.localization.locale(langCode);

    /**
    *.vehicleKitmodelList Refresh
    * @returns 
    * @author Gül Özdemir
    * @since 03/09/2018
    */

    $('#vehiclekitmodelList').click(function () {

        /* devexgrid */
        var vehiclekitmodel_data = new DevExpress.data.CustomStore({
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
                    url: '/Vehicle/VehicleKitModelGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillVehicleGroupsGridx_sysvehiclegroups",
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
                        deferred.reject("Data Loading Error (pkFillVehicleGroupsGridx_sysvehiclegroups)");
                    },
                    timeout: 30000
                });

                return deferred.promise();
            },
            remove: function (key) {
                var deferred = $.Deferred();
                //alert(selectedVehicleKitModelId);

                return $.ajax({
                    url: '/Vehicle/DeleteVehicleKitModel',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedVehicleKitModelId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysvehiclegroups"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error (pkDeletedAct_sysvehiclegroups)");
                    },
                    timeout: 30000
                });
            }
        });


        $(function () {
            $("#gridContainer_vehiclekitmodel").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: vehiclekitmodel_data,

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
                    fileName: window.lang.translate('VehicleKitModelList')
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
                            var vehiclekitmodel_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveVehicleKitModel(vehiclekitmodel_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveVehicleKitModel(vehiclekitmodel_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, {
                        caption: window.lang.translate('Purpose of'),
                        dataField: "place_of_use_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Vehicle kit type'),
                        dataField: "cbuckd_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Vehicle model'),
                        dataField: "name",
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
                        selectedVehicleKitModelId = data.id;
                        
                        fillVehicleKitModelForm(data);

                    }
                },

                onRowRemoving: function (e) {
                    selectedVehicleKitModelId = e.key.id;

                    //alert(selectedVehicleKitModelId);
                },

                onRowRemoved: function (e) {
                    $("#gridContainer_vehiclekitmodel").dxDataGrid("instance").refresh();
                },

            });
        });
    })

    $('#vehiclekitmodelList').click();


    /**
 * insert / Update Vehicle Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 15/10/2018
 */

    $("#btn-vehiclekitmodel-save").on("click", function (e) {
        e.preventDefault();

        if ($("#vehiclekitmodelForm").validationEngine('validate')) {

            $("#loadingImage_vehiclekitmodel").loadImager('removeLoadImage');
            $("#loadingImage_vehiclekitmodel").loadImager('appendImage');

            var modelName = $('#txt-vehiclemodel-name').val();

            var ddData_VehicleKitType = $('#ddslickVehicleKitType').data('ddslick');
            var vehicleKitTypeId = ddData_VehicleKitType.selectedData.value;

            var ddData_Purposeof = $('#ddslickPurposeOf').data('ddslick');
            var purposeofId = ddData_Purposeof.selectedData.value;

            //alert(selectedVehicleKitModelId);

            var ajax;
            if (selectedVehicleKitModelId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-vehiclekitmodel').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_vehiclekitmodel",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_sysvehiclegroups)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_sysvehiclegroups)"),
                    proxy: '/Vehicle/InsertVehicleKitModel',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertAct_sysvehiclegroups",
                        name: modelName,
                        place_of_use_id: purposeofId,
                        kit_type_id: vehicleKitTypeId,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_vehiclekitmodel").dxDataGrid("instance").refresh();
                        $("#loadingImage_vehiclekitmodel").loadImager('removeLoadImage');
                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-vehiclekitmodel').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_vehiclekitmodel",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_sysvehiclegroups)"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_sysvehiclegroups)"),
                            proxy: '/Vehicle/UpdateVehicleKitModel',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedVehicleKitModelId,
                                url: "pkUpdateAct_sysvehiclegroups",
                                name: modelName,
                                place_of_use_id: purposeofId,
                                kit_type_id: vehicleKitTypeId,
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_vehiclekitmodel").dxDataGrid("instance").refresh();
                                $("#loadingImage_vehiclekitmodel").loadImager('removeLoadImage');
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Vehicle Kit-Model data will be updated, do you want to proceed?', 'Vehicle Kit-Model data will be updated, do you want to proceed?');
            }
        }
        return false;

    })

    /**
    * fillVehicleForm
    * @returns 
    * @author Gül Özdemir
    * @since 31/10/2018
    */

    window.fillVehicleKitModelForm = function (data) {
        $("#loadingImage_FormVehicleKitModel").loadImager('removeLoadImage');
        $("#loadingImage_FormVehicleKitModel").loadImager('appendImage');

        resetVehicleKitModelForm();

        selectedVehicleKitModelId = data.id;

        $('#ddslickPurposeOf').ddslick('selectByValue',
            {
                index: '' + data.place_of_use_id + '',
                value: '' + data.place_of_use_name + ''
            }
        );

        $('#ddslickVehicleKitType').ddslick('selectByValue',
            {
                index: '' + data.kit_type_id + '',
                value: '' + data.cbuckd_name + ''
            }
        );
        if (data.name) {
            document.getElementById("txt-vehiclemodel-name").value = data.name;
        } else {
            document.getElementById("txt-vehiclemodel-name").value = "";
        }
        $("#loadingImage_FormVehicleKitModel").loadImager('removeLoadImage');

        return false;
    }


/**
* reset vehicle kit-model Form
* @returns {undefined}
* @author Gül Özdemir
* @since 31/10/2018
*/

    window.resetVehicleKitModelForm = function () {
        $("#loadingImage_vehiclekitmodel").loadImager('removeLoadImage');
        $("#loadingImage_vehiclekitmodel").loadImager('appendImage');

        selectedVehicleKitModelId = 0;

        $('#vehiclekitmodelForm').validationEngine('hide');
        $('#ddslickPurposeOf').ddslick('select', { index: String(0) });
        $('#ddslickVehicleKitType').ddslick('select', { index: String(0) });
        
        $("#loadingImage_vehiclekitmodel").loadImager('removeLoadImage');

        return false;
    }

/**
* active/passive vehicle kit-model Form
* @returns {undefined}
* @author Gül Özdemir
* @since 31/10/2018
*/

    window.activepassiveVehicleKitModel = function (vehiclekitmodel_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }
        $("#loading-image-vehiclekitmodelGrid").loadImager('removeLoadImage');
        $("#loading-image-vehiclekitmodelGrid").loadImager('appendImage');

        var ajax_activepassivevehiclekitmodellist = $('#ajaxACL-vehiclekitmodellist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-vehiclekitmodelGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_sysvehiclegroups)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_sysvehiclegroups)"),
            proxy: '/Vehicle/ActivePassiveVehicleKitModel',
            type: "POST",
            data: JSON.stringify({
                id: vehiclekitmodel_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysvehiclegroups"
            }),

        });
        ajax_activepassivevehiclekitmodellist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {
            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_vehiclekitmodel").dxDataGrid("instance").refresh();
                $("#loading-image-vehiclekitmodelGrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassivevehiclekitmodellist.ajaxCallWidget('call');

    }
    
});

