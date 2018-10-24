$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------
    $('#tab_Campaign').loadImager();
    $('#loadingImage_DdslickVehicleGroupsCampaign').loadImager();
    $('#loadingImage_DdslickVehicleTypeCampaign').loadImager();
    //----------------------------------loadImager end-------------------------------------------------


    //----------------------------------asider begin-------------------------------------------------

    /*$('#testZeyn').slimScroll({
        height: '50px'
    });*/

    /**
     * add tradein to deal asider opening
     * @author Mustafa Zeynel Dağlı
     * @since 16/10/2018
     * */
    $('#campaignAddAside').asideRight({
        width: "900",
        height: "600",
        scroll: true,
    });

    /**
     * add tradein asider events
     * @author Mustafa Zeynel Dağlı
     * @since 16/10/2018
     * */
    $('#campaignAddAside').asideRight({
        onClosed: function (event, element) {
            //alert('onclosed event right slider');
        },
        onClosing: function (event, element) {
            //alert('onclosing event right slider');
        },
        onOpened: function (event, element) {
            //alert('onopened event right slider');
        },
        onOpening: function (event, element) {

            var dealID = null;
            /*if ($("#deal_hidden").deal()) {
                dealID = $("#deal_hidden").deal("getDealID");
            }
            if (dealID == null || dealID == "" || dealID <= 0) {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', "Please select deal",
                    "Please select deal");
                $('#tab_Campaign').loadImager('removeLoadImage');
                return false;
            }*7
            /* 
             * deal campaigns grid data source
             * @author Mustafa Zeynel dağlı
             * @since 16/10/2018
             * */
            var dealCampaigns_grid_datasource = new DevExpress.data.CustomStore({
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
                        url: '/DefaultPost/DefaultGridPostModel',
                        dataType: "json",
                        data: JSON.stringify({
                            language_code: $("#langCode").val(),
                            pk: "GsZVzEYe50uGgNM",
                            url: "pkFillProjectVehicleTIGridx_infoprojecttradeinvehicle",
                            pkIdentity: $("#publicKey").val(),
                            project_id: parseInt(dealID),
                            page: "",
                            rows: "",
                            sort: "",
                            order: "",
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
                }
            });
            DevExpress.localization.locale($('#langCode').val());
            $("#gridContainer_DealCampaigns").dxDataGrid({
                showColumnLines: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                dataSource: dealCampaigns_grid_datasource,
                columnHidingEnabled: false,
                editing: {
                    //mode: "batch"
                    mode: "row",
                    //allowAdding: false,
                    allowUpdating: false,
                    allowDeleting: false,
                    useIcons: false
                },
                "export": {
                    enabled: true,
                    fileName: "Orders"
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
                    //placeholder: "Search..."
                    placeholder: window.lang.translate("Search")
                },
                headerFilter: {
                    visible: true
                },
                columnChooser: {
                    enabled: true,
                    mode: "select"
                },
                selection: {
                    mode: "single"
                },
                onSelectionChanged: function (selectedItems) {
                },
                onRowClick: function (selectedItems) {
                    var data = selectedItems.data
                    console.log(data);
                    console.log(data.op_username);
                    $("#add_tradein_vehicle_deal").addClass("hidden");
                    $("#update_tradein_vehicle_deal").removeClass("hidden");
                    $("#upload_tradein_vehicle_deal").removeClass("hidden");
                    $("#add_tradein_vehicle_reset").removeClass("hidden");
                    //var data = selectedItems[0]["op_username"];
                    //console.log(data);

                },
                columns: [
                    {
                        //allowGrouping: false,
                        caption: "Campaign",
                        dataField: "campaign_name"
                    },
                    {
                        caption: "Germany support",
                        dataField: "germany_support"
                    },
                    {
                        caption: "Local support",
                        dataField: "local_support"
                    },
                    {
                        caption: "MFS support",
                        dataField: "mfs_support"
                    },
                    {
                        caption: "Vehicle",
                        dataField: "vehicle_description"
                    },
                    {
                        caption: "Model",
                        dataField: "vehicle_gt_model_name"
                    }

                ],
                customizeColumns: function (columns) {
                    //columns[5].format = { type: "currency", currency: "EUR" };
                },
                /*scrolling: {
                    mode: "virtual"
                },*/
            });

            /* 
             * deal campaigns grid data source
             * @author Mustafa Zeynel dağlı
             * @since 16/10/2018
             * */
            var campaigns_grid_datasource = new DevExpress.data.CustomStore({
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
                        url: '/DefaultPost/DefaultGridPostModel',
                        dataType: "json",
                        data: JSON.stringify({
                            language_code: $("#langCode").val(),
                            pk: "GsZVzEYe50uGgNM",
                            url: "pkFillProjectVehicleTIGridx_infoprojecttradeinvehicle",
                            pkIdentity: $("#publicKey").val(),
                            project_id: parseInt(dealID),
                            page: "",
                            rows: "",
                            sort: "",
                            order: "",
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
                }
            });
            DevExpress.localization.locale($('#langCode').val());
            $("#gridContainer_Campaigns").dxDataGrid({
                showColumnLines: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                dataSource: campaigns_grid_datasource,
                columnHidingEnabled: false,
                editing: {
                    //mode: "batch"
                    mode: "row",
                    //allowAdding: false,
                    allowUpdating: false,
                    allowDeleting: false,
                    useIcons: false
                },
                "export": {
                    enabled: true,
                    fileName: "Orders"
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
                    //placeholder: "Search..."
                    placeholder: window.lang.translate("Search")
                },
                headerFilter: {
                    visible: true
                },
                columnChooser: {
                    enabled: true,
                    mode: "select"
                },
                selection: {
                    mode: "single"
                },
                onSelectionChanged: function (selectedItems) {
                },
                onRowClick: function (selectedItems) {
                    var data = selectedItems.data
                    console.log(data);
                    console.log(data.op_username);
                    $("#add_tradein_vehicle_deal").addClass("hidden");
                    $("#update_tradein_vehicle_deal").removeClass("hidden");
                    $("#upload_tradein_vehicle_deal").removeClass("hidden");
                    $("#add_tradein_vehicle_reset").removeClass("hidden");
                    //var data = selectedItems[0]["op_username"];
                    //console.log(data);

                },
                columns: [
                    {
                        //allowGrouping: false,
                        caption: "Campaign",
                        dataField: "campaign_name"
                    },
                    {
                        caption: "Germany support",
                        dataField: "germany_support"
                    },
                    {
                        caption: "Local support",
                        dataField: "local_support"
                    },
                    {
                        caption: "MFS support",
                        dataField: "mfs_support"
                    },
                    {
                        caption: "Vehicle",
                        dataField: "vehicle_description"
                    },
                    {
                        caption: "Model",
                        dataField: "vehicle_gt_model_name"
                    }

                ],
                customizeColumns: function (columns) {
                    //columns[5].format = { type: "currency", currency: "EUR" };
                },
                /*scrolling: {
                    mode: "virtual"
                },*/
            });
        }
    });

    /**
      * add tradin vehicle asider opening
      * @author Mustafa Zeynel Dağlı
      * @since 16/10/2018
      * */
    $("#toggle_CampaignAsider").on("click", function (e) {
        e.preventDefault();
        $('#campaignAddAside').asideRight('setFromTop', (parseFloat($(this).offset().top)) - 500);
        $('#campaignAddAside').asideRight('toggle');
    });

    /**
     * add tradein asider closing
     * @author Mustafa Zeynel Dağlı
     * @since 16/10/2018
     * */
    $("#toggle_closeCampaignAside").on("click", function () {
        $('#campaignAddAside').asideRight('toggle');
    });


    //----------------------------------asider end-------------------------------------------------


    //----------------------------------dropdowns begin-------------------------------------------------

    /**
    * ddslick vehicle groups (body) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 16/10/2018
    */
    $('#loadingImage_DdslickVehicleGroupsCampaign').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleGroupsCampaign").loadImager('appendImage');
    //var selectedContTerrainTypeBuyBack = false;
    var ajax_DdslickVehicleGroupsCampaigns = $('#ajax_DdslickVehicleGroupCampaign').ajaxCallWidget({
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleGroupsCampaign",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_DdslickVehicleGroupsCampaigns.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickVehicleGroupCampaign').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        $('#loadingImage_DdslickVehicleTypeCampaign').loadImager('removeLoadImage');
                        $("#loadingImage_DdslickVehicleTypeCampaign").loadImager('appendImage');
                        //getDealVehicleTypeDdslick();
                        getVehicleTypeCampaigns(selectedData.selectedData.value);

                    } /*else {
                        $(window).warningMessage('resetOnShown');
                        $(window).warningMessage('show', window.lang.translate("Please vehicle group"),
                            window.lang.translate("Please vehicle group"));
                        $("#loadingImage_DdslickVehicleGroupProducts").loadImager('removeLoadImage');
                    }*/
                }
            });

            $("#loadingImage_DdslickVehicleGroupsCampaign").loadImager('removeLoadImage');
        },
    })
    ajax_DdslickVehicleGroupsCampaigns.ajaxCallWidget('call');

    /**
   * ddslick deal vehicle type dropdown (aksesuar)
   * @author Mustafa Zeynel Dağlı
   * @since 17/10/2018
   */
    var ddslickDealVehicleTypeAksesuarData = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },
    ];
    $('#loadingImage_DdslickVehicleTypeCampaign').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleTypeCampaign").loadImager('appendImage');
    //var selectedContRepMainBuyBack = false;
    $('#ddslickVehicleTypeCampaign').ddslick({
        //height: 150,
        data: ddslickDealVehicleTypeAksesuarData,
        width: '100%',
        onSelected: function (selectedData) {
            /*if (selectedContRepMainBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            selectedContRepMainBuyBack = true;*/
            if (selectedData.selectedData.value > 0) {
                //$("#gridContainer_BuyBack").dxDataGrid("instance").refresh();

            }
        }
    });
    $("#loadingImage_DdslickVehicleTypeCampaign").loadImager('removeLoadImage');


    /**
   * ddslick deal vehicle type campaigns dropdown function (body proposal)
   * @author Mustafa Zeynel Dağlı
   * @since 21/10/2018
   */
    var getVehicleTypeCampaigns = function (id) {
        var ajax_DdslickDealVehicleTypeCampaign = $('#ajax_DdslickVehicleTypeCampaign').ajaxCallWidget({
            proxy: '/DefaultPost/DefaultPostModel',
            type: "POST",
            failureLoadImage: true,
            loadingImageID: "loadingImage_DdslickVehicleTypeCampaign",
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            noDataFailureText: window.lang.translate("No data returned from service"),
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkProjectVehicleCampaignDdList_infoprojectcampaign",
                pkIdentity: $("#publicKey").val(),
                project_id: parseInt(id)
            })
        });
        ajax_DdslickDealVehicleTypeCampaign.ajaxCallWidget({
            onSuccess: function (event, data) {
                $('#ddslickVehicleTypeCampaign').ddslick('destroy');
                var data = $.parseJSON(data);
                data.splice(0, 0,
                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                );
                $('#ddslickVehicleTypeCampaign').ddslick({
                    //height: 150,
                    data: data,
                    width: '100%',
                    onSelected: function (selectedData) {
                        if (selectedData.selectedData.value > 0) {
                            //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                        }
                    }
                });
                $("#loadingImage_DdslickVehicleTypeCampaign").loadImager('removeLoadImage');
            },
            onErrorDataNull: function (event, data) {
                $('#ddslickVehicleTypeCampaign').ddslick('destroy');
                var ddslickDealVehicleGroupsProductionData = [
                    {
                        text: 'Please select',
                        value: 0,
                        selected: true
                    },
                ];
                $('#ddslickVehicleTypeCampaign').ddslick({
                    //height: 150,
                    data: ddslickDealVehicleGroupsProductionData,
                    width: '100%',
                    onSelected: function (selectedData) {
                        /*if (selectedContRepMainBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                        selectedContRepMainBuyBack = true;*/
                        if (selectedData.selectedData.value > 0) {
                            //$("#gridContainer_BuyBack").dxDataGrid("instance").refresh();

                        }
                    }
                });
                $("#loadingImage_DdslickVehicleTypeCampaign").loadImager('removeLoadImage');
            }
        })
        ajax_DdslickDealVehicleTypeCampaign.ajaxCallWidget('call');
    };

    //----------------------------------dropdowns end-------------------------------------------------


    //----------------------------------add campaign to deal begin-------------------------------------------------

    /**
     * loading image for add vehicle type process
     * */
    $('#tab_Campaign').loadImager();

    /**
     * add deal form body reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetCampaignAddForm = function () {
        $('#addCampaignForm').validationEngine('hide');
        $('#addCampaignForm')[0].reset();
        $('#ddslickVehicleGroupCampaign').ddslick("select", { index: '0' });
        $('#ddslickVehicleTypeCampaign').ddslick("select", { index: '0' });
    }

    /**
     * add vehicle type form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addCampaignForm").validationEngine();


    /**
     * add aksesuar click event handler
     * @author Mustafa Zeynel Dağlı
     * */
    $("#add_campaign").on("click", function (e) {
        e.preventDefault();
        $('#tab_Campaign').loadImager('removeLoadImage');
        $("#tab_Campaign").loadImager('appendImage');

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        if (dealID == null || dealID == "" || dealID <= 0) {
            $(window).warningMessage('resetOnShown');
            $(window).warningMessage('show', "Please select deal",
                "Please select deal");
            $('#tab_Campaign').loadImager('removeLoadImage');
            return false;
        }

        if ($("#addCampaignForm").validationEngine('validate')) {
            var ddDataVehicleGroups = $('#ddslickVehicleGroupCampaign').data('ddslick');
            if (!ddDataVehicleGroups.selectedData.value > 0) {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select vehicle group"),
                    window.lang.translate("Please select vehicle group"));
                $('#tab_Campaign').loadImager('removeLoadImage');
                return false;
            }

            var ddDataVehicleType = $('#ddslickVehicleTypeCampaign').data('ddslick');
            if (!ddDataVehicleType.selectedData.value > 0) {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select vehicle type"),
                    window.lang.translate("Please select vehicle type"));
                $('#tab_Campaign').loadImager('removeLoadImage');
                return false;
            }
            var ajax = $('#add_campaign').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "tab_Body",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                proxy: '/Deal/AddCampaignProxyService',
                type: "POST",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkInsertAct_infoprojectcampaign",
                    pkIdentity: $("#publicKey").val(),
                    project_id: dealID,
                    vehicle_group_id: ddDataVehicleGroups.selectedData.value,
                    vehicles_endgroup_id: ddDataVehicleType.selectedData.value,
                    quantity: parseInt($("#number_vehicleCount").val()),
                    campaign_vehicle_id : 1,
                })
            });
            ajax.ajaxCallWidget({
                onReset: function (event, data) {
                    resetCampaignAddForm();
                },
                onAfterSuccess: function (event, data) {
                }
            })
            //ajax.ajaxCallWidget('call');
        } else {
            $('#tab_Campaign').loadImager('removeLoadImage');
        }
        return false;
    })

    

    //----------------------------------add aksesuar to deal end-------------------------------------------------


});