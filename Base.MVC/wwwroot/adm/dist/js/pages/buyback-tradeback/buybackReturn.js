/*
* Buyback Return Form
* @author Ceydacan Seyrek
* @since 10/09/2018
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

    var expText = "";

/*
* Buyback Return LoadImager
* @author Ceydacan Seyrek
* @since 10/09/2018
*/
//to Buyback Return form
    $("#loadingImage_BbReturnInfo").loadImager();
    $("#loadingImage_DdslickReturn").loadImager();


//to Buyback Return form grid loading-image
    $("#loadingImage_DdslickBuybackReturnDealGrid").loadImager();
    $("#loadingImage_DdslickBuybackVehicleList").loadImager();
    $("#loadingImage_DdslickBuybackVehicleAttachmentList").loadImager();

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

    $('#dealBuybackReturnForm').validationEngine();
    $('#buybackReturnVehicleInfoForm').validationEngine();

    var langCode = $("#langCode").val();
    //alert(langCode);

    //Return
    $('#loadingImage_DdslickReturn').loadImager('removeLoadImage');
    $("#loadingImage_DdslickReturn").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkReturnTypeDdList_sysreturntypes&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_Return = $('#ajax_DdslickReturn').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickReturn",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkReturnTypeDdList_sysreturntypes",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Return.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datareturn) {

            var cbdata_return = $.parseJSON(datareturn);
            cbdata_return.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickReturn').ddslick({
                data: cbdata_return,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        var expText_id = selectedData.selectedData.value;
                        if (expText_id == 3) {
                            document.getElementById("txt-bbreturn-explanation").disabled = false;
                            //document.getElementById("txt-tbreturn-file").disabled = true;
                        }
                        else if (expText_id == 2) {
                            document.getElementById("txt-bbreturn-explanation").disabled = false;
                            // document.getElementById("txt-tbreturn-file").disabled = true;
                        }
                        else if (expText_id == 1) {
                            document.getElementById("txt-bbreturn-explanation").disabled = true;
                            //document.getElementById("txt-tbreturn-file").disabled = false;
                        }
                        else {
                            document.getElementById("txt-bbreturn-explanation").disabled = true;
                            //document.getElementById("txt-tbreturn-file").disabled = true;
                        }
                    }
                }
            })
            $('#loadingImage_DdslickReturn').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickReturn').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Return.ajaxCallWidget('call');
    //Return End;
//Return End


    /* devexgrid */
    DevExpress.localization.locale(langCode);

//bb return deal grid
    $('#bbDealListRefresh').click(function () {
        $("#gridContainer_buybackDealList").dxDataGrid("instance").refresh();
    });

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillParkOffGridx_infostockparkoff&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var bbDeal = new DevExpress.data.CustomStore({
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
                url: '/ParkOff/ParkoffGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillParkOffGridx_infostockparkoff",
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
        }
    });

    $("#gridContainer_buybackDealList").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: bbDeal,
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
            //allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: "buybackReturn"
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
        columns: [{
            caption: window.lang.translate('Deal Number') + "...",
            dataField: "chassis_no"
        }, {
            caption: window.lang.translate('Deal date') + "...",
            dataField: "man_entry_date"
        }],
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillBbreturnForm(data);
            }
        }
    });
//bb return deal grid end

//bb return vehicle grid
    $('#bbVehicleListRefresh').click(function () {
        $("#gridContainer_buybackVehicleList").dxDataGrid("instance").refresh();
    });

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillParkOffGridx_infostockparkoff&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var bbVehicle = new DevExpress.data.CustomStore({
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
                url: '/ParkOff/ParkoffGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillParkOffGridx_infostockparkoff",
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
        }
    });

    $("#gridContainer_buybackVehicleList").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: bbVehicle,
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
            //allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: "buybackVehicle"
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
        columns: [{
            caption: window.lang.translate('Deal Number') + "...",
            dataField: "chassis_no"
        }, {
            caption: window.lang.translate('Deal date') + "...",
            dataField: "man_entry_date"
        }, {
            caption: window.lang.translate('Vehicle return date') + "...",
            dataField: "man_entry_date"
        }, {
            caption: window.lang.translate('Chassis') + "...",
            //dataField: "WAGP21ZZ2FT022928"
            dataField: "chassis_no"
        }, {
            caption: window.lang.translate('Vehicle return') + "...",
            dataField: "man_entry_date"
        }, {
            caption: window.lang.translate('Explanation') + "...",
            dataField: "man_entry_date"
        }],
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillVehicleBuybackForm(data);
            }
        }
    });
//bb return vehicle grid end

//bb return attachment grid
    $('#attachmentListRefresh').click(function () {
        $("#gridContainer_buybackVehicleAttachmentList").dxDataGrid("instance").refresh();
    });

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillParkOffGridx_infostockparkoff&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var bbAtt = new DevExpress.data.CustomStore({
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
                url: '/ParkOff/ParkoffGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillParkOffGridx_infostockparkoff",
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
                url: '/ParkOff/DeleteParkoff',
                dataType: "json",
                data: JSON.stringify({
                    id: parkoffId,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_infostockparkoff"
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
    $("#gridContainer_buybackVehicleAttachmentList").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: bbAtt,
        columnHidingEnabled: true,
        selection: {
            mode: "single"
        },
        hoverStateEnabled: true,
        editing: {
            //mode: "batch"
            mode: "form",
            //allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: "buyback Vehicle Attachment"
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
            autoWidth: true
        },
        columns: [{
            caption: window.lang.translate('Vehicle') + "...",
                //dataField: "WAGP21ZZ2FT022928"
            dataField: "chassis_no"
        }, {
            caption: "Attachment",
            //dataField: "active",
            dataField: "chassis_no"
        }],
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                //fillVehicleBuybackForm(data);
            }
        }
    });
//bb return attachment grid end

 /**
 * Buyback Return
 * @author Ceydacan Seyrek
 * @since 10/09/2018
 */

    $("#btn-buybackVehicle-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#buybackReturnVehicleInfoForm").validationEngine('validate')) {

            //window.insertTrainingInfo = function () {
            $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
            $("#loadingImage_BbReturnInfo").loadImager('appendImage');

            var ddDataReturn = $('#ddslickReturn').data('ddslick');
            if (!ddDataReturn.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Return type "),
                    window.lang.translate("Please select Return type"));
            }
            else {
                var return_id = ddDataReturn.selectedData.value;
            }

            var return_date = $('#return-datepicker').val();
            var explanation = $('#txt-bbreturn-explanation').val();
            var chassis_id = $('#txt-bbreturn-vehicle').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
            //url=pkInsertAct_infostockparkoff
            //&stock_id=1
            //&start_date=2018-08-08
            //&end_date=
            //&parkoff_type_id=2
            //&is_complete=0
            //&pk=GsZVzEYe50uGgNM
            if (!parkoffId == "") {//update
                var ajax_InsertbbReturn = $('#ajaxACL-parkoffList').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_BbReturnInfo",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/ParkOff/AddParkoff',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_infostockparkoff",
                        id: parkoffId,
                        return_id: return_id,
                        return_date: return_date,
                        explanation: explanation,
                        chassis_id: chassis_id,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertbbReturn.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetBbreturnForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_buybackVehicleList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertbbReturn.ajaxCallWidget('call');
            }
            else { //insert
                var ajax_InsertbbReturn = $('#ajaxACL-parkoffList').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_BbReturnInfo",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/ParkOff/AddParkoff',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_infostockparkoff",
                        parkoff_type_id: parkoffType_id,
                        end_date: control_date,
                        start_date: "",
                        //branch_id: branch_id,
                        stock_id: chassis_id,
                        is_complete: completed_id,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertbbReturn.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetBbreturnForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_buybackVehicleList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertbbReturn.ajaxCallWidget('call');
            }

            return false;
        }
    })
/**
* reset Buyback Return Form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/
    $("#btn-buybackVehicle-clear").on("click", function (e) {
        e.preventDefault();
        resetBbreturnForm();
        return false;
    })

    var resetBbreturnForm = function () {
        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_BbReturnInfo").loadImager('appendImage');

        //$('#buybackReturnVehicleInfoForm').validationEngine('hide');
        $('#ddslickReturn').ddslick('select', { index: String(0) });

        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');

        return false;
    }


/**
* Fill Buyback Return form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/
    window.fillBbreturnForm = function (data) {
        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_BbReturnInfo").loadImager('appendImage');

        //document.getElementById("txt-bbreturn-price").value = data.SaleAmount;
        document.getElementById("txt-bbreturn-dealNo").value = data.chassis_no;
        document.getElementById("txt-bbreturn-dealDate").value = data.man_entry_date;
        

        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        
        tab_active();
        return false;
    }

    window.fillVehicleBuybackForm = function (data) {
        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_BbReturnInfo").loadImager('appendImage');

        //document.getElementById("txt-bbreturn-price").value = data.SaleAmount;
        //document.getElementById("txt-bbreturn-dealNo").value = data.SaleAmount;
        //document.getElementById("txt-bbreturn-dealDate").value = data.OrderDate;

        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $('#ddslickReturn').ddslick('select', { index: 1 });
        document.getElementById("txt-bbreturn-vehicle").value = 'WAGP21ZZ2FT022928';
        document.getElementById("txt-bbreturn-vehicleReturnDate").value = data.man_entry_date;

        tab_active();
        return false;
    }

    //----------------------------------popup begin-------------------------------------------------
    $("#btn-attachmentAdd-save").on("click", function (e) {
        e.preventDefault();
        openAddAttachmentPopUp();
        return false;
    })


    /**
     * add attachment popup insert wrapper
     * @author Ceydacan Seyrek
     * @since 19/10/2018
     * */
    window.openAddAttachmentPopUpWrapper = function (e) {
        //alert("popup submit click");

        if ($("#buybackReturnVehicleInfoForm").validationEngine('validate')) {
            alert('test mest 1');
        } else {
            alert('test mest 2');
        }
        e.preventDefault();
        return false;
    }

    /**
     * add attachment popup window opener
     * @author Ceydacan Seyrek
     * @since 19/10/2018
     * */
    var openAddAttachmentPopUp = function () {
        BootstrapDialog.show({
            title: window.lang.translate("Add Attachment"),
            message: function (dialogRef) {
                var dialogRef = dialogRef;
                var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loadingImage_AddRepairCost" class="box box-primary">\n\
                                                     <form id="repairCostForm" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                            <label class="col-sm-2 ><span lang="en">Attachment</span></label>\n\
                                                            <div class="input-group"  class="col-sm-10">\n\
                                                                <div class="input-group-addon">\n\
                                                                    <i class="fa fa-map-pin"></i>\n\
                                                                </div>\n\
                                                                <input type="file" class="form-control validate[required]" placeholder="file upload" id="txt-bbreturn-file" lang="en">\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="add_Repaircost" class="btn btn-primary" type="button" onclick="return openAddAttachmentPopUpWrapper(event);" >\n\
                                                                 <i class="fa fa-save"></i> Save </button>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                 </form>\n\
                                             </div>\n\
                                         </div>\n\
                                     </div>');
                return $message;
            },
            type: BootstrapDialog.TYPE_PRIMARY,
            onshow: function (dialogRef) {

            },
            onshown: function () {
                $('#buybackReturnVehicleInfoForm').validationEngine();

            },
            onhide: function () {
                //alert('onhide popup');

            },
        });
    }

    //----------------------------------popup end-------------------------------------------------

});

