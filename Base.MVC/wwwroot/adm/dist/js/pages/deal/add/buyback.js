$(document).ready(function () {



    //----------------------------------add buyback to deal begin-------------------------------------------------

    /**
    * ddslick vehicle type dropdown(buyback) load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager();

    /**
    * ddslick deal vehicle type dropdown(buyback) load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickDealVehicleTypeBuyBack').loadImager();

    /**
    * ddslick customer type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickCustomerTypeBuyBack').loadImager();

    /**
    * ddslick terrain type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTerrainTypeBuyBack').loadImager();

    /**
    * ddslick R&M dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickRepMainBuyBack').loadImager();

    /**
    * ddslick truck type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTruckTypeBuyBack').loadImager();


    /**
    * ddslick hydraulics dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickHydraBuyBack').loadImager();

    /**
     * loading image for add vehicle type process
     * */
    $('#tab_BuyBack').loadImager();

    /**
     * add deal buyback form vehicle type reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetBuyBackForm = function () {
        //$('#addBuyBackForm').validationEngine('hide');
        $('#addBuyBackForm')[0].reset();
        $('#ddslickDealVehicleTypeBuyBack').ddslick("select", { index: '0' });
        $('#ddslickCustomerTypeBuyBack').ddslick("select", { index: '0' });
        //$('#ddslickTruckTypeBuyBack').ddslick("select", { index: '0' });
        $('#ddslickTerrainTypeBuyBack').ddslick("select", { index: '0' });
        $('#ddslickRepMainBuyBack').ddslick("select", { index: '0' });
        $('#ddslickHydraBuyBack').ddslick("select", { index: '0' });
    }

    /**
     * add buyback form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addBuyBackForm").validationEngine();

    /**
     * add deal click event handler
     * @author Mustafa Zeynel Dağlı
     * @todo deal is js lokal değişkenden alınacak
     * */
    $("#add_buyBack").on("click", function (e) {
        e.preventDefault();
        $('#tab_BuyBack').loadImager('removeLoadImage');
        $("#tab_BuyBack").loadImager('appendImage');


        /*if ($("#tagcabin_DealVehicles").tagCabin('findSpecificTags', ddDataVehicleType.selectedData.value, 'data-attribute') != true) {
            /*tagBuilderChemicalPropGroup.tagCabin('addTagManuallyDataAttr', selectedItem.value,
                selectedItem.text,*/
        /*wm.warningMessage('resetOnShown');
        wm.warningMessage('show', "Please select another vehicle type",
            "Please select another vehicle type");
        $('#tab_VehicleType').loadImager('removeLoadImage');
        return false;
    }*/


        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        if (dealID == null || dealID == "" || dealID <= 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select deal"),
                window.lang.translate("Please select deal"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var selectedRows = $("#gridContainer_BuyBack").dxDataGrid("getSelectedRowsData");
        console.log(selectedRows);
        if (selectedRows.length <= 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select buy back matrix"),
                window.lang.translate("Please select buy back matrix"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataVehicleType = $('#ddslickDealVehicleTypeBuyBack').data('ddslick');
        if (typeof ddDataVehicleType != "undefined") {
            if (ddDataVehicleType.selectedData.value <= 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                    window.lang.translate("Please select vehicle type"));
                $('#tab_BuyBack').loadImager('removeLoadImage');
                return false;
            } else {

            }
        } else {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                window.lang.translate("Please select vehicle type"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataCustomerType = $('#ddslickCustomerTypeBuyBack').data('ddslick');
        if (!ddDataCustomerType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select customer type"),
                window.lang.translate("Please select customer type"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        /*var ddDataTruckType = $('#ddslickTruckTypeBuyBack').data('ddslick');
        if (!ddDataTruckType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select truck type"),
                window.lang.translate("Please select truck type"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }*/

        var ddDataTerrainType = $('#ddslickTerrainTypeBuyBack').data('ddslick');
        if (!ddDataTerrainType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select terrain type"),
                window.lang.translate("Please select terrain type"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataRepairMaintainance = $('#ddslickRepMainBuyBack').data('ddslick');
        if (!ddDataRepairMaintainance.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select R&M "),
                window.lang.translate("Please select R&M"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ddDataHydralics = $('#ddslickHydraBuyBack').data('ddslick');
        if (!ddDataHydralics.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select hydraulics "),
                window.lang.translate("Please select R&M"));
            $('#tab_BuyBack').loadImager('removeLoadImage');
            return false;
        }

        var ajax = $('#add_buyBack').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "tab_BuyBack",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Deal/AddBuyBackProxyService',
            type: "POST",
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkInsertAct_infoprojectbuybacks",
                pkIdentity: $("#publicKey").val(),
                project_id: parseInt(dealID),
                vehicles_trade_id: ddDataVehicleType.selectedData.value,
                customer_type_id: ddDataCustomerType.selectedData.value,
                comfort_super_id: ddDataRepairMaintainance.selectedData.value,
                hydraulics_id: ddDataHydralics.selectedData.value,
                buyback_matrix_id: selectedRows[0].id,
                quantity: parseInt($("#quantity_buyback").val()),
                is_other: 0,
                other_month_value: 0,
                other_milages_value: 0,
                other_description: ""
            })

        });
        ajax.ajaxCallWidget({
            onReset: function (event, data) {
                //resetVehicleTypeAddDealForm();
                $('#ddslickDealVehicleTypeBuyBack').ddslick("select", { index: '0' });
            },
            onAfterSuccess: function (event, data) {
                $("#deal_hidden").deal("addBuyBack", {
                    vehicles_trade_id: ddDataVehicleType.selectedData.value,
                    customer_type_id: ddDataCustomerType.selectedData.value,
                    comfort_super_id: ddDataRepairMaintainance.selectedData,
                    hydraulics_id: ddDataHydralics.selectedData.value,
                    buyback_matrix_id: ddDataRepairMaintainance.selectedData.value,
                    quantity: $("#quantity_buyback").val(),
                });
                $("#tagcabin_DealBuyBacks").tagCabin('addTagManuallyDataAttr', ddDataVehicleType.selectedData.value,
                    ddDataVehicleType.selectedData.text + " / " + $("#quantity_buyback").val() + " / " + selectedRows[0].vahicle_description + " / " + selectedRows[0].price,

                );
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
        onAftertab_BuyBack: function (e) {

            //BuyBack tab form elements begin

            /**
            * ddslick customer type (buyback) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 15/08/2018
            */
            $('#loadingImage_DdslickCustomerTypeBuyBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickCustomerTypeBuyBack").loadImager('appendImage');
            var ajax_DdslickCustomerTypeBuyBack = $('#ajax_DdslickCustomerTypeBuyBack').ajaxCallWidget({
                proxy: '/Customer/SysCustomerType',
                type: "POST",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                loadingImageID: "loadingImage_DdslickCustomerTypeBuyBack",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkCustomerTypesDdList_syscustomertypes",
                    pkIdentity: $("#publicKey").val()
                })

            });
            var selectedContCustomerTypeBuyBack = false;
            ajax_DdslickCustomerTypeBuyBack.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: true, description: "" }
                    );
                    $('#ddslickCustomerTypeBuyBack').ddslick({
                        //height: 150,
                        //data: ddslickCustomerTypeBuyBackData,
                        data: data,
                        width: '100%',

                        onSelected: function (selectedData) {
                            if (selectedContCustomerTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                            selectedContCustomerTypeBuyBack = true;
                            if (selectedData.selectedData.value > 0) {
                                /*var instance = $("#gridContainer_BuyBack").dxDataGrid("instance");
                                instance.option({
                                    //dataSource: [],
                                    showSubmenuMode: {
                                        name: 'onClick'
                                    },
                                    columns: [
                                        {
                                            //allowGrouping: false,
                                            caption: "Vehicle zeynel",
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
        
                                });*/

                            }
                        }
                    });

                    $("#loadingImage_DdslickCustomerTypeBuyBack").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickCustomerTypeBuyBack.ajaxCallWidget('call');

            /**
            * ddslick terrain type (buyback) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 15/08/2018
            */
            $('#loadingImage_DdslickTerrainTypeBuyBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickTerrainTypeBuyBack").loadImager('appendImage');
            var selectedContTerrainTypeBuyBack = false;
            var ajax_DdslickTerrainTypeBuyBack = $('#ajax_DdslickTerrainTypeBuyBack').ajaxCallWidget({
                proxy: '/BuybackTradeback/SysBbTerrains',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickTerrainTypeBuyBack",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkTerrainsBuybackDdList_systerrains",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickTerrainTypeBuyBack.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickTerrainTypeBuyBack').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                            if (selectedContTerrainTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                            selectedContTerrainTypeBuyBack = true;
                            if (selectedData.selectedData.value > 0) {
                                $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                            }
                        }
                    });

                    $("#loadingImage_DdslickTerrainTypeBuyBack").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickTerrainTypeBuyBack.ajaxCallWidget('call');

            /**
           * ddslick R&M (buyback) dropdown 
           * @author Mustafa Zeynel Dağlı
           * @since 15/08/2018
           */
            var ddslickRepMainDataBuyBack = [
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
            $('#loadingImage_DdslickRepMainBuyBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickRepMainBuyBack").loadImager('appendImage');
            var selectedContRepMainBuyBack = false;
            $('#ddslickRepMainBuyBack').ddslick({
                //height: 150,
                data: ddslickRepMainDataBuyBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedContRepMainBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                    selectedContRepMainBuyBack = true;
                    if (selectedData.selectedData.value > 0) {
                        $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                    }
                }
            });
            $("#loadingImage_DdslickRepMainBuyBack").loadImager('removeLoadImage');

            /**
           * ddslick hydraulics (buyback) dropdown 
           * @author Mustafa Zeynel Dağlı
           * @since 15/08/2018
           */
            var ddslickHydraDataBuyBack = [
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
            $('#loadingImage_DdslickHydraBuyBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickHydraBuyBack").loadImager('appendImage');
            var selectedContHydraBuyBack
            $('#ddslickHydraBuyBack').ddslick({
                //height: 150,
                data: ddslickHydraDataBuyBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedContHydraBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                    selectedContHydraBuyBack = true;
                    if (selectedData.selectedData.value > 0) {
                        $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                    }
                }
            });
            $("#loadingImage_DdslickHydraBuyBack").loadImager('removeLoadImage');

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
            $('#loadingImage_DdslickDealVehicleTypeBuyBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeBuyBack").loadImager('appendImage');
            $('#ddslickDealVehicleTypeBuyBack').ddslick({
                data: ddslickDealVehicleTypeAksesuarData,
                width: '100%',
                onSelected: function (selectedData) {
                }
            });
            $("#loadingImage_DdslickDealVehicleTypeBuyBack").loadImager('removeLoadImage');

            //BuyBack tab form elements end

            //buyBack tab form elements begin
            /* 
             * deal grid data source
             * @author Mustafa Zeynel dağlı
             * @since 12/10/2018
             * */
            var buybackMatrix_grid_datasource = new DevExpress.data.CustomStore({
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

                    var customerType = window.getSelectedDDslickValueOrDefaultVal("ddslickCustomerTypeBuyBack");
                    var terrainType = window.getSelectedDDslickValueOrDefaultVal("ddslickTerrainTypeBuyBack");
                    var repmainType = window.getSelectedDDslickValueOrDefaultVal("ddslickRepMainBuyBack");
                    var hydraType = window.getSelectedDDslickValueOrDefaultVal("ddslickHydraBuyBack");
                    var vehicleType = window.getSelectedDDslickValueOrDefaultVal("ddslickDealVehicleTypeBuyBack");

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
            $("#gridContainer_BuyBack").dxDataGrid({
                showColumnLines: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                // dataSource: orders,
                dataSource: buybackMatrix_grid_datasource,
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
                    console.log(data);
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

            //buyBack tab form elements end

            $('#loadingImage_DdslickDealVehicleTypeBuyBack').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeBuyBack").loadImager('appendImage');
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

                var ajax_DdslickVehicleTypeBuyBack = $('#ajax_DdslickDealVehicleTypeBuyBack').ajaxCallWidget({
                    proxy: '/Deal/DdslickGetDealVehicleTypeProxyService/',
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    noDataFailureText: window.lang.translate("No data returned from service"),
                    loadingImageID: "loadingImage_DdslickDealVehicleTypeBuyBack",
                    data: JSON.stringify({
                        //url: "pkProjectVehicleModelsDdList_infoprojectvehiclemodels",
                        url: "pkProjectVehicleModelsTradeDdList_infoprojectbuybacks",
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        project_id: $("#deal_hidden").deal("getDealID"),
                        //project_id: 1,
                        pkIdentity: $("#publicKey").val(),
                    }),
                    type: 'POST'
                });
                var selectedContVehicleTypeBuyBack = false;
                ajax_DdslickVehicleTypeBuyBack.ajaxCallWidget({
                    onSuccess: function (event, data) {
                        $("#ddslickDealVehicleTypeBuyBack").ddslick('destroy');
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickDealVehicleTypeBuyBack').ddslick({
                            data: data,
                            width: '100%',
                            onSelected: function (selectedData) {
                                if (selectedContVehicleTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                                selectedContVehicleTypeBuyBack = true;
                                if (selectedData.selectedData.value > 0) {
                                }
                            }
                        });
                        $("#loadingImage_DdslickDealVehicleTypeBuyBack").loadImager('removeLoadImage');

                    },
                });
                ajax_DdslickVehicleTypeBuyBack.ajaxCallWidget('call');
            } else {
                /*$('#tab_BuyBack').loadImager('removeLoadImage');
                $('#tab_BuyBack').loadImager('appendImage');*/

                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select deal"),
                    window.lang.translate("Please select deal"));
                 $('#loadingImage_DdslickDealVehicleTypeBuyBack').loadImager('removeLoadImage');
            }
        },
        onAftertab_Body: function (e) {
            $('#tab_Body').loadImager('removeLoadImage');
            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {
                //alert("deal id > 0");

            } else {
                /*$('#tab_VehicleType').loadImager('removeLoadImage');
                $('#tab_VehicleType').loadImager('appendImage');*/
                //alert("deal id < 0");
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', "Please select deal",
                    "Please select deal");
            }
        },
        onAftertab_VehicleType: function (e) {
            $('#tab_VehicleType').loadImager('removeLoadImage');
            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {
                //alert("deal id > 0");

            } else {
                /*$('#tab_VehicleType').loadImager('removeLoadImage');
                $('#tab_VehicleType').loadImager('appendImage');*/
                //alert("deal id < 0");
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', "Please select deal",
                    "Please select deal");
            }
        },
    });




    //----------------------------------add buyBack to deal end-------------------------------------------------


})