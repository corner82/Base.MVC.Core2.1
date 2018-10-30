/*
* body Form
* @author Gül Özdemir
* @since 03/09/2018
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


    /*
    * Body LoadImager
    * @author Gül Özdemir
    * @since 03/09/2018
    */
    //to body form
    //to body feature name form
    
    $("#loading-image-bodyname").loadImager();
    $("#loading-image-body").loadImager();
    $("#loading-image-bodytype").loadImager();
    $("#loading-image-vehiclemodel").loadImager();
    $("#loading-image-supplier").loadImager();
    $("#loading-image-fbodyname").loadImager();

    $("#loading-image-featurename").loadImager();

    //to body feature name form grid loading-image
    $("#loading-image-bodynameGrid").loadImager();
    //to body form grid loading-image
    $("#loading-image-bodyGrid").loadImager();


    var selectedBodynameId = 0;
    var selectedBodyId = 0;

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

    $('#bodynameForm').validationEngine();
    $('#bodyForm').validationEngine();



    //Body Type
    //Options

    $('#loading-image-bodytype').loadImager('removeLoadImage');
    $('#loading-image-bodytype').loadImager('appendImage');

    var ajaxACLResources_bodytype = $('#ajaxACL-bodytype').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-bodytype",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Accessory/BodyTypeDdslick/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkBodyFeatureTypesDdList_sysaccbodytypes",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_bodytype.ajaxCallWidget({
        onSuccess: function (event, databodytype) {
            var cbdata_bodytype = $.parseJSON(databodytype);
            cbdata_bodytype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownBodyType').ddslick({
                data: cbdata_bodytype,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-bodytype").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-bodytype").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_bodytype.ajaxCallWidget('call');


    //CLA, TGM, TGS, VW, XHCV

    $('#loading-image-vehiclemodel').loadImager('removeLoadImage');
    $('#loading-image-vehiclemodel').loadImager('appendImage');

    var ajaxACLResources_vehiclemodel = $('#ajaxACL-vehiclemodel').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-vehiclemodel",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
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
                { text: window.lang.translate('ALL'), value: 0, selected: true, description: "" }
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

    //supplier

    $('#loading-image-supplier').loadImager('removeLoadImage');
    $('#loading-image-supplier').loadImager('appendImage');

    var ajaxACLResources_supplier = $('#ajaxACL-supplier').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-supplier",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
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

    //Feature body Name (Back office / Salesman)
    //Servisten Name ve Description Alanları dolu gelecek. Biri Backoffice, diğeri Salesman için. 
    //BodyFeatureNameDdslick
    //pkAccDeffSaBoDdList_sysaccdeff 

    $('#loading-image-fbodyname').loadImager('removeLoadImage');
    $('#loading-image-fbodyname').loadImager('appendImage');

    var ajaxACLResources_fbodyname = $('#ajaxACL-fbodyname').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-fbodyname",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Accessory/AccessoryFeatureNameDdslick/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkAccBodyDeffDdList_sysaccbodydeff",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_fbodyname.ajaxCallWidget({
        onSuccess: function (event, databodyname) {
            var cbdata_bodyname = $.parseJSON(databodyname);
            cbdata_bodyname.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownFBodyName').ddslick({
                data: cbdata_badyname,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-fbodyname").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-fbodyname").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_fbodyname.ajaxCallWidget('call');


    //////////////////////////////////////////////////////////////////////////////////////////////
    /**
    * bodyList Refresh
    * @returns 
    * @author Gül Özdemir
    * @since 26/10/2018
    */

    $('#bodyList').click(function () {

        /* devexgrid */
        var body_data = new DevExpress.data.CustomStore({
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
                    url: '/Accessory/BodyGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillAccBodyDeffGridx_sysaccbodydeff",
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
                    url: '/Accessory/DeleteBody',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedBodyId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysaccbodymatrix"
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
            $("#gridContainer_body").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: body_data,

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
                    fileName: window.lang.translate('BodyList')
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
                            var body_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveBody(body_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveBody(body_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }
                        /*
                         {"id":"3","apid":3,
                         "vehicle_gtname":"LMC6 - 26.280",
                         "supplier_name":"ANCHOR (SPECS ARE DIFF)",
                         "body_deff_name":"Drop side body 7.2m",
                         "body_type_name":"Body Feature",
                         "vehicle_gt_models_id":1,
                         "supplier_id":3,
                         "cost":"22.000",
                         "acc_body_deff_id":1,
                         "acc_body_type_id":1,
                         "op_username":"mustafa.zeynel.admin@ostim.com.tr",
                         "active":0,
                         "state_active":"Active","date_saved":"2018-09-23 21:59:49",
                         "date_modified":null,"language_code":"en","language_name":"English",
                         "language_id":"385","op_user_id":16}
                         */
                    }, {
                        caption: window.lang.translate('Body type name'),
                        dataField: "body_type_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Body name'),
                        dataField: "body_deff_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Vehicle model'),
                        dataField: "vehicle_gtname",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Supplier name'),
                        dataField: "supplier_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Embrace number'),
                        dataField: "body_embrace_no",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Cost'),
                        dataField: "cost",
                        encodeHtml: false,
                        alignment: "right"
                    }, {
                        caption: window.lang.translate('List Price'),
                        dataField: "cost",
                        encodeHtml: false,
                        alignment: "right"
                    }
                ],
                //{"id":"3","apid":3,"vehicle_gtname":"LMC6 - 26.280",
                //"supplier_name": "ANCHOR (SPECS ARE DIFF)", "body_deff_name": "Drop side body 7.2m", 
                //"body_type_name": "Body Feature", "vehicle_gt_models_id": 1, 
                //"supplier_id": 3, "cost": "22.000", "acc_body_deff_id": 1, "acc_body_type_id": 1, 
                //"op_username": "mustafa.zeynel.admin@ostim.com.tr", "active": 0, "state_active": "Active", 
                //"date_saved": "2018-09-23 21:59:49", "date_modified": null, "language_code": "en", 
                //"language_name": "English", "language_id": "385", "op_user_id": 16

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
                        selectedBodyId = data.id;

                        fillBodyForm(data);

                    }
                },

                onRowRemoving: function (e) {
                    selectedBodyId = e.key.id;

                },

                onRowRemoved: function (e) {
                    $("#gridContainer_body").dxDataGrid("instance").refresh();
                },

            });
        });
    })

    $('#bodyList').click();


/**
 * Insert Body
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 24/10/2018
 */

    $("#btn-body-save").on("click", function (e) {
        e.preventDefault();

        if ($("#bodyForm").validationEngine('validate')) {

            $("#loading-image-bodyform").loadImager('removeLoadImage');
            $("#loading-image-bodyform").loadImager('appendImage');

            var ddData_vehiclemodel = $('#dropdownVehicleModel').data('ddslick')
            var vehiclemodel_id = ddData_vehiclemodel.selectedData.value;

            var ddData_kp = $('#dropdownKPNo').data('ddslick')
            var kp_id = ddData_kp.selectedData.value;

            var ddData_supplier = $('#dropdownSupplier').data('ddslick')
            var supplier_id = ddData_supplier.selectedData.value;

            var ddData_accfname = $('#dropdownFBodyName').data('ddslick')
            var bodyname_id = ddData_accfname.selectedData.value;

            var ddData_options = $('#dropdownOptions').data('ddslick')
            var options_id = ddData_options.selectedData.value;

            var embrace_number = $('#txt-embrace-number').val();
            var cost_local = $('#txt-cost-local').val();
            var cost_national = $('#txt-cost-national').val();
            var partnumber_local = $('#txt-partnumber-local').val();
            var partnumber_national = $('#txt-partnumber-international').val();
            var list_price = $('#txt-list-price').val();

            var ajax;
            if (selectedBodyId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-body').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-bodyform",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                    proxy: '/Accessory/InsertBody',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertAct_sysaccbodymatrix",
                        vehicle_group_id: vehiclemodel_id ,
                        kpnumber_id: kp_id,
                        supplier_id: supplier_id,
                        acc_deff_id: bodyname_id,
                        body_option_id: options_id,
                        cost_local: cost_local,
                        cost_national: cost_national,
                        part_num_local: partnumber_local,
                        part_num_nat: partnumber_national,
                        body_embrace_no: embrace_number,
                        list_price: list_price,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_body").dxDataGrid("instance").refresh();
                        $("#loadingImage_bodyform").loadImager('removeLoadImage');
                        resetBodyForm();

                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-body').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-bodyform",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Accessory/UpdateBody',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedAccessoryId,
                                url: "pkUpdateAct_sysaccbodydeff",
                                vehicle_group_id: vehiclemodel_id,
                                kpnumber_id: kp_id,
                                supplier_id: supplier_id,
                                acc_deff_id: bodyname_id,
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
                wcm.warningComplexMessage('show', 'Body is update! Are you sure?', 'Body is update! Are you sure?');
            }
        }
        return false;

    })

 /**
 * reset Body Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */

    window.resetBodyForm = function () {
        $("#loading-image-body").loadImager('removeLoadImage');
        $("#loading-image-body").loadImager('appendImage');

        selectedBodyId = 0;

        $('#bodyForm').validationEngine('hide');

        $('#dropdownVehicleModel').ddslick('select', { index: String(0) });
        $('#dropdownSupplier').ddslick('select', { index: String(0) });
        $('#dropdownFBodyName').ddslick('select', { index: String(0) });
        
        $("#loading-image-body").loadImager('removeLoadImage');

        return false;
    }


    /**
    * Fill Body form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 03/09/2018
    */

    window.fillBodyForm = function (data) {
        $("#loading-image-body").loadImager('removeLoadImage');
        $("#loading-image-body").loadImager('appendImage');

        if (data.body_embrace_no) {
            document.getElementById("txt-embrace-number").value = data.body_embrace_no;
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

        if (data.supplier_id) {
            $('#dropdownSupplier').ddslick('selectByValue',
                {
                    index: data.supplier_id,
                    value: data.supplier_name
                }
            );
        }

        if (data.acc_deff_id) {
            $('#dropdownFBodyName').ddslick('selectByValue',
                {
                    index: data.acc_deff_id,
                    value: data.name_acc_deff_sm
                }
            );
        }

        if (data.body_option_id) {
            $('#dropdownOptions').ddslick('selectByValue',
                {
                    index: data.body_option_id,
                    value: data.name_acc_opt
                }
            );
        }
        
        $("#loading-image-body").loadImager('removeLoadImage');

        return false;
    }


    window.activepassiveBody = function (body_id, active) {
        $("#loading-image-bodyGrid").loadImager('removeLoadImage');
        $("#loading-image-bodyGrid").loadImager('appendImage');

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassivebodylist = $('#ajaxACL-bodylist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-bodyGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Accessory/ActivePassiveBody',
            type: "POST",
            data: JSON.stringify({
                id: body_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysaccbodymatrix"
            }),

        });
        ajax_activepassivebodylist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_body").dxDataGrid("instance").refresh();
                $("#loading-image-bodyGrid").loadImager('removeLoadImage');
            },
            onError: function (event, data) {

            },
        })
        ajax_activepassivebodylist.ajaxCallWidget('call');

    }


    //////////////////////////////////////////////////////////////////////////////////////////////
    /**
    * bodynameList Refresh
    * @returns 
    * @author Gül Özdemir
    * @since 24/10/2018
    */

    $('#bodynameList').click(function () {

        /* devexgrid */
        var bodyname_data = new DevExpress.data.CustomStore({
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
                    url: '/Accessory/BodyFeatureGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillAccBodyDeffGridx_sysaccbodydeff",
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
                    url: '/Accessory/DeleteBodyFeature',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedBodynameId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysaccbodydeff"
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
            $("#gridContainer_bodyname").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: bodyname_data,

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
                    fileName: window.lang.translate('BodyFeatureList')
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
                            var bodyname_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveBodyName(bodyname_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveBodyName(bodyname_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, {
                        caption: window.lang.translate('Feature name'),
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
                        selectedBodynameId = data.id;
                        
                        fillBodyNameForm(data);

                    }
                },

                onRowRemoving: function (e) {
                    selectedBodynameId = e.key.id;

                },

                onRowRemoved: function (e) {
                    $("#gridContainer_bodyname").dxDataGrid("instance").refresh();
                },

            });
        });
    })

    $('#bodynameList').click();

/**
 * Insert BodyFeatureName
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 24/10/2018
 */

    $("#btn-bodyname-save").on("click", function (e) {
        e.preventDefault();

        if ($("#bodynameForm").validationEngine('validate')) {

            $("#loading-image-bodynameform").loadImager('removeLoadImage');
            $("#loading-image-bodynameform").loadImager('appendImage');

            var body_featurename = $('#txt-body-featurename').val();

            var ddData_bodytype = $('#dropdownBodyType').data('ddslick')
            var bodytype_id = ddData_bodytype.selectedData.value;

            var ajax;
            if (selectedBodynameId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-bodyname').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-bodynameform",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                    proxy: '/Accessory/InsertBodyFeature',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertAct_sysaccbodydeff",
                        acc_body_type_id: bodytype_id,
                        name: body_featurename,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_bodyname").dxDataGrid("instance").refresh();
                        $("#loadingImage_bodynameform").loadImager('removeLoadImage');
                        resetBodyNameForm();
                       
                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-bodyname').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-bodynameform",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Accessory/UpdateBodyFeature',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedBodynameId,
                                url: "pkUpdateAct_sysaccbodydeff",
                                acc_body_type_id: bodytype_id,
                                name: body_featurename,                                
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_bodyname").dxDataGrid("instance").refresh();
                                $("#loadingImage_bodynameform").loadImager('removeLoadImage');
                                resetBodyNameForm();
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Body Feature is update! Are you sure?', 'Body Feature is update! Are you sure?');
            }
        }
        return false;

    })

    /**
    * reset Body Feature Name Form
    * @returns {undefined}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.resetBodyNameForm = function () {
        $("#loading-image-bodynameform").loadImager('removeLoadImage');
        $("#loading-image-bodynameform").loadImager('appendImage');

        selectedBodynameId = 0;
        $('#bodynameForm').validationEngine('hide');
        document.getElementById("txt-body-featurename").value = "";

        $('#dropdownBodyType').ddslick('select', { index: String(0) });

        $("#loading-image-bodynameform").loadImager('removeLoadImage');

        //yeni kayda açık, tablar kapatılıyor
        tab_disable();
       
        return false;
    }


    /**
    * Fill Body Feature Name form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.fillBodyNameForm = function (data) {
        $("#loading-image-bodyname").loadImager('removeLoadImage');
        $("#loading-image-bodyname").loadImager('appendImage');

        document.getElementById("txt-body-featurename").value = data.name;

        if (data.acc_body_type_id) {
            $('#dropdownBodyType').ddslick('selectByValue',
                {
                    index: data.acc_body_type_id,
                    value: data.body_type_name
                }
            );
        } else {
            $('#dropdownBodyType').ddslick('select', { index: String(0) });
        } 

        document.getElementById("txt-body-name").value = data.name;
        document.getElementById("txt-body-type").value = data.body_type_name;

        $("#loading-image-bodyname").loadImager('removeLoadImage');

        tab_active()

        return false;
    }


    window.activepassiveBodyName = function (bodyname_id, active) {
        $("#loading-image-bodynameGrid").loadImager('removeLoadImage');
        $("#loading-image-bodynameGrid").loadImager('appendImage');

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassivebodynamelist = $('#ajaxACL-bodynamelist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-bodynameGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Accessory/ActivePassiveBodyFeature',
            type: "POST",
            data: JSON.stringify({
                id: bodyname_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysaccbodydeff"
            }),

        });
        ajax_activepassivebodynamelist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {
            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_bodyname").dxDataGrid("instance").refresh();
                $("#loading-image-bodynameGrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassivebodynamelist.ajaxCallWidget('call');

    }


 /*
 * body tab click grid refresh
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
            //$('#bodynameList').click();
            $("#gridContainer_bodyname").dxDataGrid("instance").refresh();
        }
        if (target == "#tab_2") {
            // grid refresh olması gerektiği için kullanıldı.
            //$(gridContainer_tab).dxDataGrid("updateDimensions");
            //$('#bodyList').click();
            $("#gridContainer_body").dxDataGrid("instance").refresh();
        }
    });

});

