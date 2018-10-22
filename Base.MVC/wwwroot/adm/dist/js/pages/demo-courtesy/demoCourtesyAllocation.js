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
    $("#loadingImage_demoCourtesyAllocation").loadImager();
    $("#loadingImage_DdslickDemoCourtesy").loadImager();
    $("#loadingImage_DdslickDemoVehicle").loadImager();
    $("#loadingImage_DdslickCustomer").loadImager();
    $("#loadingImage_DdslickLocation").loadImager();
    $("#loadingImage_DdslickReturnLoc").loadImager();
    $("#loadingImage_DdslickCusPri").loadImager();
    $("#loadingImage_DdslickPotSize").loadImager();

    //to demo return form grid loading-image
    $("#loadingImage_DdslickDemoCourAllocationGrid").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);
    var demoVehicleId;

    $("#demoCourtesyAllocationForm").validationEngine('validate')

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

    //Demo vehicle
    $('#loadingImage_DdslickDemoVehicle').loadImager('removeLoadImage');
    $("#loadingImage_DdslickDemoVehicle").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustYearsDdList_sysmonths&pk=GsZVzEYe50uGgNM&id=55
    var ajaxACLResources_DemoVehicle = $('#ajax_DdslickDemoVehicle').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickDemoVehicle",
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

    ajaxACLResources_DemoVehicle.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datademovehicle) {

            var cbdata_demovehicle = $.parseJSON(datademovehicle);
            cbdata_demovehicle.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickDemoVehicle').ddslick({
                data: cbdata_demovehicle,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickDemoVehicle').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickDemoVehicle').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_DemoVehicle.ajaxCallWidget('call');
    //Demo vehicle End
    
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

    //Location
    $('#loadingImage_DdslickLocation').loadImager('removeLoadImage');
    $("#loadingImage_DdslickLocation").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkBranchesDealersDeffDdList_sysbranchesdealersdeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_Location = $('#ajax_DdslickLocation').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickLocation",
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

    ajaxACLResources_Location.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataloc) {

            var cbdata_loc = $.parseJSON(dataloc);
            cbdata_loc.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickLocation').ddslick({
                data: cbdata_loc,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickLocation').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickLocation').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Location.ajaxCallWidget('call');
    //Location End

    //Return Location
    $('#loadingImage_DdslickReturnLoc').loadImager('removeLoadImage');
    $("#loadingImage_DdslickReturnLoc").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkBranchesDealersDeffDdList_sysbranchesdealersdeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_ReturnLoc = $('#ajax_DdslickReturnLoc').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickReturnLoc",
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

    ajaxACLResources_ReturnLoc.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datareturnloc) {

            var cbdata_returnloc = $.parseJSON(datareturnloc);
            cbdata_returnloc.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickReturnLoc').ddslick({
                data: cbdata_returnloc,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickReturnLoc').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickReturnLoc').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_ReturnLoc.ajaxCallWidget('call');
    //Return Location End

    //Priority 
    $('#loadingImage_DdslickPriority').loadImager('removeLoadImage');
    $("#loadingImage_DdslickPriority").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCustomerReliabilityDdList_syscustomerreliability&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_Priority = $('#ajax_DdslickCusPri').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickPriority",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerReliabilityDdList_syscustomerreliability",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Priority.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datacuspri) {

            var cbdata_cuspri = $.parseJSON(datacuspri);
            cbdata_cuspri.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickCusPri').ddslick({
                data: cbdata_cuspri,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickPriority').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickPriority').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Priority.ajaxCallWidget('call');
    //Priority End

    //Deal size 
    $('#loadingImage_DdslickPotSize').loadImager('removeLoadImage');
    $("#loadingImage_DdslickPotSize").loadImager('appendImage');
    //pkNumericalRangesVeichlesDdList_sysnumericalranges
    var ajaxACLResources_Potsize = $('#ajax_DdslickPotSize').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickPotSize",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkNumericalRangesVeichlesDdList_sysnumericalranges",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Potsize.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datapotsize) {

            var cbdata_potsize = $.parseJSON(datapotsize);
            cbdata_potsize.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickPotSize').ddslick({
                data: cbdata_potsize,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickPotSize').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickPotSize').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Potsize.ajaxCallWidget('call');
    //Deal Size End


    /* devexgrid */
    DevExpress.localization.locale(langCode);

    $('#demoCourAlloRefresh').click(function () {
        //Allocation grid
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillQuotasMatrixGridx_syssisquotasmatrix&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        var demoCourAllo = new DevExpress.data.CustomStore({
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
        //Allocation Grid
        $("#gridContainer_DemoCourAllocation").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: demoCourAllo,
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
                fileName: "demoCourAllocation"
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
                caption: window.lang.translate('Demo/Courtesy vehicle') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Demo availability date') + "...",
                dataField: "value",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Demo start date') + "...",
                dataField: "value",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Demo end date') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Customer') + "...",
                dataField: "value",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Vehicle location') + "...",
                dataField: "name",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Vehicle return location') + "...",
                dataField: "year",
                encodeHtml: false 
            }, {
                caption: window.lang.translate('Motivation') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Customer priority level') + "...",
                dataField: "year",
                encodeHtml: false
            }, {
                caption: window.lang.translate('Potential deal size after demo') + "...",
                dataField: "value",
                encodeHtml: false
            }],

            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    QuotaYearID = data.id;
                    fillDemoCourAlloForm(data);
                }
            },
            onRowRemoving: function (e) {
                demoVehicleId = e.key.id;
                //deleteTrName(trName_id);
            },
            onRowRemoved: function (e) {
                $("#gridContainer_DemoCourAllocation").dxDataGrid("instance").refresh();
            },
        });
    });

    $('#demoCourAlloRefresh').click();

    /**
    * Yearly Quota Form
    * @author Ceydacan Seyrek
    * @since 22/10/2018
    */

    $("#btn-demoCourAllo-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#demoCourtesyAllocationForm").validationEngine('validate')) {

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
            //        $("#gridContainer_DemoCourAllocation").dxDataGrid("instance").refresh();
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
    $("#btn-demoCourAllo-clear").on("click", function (e) {
        e.preventDefault();
        resetDemoCourAlloForm();
        return false;
    })

    var resetDemoCourAlloForm = function () {
        $("#loadingImage_demoCourtesyAllocation").loadImager('removeLoadImage');
        $("#loadingImage_demoCourtesyAllocation").loadImager('appendImage');

        $('#demoCourtesyAllocationForm').validationEngine('hide');
        $('#ddslickDemoCourtesy').ddslick('select', { index: String(0) });
        $('#ddslickDemoVehicle').ddslick('select', { index: String(0) });
        $('#ddslickCustomer').ddslick('select', { index: String(0) });
        $('#ddslickLocation').ddslick('select', { index: String(0) });
        $('#ddslickReturnLoc').ddslick('select', { index: String(0) });
        $('#ddslickCusPri').ddslick('select', { index: String(0) });
        $('#ddslickPotSize').ddslick('select', { index: String(0) });

        $("#loadingImage_demoCourtesyAllocation").loadImager('removeLoadImage');

        return false;
    }

    /**
    * Fill demo return Form
    * @author Ceydacan Seyrek
    * @since 22/10/2018
    */

    window.fillDemoCourAlloForm = function (data) {
        //$("#loadingImage_demoCourtesyAllocation").loadImager('removeLoadImage');
        //$("#loadingImage_demoCourtesyAllocation").loadImager('appendImage');

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
                $("#gridContainer_DemoCourAllocation").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveDemoCourReturn.ajaxCallWidget('call');
    }

});

