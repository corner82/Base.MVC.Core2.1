$(document).ready(function() {

    //----------------------------------add tradeback to deal begin-------------------------------------------------

    //tradeback
    /**
    * ddslick vehicle type dropdown(buyback) load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickVehicleTypeTradeBack').loadImager();

    /**
    * ddslick vehicle type dropdown(buyback) load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickDealVehicleTypeTradeBack').loadImager();


    /**
    * ddslick customer type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager();

    /**
    * ddslick terrain type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTerrainTypeTradeBack').loadImager();

    /**
    * ddslick R&M dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickRepMainTradeBack').loadImager();

    /**
    * ddslick truck type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTruckTypeTradeBack').loadImager();


    /**
    * ddslick hydraulics dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickHydraTradeBack').loadImager();

    /**
    * add buyback form validation engine activated
    * @author Mustafa Zeynel Dağlı
    * */
    $("#addTradeBackForm").validationEngine();

    /**
     * loading image for add vehicle type process
     * */
    $('#tab_TradeBack').loadImager();

    /**
     * add deal tradeback form vehicle type reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetTradeBackForm = function () {
        //$('#addTradeBackForm').validationEngine('hide');
        $('#addTradeBackForm')[0].reset();
        $('#ddslickDealVehicleTypeTradeBack').ddslick("select", { index: '0' });
        $('#ddslickCustomerTypeTradeBack').ddslick("select", { index: '0' });
        //$('#ddslickTruckTypeTradeBack').ddslick("select", { index: '0' });
        $('#ddslickTerrainTypeTradeBack').ddslick("select", { index: '0' });
        $('#ddslickRepMainTradeBack').ddslick("select", { index: '0' });
        $('#ddslickHydraTradeBack').ddslick("select", { index: '0' });
    }


    /**
     * add tared back click event handler
     * @author Mustafa Zeynel Dağlı
     * @todo deal is js lokal değişkenden alınacak
     * */
    $("#add_tradeBack").on("click", function (e) {
        e.preventDefault();
        $('#tab_TradeBack').loadImager('removeLoadImage');
        $("#tab_TradeBack").loadImager('appendImage');

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        if (dealID == null || dealID == "" || dealID <= 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select deal"),
                window.lang.translate("Please select deal"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }

        var selectedRows = $("#gridContainer_TradeBack").dxDataGrid("getSelectedRowsData");
        console.log(selectedRows);
        if (selectedRows.length <= 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select trade back matrix"),
                window.lang.translate("Please select trade back matrix"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataVehicleType = $('#ddslickDealVehicleTypeTradeBack').data('ddslick');
        if (typeof ddDataVehicleType != "undefined") {
            if (ddDataVehicleType.selectedData.value <= 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                    window.lang.translate("Please select vehicle type"));
                $('#tab_TradeBack').loadImager('removeLoadImage');
                return false;
            } else {

            }
        } else {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                window.lang.translate("Please select vehicle type"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }


        var ddDataCustomerType = $('#ddslickCustomerTypeTradeBack').data('ddslick');
        if (!ddDataCustomerType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select customer type"),
                window.lang.translate("Please select customer type"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataTerrainType = $('#ddslickTerrainTypeTradeBack').data('ddslick');
        if (!ddDataTerrainType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select terrain type"),
                window.lang.translate("Please select terrain type"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataRepairMaintainance = $('#ddslickRepMainTradeBack').data('ddslick');
        if (!ddDataRepairMaintainance.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select R&M "),
                window.lang.translate("Please select R&M"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataHydralics = $('#ddslickHydraTradeBack').data('ddslick');
        if (!ddDataHydralics.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select hydraulics "),
                window.lang.translate("Please select hydraulics"));
            $('#tab_TradeBack').loadImager('removeLoadImage');
            return false;
        }

        var ajax = $('#add_tradeBack').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "tab_TradeBack",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Deal/AddTradeBackProxyService',
            type: "POST",
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkInsertAct_infoprojecttradeback",
                pkIdentity: $("#publicKey").val(),
                project_id: parseInt(dealID),
                vehicles_trade_id: ddDataVehicleType.selectedData.value,
                customer_type_id: ddDataCustomerType.selectedData.value,
                comfort_super_id: ddDataRepairMaintainance.selectedData.value,
                hydraulics_id: ddDataHydralics.selectedData.value,
                buyback_matrix_id: selectedRows[0].id,
                quantity: $("#quantity_tradeback").val(),
                is_other: 0,
                other_month_value: 0,
                other_milages_value: 0,
                other_description: ""
            })

        });
        ajax.ajaxCallWidget({
            onReset: function (event, data) {
                //resetVehicleTypeAddDealForm();
                $('#ddslickDealVehicleTypeTradeBack').ddslick("select", { index: '0' });
            },
            onAfterSuccess: function (event, data) {
                $("#deal_hidden").deal("addTradeBack", {
                    vehicles_trade_id: ddDataVehicleType.selectedData.value,
                    customer_type_id: ddDataCustomerType.selectedData.value,
                    comfort_super_id: ddDataRepairMaintainance.selectedData,
                    hydraulics_id: ddDataHydralics.selectedData.value,
                    buyback_matrix_id: ddDataRepairMaintainance.selectedData.value,
                    quantity: $("#quantity_tradeback").val(),
                });
                $("#gridContainer_TradeBackDeal").dxDataGrid("instance").refresh();
                //console.log($("#deal_hidden").deal("option", "dealID"));
            }
        })
        ajax.ajaxCallWidget('call');
        return false;
    })

    // add deal reset
    $("#add_buyBack_reset").on("click", function (e) {
        e.preventDefault();
        resetBuyBackForm();
        return false;
    })

    /**
     * tab organizer events attached
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $("#deal_hidden").organizeTabs({
        onAftertab_TradeBack: function (e) {
            
            //TradeBack tab form elements begin
            /**
           * ddslick customer type (tradeback) dropdown 
           * @author Mustafa Zeynel Dağlı
           * @since 15/08/2018
           */
            $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickCustomerTypeTradeBack").loadImager('appendImage');
            selectedContCustomerTypeTradeBack = false;
            var ajax_DdslickCustomerTypeTradeBack = $('#ajax_DdslickCustomerTypeTradeBack').ajaxCallWidget({
                proxy: '/Customer/SysCustomerType',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickCustomerTypeTradeBack",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkCustomerTypesDdList_syscustomertypes",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickCustomerTypeTradeBack.ajaxCallWidget({
                onError: function (event, textStatus, errorThrown) {

                    $(window).dangerMessage({
                        onShown: function () {
                            $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager('removeLoadImage');
                        }
                    });
                    $(window).dangerMessage('show', window.lang.translate('Customer  type data not found...'), window.lang.translate('Customer type data not found...'));
                },
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickCustomerTypeTradeBack').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',

                        onSelected: function (selectedData) {
                            if (selectedContCustomerTypeTradeBack == true) $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                            selectedContCustomerTypeTradeBack = true;
                            if (selectedData.selectedData.value > 0) {
                                $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                            }
                        }
                    });

                    $("#loadingImage_DdslickCustomerTypeTradeBack").loadImager('removeLoadImage');
                },
                onErrorDataNull: function (event, data) {
                    console.log("Error : " + event + " -data :" + data);
                    $(window).dangerMessage({
                        onShown: function () {
                            $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager('removeLoadImage');
                        }
                    });
                    $(window).dangerMessage('show', window.lang.translate('Customer Type data not found...'), window.lang.translate('Customer Type data not found...'));
                },
            })
            ajax_DdslickCustomerTypeTradeBack.ajaxCallWidget('call');

            /**
            * ddslick truck type (tradeback) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 15/08/2018
            */
            $('#loadingImage_DdslickTruckTypeTradeBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickTruckTypeTradeBack").loadImager('appendImage');
            selectedContTruckTypeTradeBack = false;
            var ajax_DdslickTruckTypeTradeBack = $('#ajax_DdslickTruckTypeTradeBack').ajaxCallWidget({
                proxy: '/Vehicle/SysVehicleGroups',
                type: "POST",
                //failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickTruckTypeTradeBack",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkCustomerTypesDdList_syscustomertypes",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickTruckTypeTradeBack.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickTruckTypeTradeBack').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',

                        onSelected: function (selectedData) {
                            if (selectedContTruckTypeBuyBack == true) $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                            selectedContTruckTypeBuyBack = true;
                            if (selectedData.selectedData.value > 0) {
                                $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                            }
                        }
                    });

                    $("#loadingImage_DdslickTruckTypeTradeBack").loadImager('removeLoadImage');
                },

            })
            ajax_DdslickTruckTypeTradeBack.ajaxCallWidget('call');

            /**
            * ddslick terrain type (tradeback) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 15/08/2018
            */
            $('#loadingImage_DdslickTerrainTypeTradeBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickTerrainTypeTradeBack").loadImager('appendImage');
            var selectedContTerrainTypeTradeBack = false
            var ajax_DdslickTerrainTypeTradeBack = $('#ajax_DdslickTerrainTypeTradeBack').ajaxCallWidget({
                proxy: '/BuybackTradeback/SysBbTerrains',
                type: "POST",
                //failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickTerrainTypeTradeBack",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkTerrainsTradebackDdList_systerrains",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickTerrainTypeTradeBack.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickTerrainTypeTradeBack').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',

                        onSelected: function (selectedData) {
                            if (selectedContTerrainTypeTradeBack == true) $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                            selectedContTerrainTypeTradeBack = true;
                            if (selectedData.selectedData.value > 0) {
                                $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                            }
                        }
                    });

                    $("#loadingImage_DdslickTerrainTypeTradeBack").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickTerrainTypeTradeBack.ajaxCallWidget('call');

            /**
            * ddslick R&M (tradeback) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 15/08/2018
            */
            var ddslickRepMainDataTradeBack = [
                {
                    text: 'Please select',
                    value: 0,
                    selected: true
                },
                {
                    text: "Yes",
                    value: 1,
                    selected: false
                },
                {
                    text: "No",
                    value: 2,
                    selected: false
                },
            ];
            $('#loadingImage_DdslickRepMainTradeBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickRepMainTradeBack").loadImager('appendImage');
            var selectedContRepMainTypeTradeBack = false;
            $('#ddslickRepMainTradeBack').ddslick({
                //height: 150,
                data: ddslickRepMainDataTradeBack,
                width: '100%',
                onSelected: function (selectedData) {
                    if (selectedContRepMainTypeTradeBack == true) $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                    selectedContRepMainTypeTradeBack = true;
                    if (selectedData.selectedData.value > 0) {
                        $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                    }
                }
            });
            $('#loadingImage_DdslickRepMainTradeBack').loadImager('removeLoadImage');

            /**
           * ddslick hydraulics (tradeback) dropdown 
           * @author Mustafa Zeynel Dağlı
           * @since 15/08/2018
           */
            var ddslickHydraDataTradeBack = [
                {
                    text: 'Please select',
                    value: 0,
                    selected: true
                },
                {
                    text: "Yes",
                    value: 1,
                    selected: false
                },
                {
                    text: "No",
                    value: 2,
                    selected: false
                },

            ];
            $('#loadingImage_DdslickHydraTradeBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickHydraTradeBack").loadImager('appendImage');
            var selectedContHydraTypeTradeBack = false;
            $('#ddslickHydraTradeBack').ddslick({
                //height: 150,
                data: ddslickHydraDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedContHydraTypeTradeBack == true) $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                    selectedContHydraTypeTradeBack = true;
                    if (selectedData.selectedData.value > 0) {
                        $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                    }
                }
            });
            $("#loadingImage_DdslickHydraTradeBack").loadImager('removeLoadImage');

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
            $('#loadingImage_DdslickDealVehicleTypeTradeBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeTradeBack").loadImager('appendImage');
            $('#ddslickDealVehicleTypeTradeBack').ddslick({
                data: ddslickDealVehicleTypeAksesuarData,
                width: '100%',
                onSelected: function (selectedData) {
                }
            });
            $("#loadingImage_DdslickDealVehicleTypeTradeBack").loadImager('removeLoadImage');

            //TradeBack tab form elements end

            //tradeBack tab form elements begin
            var tradebackMatrix_grid_datasource = new DevExpress.data.CustomStore({
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

                    var customerType = window.getSelectedDDslickValueOrDefaultVal("ddslickCustomerTypeTradeBack");
                    var terrainType = window.getSelectedDDslickValueOrDefaultVal("ddslickTerrainTypeTradeBack");
                    var repmainType = window.getSelectedDDslickValueOrDefaultVal("ddslickRepMainTradeBack");
                    var hydraType = window.getSelectedDDslickValueOrDefaultVal("ddslickHydraTradeBack");
                    var vehicleType = window.getSelectedDDslickValueOrDefaultVal("ddslickDealVehicleTypeTradeBack");

                    $.ajax({
                        url: '/Deal/GetDealTradeBackListProxyService',
                        dataType: "json",
                        data: JSON.stringify({
                            language_code: $("#langCode").val(),
                            pk: "GsZVzEYe50uGgNM",
                            url: "pkFillTradebackMatrixGridx_sysbuybackmatrix",
                            pkIdentity: $("#publicKey").val(),
                            //project_id: dealID,
                            page: "",
                            rows: "",
                            sort: "",
                            order: "",
                            terrain_id: parseInt(terrainType),
                            comfort_super_id: parseInt(repmainType),
                            hydraulics: parseInt(hydraType),
                            customer_type_id: parseInt(customerType),
                            model_id: parseInt(vehicleType),
                            //model_id: 1,

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
            $("#gridContainer_TradeBack").dxDataGrid({
                showColumnLines: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                // dataSource: orders,
                dataSource: tradebackMatrix_grid_datasource,
                columnHidingEnabled: false,
                editing: {
                    //mode: "batch"
                    mode: "row",
                    //allowAdding: false,
                    allowUpdating: false,
                    allowDeleting: false,
                    useIcons: false
                },
                selection: {
                    mode: "single"
                },
                "export": {
                    enabled: true,
                    fileName: "TradeBackMatrix"
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
                    placeholder: "Search..."
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
                        //allowGrouping: false,
                        caption: "Vehicle",
                        dataField: "vahicle_description"
                    },
                    {
                        caption: "Comfort Super",
                        dataField: "comfort_super_name"
                    },
                    {
                        caption: "Mileage",
                        dataField: "mileage_type_name"
                    },
                    {
                        caption: "Terrain",
                        dataField: "terrain_name"
                    },
                    {
                        caption: "Month",
                        dataField: "month_name"
                    },
                    {
                        caption: "Price",
                        dataField: "price"
                    }

                ],
                customizeColumns: function (columns) {
                    //columns[5].format = { type: "currency", currency: "EUR" };
                },


            });

            /* 
             * deal grid data source
             * @author Mustafa Zeynel dağlı
             * @since 12/10/2018
             * */
            var tradebackDeal_grid_datasource = new DevExpress.data.CustomStore({
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
                            url: "pkFillProjectVehicleTBGridx_infoprojecttradeback",
                            pkIdentity: $("#publicKey").val(),
                            //project_id: parseInt(dealID),
                            project_id: parseInt(80),
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
            $("#gridContainer_TradeBackDeal").dxDataGrid({
                showColumnLines: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                // dataSource: orders,
                dataSource: tradebackDeal_grid_datasource,
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
                    var data = selectedItems.selectedRowsData[0];
                    //console.log(data);
                    /*if (data) {
                        selectedBranchId = data.id;
                        filldropdown = true;
                        fillBranchForm(data);
                        //filldropdown = false;
                    }*/
                },
                columns: [
                    {
                        //allowGrouping: false,
                        caption: "Name",
                        dataField: "tag_name"
                    },
                    {
                        caption: "Vehicle trade name",
                        dataField: "vehicles_trade_name"
                    },
                    {
                        caption: "Hydraulics",
                        dataField: "hydraulics_name"
                    },
                    {
                        caption: "Customer type",
                        dataField: "customer_type_name"
                    },
                    {
                        caption: "Tradeback value",
                        dataField: "deal_tb_value"
                    },
                    {
                        caption: "Price",
                        dataField: "price"
                    }

                ],
                customizeColumns: function (columns) {
                    //columns[5].format = { type: "currency", currency: "EUR" };
                },


            });


            //tradeBack tab form elements end


            $('#loadingImage_DdslickDealVehicleTypeTradeBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeTradeBack").loadImager('appendImage');

            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {
                var vehicleTypes = $("#deal_hidden").deal("getVehicleTypes");
                if (vehicleTypes.length == 0) {
                    $(window).warningMessage('resetOnShown');
                    $(window).warningMessage('show', window.lang.translate("You must add at least one vehicle type to deal"),
                        window.lang.translate("You must add at least one vehicle type to deal"));
                    return false;
                }

                var ajax_DdslickVehicleTypeTradeBack = $('#ajax_DdslickDealVehicleTypeTradeBack').ajaxCallWidget({
                    proxy: '/Deal/DdslickGetDealVehicleTypeProxyService/',
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    noDataFailureText: window.lang.translate("No data returned from service"),
                    loadingImageID: "loadingImage_DdslickDealVehicleTypeTradeBack",
                    data: JSON.stringify({
                        url: "pkProjectVehicleModelsTradeDdList_infoprojecttradeback",
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        project_id: $("#deal_hidden").deal("getDealID"),
                        pkIdentity: $("#publicKey").val(),
                    }),
                    type: 'POST'
                });
                var selectedContVehicleTypeTradeBack = false;
                ajax_DdslickVehicleTypeTradeBack.ajaxCallWidget({
                    onSuccess: function (event, data) {
                        $("#ddslickDealVehicleTypeTradeBack").ddslick('destroy');
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickDealVehicleTypeTradeBack').ddslick({
                            data: data,
                            width: '100%',
                            onSelected: function (selectedData) {
                                if (selectedContVehicleTypeTradeBack == true) $("#gridContainer_TradeBack").dxDataGrid("instance").refresh();
                                selectedContVehicleTypeTradeBack = true;
                                if (selectedData.selectedData.value > 0) {
                                    //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                                }
                            }
                        });
                        $("#loadingImage_DdslickDealVehicleTypeTradeBack").loadImager('removeLoadImage');
                    },
                })
                ajax_DdslickVehicleTypeTradeBack.ajaxCallWidget('call');
            } else {
                /*$('#tab_TradeBack').loadImager('removeLoadImage');
                $('#tab_TradeBack').loadImager('appendImage');*/

                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select deal"),
                    window.lang.translate("Please select deal"));
                $('#loadingImage_DdslickDealVehicleTypeTradeBack').loadImager('removeLoadImage');
            }


        },

    });


    //----------------------------------add tradeBack to deal end-------------------------------------------------



})