///*
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
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });

/*
* datepicker format
* @author Ceydacan Seyrek
* @since 29/08/2016
*/
    $('#start-datepicker').datepicker({
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
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
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

            $('#ddslickbranch').ddslick({
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

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups&language_code=en&pk=GsZVzEYe50uGgNM&vehicle_groups_id=1
                        var ajaxACLResources_chassis = $('#ajax_DdslickChassis').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickChassis",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Vehicle/SysVehicleEndGroup',
                            type: "POST",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups",
                                vehicle_group_id: ddslick_branchId,
                                pkIdentity: $("#publicKey").val()
                            })
                        });

                        ajaxACLResources_chassis.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onSuccess: function (event, datachassis) {

                                var cbdata_chassis = $.parseJSON(datachassis);
                                cbdata_vehicle.splice(0, 0,
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

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCurrencyTypesDdList_syscurrencytypes&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_parkoffType = $('#ajax_DdslickParkoffType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickParkoffType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCurrencyTypesDdList_syscurrencytypes",
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
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
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
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFixedSalesCostsGridx_sysfixedsalescosts&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
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
                url: '/Sys/SysFixedSalesCostsGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFixedSalesCostsGridx_sysfixedsalescosts",
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
                url: '/Sys/SysDeleteFixedCost',
                dataType: "json",
                data: JSON.stringify({
                    id: parkoffId,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_sysfixedsalescosts"
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
            allowDeleting: true,
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
            dataField: "vehicle_gruop_name"
        }, {
            caption: window.lang.translate('Branch') + "...",
            encodeHtml: false,
            dataField: "model_description"  
        }, {
            caption: window.lang.translate('Chassis') + "...",
            encodeHtml: false,
            dataField: "name"
        }, {
            caption: window.lang.translate('Park off completed') + "...",
            encodeHtml: false,
            dataField: "vvalue"
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

    //});

    //$('#ParkoffRefresh').click();

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


            var ddDataModel = $('#ddslickModel').data('ddslick');
            var model_id;
            if (ddDataModel.selectedData.value > 0) {
                model_id = ddDataModel.selectedData.value;
            }

            var ddDataVhc = $('#ddslickVehicle').data('ddslick');
            var vhc_id ;
            if (ddDataVhc.selectedData.value > 0) {
                vhc_id = ddDataVhc.selectedData.value;
            }

            var ddDataCry = $('#ddslickCurrency').data('ddslick');
            var cry_id;
            if (ddDataCry.selectedData.value > 0) {
                cry_id = ddDataCry.selectedData.value;
            }

            var ddDataWr = $('#ddslickWarranty').data('ddslick');
            var wr_id ;
            if (ddDataWr.selectedData.value > 0) {
                wr_id = ddDataWr.selectedData.value;
            }

            var price = $('#txt-fc-price').val();
            var fc_name = $('#txt-fc-name').val();

            var start_date = $('#start-datepicker').val();

            var is_all_vehicle = 2;

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
            //url=pkInsertAct_sysfixedsalescosts
            //&name=gitgel%20cost
            //&vehicle_gruop_id=1--
            //&vehicle_second_group_id=--
            //&vvalue=1111=&--
            //currency_type_id=16--
            //&start_date=2018-10-10--
            //&is_all_vehicle=1--
            //warranty_matrix_id=--
            //&pk=GsZVzEYe50uGgNM--

            var ajax_Insertparkoff = $('#ajaxACL-parkoffList').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loadingImage_parkoff",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                proxy: '/Sys/AddFixedCost',
                type: 'POST',
                data: JSON.stringify({
                    url: "pkInsertAct_sysfixedsalescosts",
                    name: fc_name,
                    vehicle_gruop_id: model_id,
                    vehicle_second_group_id: vhc_id,
                    currency_type_id: cry_id,
                    start_date: start_date,
                    vvalue: price,
                    warranty_matrix_id: wr_id,
                    is_all_vehicle: is_all_vehicle,
                    pk: "GsZVzEYe50uGgNM"
                })
            });
            ajax_Insertparkoff.ajaxCallWidget({
                onReset: function (event, data) {
                    resetFixedCostForm();
                },
                onAfterSuccess: function (event, data) {
                    $("#gridContainer_parkoffList").dxDataGrid("instance").refresh();
                }
            })
            ajax_Insertparkoff.ajaxCallWidget('call');
            //$('#fcListRefresh').click();
            
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

        //document.getElementById("txt-bbreturn-price").value = data.SaleAmount;
        document.getElementById("txt-fc-name").value = data.name;
        document.getElementById("txt-fc-price").value = data.vvalue;

        ddslick_modelId = data.vehicle_gruop_id;
        ddslick_model_name = data.vehicle_gruop_name;

        ddslick_vehicleId = data.vehicle_second_group_id;
        ddslick_vehicle_name = data.model_description;

        ddslick_warrantyId = data.warranty_matrix_id;
        ddslick_warranty_name = data.warranty_matrix_name;

        $('#ddslickModel').ddslick('selectByValue',
            {
                index: '' + data.vehicle_gruop_id + '',
                text: '' + data.vehicle_gruop_name + ''
            }
        );

        $('#ddslickCurrency').ddslick('selectByValue',
            {
                index: '' + data.currency_type_id + '',
                text: '' + data.currency_name + ''
            }
        );

        $("#loadingImage_parkoff").loadImager('removeLoadImage');

        return false;
    }

////ActivePasive Fixed Cost Info

//    window.activepasivefcInfo = function (fcInfo_id, active) {

//        var transactionSuccessMessage;

//        if (active === 1) {
//            //active
//            transactionSuccessMessage = window.lang.translate('Active successful');
//        } else {
//            //pasive
//            transactionSuccessMessage = window.lang.translate('Pasive successful');
//        }

//        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_sysfixedsalescosts&id=29&pk=GsZVzEYe50uGgNM
//        var ajax_activepasiveTrInfolist = $('#ajaxACL-fixedCostList').ajaxCallWidget({
//            failureLoadImage: true,
//            loadingImageID: "loadingImage_DdslickFixedCostList",
//            triggerSuccessAuto: true,
//            transactionSuccessText: window.lang.translate('Transaction successful'),
//            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
//            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
//            proxy: '/Sys/SysActivePassiveFixedCost',
//            type: "POST",
//            data: JSON.stringify({
//                id: fcInfo_id,
//                pk: "GsZVzEYe50uGgNM",
//                url: "pkUpdateMakeActiveOrPassive_sysfixedsalescosts"
//            }),

//        });
//        ajax_activepasiveTrInfolist.ajaxCallWidget({
//            onReset: function (event, data) {

//            },
//            onAfterSuccess: function (event, data) {
//                $("#gridContainer_fixedCostList").dxDataGrid("instance").refresh();
//            }
//        })
//        ajax_activepasiveTrInfolist.ajaxCallWidget('call');
//        //$('#trListRefresh').click();
//    }

});

