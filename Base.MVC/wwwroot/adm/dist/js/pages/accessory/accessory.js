/*
* Accessory Form
* @author Gül Özdemir
* @since 03/09/2018
*/
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Cancel',
        actionButtonLabel: 'Continue'
    });


    /*
    * Accessory LoadImager
    * @author Gül Özdemir
    * @since 03/09/2018
    */
    //to accessory form
    //to accessory feature name form
    $("#loading-image-accessorynameform").loadImager();
    $("#loading-image-accessory").loadImager();

    $("#loading-image-vehiclemodel").loadImager();
    $("#loading-image-kp").loadImager();
    $("#loading-image-supplier").loadImager();
    $("#loading-image-faccessoryname").loadImager();
    $("#loading-image-options").loadImager();

    $("#loading-image-featurename").loadImager();

    //to accessory feature name form grid loading-image
    $("#loading-image-accessorynameGrid").loadImager();
    //to accessory form grid loading-image
    $("#loading-image-accessoryGrid").loadImager();


    var selectedAccessorynameId = 0;
    var selectedAccessoryname = "";
    var selectedAccessoryId = 0;

    var langCode = $("#langCode").val();
    //alert(langCode);

    var tab_active = function () {
        //Update & View Mode
        //enabled tabs

        $("a[data-toggle='tab'").prop('disabled', false);
        $("a[data-toggle='tab'").each(function () {
            $(this).attr('href', $(this).prop('data-href')); // restore original href
        });
        $("a[data-toggle='tab'").removeClass('disabled-link');
    }

    var tab_disable = function () {
        //Add new record
        //tablar kapatılacak

        $("a[data-toggle='tab'").prop('disabled', true);
        $("a[data-toggle='tab'").each(function () {
            $(this).prop('data-href', $(this).attr('href')); // hold you original href
            $(this).attr('href', '#'); // clear href
        });
        $("a[data-toggle='tab'").addClass('disabled-link');

    }

    tab_disable();

    $('#accessorynameForm').validationEngine();
    $('#accessoryForm').validationEngine();


    //CLA, TGM, TGS, VW, XHCV

    $('#loading-image-vehiclemodel').loadImager('removeLoadImage');
    $('#loading-image-vehiclemodel').loadImager('appendImage');

    var ajaxACLResources_vehiclemodel = $('#ajaxACL-vehiclemodel').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-vehiclemodel",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkVehicleGroupsDdList_sysvehiclegroups)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkVehicleGroupsDdList_sysvehiclegroups)"),
        proxy: '/Vehicle/SysVehicleGroups/',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_vehiclemodel.ajaxCallWidget({
        onSuccess: function (event, datamodel) {
            var cbdata_model = $.parseJSON(datamodel);
            cbdata_model.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownVehicleModel').ddslick({
                data: cbdata_model,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {

                    if (selectedData.selectedData.value > 0) {
                        //vehicleModel = selectedData.selectedData.text;
                        //ddslick_vehicleModelId = selectedData.selectedData.value;
                    } else {
                        //vehicleModel = "";
                    }
                }
            });

            $("#loading-image-vehiclemodel").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_DdslickVehicleModel").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_vehiclemodel.ajaxCallWidget('call');


    //4x2, 4x4, 6x4, 8x4, 6x6, 8x8, 8x4/4
/*
    var cbdata_kp = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "ALL",
            value: 2,
            selected: false
        },
        {
            text: "KP000637",
            value: 3,
            selected: false
        },
        {
            text: "KP000638",
            value: 4,
            selected: false
        },
        {
            text: "KP000639",
            value: 5,
            selected: false
        },
    ];

    $('#loading-image-kp').loadImager('removeLoadImage');
    $("#loading-image-kp").loadImager('appendImage');

    var ajaxACLResources_kp = $('#ajaxACL-kp').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_kp.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-kp').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownKPNo').ddslick({
                //height: 150,
                data: cbdata_kp,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-kp").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-kp').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('KPNo bulunamamıştır...'), window.lang.translate('KpNo  bulunamamıştır...'));
        },
    })
    ajaxACLResources_kp.ajaxCallWidget('call');
    */

    //KP
    $('#loading-image-kp').loadImager('removeLoadImage');
    $('#loading-image-kp').loadImager('appendImage');

    var ajaxACLResources_kp = $('#ajaxACL-kp').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-kp",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkKpnumbersDdList_syskpnumbers)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkKpnumbersDdList_syskpnumbers)"),
        proxy: '/Vehicle/SysVehicleKPNumbers/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkKpnumbersDdList_syskpnumbers",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_kp.ajaxCallWidget({
        onSuccess: function (event, datakp) {
            var cbdata_kp = $.parseJSON(datakp);
            cbdata_kp.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownKPNo').ddslick({
                data: cbdata_kp,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-kp").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-kp").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_kp.ajaxCallWidget('call');


    //supplier

    $('#loading-image-supplier').loadImager('removeLoadImage');
    $('#loading-image-supplier').loadImager('appendImage');

    var ajaxACLResources_supplier = $('#ajaxACL-supplier').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-supplier",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkSupplierLongDdList_syssupplier)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkSupplierLongDdList_syssupplier)"),
        proxy: '/Sys/SysSupplierDdslick/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkSupplierLongDdList_syssupplier",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_supplier.ajaxCallWidget({
        onSuccess: function (event, datasp) {
            var cbdata_sp = $.parseJSON(datasp);
            cbdata_sp.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownSupplier').ddslick({
                data: cbdata_sp,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-supplier").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-supplier").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_supplier.ajaxCallWidget('call');

    //Feature accessory Name (Back office / Salesman)
    //Servisten Name ve Description Alanları dolu gelecek. Biri Backoffice, diğeri Salesman için. 
    //AccessoryFeatureNameDdslick
    //pkAccDeffSaBoDdList_sysaccdeff 

    $('#loading-image-faccessoryname').loadImager('removeLoadImage');
    $('#loading-image-faccessoryname').loadImager('appendImage');

    var ajaxACLResources_faccessoryname = $('#ajaxACL-faccessoryname').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-faccessoryname",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkAccDeffSaBoDdList_sysaccdeff)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkAccDeffSaBoDdList_sysaccdeff)"),
        proxy: '/Accessory/AccessoryFeatureNameDdslick/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkAccDeffSaBoDdList_sysaccdeff",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_faccessoryname.ajaxCallWidget({
        onSuccess: function (event, dataaccessoryname) {
            var cbdata_accessoryname = $.parseJSON(dataaccessoryname);
            cbdata_accessoryname.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownFAccessoryName').ddslick({
                data: cbdata_accessoryname,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-faccessoryname").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-faccessoryname").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_faccessoryname.ajaxCallWidget('call');

//Options

    $('#loading-image-options').loadImager('removeLoadImage');
    $('#loading-image-options').loadImager('appendImage');

    var ajaxACLResources_options = $('#ajaxACL-options').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-options",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkAccessoryOptionsDdList_sysaccessoryoptions)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkAccessoryOptionsDdList_sysaccessoryoptions)"),
        proxy: '/Accessory/AccessoryOptionsDdslick/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkAccessoryOptionsDdList_sysaccessoryoptions",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_options.ajaxCallWidget({
        onSuccess: function (event, dataoptions) {
            var cbdata_options = $.parseJSON(dataoptions);
            cbdata_options.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownOptions').ddslick({
                data: cbdata_options,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-options").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-options").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_options.ajaxCallWidget('call');


    //////////////////////////////////////////////////////////////////////////////////////////////
    /**
    * accessoryList Refresh
    * @returns 
    * @author Gül Özdemir
    * @since 26/10/2018
    */

    $('#accessoryList').click(function () {

        /* devexgrid */
        var accessory_data = new DevExpress.data.CustomStore({
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
                    url: '/Accessory/AccessoryGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillAccMatrixGridx_sysaccessoriesmatrix",
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
                    timeout: 30000
                });

                return deferred.promise();
            },
            remove: function (key) {
                var deferred = $.Deferred();

                return $.ajax({
                    url: '/Accessory/DeleteAccessory',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedAccessoryId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysaccessoriesmatrix"
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
            }
        });

        //DevExpress.localization.locale(langCode);

        $(function () {
            $("#gridContainer_accessory").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: accessory_data,

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
                    fileName: window.lang.translate('AccessoryList')
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
                            var accessory_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveAccessory(accessory_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveAccessory(accessory_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, {
                        caption: window.lang.translate('Vehicle model'),
                        dataField: "vehicle_group",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('KP number'),
                        dataField: "kp",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Option'),
                        dataField: "name_acc_opt",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Feature name (Salesman)'),
                        dataField: "name_acc_deff_sm",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Feature name (Backoffice)'),
                        dataField: "name_acc_deff_bo",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Supplier name'),
                        dataField: "supplier_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Embrace number'),
                        dataField: "accessory_embrace_no",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Cost local'),
                        dataField: "cost_local",
                        encodeHtml: false,
                        alignment: "right"
                    }, {
                        caption: window.lang.translate('Cost national'),
                        dataField: "cost_national",
                        encodeHtml: false,
                        alignment: "right"
                    }, {
                        caption: window.lang.translate('Part number local'),
                        dataField: "part_num_local",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Part number national'),
                        dataField: "part_num_nat",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('List Price'),
                        dataField: "list_price",
                        encodeHtml: false,
                        alignment: "right"
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
                        selectedAccessoryId = data.id;

                        fillAccessoryForm(data);

                    }
                },

                onRowRemoving: function (e) {
                    selectedAccessoryId = e.key.id;

                },

                onRowRemoved: function (e) {
                    $("#gridContainer_accessory").dxDataGrid("instance").refresh();
                },

            });
        });
    })

    $('#accessoryList').click();


/**
 * Insert Accessory
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 24/10/2018
 */

    $("#btn-accessory-save").on("click", function (e) {
        e.preventDefault();

        if ($("#accessoryForm").validationEngine('validate')) {

            $("#loading-image-accessoryform").loadImager('removeLoadImage');
            $("#loading-image-accessoryform").loadImager('appendImage');

            var ddData_vehiclemodel = $('#dropdownVehicleModel').data('ddslick')
            var vehiclemodel_id = ddData_vehiclemodel.selectedData.value;

            var ddData_kp = $('#dropdownKPNo').data('ddslick')
            var kp_id = ddData_kp.selectedData.value;

            var ddData_supplier = $('#dropdownSupplier').data('ddslick')
            var supplier_id = ddData_supplier.selectedData.value;

            var ddData_accfname = $('#dropdownFAccessoryName').data('ddslick')
            var accessoryname_id = ddData_accfname.selectedData.value;

            var ddData_options = $('#dropdownOptions').data('ddslick')
            var options_id = ddData_options.selectedData.value;

            var embrace_number = $('#txt-embrace-number').val();
            var cost_local = $('#txt-cost-local').val();
            var cost_national = $('#txt-cost-national').val();
            var partnumber_local = $('#txt-partnumber-local').val();
            var partnumber_national = $('#txt-partnumber-international').val();
            var list_price = $('#txt-list-price').val();

            var ajax;
            if (selectedAccessoryId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-accessory').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-accessoryform",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_sysaccessoriesmatrix)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_sysaccessoriesmatrix)"),
                    proxy: '/Accessory/InsertAccessory',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertAct_sysaccessoriesmatrix",
                        vehicle_group_id: vehiclemodel_id ,
                        kpnumber_id: kp_id,
                        supplier_id: supplier_id,
                        acc_deff_id: accessoryname_id,
                        accessory_option_id: options_id,
                        cost_local: cost_local,
                        cost_national: cost_national,
                        part_num_local: partnumber_local,
                        part_num_nat: partnumber_national,
                        accessory_embrace_no: embrace_number,
                        list_price: list_price,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_accessory").dxDataGrid("instance").refresh();
                        $("#loadingImage_accessoryform").loadImager('removeLoadImage');
                        resetAccessoryForm();

                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-accessory').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-accessoryform",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_sysaccessoriesmatrix)"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_sysaccessoriesmatrix)"),
                            proxy: '/Accessory/UpdateAccessory',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedAccessoryId,
                                url: "pkUpdateAct_sysaccessoriesmatrix",
                                vehicle_group_id: vehiclemodel_id,
                                kpnumber_id: kp_id,
                                supplier_id: supplier_id,
                                acc_deff_id: accessoryname_id,
                                accessory_option_id: options_id,
                                cost_local: cost_local,
                                cost_national: cost_national,
                                part_num_local: partnumber_local,
                                part_num_nat: partnumber_national,
                                accessory_embrace_no: embrace_number,
                                list_price: list_price,
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_accessory").dxDataGrid("instance").refresh();
                                $("#loadingImage_accessoryform").loadImager('removeLoadImage');
                                resetAccessoryForm();
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Accesory is update! Are you sure?', 'Accessory is update! Are you sure?');
            }
        }
        return false;

    })

 /**
 * reset Accessory Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */

    window.resetAccessoryForm = function () {
        $("#loading-image-accessory").loadImager('removeLoadImage');
        $("#loading-image-accessory").loadImager('appendImage');

        selectedAccessoryId = 0;

        $('#accessoryForm').validationEngine('hide');

        $('#dropdownVehicleModel').ddslick('select', { index: String(0) });
        $('#dropdownKPNo').ddslick('select', { index: String(0) });
        $('#dropdownSupplier').ddslick('select', { index: String(0) });
        $('#dropdownOptions').ddslick('select', { index: String(0) });
        $('#dropdownFAccessoryName').ddslick('select', { index: String(0) });
        
        $("#loading-image-accessory").loadImager('removeLoadImage');

        return false;
    }


    /**
    * Fill Accessory form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 03/09/2018
    */

    window.fillAccessoryForm = function (data) {
        $("#loading-image-accessory").loadImager('removeLoadImage');
        $("#loading-image-accessory").loadImager('appendImage');

        if (data.accessory_embrace_no) {
            document.getElementById("txt-embrace-number").value = data.accessory_embrace_no;
        } else {
            document.getElementById("txt-embrace-number").value = "";
        }

        if (data.cost_local) {
            document.getElementById("txt-cost-local").value = data.cost_local;
        } else {
            document.getElementById("txt-cost-local").value = "";
        }

        if (data.cost_national) {
            document.getElementById("txt-cost-national").value = data.cost_national;
        } else {
            document.getElementById("txt-cost-national").value = "";
        }

        if (data.part_num_local) {
            document.getElementById("txt-partnumber-local").value = data.part_num_local;
        } else {
            document.getElementById("txt-partnumber-local").value = "";
        }

        if (data.part_num_nat) {
            document.getElementById("txt-partnumber-international").value = data.part_num_nat;
        } else {
            document.getElementById("txt-partnumber-international").value = "";
        }

        if (data.list_price) {
            document.getElementById("txt-list-price").value = data.list_price;
        } else {
            document.getElementById("txt-list-price").value = "";
        }

        if (data.vehicle_group_id) {
            $('#dropdownVehicleModel').ddslick('selectByValue',
                {
                    index: data.vehicle_group_id,
                    value: data.vehicle_group
                }
            );
        }

        if (data.kpnumber_id) {
            $('#dropdownKPNo').ddslick('selectByValue',
                {
                    index: data.kpnumber_id,
                    value: data.kp
                }
            );
        }

        if (data.supplier_id) {
            $('#dropdownSupplier').ddslick('selectByValue',
                {
                    index: data.supplier_id,
                    value: data.supplier_name
                }
            );
        }

        if (data.acc_deff_id) {
            $('#dropdownFAccessoryName').ddslick('selectByValue',
                {
                    index: data.acc_deff_id,
                    value: data.name_acc_deff_sm
                }
            );
        }

        if (data.accessory_option_id) {
            $('#dropdownOptions').ddslick('selectByValue',
                {
                    index: data.accessory_option_id,
                    value: data.name_acc_opt
                }
            );
        }
        
        $("#loading-image-accessory").loadImager('removeLoadImage');

        return false;
    }


    window.activepassiveAccessory = function (accessory_id, active) {
        $("#loading-image-accessoryGrid").loadImager('removeLoadImage');
        $("#loading-image-accessoryGrid").loadImager('appendImage');

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassiveaccessorylist = $('#ajaxACL-accessorylist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-accessoryGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_sysaccessoriesmatrix)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_sysaccessoriesmatrix)"),
            proxy: '/Accessory/ActivePassiveAccessory',
            type: "POST",
            data: JSON.stringify({
                id: accessory_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysaccessoriesmatrix"
            }),

        });
        ajax_activepassiveaccessorylist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_accessory").dxDataGrid("instance").refresh();
                $("#loading-image-accessoryGrid").loadImager('removeLoadImage');
            },
            onError: function (event, data) {

            },
        })
        ajax_activepassiveaccessorylist.ajaxCallWidget('call');

    }


    //////////////////////////////////////////////////////////////////////////////////////////////
    /**
    * accessorynameList Refresh
    * @returns 
    * @author Gül Özdemir
    * @since 24/10/2018
    */

    $('#accessorynameList').click(function () {

        /* devexgrid */
        var accessoryname_data = new DevExpress.data.CustomStore({
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
                    url: '/Accessory/AccessoryFeatureGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillAccDeffGridx_sysaccdeff",
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
                    timeout: 30000
                });

                return deferred.promise();
            },
            remove: function (key) {
                var deferred = $.Deferred();
               
                return $.ajax({
                    url: '/Accessory/DeleteAccessoryFeature',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedAccessorynameId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysaccdeff"
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
            }
        });

        //DevExpress.localization.locale(langCode);

        $(function () {
            $("#gridContainer_accessoryname").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: accessoryname_data,

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
                    fileName: window.lang.translate('AccessoryFeatureList')
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
                            var accessoryname_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveAccessoryName(accessoryname_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveAccessoryName(accessoryname_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, {
                        caption: window.lang.translate('Feature Backoffice'),
                        dataField: "name_bo",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Feature Salesman'),
                        dataField: "name_sm",
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
                        selectedAccessorynameId = data.id;
                        
                        fillAccessoryNameForm(data);

                    }
                },

                onRowRemoving: function (e) {
                    selectedAccessorynameId = e.key.id;

                },

                onRowRemoved: function (e) {
                    $("#gridContainer_accessoryname").dxDataGrid("instance").refresh();
                },

            });
        });
    })

    $('#accessorynameList').click();

/**
 * Insert AccessoryFeatureName
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 24/10/2018
 */

    $("#btn-accessoryname-save").on("click", function (e) {
        e.preventDefault();

        if ($("#accessorynameForm").validationEngine('validate')) {

            $("#loading-image-accessorynameform").loadImager('removeLoadImage');
            $("#loading-image-accessorynameform").loadImager('appendImage');

            var accessory_featurename_bo = $('#txt-featurename-bo').val();
            var accessory_featurename_sm = $('#txt-featurename-sm').val();

            var ajax;
            if (selectedAccessorynameId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-accessoryname').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-accessorynameform",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_sysaccdeff)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_sysaccdeff)"),
                    proxy: '/Accessory/InsertAccessoryFeature',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertAct_sysaccdeff",
                        name_bo: accessory_featurename_bo,
                        name_sm: accessory_featurename_sm,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_accessoryname").dxDataGrid("instance").refresh();
                        $("#loadingImage_accessorynameform").loadImager('removeLoadImage');
                        resetAccessoryNameForm();
                       
                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-accessoryname').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-accessorynameform",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_sysaccdeff)"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_sysaccdeff)"),
                            proxy: '/Accessory/UpdateAccessoryFeature',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedAccessorynameId,
                                url: "pkUpdateAct_sysaccdeff",
                                name_bo: accessory_featurename_bo,
                                name_sm: accessory_featurename_sm,
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_accessoryname").dxDataGrid("instance").refresh();
                                $("#loadingImage_accessorynameform").loadImager('removeLoadImage');
                                resetAccessoryNameForm();
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Accesory Feature is update! Are you sure?', 'Accessory Feature is update! Are you sure?');
            }
        }
        return false;

    })

    /**
    * reset Accessory Feature Name Form
    * @returns {undefined}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.resetAccessoryNameForm = function () {
        $("#loading-image-accessorynameform").loadImager('removeLoadImage');
        $("#loading-image-accessorynameform").loadImager('appendImage');

        selectedAccessorynameId = 0;
        $('#accessorynameForm').validationEngine('hide');
        document.getElementById("txt-featurename-bo").value = "";
        document.getElementById("txt-featurename-sm").value = "";

        $("#loading-image-accessorynameform").loadImager('removeLoadImage');

        //yeni kayda açık, tablar kapatılıyor
        tab_disable();
       
        return false;
    }


    /**
    * Fill Accessory Feature Name form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.fillAccessoryNameForm = function (data) {
        $("#loading-image-accessoryname").loadImager('removeLoadImage');
        $("#loading-image-accessoryname").loadImager('appendImage');

        document.getElementById("txt-featurename-bo").value = data.name_bo;
        document.getElementById("txt-featurename-sm").value = data.name_sm;

        selectedAccessorynameId = data.id;
        selectedAccessoryname = data.name_sm;
        /*
        if (data.id) {
            $('#dropdownFAccessoryName').ddslick('selectByValue',
                {
                    index: data.id,
                    value: data.name_sm
                }
            );
        }
        */
        $("#loading-image-accessoryname").loadImager('removeLoadImage');

        tab_active()

        return false;
    }


    window.activepassiveAccessoryName = function (accessoryname_id, active) {
        $("#loading-image-accessorynameGrid").loadImager('removeLoadImage');
        $("#loading-image-accessorynameGrid").loadImager('appendImage');

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassiveaccessorynamelist = $('#ajaxACL-accessorynamelist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-accessorynameGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_sysaccdeff)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_sysaccdeff)"),
            proxy: '/Accessory/ActivePassiveAccessoryFeature',
            type: "POST",
            data: JSON.stringify({
                id: accessoryname_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysaccdeff"
            }),

        });
        ajax_activepassiveaccessorynamelist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {
            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_accessoryname").dxDataGrid("instance").refresh();
                $("#loading-image-accessorynameGrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassiveaccessorynamelist.ajaxCallWidget('call');

    }


 /*
 * accessory tab click grid refresh
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 26/10/2018
 */

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
        //alert(target);
        if (target == "#tab_1") {
            // grid refresh olması gerektiği için kullanıldı.
            //$(gridContainer_tab).dxDataGrid("updateDimensions");
            //$('#accessorynameList').click();
            $("#gridContainer_accessoryname").dxDataGrid("instance").refresh();
        }
        if (target == "#tab_2") {
            // grid refresh olması gerektiği için kullanıldı.
            //$(gridContainer_tab).dxDataGrid("updateDimensions");
            //$('#accessoryList').click();
            /*
            $('#dropdownFAccessoryName').ddslick('selectByValue',
                {
                    index: selectedAccessorynameId,
                    value: selectedAccessoryname
                }
            );
            */
            $("#gridContainer_accessory").dxDataGrid("instance").refresh();
        }
    });

});

