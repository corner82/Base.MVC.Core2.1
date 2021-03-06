﻿///*
//* Fixed Cost Form
//* @author Ceydacan Seyrek
//* @since 12/10/2018
//*/
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
* datepicker format
* @author Ceydacan Seyrek
* @since 29/08/2016
*/
    $('#control-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#parkoffForm').validationEngine(); 

    //Loading image
    $("#loadingImage_parkoff").loadImager();

    $("#loadingImage_DdslickParkoffType").loadImager();
    $("#loadingImage_DdslickBranch").loadImager();
    $("#loadingImage_DdslickChassis").loadImager();
    $("#loadingImage_DdslickCompleted").loadImager();

    var filldropdown = false;

    var ddslick_branchId = 0;
    var ddslick_branch_name = "";
    var ddslick_chassisId = 0;
    var ddslick_chassis_name = "";

    var parkoffId;

    //Branch --> Chassis
    $("#loadingImage_DdslickBranch").loadImager('removeLoadImage');
    $("#loadingImage_DdslickBranch").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkBranchesDealersDeffDdList_sysbranchesdealersdeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_branch = $('#ajax_DdslickBranch').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickBranch",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkBranchesDealersDeffDdList_sysbranchesdealersdeff)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkBranchesDealersDeffDdList_sysbranchesdealersdeff)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkBranchesDealersDeffDdList_sysbranchesdealersdeff",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_branch.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, databranch) {

            var cbdata_branch = $.parseJSON(databranch);
            cbdata_branch.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickBranch').ddslick({
                data: cbdata_branch,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {

                    $('#ddslickChassis').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {
                        ddslick_branchId = selectedData.selectedData.value;

                        //Vehicle
                        $("#loadingImage_DdslickChassis").loadImager('removeLoadImage');
                        $("#loadingImage_DdslickChassis").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkStockVehiclesDdList_infostock&language_code=en&pk=GsZVzEYe50uGgNM&branch_dealers_id=1
                        var ajaxACLResources_chassis = $('#ajax_DdslickChassis').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickChassis",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkStockVehiclesDdList_infostock)"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkStockVehiclesDdList_infostock)"),
                            proxy: '/ParkOff/ParkoffChassis',
                            type: "POST",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkStockVehiclesDdList_infostock",
                                branch_dealers_id : ddslick_branchId,
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
                                if (filldropdown === true) {
                                    $('#ddslickChassis').ddslick('selectByValue',
                                        {
                                            index: '' + ddslick_chassisId + '',
                                            value: '' + ddslick_chassis_name + ''
                                        });
                                    filldropdown = false;
                                }
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
            $('#loadingImage_DdslickBranch').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickBranch').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_branch.ajaxCallWidget('call');
    //branch --> Chassis End

    //ParkoffType
    $("#loadingImage_DdslickParkoffType").loadImager('removeLoadImage');
    $("#loadingImage_DdslickParkoffType").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkParkoffTypeDdList_sysparkofftypes&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_parkoffType = $('#ajax_DdslickParkoffType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickParkoffType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkParkoffTypeDdList_sysparkofftypes)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkParkoffTypeDdList_sysparkofftypes)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkParkoffTypeDdList_sysparkofftypes",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_parkoffType.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataparkoffType) {

            var cbdata_parkoffType = $.parseJSON(dataparkoffType);
            cbdata_parkoffType.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickParkoffType').ddslick({
                data: cbdata_parkoffType,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickParkoffType').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickParkoffType').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_parkoffType.ajaxCallWidget('call');
    //ParkoffType End

    //Completed
    $("#loadingImage_DdslickCompleted").loadImager('removeLoadImage');
    $("#loadingImage_DdslickCompleted").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=fillYesNoTypes_sysSpecificDefinitions&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_completed = $('#ajax_DdslickCompleted').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickCompleted",
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

    ajaxACLResources_completed.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datacompleted) {

            var cbdata_completed = $.parseJSON(datacompleted);
            cbdata_completed.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickCompleted').ddslick({
                data: cbdata_completed,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickCompleted').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickCompleted').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_completed.ajaxCallWidget('call');
    //Completed End

    /* devexgrid */

    $('#parkoffListRefresh').click(function () {
        $("#gridContainer_parkoffList").dxDataGrid("instance").refresh();
    });

        //parkoff grid
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillParkOffGridx_infostockparkoff&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var parkoff = new DevExpress.data.CustomStore({
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
        //remove: function (key) {
        //    var deferred = $.Deferred();
        //    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_sysfixedsalescosts&id=33&pk=GsZVzEYe50uGgNM
        //    return $.ajax({
        //        url: '/ParkOff/DeleteParkoff',
        //        dataType: "json",
        //        data: JSON.stringify({
        //            id: parkoffId,
        //            pk: "GsZVzEYe50uGgNM",
        //            url: "pkDeletedAct_infostockparkoff"
        //        }),
        //        type: 'POST',
        //        contentType: 'application/json',
        //        success: function (result) {
        //            deferred.resolve(result.items, { totalCount: result.totalCount });
        //        },
        //        error: function () {
        //            deferred.reject("Data remove Error");
        //        },
        //        timeout: 10000
        //    });
        //}
    });

    //parkoff Info dxDataGrid
    $("#gridContainer_parkoffList").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: parkoff,
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
            //allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: "parkoff"
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
        columnWidth: {
            autoWidth: false
        },
        columns: [{
            caption: window.lang.translate('Park off type') + "...",
            encodeHtml: false,
            dataField: "parkoff_type_name"
        }, {
            caption: window.lang.translate('Branch') + "...",
            encodeHtml: false,
            dataField: "branch_dealer_name"  
        }, {
            caption: window.lang.translate('Chassis') + "...",
            encodeHtml: false,
            dataField: "chassis_no"
        }, {
            caption: window.lang.translate('Park off completed') + "...",
            encodeHtml: false,
            dataField: "complete_name"
        }, {
            caption: window.lang.translate('Man entry date') + "...",
            encodeHtml: false,
            dataType: "date",
            dataField: "man_entry_date"
        }, {
            caption: window.lang.translate('Park off control date') + "...",
            encodeHtml: false,
            dataType: "date",
            dataField: "end_date"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                parkoffId = data.id;
                filldropdown = true;
                fillParkoff(data);
            }
        },
        onRowRemoving: function (e) {
            parkoffId = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_parkoffList").dxDataGrid("instance").refresh();
        },
    });


    /**
    * insert Parkoff
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    $("#btn-parkoff-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#parkoffForm").validationEngine('validate')) {

            //window.insertTrainingInfo = function () {
            $("#loadingImage_parkoff").loadImager('removeLoadImage');
            $("#loadingImage_parkoff").loadImager('appendImage');

            var ddDataParkoffType = $('#ddslickParkoffType').data('ddslick');
            if (!ddDataParkoffType.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Park off Type "),
                    window.lang.translate("Please select Park off Type"));
            }
            else {
                var parkoffType_id = ddDataParkoffType.selectedData.value;
            }

            var ddDataBranch = $('#ddslickBranch').data('ddslick');
            if (!ddDataBranch.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Branch"),
                    window.lang.translate("Please select Branch"));
            }
            else {
                var branch_id = ddDataBranch.selectedData.value;
            }

            var ddDataChassis = $('#ddslickChassis').data('ddslick');
            if (!ddDataChassis.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Chassis"),
                    window.lang.translate("Please select Chassis"));
            }
            else {
                var chassis_id = ddDataChassis.selectedData.value;
            }

            var ddDataCompleted = $('#ddslickCompleted').data('ddslick');
            if (!ddDataCompleted.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Completed"),
                    window.lang.translate("Please select Completed"));
            }
            else {
                var completed_id = ddDataCompleted.selectedData.value;
            }

            var control_date = $('#control-datepicker').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
            //url=pkInsertAct_infostockparkoff
            //&stock_id=1
            //&start_date=2018-08-08
            //&end_date=
            //&parkoff_type_id=2
            //&is_complete=0
            //&pk=GsZVzEYe50uGgNM
            if (!parkoffId == "") {//update
                var ajax_Insertparkoff = $('#ajaxACL-parkoffList').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_parkoff",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_infostockparkoff)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_infostockparkoff)"),

                    proxy: '/ParkOff/AddParkoff',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_infostockparkoff",
                        id: parkoffId,
                        parkoff_type_id: parkoffType_id,
                        end_date: control_date,
                        start_date: "",
                        //branch_id: branch_id,
                        stock_id: chassis_id,
                        is_complete: completed_id,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_Insertparkoff.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetParkoffForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_parkoffList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_Insertparkoff.ajaxCallWidget('call');
            }
            else { //insert
                var ajax_Insertparkoff = $('#ajaxACL-parkoffList').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_parkoff",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_infostockparkoff)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_infostockparkoff)"),

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
                ajax_Insertparkoff.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetParkoffForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_parkoffList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_Insertparkoff.ajaxCallWidget('call');
            }
            
            return false;
        }
    })

    /**
    * reset parkoff Form
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    $("#btn-parkoff-clear").on("click", function (e) {
        e.preventDefault();
        resetParkoffForm();
        return false;
    })

    var resetParkoffForm = function () {
        $("#loadingImage_parkoff").loadImager('removeLoadImage');
        $("#loadingImage_parkoff").loadImager('appendImage');

        $('#parkoffForm')[0].reset();
        $('#parkoffForm').validationEngine('hide');

        $('#ddslickVehicle').ddslick('destroy');
        $('#ddslickWarranty').ddslick('destroy');
        $('#ddslickModel').ddslick('select', { index: String(0) });

        $("#loadingImage_parkoff").loadImager('removeLoadImage');
        return false;
    }

    /**
    * Fill Fixed Cost form
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    window.fillParkoff = function (data) {
        $("#loadingImage_parkoff").loadImager('removeLoadImage');
        $("#loadingImage_parkoff").loadImager('appendImage');


        ddslick_branchId = data.branch_no;
        ddslick_branch_name = data.branch_dealer_name;
        ddslick_chassisId = data.stock_id;
        ddslick_chassis_name = data.chassis_no;

        $('#ddslickParkoffType').ddslick('selectByValue',
            {
                index: '' + data.parkoff_type_id + '',
                text: '' + data.parkoff_type_name + ''
            }
        );

        $('#ddslickBranch').ddslick('selectByValue',
            {
                index: '' + data.branch_dealers_id + '',
                text: '' + data.branch_dealer_name + ''
            }
        );

        $('#ddslickCompleted').ddslick('selectByValue',
            {
                index: '' + data.is_complete + '',
                text: '' + data.complete_name + ''
            }
        );

        document.getElementById("control-datepicker").value = data.end_date;
        $("#loadingImage_parkoff").loadImager('removeLoadImage');

        return false;
    }

});

