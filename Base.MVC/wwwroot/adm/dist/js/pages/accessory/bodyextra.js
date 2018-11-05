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
        denyButtonLabel: 'Cancel',
        actionButtonLabel: 'Continue'
    });


    /*
    * Body LoadImager
    * @author Gül Özdemir
    * @since 03/09/2018
    */
    //to body form
    //to body feature name form
    
    $("#loading-image-bodyextraname").loadImager();
    $("#loading-image-bodyextra").loadImager();
    $("#loading-image-supplier").loadImager();
    $("#loading-image-fbodyextraname").loadImager();

    $("#loading-image-featurename").loadImager();

    //to body feature name form grid loading-image
    $("#loading-image-bodyextranameGrid").loadImager();
    //to body form grid loading-image
    $("#loading-image-bodyextraGrid").loadImager();


    var selectedBodyextranameId = 0;
    var selectedBodyextraname = "";
    var selectedBodyextraId = 0;

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

    $('#bodyextranameForm').validationEngine();
    $('#bodyextraForm').validationEngine();

    
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


    //////////////////////////////////////////////////////////////////////////////////////////////
    /**
    * bodyextraList Refresh
    * @returns 
    * @author Gül Özdemir
    * @since 31/10/2018
    */

    $('#bodyextraList').click(function () {

        /* devexgrid */
        var bodyextra_data = new DevExpress.data.CustomStore({
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
                    url: '/Accessory/BodyextraGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillBodyExtrasMatrixGridx_sysaccbodymatrix",
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
                    url: '/Accessory/DeleteBodyextra',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedBodyextraId,
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
            $("#gridContainer_bodyextra").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: bodyextra_data,

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
                    fileName: window.lang.translate('BodyextraList')
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
                            var bodyextra_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveBodyextra(bodyextra_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveBodyextra(bodyextra_id, options.data.active);

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
                        caption: window.lang.translate('Body extra name'),
                        dataField: "body_deff_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Supplier name'),
                        dataField: "supplier_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Cost'),
                        dataField: "cost",
                        encodeHtml: false,
                        alignment: "right"
                    }, {
                        caption: window.lang.translate('List Price'),
                        dataField: "list_price",
                        encodeHtml: false,
                        alignment: "right"
                    }, {
                        caption: window.lang.translate('Embrace number'),
                        dataField: "embrace_no",
                        encodeHtml: false
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
                        selectedBodyextraId = data.id;

                        fillBodyextraForm(data);

                    }
                },

                onRowRemoving: function (e) {
                    selectedBodyextraId = e.key.id;

                },

                onRowRemoved: function (e) {
                    $("#gridContainer_bodyextra").dxDataGrid("instance").refresh();
                },

            });
        });
    })

    $('#bodyextraList').click();


/**
 * Insert Bodyextra
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 24/10/2018
 */

    $("#btn-bodyextra-save").on("click", function (e) {
        e.preventDefault();

        if ($("#bodyextraForm").validationEngine('validate')) {

            $("#loading-image-bodyextraform").loadImager('removeLoadImage');
            $("#loading-image-bodyextraform").loadImager('appendImage');

            var ddData_supplier = $('#dropdownSupplier').data('ddslick')
            var supplier_id = ddData_supplier.selectedData.value;

            var bodyextra_name = $('#txt-bodyextraname').val();
            var cost = $('#txt-cost').val();
            var list_price = $('#txt-list-price').val();
            var embrace_number = $('#txt-embrace-no').val();

            //alert(embrace_number);

            var ajax;
            if (selectedBodyextraId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-bodyextra').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-bodyextraform",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_sysaccbodymatrix)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_sysaccbodymatrix)"),
                    proxy: '/Accessory/InsertBodyextra',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertAct_sysaccbodymatrix", //bakılacak
                        supplier_id: supplier_id,
                        acc_body_deff_id: selectedBodyextranameId,
                        cost: cost,
                        list_price: list_price,
                        embrace_no: embrace_number,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_bodyextra").dxDataGrid("instance").refresh();
                        $("#loadingImage_bodyextraform").loadImager('removeLoadImage');
                        resetBodyextraForm();

                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-bodyextra').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-bodyextraform",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_sysaccbodydeff)"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_sysaccbodydeff)"),
                            proxy: '/Accessory/UpdateBodyextra',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedBodyextraId,
                                url: "pkUpdateAct_sysaccbodydeff", 
                                acc_body_deff_id: selectedBodyextranameId,
                                supplier_id: supplier_id,
                                cost: cost,
                                list_price: list_price,
                                embrace_no: embrace_number,
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_bodyextra").dxDataGrid("instance").refresh();
                                $("#loadingImage_bodyextraform").loadImager('removeLoadImage');
                                resetBodyextraForm();
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Body extra is update! Are you sure?', 'Body extra is update! Are you sure?');
            }
        }
        return false;

    })

 /**
 * reset Body extra Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 31/10/2018
 */

    window.resetBodyextraForm = function () {
        $("#loading-image-bodyextra").loadImager('removeLoadImage');
        $("#loading-image-bodyextra").loadImager('appendImage');

        selectedBodyextraId = 0;

        $('#bodyextraForm').validationEngine('hide');

        document.getElementById("txt-bodyextra-name").value = selectedBodyextraname;

        //$('#dropdownFBodyextraName').ddslick('select', { index: String(0) });
        $('#dropdownSupplier').ddslick('select', { index: String(0) });

        $("#loading-image-bodyextra").loadImager('removeLoadImage');

        return false;
    }

    /**
    * Fill Body extra form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 03/09/2018
    */

    window.fillBodyextraForm = function (data) {
        $("#loading-image-bodyextra").loadImager('removeLoadImage');
        $("#loading-image-bodyextra").loadImager('appendImage');
        
        selectedBodyextraname = data.body_deff_name;
        selectedBodyextranameId = data.acc_body_deff_id;
        selectedBodyextraId = data.id;

        document.getElementById("txt-bodyextra-name").value = data.body_deff_name;

        if (data.embrace_no) {
            document.getElementById("txt-embrace-no").value = data.embrace_no;
        } else {
            document.getElementById("txt-embrace-no").value = "";
        }

        if (data.cost) {
            document.getElementById("txt-cost").value = data.cost;
        } else {
            document.getElementById("txt-cost").value = "";
        }

        if (data.list_price) {
            document.getElementById("txt-list-price").value = data.list_price;
        } else {
            document.getElementById("txt-list-price").value = "";
        }

        if (data.supplier_id) {
            $('#dropdownSupplier').ddslick('selectByValue',
                {
                    index: data.supplier_id,
                    value: data.supplier_name
                }
            );
        }
        
        $("#loading-image-bodyextra").loadImager('removeLoadImage');

        return false;
    }


    window.activepassiveBodyextra = function (bodyextra_id, active) {
        $("#loading-image-bodyextraGrid").loadImager('removeLoadImage');
        $("#loading-image-bodyextraGrid").loadImager('appendImage');

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassivebodyextralist = $('#ajaxACL-bodyextralist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-bodyextraGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_sysaccbodymatrix)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_sysaccbodymatrix)"),
            proxy: '/Accessory/ActivePassiveBodyextra',
            type: "POST",
            data: JSON.stringify({
                id: bodyextra_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysaccbodymatrix"
            }),

        });
        ajax_activepassivebodyextralist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_bodyextra").dxDataGrid("instance").refresh();
                $("#loading-image-bodyextraGrid").loadImager('removeLoadImage');
            },
            onError: function (event, data) {

            },
        })
        ajax_activepassivebodyextralist.ajaxCallWidget('call');
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    /**
    * bodyextranameList Refresh
    * @returns 
    * @author Gül Özdemir
    * @since 24/10/2018
    */

    $('#bodyextranameList').click(function () {

        /* devexgrid */
        var bodyextraname_data = new DevExpress.data.CustomStore({
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
                    url: '/Accessory/BodyextraFeatureGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillAccDeffExtrasGridx_sysaccbodydeff", 
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
                    url: '/Accessory/DeleteBodyextraFeature',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedBodyextranameId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysaccbodydeff"  //Bakılacak
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
            $("#gridContainer_bodyextraname").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: bodyextraname_data,

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
                    fileName: window.lang.translate('BodyextraFeatureList')
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
                            var bodyextraname_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveBodyextraName(bodyextraname_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveBodyextraName(bodyextraname_id, options.data.active);

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
                        selectedBodyextranameId = data.id;
                        selectedBodyextraname = data.name;
                        fillBodyextraNameForm(data);

                    }
                },

                onRowRemoving: function (e) {
                    selectedBodyextranameId = e.key.id;

                },

                onRowRemoved: function (e) {
                    $("#gridContainer_bodyextraname").dxDataGrid("instance").refresh();
                },

            });
        });
    })

    $('#bodyextranameList').click();

/**
 * Insert BodyextraFeatureName
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 24/10/2018
 */

    $("#btn-bodyextraname-save").on("click", function (e) {
        e.preventDefault();

        if ($("#bodyextranameForm").validationEngine('validate')) {

            $("#loading-image-bodyextranameform").loadImager('removeLoadImage');
            $("#loading-image-bodyextranameform").loadImager('appendImage');

            var bodyextra_featurename = $('#txt-bodyextra-featurename').val();

            var ajax;
            if (selectedBodyextranameId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-bodyextraname').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-bodyextranameform",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertActExtras_sysaccbodydeff)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertActExtras_sysaccbodydeff)"),
                    proxy: '/Accessory/InsertBodyextraFeature',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertActExtras_sysaccbodydeff",
                        name: bodyextra_featurename,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_bodyextraname").dxDataGrid("instance").refresh();
                        $("#loadingImage_bodyextranameform").loadImager('removeLoadImage');
                        resetBodyextraNameForm();
                       
                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-bodyextraname').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-bodyextranameform",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateActExtras_sysaccbodydeff)"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateActExtras_sysaccbodydeff)"),
                            proxy: '/Accessory/UpdateBodyextraFeature',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedBodyextranameId,
                                url: "pkUpdateActExtras_sysaccbodydeff",
                                name: bodyextra_featurename,                                
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_bodyextraname").dxDataGrid("instance").refresh();
                                $("#loadingImage_bodyextranameform").loadImager('removeLoadImage');
                                resetBodyextraNameForm();
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Body extra feature is update! Are you sure?', 'Body extra feature is update! Are you sure?');
            }
        }
        return false;

    })

    /**
    * reset Bodyextra Feature Name Form
    * @returns {undefined}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.resetBodyextraNameForm = function () {
        $("#loading-image-bodyextranameform").loadImager('removeLoadImage');
        $("#loading-image-bodyextranameform").loadImager('appendImage');

        selectedBodyextranameId = 0;
        $('#bodynameForm').validationEngine('hide');
        
        $("#loading-image-bodyextranameform").loadImager('removeLoadImage');

        resetBodyextraForm();
        //yeni kayda açık, tablar kapatılıyor
        tab_disable();
       
        return false;
    }


    /**
    * Fill Body extra Feature Name form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.fillBodyextraNameForm = function (data) {
        $("#loading-image-bodyextraname").loadImager('removeLoadImage');
        $("#loading-image-bodyextraname").loadImager('appendImage');

        document.getElementById("txt-bodyextra-featurename").value = data.name;

        document.getElementById("txt-bodyextra-name").value = data.name;


        $("#loading-image-bodyextraname").loadImager('removeLoadImage');

        tab_active()

        return false;
    }


    window.activepassiveBodyextraName = function (bodyextraname_id, active) {
        $("#loading-image-bodyextranameGrid").loadImager('removeLoadImage');
        $("#loading-image-bodyextranameGrid").loadImager('appendImage');

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassivebodyextranamelist = $('#ajaxACL-bodyextranamelist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-bodyextranameGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_sysaccbodydeff)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_sysaccbodydeff)"),
            proxy: '/Accessory/ActivePassiveBodyextraFeature',
            type: "POST",
            data: JSON.stringify({
                id: bodyextraname_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysaccbodydeff" //bakılacak
            }),

        });
        ajax_activepassivebodyextranamelist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {
            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_bodyextraname").dxDataGrid("instance").refresh();
                $("#loading-image-bodyextranameGrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassivebodyextranamelist.ajaxCallWidget('call');

    }


 /*
 * body extra tab click grid refresh
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
            $("#gridContainer_bodyextraname").dxDataGrid("instance").refresh();
        }
        if (target == "#tab_2") {
            // grid refresh olması gerektiği için kullanıldı.
            //$(gridContainer_tab).dxDataGrid("updateDimensions");
            //$('#bodyList').click();
            $("#gridContainer_bodyextra").dxDataGrid("instance").refresh();
        }
    });

});

