$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------
    $('#tab_TradeIn').loadImager();
    $('#loadingImage_DdslickOverAllowanceType').loadImager();
    //----------------------------------loadImager end-------------------------------------------------

    //----------------------------------tagcabin begin-------------------------------------------------
    
    //----------------------------------tagcabin end-------------------------------------------------

    //----------------------------------grid begin-------------------------------------------------
    

    //----------------------------------grids end-------------------------------------------------


    /**
     * tab organizer events attached
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $("#deal_hidden").organizeTabs({
        onAftertab_TradeIn: function (e) {
            
            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {
            } else {
                /*$('#tab_BuyBack').loadImager('removeLoadImage');
                $('#tab_BuyBack').loadImager('appendImage');*/

                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select deal"),
                    window.lang.translate("Please select deal"));
                // $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager('removeLoadImage');
            }


            //----------------------------------dropdowns begin-------------------------------------------------

            /**
           * ddslick deal vehicle type dropdown (aksesuar)
           * @author Mustafa Zeynel Dağlı
           * @since 17/10/2018
           */
            var ddslickOverAllowanceTypeData = [
                {
                    text: 'Please select',
                    value: 0,
                    selected: true
                },
                {
                    text: 'Equal',
                    value: 1,
                    selected: true
                },
                {
                    text: 'Vehicle based',
                    value: 2,
                    selected: true
                },
            ];
            $('#loadingImage_DdslickOverAllowanceType').loadImager('removeLoadImage');
            $("#loadingImage_DdslickOverAllowanceType").loadImager('appendImage');
            //var selectedContRepMainBuyBack = false;
            $('#ddslickOverAllowanceType').ddslick({
                //height: 150,
                data: ddslickOverAllowanceTypeData,
                width: '100%',
                onSelected: function (selectedData) {
                    /*if (selectedContRepMainBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                    selectedContRepMainBuyBack = true;*/
                    if (selectedData.selectedData.value > 0) {
                        //$("#gridContainer_BuyBack").dxDataGrid("instance").refresh();

                    }
                }
            });
            $("#loadingImage_DdslickOverAllowanceType").loadImager('removeLoadImage');


    //----------------------------------dropdowns end-------------------------------------------------


        },
        
    });

    //----------------------------------datepicker begin-------------------------------------------------
    $('#date_embraceTransferDate').datepicker({
        format: 'yyyy-mm-dd',
        //startDate: '-1d'
    });
    //----------------------------------datepicker end-------------------------------------------------

  


    //----------------------------------add tradein to deal begin-------------------------------------------------

    /**
     * loading image for add tradein process
     * */
    $('#tab_TradeIn').loadImager();

    /**
     * add tradein form body reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetTradeInAddDealForm = function () {
        $('#addTradeInForm').validationEngine('hide');
        $('#addTradeInForm')[0].reset();
        //$('#ddslickDealVehicleTypeBody').ddslick("select", { index: '0' });
    }

    /**
     * add trade in form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addTradeInForm").validationEngine();


    /**
     * add tradein click event handler
     * @author Mustafa Zeynel Dağlı
     * */
    $("#add_tradein").on("click", function (e) {
        e.preventDefault();
        $('#tab_TradeIn').loadImager('removeLoadImage');
        $("#tab_TradeIn").loadImager('appendImage');

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        if (dealID == null || dealID == "" || dealID <= 0) {
            $(window).warningMessage('resetOnShown');
            $(window).warningMessage('show', "Please select deal",
                "Please select deal");
            $('#tab_TradeIn').loadImager('removeLoadImage');
            return false;
        }

        if ($("#addTradeInForm").validationEngine('validate')) {
            var ddDataOverAllowanceType = $('#ddslickOverAllowanceType').data('ddslick');
            var ajax = $('#add_tradein').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "tab_TradeIn",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                proxy: '/Deal/AddTradeInProxyService',
                type: "POST",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkInsertAct_infoprojecttradein",
                    pkIdentity: $("#publicKey").val(),
                    project_id: dealID,
                    quantity: $("#quantity_vehicleNumbers").val(),
                    over_allowance: $("#price_overAllowance").val(),
                    topused: $("#price_topusedOffer").val(),
                    customer: $("#price_customerOffer").val(),
                })

            });
            ajax.ajaxCallWidget({
                onReset: function (event, data) {
                    resetTradeInAddDealForm();
                },
                onAfterSuccess: function (event, data) {
                }
            })
            ajax.ajaxCallWidget('call');

        } else {
            $('#tab_TradeIn').loadImager('removeLoadImage');
        }

        
        return false;
    })

    // add aksesuar reset
    $("#add_tradein_reset").on("click", function (e) {
        e.preventDefault();
        resetTradeInAddDealForm();
        return false;
    })

    //----------------------------------add tradein to deal end-------------------------------------------------


    //----------------------------------asider begin-------------------------------------------------

    /*$('#testZeyn').slimScroll({
        height: '50px'
    });*/

    /**
     * add tradein to deal asider opening
     * @author Mustafa Zeynel Dağlı
     * @since 16/10/2018
     * */
    $('#tradeInAddAside').asideRight({
        width: "900",
        height: "600",
        scroll : true,
    });

    /**
     * add tradein asider events
     * @author Mustafa Zeynel Dağlı
     * @since 16/10/2018
     * */
    $('#tradeInAddAside').asideRight({
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
            if ($("#deal_hidden").deal()) {
                dealID = $("#deal_hidden").deal("getDealID");
            }
            if (dealID == null || dealID == "" || dealID <= 0) {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', "Please select deal",
                    "Please select deal");
                $('#tab_TradeInVehicle').loadImager('removeLoadImage');
                return false;
            }
            /* 
             * deal trade in grid data source
             * @author Mustafa Zeynel dağlı
             * @since 16/10/2018
             * */
            var tradeInVehicleDeal_grid_datasource = new DevExpress.data.CustomStore({
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
            $("#gridContainer_TradeIn_Vehicle").dxDataGrid({
                showColumnLines: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                dataSource: tradeInVehicleDeal_grid_datasource,
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
                        caption: "Vehicle brand",
                        dataField: "vehicle_brand"
                    },
                    {
                        caption: "Vehicle loc.",
                        dataField: "vehicle_location"
                    },
                    {
                        caption: "Body type",
                        dataField: "vehicle_type_of_body"
                    },
                    {
                        caption: "Desc.",
                        dataField: "vehicle_up_desc"
                    },
                    {
                        caption: "Engine num.",
                        dataField: "engine_number"
                    },
                    {
                        caption: "License plate",
                        dataField: "license_plate"
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
    $("#toggle_TradeInAsider").on("click", function (e) {
        e.preventDefault();
        $('#tradeInAddAside').asideRight('setFromTop', (parseFloat($(this).offset().top)) - 500);
        $('#tradeInAddAside').asideRight('toggle');
    });

    /**
     * add tradein asider closing
     * @author Mustafa Zeynel Dağlı
     * @since 16/10/2018
     * */
    $("#toggle_closeTradeInAside").on("click", function () {
        $('#tradeInAddAside').asideRight('toggle');
    });


    //----------------------------------asider end-------------------------------------------------

    //----------------------------------add tradein vehicle to deal begin-------------------------------------------------

    /**
     * loading image for add tradein process
     * */
    $('#tab_TradeInVehicle').loadImager();

    /**
     * add tradein vehicle form body reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetTradeInVehicleAddDealForm = function () {
        $('#addTradeInVehicleForm').validationEngine('hide');
        $('#addTradeInVehicleForm')[0].reset();
        $('#ddslickOverAllowanceType').ddslick("select", { index: '0' });
    }

    /**
     * add trade in vehicle form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addTradeInVehicleForm").validationEngine();


    /**
     * add trade in vehicle click event handler
     * @author Mustafa Zeynel Dağlı
     * */
    $("#add_tradein_vehicle_deal").on("click", function (e) {
        e.preventDefault();
        $('#tab_TradeInVehicle').loadImager('removeLoadImage');
        $("#tab_TradeInVehicle").loadImager('appendImage');

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        if (dealID == null || dealID == "" || dealID <= 0) {
            $(window).warningMessage('resetOnShown');
            $(window).warningMessage('show', "Please select deal",
                "Please select deal");
            $('#tab_TradeInVehicle').loadImager('removeLoadImage');
            return false;
        }

        if ($("#addTradeInVehicleForm").validationEngine('validate')) {
            
            var ajax = $('#add_tradein_vehicle_deal').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "tab_TradeInVehicle",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                proxy: '/Deal/AddBodyProxyService',
                type: "POST",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkInsertAct_infoprojectvehiclemodels",
                    pkIdentity: $("#publicKey").val(),
                    project_id: parseInt(dealID),
                    engine_number: $("#number_engineTradeIn").val(),
                    vin_number: $("#number_vinTradeIn").val(),
                    km: $("#number_kmTradeIn").val(),
                    brand: $("#text_vehicleBrandTradeIn").val(),
                    vehicle_brand: $("#text_vehicleBrandTradeIn").val(),
                    vehicle_model: $("#text_modelTradeIn").val(),
                    license_plate: $("#text_licenseTradeIn").val(),
                    model_year: $("#text_modelYearTradeIn").val(),
                    waranty: $("#text_warrantyTradeIn").val(),
                    truck_number: $("#number_trackerTradeIn").val(),
                    embrace_transfer_date: $("#date_embraceTransferDate").val(),
                    vehicle_location: $("#text_vehiclelocationTradeIn").val(),
                    vehicle_up_desc: $("#text_bodyInfoTradeIn").val(),
                    vehicle_type_of_body: $("#text_bodyTypeTradeIn").val(),
                   
                })
            });
            ajax.ajaxCallWidget({
                onReset: function (event, data) {
                    resetTradeInVehicleAddDealForm();
                },
                onAfterSuccess: function (event, data) {
                    $("#gridContainer_TradeIn_Vehicle").dxDataGrid("instance").refresh();
                }
            })
            ajax.ajaxCallWidget('call');

        } else {
            $('#tab_TradeInVehicle').loadImager('removeLoadImage');
        }
        return false;
    })

    

    // add aksesuar reset
    $("#add_tradein_vehicle_reset").on("click", function (e) {
        e.preventDefault();
        resetTradeInVehicleAddDealForm();
        $("#add_tradein_vehicle_reset").addClass("hidden");
        $("#update_tradein_vehicle_deal").addClass("hidden");
        $("#upload_tradein_vehicle_deal").addClass("hidden");
        $("#add_tradein_vehicle_deal").removeClass("hidden");
        return false;
    })

    //----------------------------------add tradein vehicle to deal end-------------------------------------------------

});