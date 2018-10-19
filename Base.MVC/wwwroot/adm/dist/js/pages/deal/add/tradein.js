$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------
    $('#tab_TradeIn').loadImager();
    $('#loadingImage_DdslickOverAllowanceType').loadImager();
    //----------------------------------loadImager end-------------------------------------------------

    //----------------------------------tagcabin begin-------------------------------------------------
    var tagdataTradeIns = [{ "id": "120", "text": "TGS-26-4406X4BLS-LX-ALU-EL / 12 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "73", "privilege_name_eng": "Assign Consultant" } },
    { "id": "41", "text": "TGS-26-4406X4BLS-LX-ALU-ELX / 10 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "45", "privilege_name_eng": "You can list the database \/*table*\/." } },
    { "id": "47", "text": "TGS-16-4406X4BLS-LX-ALU-EL /8 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "51", "privilege_name_eng": "Menu Active \/  Passive" } },
    { "id": "46", "text": "TGS-26-5406X4BLS-LX-ALU-EL / 4 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "44", "privilege_name_eng": "Menu \/*Insert*\/" } },
    { "id": "48", "text": "TGX-26-5406X4BLS-LX-ALU-EL / 2 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "49", "privilege_name_eng": "Menu Update" } },
    { "id": "49", "text": "TGV-26-5406X4BLS-LX-ALU-EL / 1 piece", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "50", "privilege_name_eng": "Menu\/* delete*\/" } }];
    var tagBuilderTradeIns = $('#tagcabin_TradeIns').tagCabin({
        tagCopy: true,
        tagDeletable: true,
        tagDeletableAll: false,
        tagBox: $('.tag-container-tradeins').find('ul'),
        //dataMapper: {attributes : Array('role_id', 'resource_id', 'privilege_id')}
        //dataMapper: Array('role_id', 'resource_id', 'privilege_id')

    });
    //var testArr = ['text', 'value'];
    tagBuilderTradeIns.tagCabin('addTags', JSON.stringify(tagdataTradeIns)/*, testArr*/);
    //----------------------------------tagcabin end-------------------------------------------------

    //----------------------------------grid begin-------------------------------------------------
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

            var customerType = window.getSelectedDDslickValueOrDefaultVal("ddslickVehicleGroupsWarranty");
            var terrainType = window.getSelectedDDslickValueOrDefaultVal("ddslickDealVehicleTypeWarranty");
            var repmainType = window.getSelectedDDslickValueOrDefaultVal("ddslickWarrantyType");
            var hydraType = window.getSelectedDDslickValueOrDefaultVal("ddslickWarrantyTerm");
            var vehicleType = window.getSelectedDDslickValueOrDefaultVal("ddslickWarrantyKm");

            $.ajax({
                url: '/Deal/GetDealBuyBackListProxyService',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillBuybackMatrixGridx_sysbuybackmatrix",
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
                    /*terrain_id: 3,
                    comfort_super_id: 1,
                    hydraulics: 2,
                    customer_type_id: 1, */
                    /*terrain_id: ddDataTerrainType.selectedData.value,
                    comfort_super_id: ddDataRepMainType.selectedData.value,
                    hydraulics: ddDataHydraType.selectedData.value,
                    customer_type_id: parseInt(ddDataCustomerType.selectedData.value), */

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
        // dataSource: orders,
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
            $("#add_tradein_vehicle_reset").removeClass("hidden");
            //var data = selectedItems[0]["op_username"];
            //console.log(data);
            
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
        /*scrolling: {
            mode: "virtual"
        },*/
    });

    //----------------------------------grids end-------------------------------------------------


    /**
     * tab organizer events attached
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $("#deal_hidden").organizeTabs({
        onAftertab_TradeIn: function (e) {
            
            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {

                var vehicleTypes = $("#deal_hidden").deal("getVehicleTypes");
                if (vehicleTypes.length == 0) {

                    /*$('#tab_BuyBack').loadImager('removeLoadImage');
                    $('#tab_BuyBack').loadImager('appendImage');*/

                    $(window).warningMessage('resetOnShown');
                    $(window).warningMessage('show', window.lang.translate("You must add at least one vehicle type to deal"),
                        window.lang.translate("You must add at least one vehicle type to deal"));
                    return false;
                }
            } else {
                /*$('#tab_BuyBack').loadImager('removeLoadImage');
                $('#tab_BuyBack').loadImager('appendImage');*/

                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select deal"),
                    window.lang.translate("Please select deal"));
                // $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager('removeLoadImage');
            }
        },
        
    });

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
            if (!ddDataOverAllowanceType.selectedData.value > 0) {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select over allowance type"),
                    window.lang.translate("Please select over allowance type"));
                $('#tab_TradeIn').loadImager('removeLoadImage');
                return false;
            }

            var ajax = $('#add_tradein').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "tab_TradeIn",
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
                    project_id: dealID,
                    is_house_deal: 0,
                    vehicle_gt_model_id: ddDataVehicleType.selectedData.value,
                    quantity: $("#quantity").val(),
                    delivery_date: "10/10/2018",
                })

            });
            ajax.ajaxCallWidget({
                onReset: function (event, data) {
                    resetVehicleTypeAddDealForm();
                },
                onAfterSuccess: function (event, data) {
                    /*$("#deal_hidden").deal("addVehicleType", { vehicleType: ddDataVehicleType.selectedData.value, count: $("#quantity").val() });
                    $("#tagcabin_DealBodies").tagCabin('addTagManuallyDataAttr', ddDataVehicleType.selectedData.value,
                        ddDataVehicleType.selectedData.text + " / " + $("#quantity").val(),

                    );*/
                }
            })
            //ajax.ajaxCallWidget('call');

        } else {
            $('#tab_Aksesuar').loadImager('removeLoadImage');
        }

        
        return false;
    })

    // add aksesuar reset
    $("#add_aksesuar_reset").on("click", function (e) {
        e.preventDefault();
        resetAksesuarAddDealForm();
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
           
            //console.log(element);
            //alert('onopening event right slider');
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
        //$('#ddslickDealVehicleTypeBody').ddslick("select", { index: '0' });
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
                    project_id: dealID,
                    is_house_deal: 0,
                    vehicle_gt_model_id: ddDataVehicleType.selectedData.value,
                    quantity: $("#quantity").val(),
                    delivery_date: "10/10/2018",
                })
            });
            ajax.ajaxCallWidget({
                onReset: function (event, data) {
                    resetVehicleTypeAddDealForm();
                },
                onAfterSuccess: function (event, data) {
                   /* $("#deal_hidden").deal("addVehicleType", { vehicleType: ddDataVehicleType.selectedData.value, count: $("#quantity").val() });
                    $("#tagcabin_DealBodies").tagCabin('addTagManuallyDataAttr', ddDataVehicleType.selectedData.value,
                        ddDataVehicleType.selectedData.text + " / " + $("#quantity").val(),

                    );*/
                }
            })
            //ajax.ajaxCallWidget('call');

        } else {
            $('#tab_TradeInVehicle').loadImager('removeLoadImage');
        }
        return false;
    })

    /**
     * update trade in vehicle click event handler
     * @author Mustafa Zeynel Dağlı
     * */
    $("#update_tradein_vehicle_deal").on("click", function (e) {
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
                    project_id: dealID,
                    is_house_deal: 0,
                    vehicle_gt_model_id: ddDataVehicleType.selectedData.value,
                    quantity: $("#quantity").val(),
                    delivery_date: "10/10/2018",
                })
            });
            ajax.ajaxCallWidget({
                onReset: function (event, data) {
                    resetVehicleTypeAddDealForm();
                },
                onAfterSuccess: function (event, data) {
                    
                }
            })
            //ajax.ajaxCallWidget('call');

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
        $("#add_tradein_vehicle_deal").removeClass("hidden");
        return false;
    })

    //----------------------------------add tradein vehicle to deal end-------------------------------------------------

});