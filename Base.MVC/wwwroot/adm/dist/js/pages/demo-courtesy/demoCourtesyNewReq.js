/*
* Demo return Form
* @author Ceydacan Seyrek
* @since 22/10/2018
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


    var filldropdown = false;

    var ddslick_modelId = 0;
    var ddslick_model_name = "";
    var ddslick_vehicleId = 0;
    var ddslick_vehicle_name = "";
    /*
   * datepicker format
   * @author Ceydacan Seyrek
   * @since 22/10/2016
   */
    $('#start-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#end-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#exStart-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#exEnd-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    /*
    * LoadImager
    * @author Ceydacan Seyrek
    * @since 18/09/2018
    */
    //to demo return form
    $("#loadingImage_demoCourtesyNewReq").loadImager();
    $("#loadingImage_DdslickDemoCourtesy").loadImager();
    $("#loadingImage_DdslickDemoVehicle").loadImager();
    $("#loadingImage_DdslickCustomer").loadImager();
    $("#loadingImage_DdslickReqCustomer").loadImager();
    $("#loadingImage_DdslickAppType").loadImager();
    $("#loadingImage_DdslickModel").loadImager();
    $("#loadingImage_DdslickVehicle").loadImager();

    //to demo return form grid loading-image
    $("#loadingImage_DdslickDemoCourAllocationGrid").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);
    var demoVehicleId;

    $("#demoCourtesyNewReqForm").validationEngine('validate')

    //Demo Courtesy
    $('#loadingImage_DdslickDemoCourtesy').loadImager('removeLoadImage');
    $("#loadingImage_DdslickDemoCourtesy").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustYearsDdList_sysmonths&pk=GsZVzEYe50uGgNM&id=55
    var ajaxACLResources_DemoCourtesy = $('#ajax_DdslickDemoCourtesy').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickDemoCourtesy",
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

    ajaxACLResources_DemoCourtesy.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datademoCourtesy) {

            var cbdata_demoCourtesy = $.parseJSON(datademoCourtesy);
            cbdata_demoCourtesy.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickDemoCourtesy').ddslick({
                data: cbdata_demoCourtesy,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickDemoCourtesy').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickDemoCourtesy').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_DemoCourtesy.ajaxCallWidget('call');
    //Demo courtesy End    

    //Model Group --> Vehicle End Group
    $("#loadingImage_DdslickModel").loadImager('removeLoadImage');
    $("#loadingImage_DdslickModel").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleGroupsDdList_sysvehiclegroups&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_model = $('#ajax_DdslickModel').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickModel",
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

                    $('#ddslickVehicle').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {
                        ddslick_modelId = selectedData.selectedData.value;

                        //Vehicle
                        $("#loadingImage_DdslickVehicle").loadImager('removeLoadImage');
                        $("#loadingImage_DdslickVehicle").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups&language_code=en&pk=GsZVzEYe50uGgNM&vehicle_groups_id=1
                        var ajaxACLResources_vehicle = $('#ajax_DdslickVehicle').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickVehicle",
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

    //request for customer
    $('#loadingImage_DdslickReqCustomer').loadImager('removeLoadImage');
    $("#loadingImage_DdslickReqCustomer").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=fillYesNoTypes_sysSpecificDefinitions&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_ReqCustomer = $('#ajax_DdslickReqCustomer').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickReqCustomer",
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

    ajaxACLResources_ReqCustomer.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataReqCustomer) {

            var cbdata_ReqCustomer = $.parseJSON(dataReqCustomer);
            cbdata_ReqCustomer.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickReqCustomer').ddslick({
                data: cbdata_ReqCustomer,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    var reqcus = selectedData.selectedData.text;
                    if (selectedData.selectedData.text == "Yes") {
                        //Customer
                        $('#loadingImage_DdslickCustomer').loadImager('removeLoadImage');
                        $("#loadingImage_DdslickCustomer").loadImager('appendImage');
                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCustomerDdList_infocustomer&language_code=en&pk=GsZVzEYe50uGgNM
                        var ajaxACLResources_Customer = $('#ajax_DdslickCustomer').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickCustomer",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/DefaultPost/DefaultPostModel',
                            type: "POST",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkCustomerDdList_infocustomer",
                                pkIdentity: $("#publicKey").val()
                            })
                        });

                        ajaxACLResources_Customer.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onSuccess: function (event, datacus) {

                                var cbdata_cus = $.parseJSON(datacus);
                                cbdata_cus.splice(0, 0,
                                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                );

                                $('#ddslickCustomer').ddslick({
                                    data: cbdata_cus,
                                    width: '100%',
                                    search: true,
                                    searchText: window.lang.translate('Search')
                                })
                                $('#loadingImage_DdslickCustomer').loadImager('removeLoadImage');
                            },
                            onAfterSuccess: function (event, data) {
                                $('#loadingImage_DdslickCustomer').loadImager('removeLoadImage');
                            }
                        })
                        ajaxACLResources_Customer.ajaxCallWidget('call');
                        //Location End
                    }
                    else {
                        $('#ddslickCustomer').ddslick('destroy');
                    }
                }
                
            })
            $('#loadingImage_DdslickReqCustomer').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickReqCustomer').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_ReqCustomer.ajaxCallWidget('call');
    //request for customer End
    


    //Application type
    $('#loadingImage_DdslickAppType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickAppType").loadImager('appendImage');
    //pkCustomerApplicationMainTypesDdList_syscustomerapplicationtypes
    var ajaxACLResources_apptype = $('#ajax_DdslickApptype').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickAppType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysCustomerApplicationType',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerApplicationMainTypesDdList_syscustomerapplicationtypes",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });

    ajaxACLResources_apptype.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataloc) {

            var cbdata_loc = $.parseJSON(dataloc);
            cbdata_loc.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickAppType').ddslick({
                data: cbdata_loc,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickAppType').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickAppType').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_apptype.ajaxCallWidget('call');
    //Application type end


    /* devexgrid */
    DevExpress.localization.locale(langCode);

    $('#demoCourNewRefresh').click(function () {
        //new req grid
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillQuotasMatrixGridx_syssisquotasmatrix&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        var demoCourNew = new DevExpress.data.CustomStore({
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
                        url: "pkFillQuotasMatrixGridx_syssisquotasmatrix",
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
                //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syssisquotasmatrix&id=33&pk=GsZVzEYe50uGgNM
                return $.ajax({
                    url: '/Sys/SysDeleteYearlyQuota',
                    dataType: "json",
                    data: JSON.stringify({
                        id: demoVehicleId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_syssisquotasmatrix"
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
        //new req Grid
        $("#gridContainer_DemoCourNew").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: demoCourNew,
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
                fileName: "demoCourNewReq"
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
            columns: [{
                caption: window.lang.translate('Active/Passive'),
                width: 40,
                alignment: 'center',
                encodeHtml: false,

                cellTemplate: function (container, options) {
                    var fieldHtml;
                    var demoveh_id = options.data.id;

                    if (options.data.active === 1) {
                        //active
                        $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                            activepasiveDemoVehicle(demoveh_id, options.data.active);
                            //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                        }).appendTo(container);
                    } else if (options.data.active === 0) {
                        //pasive
                        $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                            activepasiveDemoVehicle(demoveh_id, options.data.active);
                            //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                        }).appendTo(container);
                    }
                }
            }, {
                caption: window.lang.translate('Demo/Courtesy') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Vehicle model group') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Vehicle model end group') + "...",
                dataField: "value",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Extras(accessories & body)') + "...",
                dataField: "value",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Number of units') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Motivation') + "...",
                dataField: "value",
                encodeHtml: false
            }, {
                caption: window.lang.translate('REquest for customer') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Customer') + "...",
                dataField: "year",
                encodeHtml: false 
            }, {
                caption: window.lang.translate('Application type') + "...",
                dataField: "year",
                encodeHtml: false           
            }],

            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    QuotaYearID = data.id;
                    fillDemoCourNewForm(data);
                }
            },
            onRowRemoving: function (e) {
                demoVehicleId = e.key.id;
                //deleteTrName(trName_id);
            },
            onRowRemoved: function (e) {
                $("#gridContainer_DemoCourNew").dxDataGrid("instance").refresh();
            },
        });
    });

    $('#demoCourNewRefresh').click();

    /**
    * Yearly Quota Form
    * @author Ceydacan Seyrek
    * @since 22/10/2018
    */

    $("#btn-demoCourNew-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#demoCourtesyNewReqForm").validationEngine('validate')) {

            //window.insertTrainingName = function () {

            //$("#loadingImage_yearlyQuota").loadImager('removeLoadImage');
            //$("#loadingImage_yearlyQuota").loadImager('appendImage');


            //var ddDataQuotaType = $('#ddslickQuotaType').data('ddslick');
            //if (!ddDataQuotaType.selectedData.value > 0) {
            //    wm.warningMessage('resetOnShown');
            //    wm.warningMessage('show', window.lang.translate("Please select Quota type"),
            //        window.lang.translate("Please select Quota type"));
            //    $('#loadingImage_DdslickQuotaType').loadImager('removeLoadImage');
            //    return false;
            //}
            //var sis_quota_id = ddDataQuotaType.selectedData.value;

            //var ddDataQuotayear = $('#ddslickQuotaYear').data('ddslick');
            //if (!ddDataQuotayear.selectedData.value > 0) {
            //    wm.warningMessage('resetOnShown');
            //    wm.warningMessage('show', window.lang.translate("Please select Quota year"),
            //        window.lang.translate("Please select Quota year"));
            //    $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
            //    return false;
            //}
            //var year = ddDataQuotayear.selectedData.text;

            //var value = $('#txt-QuotaYear-limit').val();

            ////http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syssisquotasmatrix&sis_quota_id=1&year=2017&value=150&id=4&pk=GsZVzEYe50uGgNM
            ////&sis_quota_id=1
            ////&year=2017
            ////&value=150&
            ////id=4
            ////&pk=GsZVzEYe50uGgNM  

            //var ajax_InsertYearlyQuota = $('#ajaxACL-yearlyQuota').ajaxCallWidget({
            //    failureLoadImage: true,
            //    loadingImageID: "loadingImage_yearlyQuota",
            //    triggerSuccessAuto: true,
            //    transactionSuccessText: window.lang.translate('Transaction successful'),
            //    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            //    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

            //    proxy: '/Sys/AddYearlyQuota',
            //    type: 'POST',
            //    data: JSON.stringify({
            //        url: "pkInsertAct_syssisquotasmatrix",
            //        sis_quota_id: sis_quota_id,
            //        year: year,
            //        value: value,
            //        pk: "GsZVzEYe50uGgNM",
            //    })
            //});
            //ajax_InsertYearlyQuota.ajaxCallWidget({
            //    onReset: function (event, data) {
            //        resetDemoCourAlloForm();
            //    },
            //    onAfterSuccess: function (event, data) {
            //        $("#gridContainer_DemoCourNew").dxDataGrid("instance").refresh();
            //    }
            //})
            //ajax_InsertYearlyQuota.ajaxCallWidget('call');
            return false;
        }
    })
    /**
    * reset demo Return Form
    * @author Ceydacan Seyrek
    * @since 22/10/2018
    */
    $("#btn-demoCourNew-clear").on("click", function (e) {
        e.preventDefault();
        resetDemoCourNewForm();
        return false;
    })

    var resetDemoCourNewForm = function () {
        $("#loadingImage_demoCourtesyNewReq").loadImager('removeLoadImage');
        $("#loadingImage_demoCourtesyNewReq").loadImager('appendImage');

        $('#demoCourtesyNewReqForm').validationEngine('hide');
        $('#ddslickDemoCourtesy').ddslick('select', { index: String(0) });
        $('#ddslickVehicle').ddslick('destroy');
        $('#ddslickModel').ddslick('select', { index: String(0) });
        $('#ddslickReqCustomer').ddslick('select', { index: String(0) });
        $('#ddslickCustomer').ddslick('destroy');
        $('#ddslickAppType').ddslick('select', { index: String(0) });

        $("#loadingImage_demoCourtesyNewReq").loadImager('removeLoadImage');

        return false;
    }

    /**
    * Fill demo return Form
    * @author Ceydacan Seyrek
    * @since 22/10/2018
    */

    window.fillDemoCourNewForm = function (data) {
        //$("#loadingImage_demoCourtesyNewReq").loadImager('removeLoadImage');
        //$("#loadingImage_demoCourtesyNewReq").loadImager('appendImage');

        //document.getElementById("txt-QuotaYear-limit").value = data.value;

        //$('#ddslickQuotaType').ddslick('selectByValue',
        //    {
        //        index: '' + data.id + '',
        //        text: '' + data.name + ''
        //    }
        //);
        //$('#ddslickQuotaYear').ddslick('selectByValue',
        //    {
        //        index: '' + data.year + ''
        //    }
        //);
        //$("#loadingImage_yearlyQuota").loadImager('removeLoadImage');
        return false;
    }

/**
* Active Passive demo return Form
* @author Ceydacan Seyrek
* @since 22/10/2018  activepasiveDemoVehicle(demoveh_id, options.data.active);
*/
    window.activepasiveDemoVehicle = function (demoveh_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syssisquotasmatrix&id=29&pk=GsZVzEYe50uGgNM
        var ajax_activepasiveDemoCourReturn = $('#ajaxACL-QuotaYear').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loadingImage_DdslickQuotaYearGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Sys/SysActivePassiveYearlyQuota',
            type: "POST",
            data: JSON.stringify({
                id: demoveh_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syssisquotasmatrix"
            }),

        });
        ajax_activepasiveDemoCourReturn.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_DemoCourNew").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveDemoCourReturn.ajaxCallWidget('call');
    }

});

