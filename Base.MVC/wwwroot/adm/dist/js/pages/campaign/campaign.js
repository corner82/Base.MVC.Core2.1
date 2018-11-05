///*
//* Campaign Form
//* @author Ceydacan Seyrek
//* @since 27/10/2018
//*/
$(document).ready(function () {
    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Cancel',
        actionButtonLabel: 'Continue'
    });

    var campaignID;
    var campNameID;

    //var ddslick_chassisId = 0;
    //var ddslick_chassis_name = "";

/*
* datepicker format
* @author Ceydacan Seyrek
* @since 27/10/2016
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

    //Loading image
    $("#loadingImage_campaign").loadImager();
    $("#loading-image-CampaignName").loadImager();

    $("#loadingImage_DdslickChassis").loadImager();
    $("#loadingImage_DdslickModel").loadImager();
    $("#loadingImage_DdslickCampaign").loadImager();

    //Loading image grid
    $("#loadingImage_DdslickCampaignList").loadImager();
    $("#loading-image-campaignNameGrid").loadImager();

    //Validation
    $('#campaignForm').validationEngine(); 
    $('#campaignNameForm').validationEngine(); 


    //model
    $('#loadingImage_DdslickModel').loadImager('removeLoadImage');
    $("#loadingImage_DdslickModel").loadImager('appendImage');

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
        onSuccess: function (event, datamodelname) {

            var cbdata_modelname = $.parseJSON(datamodelname);
            cbdata_modelname.splice(0, 0,
                { text: window.lang.translate('All'), value: 0, selected: false, description: "" }
            );

            $('#ddslickModel').ddslick({
                data: cbdata_modelname,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {

                    $('#ddslickChassis').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {


                        var vehicle_groups_id = selectedData.selectedData.value;

                        //Chassis
                        $("#loadingImage_DdslickChassis").loadImager('removeLoadImage');
                        $("#loadingImage_DdslickChassis").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkStockVehiclesDdList_infostock&language_code=en&pk=GsZVzEYe50uGgNM
                        var ajaxACLResources_chassis = $('#ajax_DdslickChassis').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickChassis",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Campaign/CampaignChassis',
                            type: "POST",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkStockForVehiclesGroupDdList_infostock",
                                pkIdentity: $("#publicKey").val(),
                                vehicle_groups_id: vehicle_groups_id
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
                                    search: true,
                                    searchText: window.lang.translate('Search'),
                                })
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
            $('#loadingImage_DdslickModel').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickModel').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_model.ajaxCallWidget('call');
//Model End

//Campaign name
    var addUpdateCampName = function () {
        $('#loadingImage_DdslickCampaign').loadImager('removeLoadImage');
        $("#loadingImage_DdslickCampaign").loadImager('appendImage');
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCampaignsDdList_syscampaigns&language_code=en&pk=GsZVzEYe50uGgNM
        var ajaxACLResources_campaign = $('#ajax_DdslickCampaign').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loadingImage_DdslickCampaign",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Vehicle/SysVehicleGroups',
            type: "POST",
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkCampaignsDdList_syscampaigns",
                pkIdentity: $("#publicKey").val()
            })
        });

        ajaxACLResources_campaign.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onSuccess: function (event, datacampaignname) {

                var cbdata_campaignname = $.parseJSON(datacampaignname);
                cbdata_campaignname.splice(0, 0,
                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                );

                $('#ddslickCampaign').ddslick({
                    data: cbdata_campaignname,
                    width: '100%',
                    //search: true,
                    //searchText: window.lang.translate('Search'),
                    onSelected: function (selectedData) {
                    }
                })
                $('#loadingImage_DdslickCampaign').loadImager('removeLoadImage');
            },
            onAfterSuccess: function (event, data) {
                $('#loadingImage_DdslickCampaign').loadImager('removeLoadImage');
            }
        })
        ajaxACLResources_campaign.ajaxCallWidget('call');
    }
    addUpdateCampName();
//Campaign name End


    /////////////////////////////////CAMPAIGN INFO////////////////////////////////////////

/* devexgrid */
    $('#campaignListRefresh').click(function () {
        $("#gridContainer_campaignList").dxDataGrid("instance").refresh();
    });

//Campaign grid
//http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillCampaignVehiclesGridx_syscampaignvehicles&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM&campaign_id=2&vehicle_groups_id=1
    var campaign = new DevExpress.data.CustomStore({
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
                url: '/Campaign/CampaignGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillCampaignVehiclesGridx_syscampaignvehicles",
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
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syscampaignvehicles&id=41&pk=GsZVzEYe50uGgNM
            return $.ajax({
                url: '/Campaign/DeleteCampaign',
                dataType: "json",
                data: JSON.stringify({
                    id: campaignID,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_syscampaignvehicles"
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

        //campaign Info dxDataGrid
    $("#gridContainer_campaignList").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: campaign,
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
            fileName: "campaign"
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
            caption: window.lang.translate('Active/Passive'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var campaign_id = options.data.id;

                if (options.data.active === 1) {
                    //active  
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveCampaign(campaign_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveCampaign(campaign_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                    }).appendTo(container);
                }
            }
        }, {
            caption: window.lang.translate('Model group') + "...",
            encodeHtml: false,
            dataField: "vehichle_group_name"               
        }, {
            caption: window.lang.translate('Chassis') + "...",
            encodeHtml: false,
            dataField: "chassis_no"
        }, {
            caption: window.lang.translate('Campaign name') + "...",
            encodeHtml: false,
            dataField: "campaign_name"
        }, {
            caption: window.lang.translate('Campaign start date') + "...",
            encodeHtml: false,
            dataField: "start_date",
            dataType: "date"
        }, {
            caption: window.lang.translate('Campaign end date') + "...",
            encodeHtml: false,
            dataField: "end_date",
            dataType: "date"
        }, {
            caption: window.lang.translate('Campaign price') + "...",
            encodeHtml: false,
            dataField: "campaign_price"
        }, {
            caption: window.lang.translate('ASM limit') + "...",
            encodeHtml: false,
            dataField: "asm_campaign_limit"
        }, {
            caption: window.lang.translate('Salesman limit') + "...",
            encodeHtml: false,
            dataField: "salesman_campaign_limit"
        }, {
            caption: window.lang.translate('Dealer limit') + "...",
            encodeHtml: false,
            dataField: "dealer_campaign_limit"
        }, {
            caption: window.lang.translate('Local support') + "...",
            encodeHtml: false,
            dataField: "local_support"
        }, {
            caption: window.lang.translate('Germany support') + "...",
            encodeHtml: false,
            dataField: "germany_support"
        }, {
            caption: window.lang.translate('MFS support') + "...",
            encodeHtml: false,
            dataField: "mfs_support"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                campaignID = data.id;
                //filldropdown = true;
                fillCampaign(data);
            }
        },
        onRowRemoving: function (e) {
            campaignID = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_campaignList").dxDataGrid("instance").refresh();
        },
    });


    /**
    * insert campaign
    * @author Ceydacan Seyrek
    * @since 12/10/2018
    */

    $("#btn-campaign-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#campaignForm").validationEngine('validate')) {

            //window.insertTrainingInfo = function () {
            $("#loadingImage_campaign").loadImager('removeLoadImage');
            $("#loadingImage_campaign").loadImager('appendImage');

            var ddDataChassis = $('#ddslickChassis').data('ddslick');
            if (!ddDataChassis.selectedData.value > 0) {
                var chassis_id = "";
            }
            else {
                var chassis_id = ddDataChassis.selectedData.value;
            }

            var ddDataCampId = $('#ddslickCampaign').data('ddslick');
            if (!ddDataCampId.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select campaign name "),
                    window.lang.translate("Please select campaign name"));
            }
            else {
                var campaign_id = ddDataCampId.selectedData.value;
            }

            var ddDataModel = $('#ddslickModel').data('ddslick');
            var model_id = ddDataModel.selectedData.value;

            var start_date = $('#start-datepicker').val();
            var end_date = $('#end-datepicker').val();
            var price =  $('#txt-campaign-price').val();
            var asmLimit = $('#txt-campaign-asmLimit').val();
            var smLimit = $('#txt-campaign-smLimit').val();
            var dealerLimit = $('#txt-campaign-dealerLimit').val();
            var localSupport = $('#txt-campaign-localSupport').val();
            var germanySupport = $('#txt-campaign-germanySupport').val();
            var mfsSupport = $('#txt-campaign-mfsSupport').val();
            
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?
            //url=pkInsertAct_systruckstogovehicles
            //&truckstogo_type_id=2
            //&stock_id=1
            //&description=
            //&etd_date=2018-12-12
            //&pk=GsZVzEYe50uGgNM


            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_systruckstogovehicles&truckstogo_type_id=2&stock_id=1&description=&etd_date=2018-12-12&pk=GsZVzEYe50uGgNM&id=2
            if (!campaignID == "") {//Update
                var ajax_InsertCampaign = $('#ajaxACL-insertCampaign').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_campaign",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Campaign/AddCampaign',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_syscampaignvehicles",
                        id: campaignID,
                        campaign_id: campaign_id,
                        stock_vehicle_id: chassis_id,
                        stock_vehicle_group_id: model_id,
                        start_date: start_date,
                        end_date: end_date,
                        campaign_price: price,
                        asm_campaign_limit: asmLimit,
                        salesman_campaign_limit: smLimit,
                        dealer_campaign_limit: dealerLimit,
                        local_support: localSupport,
                        germany_support: germanySupport,
                        mfs_support: mfsSupport,                       
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertCampaign.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetCampaignForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_campaignList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertCampaign.ajaxCallWidget('call');
            }
            else {//insert
                var ajax_InsertCampaign = $('#ajaxACL-insertCampaign').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_campaign",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Campaign/AddCampaign',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_syscampaignvehicles",                       
                        campaign_id: campaign_id,
                        stock_vehicle_id: chassis_id,
                        stock_vehicle_group_id: model_id,
                        start_date: start_date,
                        end_date: end_date,
                        campaign_price: price,
                        asm_campaign_limit: asmLimit,
                        salesman_campaign_limit: smLimit,
                        dealer_campaign_limit: dealerLimit,
                        local_support: localSupport,
                        germany_support: germanySupport,
                        mfs_support: mfsSupport,      
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertCampaign.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetCampaignForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_campaignList").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertCampaign.ajaxCallWidget('call');
            }
            campaignID = "";
            return false;
        }
    })

    /**
    * reset campaign Form
    * @author Ceydacan Seyrek
    * @since 27/10/2018
    */

    $("#btn-campaign-clear").on("click", function (e) {
        e.preventDefault();
        resetCampaignForm();
        return false;
    })

    var resetCampaignForm = function () {
        $("#loadingImage_campaign").loadImager('removeLoadImage');
        $("#loadingImage_campaign").loadImager('appendImage');

        $('#campaignForm')[0].reset();
        $('#campaignForm').validationEngine('hide');

        $('#ddslickChassis').ddslick('select', { index: String(0) });
        $('#ddslickCampaign').ddslick('select', { index: String(0) });
        $('#ddslickModel').ddslick('select', { index: String(0) });

        $("#loadingImage_campaign").loadImager('removeLoadImage');
        return false;
    }

    /**
    * Fill campaign form
    * @author Ceydacan Seyrek
    * @since 27/10/2018
    */

    window.fillCampaign = function (data) {
        $("#loadingImage_campaign").loadImager('removeLoadImage');
        $("#loadingImage_campaign").loadImager('appendImage');

        //document.getElementById("txt-bbreturn-price").value = data.SaleAmount;
        //document.getElementById("txt-campaign-name").value = data.campaign_name;
        document.getElementById("txt-campaign-price").value = data.campaign_price;
        document.getElementById("txt-campaign-asmLimit").value = data.asm_campaign_limit;
        document.getElementById("txt-campaign-smLimit").value = data.salesman_campaign_limit;
        document.getElementById("txt-campaign-dealerLimit").value = data.dealer_campaign_limit;
        document.getElementById("txt-campaign-localSupport").value = data.local_support;
        document.getElementById("txt-campaign-germanySupport").value = data.germany_support;
        document.getElementById("txt-campaign-mfsSupport").value = data.mfs_support;
        document.getElementById("start-datepicker").value = data.start_date;
        document.getElementById("end-datepicker").value = data.end_date;

        //$('#ddslickChassis').ddslick('selectByValue',
        //    {
        //        index: '' + data.stock_vehicle_id + '',
        //        text: '' + data.chassis_no + ''
        //    }
        //);//düzeltilecek

        $('#ddslickModel').ddslick('selectByValue',
            {
                index: '' + data.vehicle_groups_id  + '',
                text: '' + data.vehichle_group_name + ''
            }
        );

        $('#ddslickCampaign').ddslick('selectByValue',
            {
                index: '' + data.campaign_id  + '',
                text: '' + data.campaign_name + ''
            }
        );

        $("#loadingImage_campaign").loadImager('removeLoadImage');

        return false;
    }

    window.activepasiveCampaign = function (campaign_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syscampaignvehicles&pk=GsZVzEYe50uGgNM&id=6
        var ajax_activepasiveCAmpaign = $('#ajaxACL-campaignList').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loadingImage_DdslickCampaignList",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Campaign/SysActivePasiveCampaign',
            type: "POST",
            data: JSON.stringify({
                id: campaign_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syscampaignvehicles"
            }),

        });
        ajax_activepasiveCampaign.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_campaignList").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveCampaign.ajaxCallWidget('call');
       
    }

    window.smLimitOnChange = function () {
        document.getElementById("txt-campaign-dealerLimit").value = document.getElementById("txt-campaign-smLimit").value * 0.99;
    }


    /////////////////////////////////CAMPAIGN NAME////////////////////////////////////////

    /* devexgrid */
    $('#campaignNameListRefresh').click(function () {
        $("#gridContainer_campaignName").dxDataGrid("instance").refresh();
    });

    //Campaign name grid
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillCampaignsGridx_syscampaigns&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var campaignName = new DevExpress.data.CustomStore({
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
                url: '/Campaign/CampaignGrid',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillCampaignsGridx_syscampaigns",
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
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syscampaigns&id=4&pk=GsZVzEYe50uGgNM
            return $.ajax({
                url: '/Campaign/DeleteCampaign',
                dataType: "json",
                data: JSON.stringify({
                    id: campNameID,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_syscampaigns"
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

    //campaign name dxDataGrid
    $("#gridContainer_campaignName").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: campaignName,
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
            fileName: "campaignName"
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
        //columnWidth: {
        //    autoWidth: false
        //},
        columns: [{
            caption: window.lang.translate('Active/Passive'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var campName_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveCampaignName(campName_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveCampaignName(campName_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                    }).appendTo(container);
                }
            }
        }, {
            caption: window.lang.translate('Campaign name') + "...",
            encodeHtml: false,
            dataField: "name"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                campNameID = data.id;
                //filldropdown = true;
                fillCampaignName(data);
            }
        },
        onRowRemoving: function (e) {
            campNameID = e.key.id;
        },
        onRowRemoved: function (e) {
            $("#gridContainer_campaignName").dxDataGrid("instance").refresh();
        },
    });


    /**
    * insert campaign name
    * @author Ceydacan Seyrek
    * @since 27/10/2018
    */

    $("#btn-campaignName-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#campaignNameForm").validationEngine('validate')) {

            //window.insertTrainingInfo = function () {
            $("#loading-image-CampaignName").loadImager('removeLoadImage');
            $("#loading-image-CampaignName").loadImager('appendImage');

            var name = $('#txt-campaign-campaignName').val();


            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syscampaigns&name=campaign%201&pk=GsZVzEYe50uGgNM
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_syscampaigns&name=ssddss&pk=GsZVzEYe50uGgNM&id=4
            if (!campNameID == "") {//Update
                var ajax_InsertCampaignName = $('#ajaxACL-insertCampaignName').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-CampaignName",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Campaign/AddCampaignName',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_syscampaigns",
                        id: campNameID,
                        name: name,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertCampaignName.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetCampaignNameForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_campaignName").dxDataGrid("instance").refresh();
                       
                    }
                })
                ajax_InsertCampaignName.ajaxCallWidget('call');
            }
            else {//insert
                var ajax_InsertCampaignName = $('#ajaxACL-insertCampaignName').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-CampaignName",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Campaign/AddCampaignName',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_syscampaigns",
                        name: name,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertCampaignName.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetCampaignNameForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_campaignName").dxDataGrid("instance").refresh();
                        
                    }
                })
                ajax_InsertCampaignName.ajaxCallWidget('call');
            }
            addUpdateCampName();
            campNameID = "";
            return false;
        }
    })

    /**
    * reset campaign name Form
    * @author Ceydacan Seyrek
    * @since 27/10/2018
    */

    $("#btn-campaignName-clear").on("click", function (e) {
        e.preventDefault();
        resetCampaignNameForm();
        return false;
    })

    var resetCampaignNameForm = function () {
        $("#loading-image-CampaignName").loadImager('removeLoadImage');
        $("#loading-image-CampaignName").loadImager('appendImage');

        $('#campaignNameForm')[0].reset();
        $('#campaignNameForm').validationEngine('hide');

        $("#loading-image-CampaignName").loadImager('removeLoadImage');
        return false;
    }

    /**
    * Fill campaign name form
    * @author Ceydacan Seyrek
    * @since 27/10/2018
    */

    window.fillCampaignName = function (data) {
        $("#loading-image-CampaignName").loadImager('removeLoadImage');
        $("#loading-image-CampaignName").loadImager('appendImage');

        //document.getElementById("txt-bbreturn-price").value = data.SaleAmount;
        document.getElementById("txt-campaign-campaignName").value = data.name;

        $("#loading-image-CampaignName").loadImager('removeLoadImage');

        return false;
    }

    /**
    * Active/passive campaign name form
    * @author Ceydacan Seyrek
    * @since 27/10/2018
    */
    window.activepasiveCampaignName = function (campName_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syscampaigns&pk=GsZVzEYe50uGgNM&id=6
        var ajax_activepasiveCampaign = $('#ajaxACL-campNameList').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-campaignNameGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Campaign/SysActivePasiveCampaign',
            type: "POST",
            data: JSON.stringify({
                id: campName_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syscampaigns"
            }),

        });
        ajax_activepasiveCampaign.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_campaignName").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveCampaign.ajaxCallWidget('call');

    }

});

