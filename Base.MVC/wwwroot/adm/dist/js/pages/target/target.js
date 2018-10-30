/*
* Monthly Quota Form
* @author Ceydacan Seyrek
* @since 17/09/2018
*/
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'Ýþleme devam et'
    });

    var filldropdown = false;

    var ddslick_roleId = 0;
    var ddslick_role_name = "";
    var ddslick_userId = 0;
    var ddslick_user_name = "";
    /*
    * Monthly Quota LoadImager
    * @author Ceydacan Seyrek
    * @since 17/09/2018
    */
    //to Monthly Quota form
    $("#loadingImage_DdslickTargetType").loadImager();
    $("#loadingImage_DdslickRoleType").loadImager();
    $("#loadingImage_DdslickUser").loadImager();
    $("#loadingImage_DdslickMonth").loadImager();
    $("#loadingImage_DdslickYear").loadImager();
    $("#loadingImage_target").loadImager();

    //to Monthly Quota form grid loading-image
    $("#loadingImage_targetGrid").loadImager();

    var langCode = $("#langCode").val();
    var targetID;
    //alert(langCode);

    $('#targetForm').validationEngine();

    //TargetType list
    $('#loadingImage_DdslickTargetType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTargetType").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkAccBodyDeffDdList_sysaccbodydeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_TargetType = $('#ajax_DdslickTargetType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickTargetType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkAccBodyDeffDdList_sysaccbodydeff",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_TargetType.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataquotayear) {

            var cbdata_quotayear = $.parseJSON(dataquotayear);
            cbdata_quotayear.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickTargetType').ddslick({
                data: cbdata_quotayear,
                width: '100%'
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickTargetType').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickTargetType').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_TargetType.ajaxCallWidget('call');
    //TargetType End

    //Role Type --> user
    $("#loadingImage_DdslickRoleType").loadImager('removeLoadImage');
    $("#loadingImage_DdslickRoleType").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleGroupsDdList_sysvehiclegroups&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_RoleType = $('#ajax_DdslickRoleType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickRoleType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleGroups',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_RoleType.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datamodel) {

            var cbdata_model = $.parseJSON(datamodel);
            cbdata_model.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickRoleType').ddslick({
                data: cbdata_model,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {

                    $('#ddslickUser').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {
                        ddslick_roleId = selectedData.selectedData.value;

                        //user
                        $("#loadingImage_DdslickUser").loadImager('removeLoadImage');
                        $("#loadingImage_DdslickUser").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups&language_code=en&pk=GsZVzEYe50uGgNM&vehicle_groups_id=1
                        var ajaxACLResources_user = $('#ajax_DdslickUser').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickUser",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/DefaultPost/DefaultPostModel',
                            type: "POST",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkJustYearsDdList_sysmonths",
                                pkIdentity: $("#publicKey").val()
                            })
                        });

                        ajaxACLResources_user.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onSuccess: function (event, datauser) {

                                var cbdata_user = $.parseJSON(datauser);
                                cbdata_user.splice(0, 0,
                                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                );

                                $('#ddslickUser').ddslick({
                                    data: cbdata_user,
                                    width: '100%'
                                    //search: true,
                                    //searchText: window.lang.translate('Search'),
                                   
                                })
                                if (filldropdown === true) {
                                    $('#ddslickUser').ddslick('selectByValue',
                                        {
                                            index: '' + ddslick_userId + '',
                                            value: '' + ddslick_user_name + ''
                                        });
                                    filldropdown = false;
                                }

                                $('#loadingImage_DdslickUser').loadImager('removeLoadImage');
                            },
                            onAfterSuccess: function (event, data) {
                                $('#loadingImage_DdslickUser').loadImager('removeLoadImage');
                            }
                        })
                        ajaxACLResources_user.ajaxCallWidget('call');
                        //User End
                    }
                }
            })
            $('#loadingImage_DdslickRoleType').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickRoleType').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_RoleType.ajaxCallWidget('call');
    //Role Type --> user End

    //Month
    $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
    $("#loadingImage_DdslickMonth").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustMonthsDdList_sysmonths&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_Month = $('#ajax_DdslickMonth').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickMonth",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkJustMonthsDdList_sysmonths",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Month.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datamonth) {

            var cbdata_month = $.parseJSON(datamonth);
            cbdata_month.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickMonth').ddslick({
                data: cbdata_month,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Month.ajaxCallWidget('call');
    //Month End

    // Year
    $('#loadingImage_DdslickYear').loadImager('removeLoadImage');
    $("#loadingImage_DdslickYear").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustYearsDdList_sysmonths&pk=GsZVzEYe50uGgNM&id=55
    var ajaxACLResources_Year = $('#ajax_DdslickYear').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickYear",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkJustYearsDdList_sysmonths",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Year.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datayear) {

            var cbdata_year = $.parseJSON(datayear);
            cbdata_year.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickYear').ddslick({
                data: cbdata_year,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickYear').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickYear').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Year.ajaxCallWidget('call');
    // Year End

    /* devexgrid */
    DevExpress.localization.locale(langCode);

// target Grid
    $('#targetListRefresh').click(function () {
        $("#gridContainer_targetList").dxDataGrid("instance").refresh();
    });

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillSisMonthlyQuotasGridx_syssismonthlyquotas&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var target = new DevExpress.data.CustomStore({
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
                    url: '/Sys/SysYearlyQuotaGrid',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillSisMonthlyQuotasGridx_syssismonthlyquotas",
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
            //    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syssismonthlyquotas&id=33&pk=GsZVzEYe50uGgNM
            //    return $.ajax({
            //        url: '/Sys/SysDeleteYearlyQuota',
            //        dataType: "json",
            //        data: JSON.stringify({
            //            id: QuotaMonthID,
            //            pk: "GsZVzEYe50uGgNM",
            //            url: "pkDeletedAct_syssismonthlyquotas"
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

    $("#gridContainer_targetList").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: target,
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
                fileName: "target"
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
                autoWidth: true
            },
            columns: [{
                caption: window.lang.translate('Target type') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Role type') + "...",
                dataField: "vehicle_groups_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Salesman') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Month') + "...",
                dataField: "month_name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Year') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Target') + "...",
                dataField: "quantity",
                encodeHtml: false          
            }],

            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    targetID = data.id;
                    fillTargetForm(data);
                }
            },
            onRowRemoving: function (e) {
                //QuotaMonthID = e.key.id;
                //deleteTrName(trName_id);
            },
            onRowRemoved: function (e) {
                //$("#gridContainer_QuotaMonth").dxDataGrid("instance").refresh();
            },
        });

 //target Grid End


    /**
    * Target insert
    * @author Ceydacan Seyrek
    * @since 17/09/2018
    */

    $("#btn-target-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#targetForm").validationEngine('validate')) {

            $("#loadingImage_target").loadImager('removeLoadImage');
            $("#loadingImage_target").loadImager('appendImage');

            var ddDataTargetType = $('#ddslickTargetType').data('ddslick');
            if (!ddDataTargetType.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Target Type"),
                    window.lang.translate("Please select Target type"));
                $('#loadingImage_DdslickTargetType').loadImager('removeLoadImage');
                return false;
            }
            var target_id = ddDataTargetType.selectedData.value;

            var ddDataRoleType = $('#ddslickRoleType').data('ddslick');
            if (!ddDataRoleType.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Role Type"),
                    window.lang.translate("Please select Role Type"));
                $('#loadingImage_DdslickRoleType').loadImager('removeLoadImage');
                return false;
            }
            var role_id = ddDataRoleType.selectedData.value;

            var ddDataUser = $('#ddslickUser').data('ddslick');
            if (!ddDataUser.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Salesman"),
                    window.lang.translate("Please select Salesman"));
                $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
                return false;
            }
            var user_id = ddDataUser.selectedData.value;

            var ddDataMonth = $('#ddslickMonth').data('ddslick');
            if (!ddDataMonth.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Month"),
                    window.lang.translate("Please select Month"));
                $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
                return false;
            }
            var month_id = ddDataMonth.selectedData.value;

            var ddDataYear = $('#ddslickYear').data('ddslick');
            if (!ddDataYear.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select Year"),
                    window.lang.translate("Please select Year"));
                $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
                return false;
            }
            var year_id = ddDataYear.selectedData.value;

            var target = $('#txt-target-target').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
            //url=pkInsertAct_syssismonthlyquotas
            //&sis_quota_id=1--
            //&model_id=2--
            //&year=2018--
            //&month_id=12
            //&quantity=12--
            //&pk=GsZVzEYe50uGgNM

            if (!targetID == "") {//update
                var ajax_InsertTarget = $('#ajaxACL-monthlyQuota').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_target",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Sys/AddMonthlyQuota',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_syssismonthlyquotas",
                        id: targetID,
                        target_type_id: target_id,
                        month_id: month_id,
                        year_id: year_id,
                        user_id: user_id,
                        target: target,
                        pk: "GsZVzEYe50uGgNM",
                    })
                });
                ajax_InsertTarget.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetTargetForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_targetList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertTarget.ajaxCallWidget('call');
            }
            else {//insert
                var ajax_InsertTarget = $('#ajaxACL-monthlyQuota').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_target",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Sys/AddMonthlyQuota',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_syssismonthlyquotas",
                        target_type_id: target_id,
                        month_id: month_id,
                        year_id: year_id,
                        user_id: user_id,
                        target: target,
                        pk: "GsZVzEYe50uGgNM",
                    })
                });
                ajax_InsertTarget.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetTargetForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_targetList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertTarget.ajaxCallWidget('call');
            }
            targetID = "";
            return false;
        }
    })

    /**
    * reset Target Form
    * @author Ceydacan Seyrek
    * @since 30/10/2018
    */
    $("#btn-target-clear").on("click", function (e) {
        e.preventDefault();
        resetTargetForm();
        return false;
    })

    var resetTargetForm = function () {
        $("#loadingImage_target").loadImager('removeLoadImage');
        $("#loadingImage_target").loadImager('appendImage');

        $('#monthlyQuotaForm')[0].reset(); 
        $('#monthlyQuotaForm').validationEngine('hide');

        $('#ddslickUser').ddslick('destroy');
        $('#ddslickTargetType').ddslick('select', { index: String(0) });
        $('#ddslickYear').ddslick('select', { index: String(0) });
        $('#ddslickMonth').ddslick('select', { index: String(0) });
        $('#ddslickRoleType').ddslick('select', { index: String(0) });

        $("#loadingImage_target").loadImager('removeLoadImage');

        return false;
    }

    /**
    * Fill Target form
    * @author Ceydacan Seyrek
    * @since 30/10/2018
    */

    window.fillTargetForm = function (data) {
        $("#loadingImage_target").loadImager('removeLoadImage');
        $("#loadingImage_target").loadImager('appendImage');

        //ddslick_roleId = data.region_id;
        //ddslick_role_name = data.region_name;

        //ddslick_userId = data.city_id;
        //ddslick_user_name = data.city_name;

        //$('#ddslickRoleType').ddslick('selectByValue',
        //    {
        //        index: '' + data.country_id + '',
        //        text: '' + data.country_name + ''
        //    }
        //);

        //$('#ddslickTargetType').ddslick('selectByValue',
        //    {
        //        index: '' + data.country_id + '',
        //        text: '' + data.country_name + ''
        //    }
        //);

        //$('#ddslickYear').ddslick('selectByValue',
        //    {
        //        index: '' + data.year + ''
        //    }
        //);

        //$('#ddslickMonth').ddslick('selectByValue',
        //    {
        //        index: '' + data.month_id + ''
        //    }
        //);
        //document.getElementById("txt-target-target").value = data.quantity;

        $("#loadingImage_target").loadImager('removeLoadImage');
        return false;
    }

});

