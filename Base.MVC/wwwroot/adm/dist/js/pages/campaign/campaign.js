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
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });

    var campaignID;

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

    $("#loadingImage_DdslickChassis").loadImager();
    $("#loadingImage_DdslickModel").loadImager();

    //Loading image grid
    $("#loadingImage_DdslickCampaignList").loadImager();

    //Validation
    $('#campaignForm').validationEngine(); 

//Chassis
    $("#loadingImage_DdslickChassis").loadImager('removeLoadImage');
    $("#loadingImage_DdslickChassis").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVasSaseShortDdList_sysvasxml&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_chassis = $('#ajax_DdslickChassis').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickChassis",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVasSaseShortDdList_sysvasxml",
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
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_systruckstogovehicles&id=6&pk=GsZVzEYe50uGgNM
            return $.ajax({
                url: '/Campaign/DeleteCampaign',
                dataType: "json",
                data: JSON.stringify({
                    id: truckstogoID,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_systruckstogovehicles"
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
        //columnWidth: {
        //    autoWidth: false
        //},
        columns: [{
            caption: window.lang.translate('Model group') + "...",
            encodeHtml: false,
            dataField: "vehichle_group_name"               
        }, {
            caption: window.lang.translate('Chassis') + "...",
            encodeHtml: false,
            dataField: "model_description"//Düzeltilecek
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
            dataField: "germany_support"
        }, {
            caption: window.lang.translate('ASM limit') + "...",
            encodeHtml: false,
            dataField: "germany_support"
        }, {
            caption: window.lang.translate('Salesman limit') + "...",
            encodeHtml: false,
            dataField: "germany_support"
        }, {
            caption: window.lang.translate('Dealer limit') + "...",
            encodeHtml: false,
            dataField: "germany_support"
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

            var ddDataModel = $('#ddslickModel').data('ddslick');
            var model_id = ddDataModel.selectedData.value;

            var name = $('#txt-campaign-name').val();
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
                var ajax_InsertCampaign = $('#ajaxACL-campaignList').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_campaign",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Campaign/AddCampaign',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkUpdateAct_systruckstogovehicles",
                        id: truckstogoID,
                        chassis_id: chassis_id,
                        model_id: model_id,
                        name: name,
                        start_date: start_date,
                        end_date: end_date,
                        price: price,
                        asmLimit: asmLimit,
                        smLimit: smLimit,
                        dealerLimit: dealerLimit,
                        localSupport: localSupport,
                        germanySupport: germanySupport,
                        mfsSupport: mfsSupport,                       
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
                var ajax_InsertCampaign = $('#ajaxACL-campaignList').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_campaign",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Campaign/AddCampaing',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_systruckstogovehicles",                       
                        chassis_id: chassis_id,
                        model_id: model_id,
                        name: name,
                        start_date: start_date,
                        end_date: end_date,
                        price: price,
                        asmLimit: asmLimit,
                        smLimit: smLimit,
                        dealerLimit: dealerLimit,
                        localSupport: localSupport,
                        germanySupport: germanySupport,
                        mfsSupport: mfsSupport,          
                        pk: "GsZVzEYe50uGgNM"
                    })
                });
                ajax_InsertCampaign.ajaxCallWidget({
                    onReset: function (event, data) {
                        resetCampaignForm();
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_campaigngoList").dxDataGrid("instance").refresh();
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
        document.getElementById("txt-campaign-name").value = data.description;
        document.getElementById("txt-campaign-price").value = data.description;
        document.getElementById("txt-campaign-asmLimit").value = data.description;
        document.getElementById("txt-campaign-smLimit").value = data.description;
        document.getElementById("txt-campaign-dealerLimit").value = data.description;
        document.getElementById("txt-campaign-localSupport").value = data.description;
        document.getElementById("txt-campaign-germanySupport").value = data.description;
        document.getElementById("txt-campaign-mfsSupport").value = data.description;
        document.getElementById("start-datepicker").value = data.start_date;
        document.getElementById("end-datepicker").value = data.end_date;

        $('#ddslickChassis').ddslick('selectByValue',
            {
                index: '' + data.stock_id + '',
                text: '' + data.chassis_no + ''
            }
        );//düzeltilecek

        $('#ddslickModel').ddslick('selectByValue',
            {
                index: '' + data.vehichle_group_name + '',
                text: '' + data.vehicle_groups_id + ''
            }
        );

        $("#loadingImage_campaign").loadImager('removeLoadImage');

        return false;
    }

    window.smLimitOnChange = function () {
        document.getElementById("txt-campaign-dealerLimit").value = document.getElementById("txt-campaign-smLimit").value * 0.99;
    }
});

