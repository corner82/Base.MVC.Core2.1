$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------
    $('#tab_Aksesuar').loadImager();
    $('#loadingImage_DdslickVehicleGroupsWarranty').loadImager();
    $('#loadingImage_DdslickDealVehicleTypeWarranty').loadImager();
    $('#loadingImage_DdslickWarrantyType').loadImager();
    $('#loadingImage_DdslickWarrantyTerm').loadImager();
    $('#loadingImage_DdslickWarrantyKm').loadImager();
    //----------------------------------loadImager end-------------------------------------------------

    //----------------------------------tagcabin begin-------------------------------------------------
    var tagdataWarranties = [{ "id": "120", "text": "TGS-26-4406X4BLS-LX-ALU-EL / 12 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "73", "privilege_name_eng": "Assign Consultant" } },
    { "id": "41", "text": "TGS-26-4406X4BLS-LX-ALU-ELX / 10 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "45", "privilege_name_eng": "You can list the database \/*table*\/." } },
    { "id": "47", "text": "TGS-16-4406X4BLS-LX-ALU-EL /8 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "51", "privilege_name_eng": "Menu Active \/  Passive" } },
    { "id": "46", "text": "TGS-26-5406X4BLS-LX-ALU-EL / 4 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "44", "privilege_name_eng": "Menu \/*Insert*\/" } },
    { "id": "48", "text": "TGX-26-5406X4BLS-LX-ALU-EL / 2 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "49", "privilege_name_eng": "Menu Update" } },
    { "id": "49", "text": "TGV-26-5406X4BLS-LX-ALU-EL / 1 piece", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "50", "privilege_name_eng": "Menu\/* delete*\/" } }];
    var tagBuilderWarranties= $('#tagcabin_Warranties').tagCabin({
        tagCopy: true,
        tagDeletable: true,
        tagDeletableAll: false,
        tagBox: $('.tag-container-warranties').find('ul'),
        //dataMapper: {attributes : Array('role_id', 'resource_id', 'privilege_id')}
        //dataMapper: Array('role_id', 'resource_id', 'privilege_id')

    });
    //var testArr = ['text', 'value'];
    tagBuilderWarranties.tagCabin('addTags', JSON.stringify(tagdataWarranties)/*, testArr*/);
    //----------------------------------tagcabin end-------------------------------------------------


    /**
     * tab organizer events attached
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $("#deal_hidden").organizeTabs({
        onAftertab_Warranty: function (e) {
            $('#loadingImage_DdslickDealVehicleTypeWarranty').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeWarranty").loadImager('appendImage');
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

                var ajax_DdslickVehicleTypeWarranty = $('#ajax_DdslickDealVehicleTypeAksesuar').ajaxCallWidget({
                    proxy: '/Deal/DdslickGetDealVehicleTypeProxyService/',
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    noDataFailureText: window.lang.translate("No data returned from service"),
                    loadingImageID: "loadingImage_DdslickDealVehicleTypeAksesuar",
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
                //var selectedContVehicleTypeBuyBack = false;
                ajax_DdslickVehicleTypeWarranty.ajaxCallWidget({
                    onSuccess: function (event, data) {
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickDealVehicleTypeWarranty').ddslick({
                            data: data,
                            width: '100%',
                            onSelected: function (selectedData) {
                                /*if (selectedContVehicleTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                                selectedContVehicleTypeBuyBack = true;
                                if (selectedData.selectedData.value > 0) {
                                }*/
                            }
                        });
                        $("#loadingImage_DdslickDealVehicleTypeWarranty").loadImager('removeLoadImage');

                    },
                });
                ajax_DdslickVehicleTypeWarranty.ajaxCallWidget('call');

                $("#gridContainer_DealWarranty").dxDataGrid("instance").refresh();
                $("#gridContainer_Warranty").dxDataGrid("instance").refresh();
                 

                

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


    //----------------------------------grid begin-------------------------------------------------
    /* 
    * deal warranty grid data source
    * @author Mustafa Zeynel dağlı
    * @since 12/10/2018
    * */
    var warrantyDealMatrix_grid_datasource = new DevExpress.data.CustomStore({
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

            /*var customerType = window.getSelectedDDslickValueOrDefaultVal("ddslickVehicleGroupsWarranty");
            var terrainType = window.getSelectedDDslickValueOrDefaultVal("ddslickDealVehicleTypeWarranty");
            var repmainType = window.getSelectedDDslickValueOrDefaultVal("ddslickWarrantyType");
            var hydraType = window.getSelectedDDslickValueOrDefaultVal("ddslickWarrantyTerm");
            var vehicleType = window.getSelectedDDslickValueOrDefaultVal("ddslickWarrantyKm");*/

            $.ajax({
                url: '/DefaultPost/DefaultGridPostModel',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillProjectWarrantiesGridx_infoprojectwarranties",
                    pkIdentity: $("#publicKey").val(),
                    project_id: parseInt($("#deal_hidden").deal("getDealID")),
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
    $("#gridContainer_DealWarranty").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        showBorders: true,
        // dataSource: orders,
        dataSource: warrantyDealMatrix_grid_datasource,
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
                dataField: "vehicle_description"
            },
            {
                caption: "Warranty code",
                dataField: "waranty_code"
            },
            {
                caption: "Warranty type",
                dataField: "warranty_type_name"
            },
            {
                caption: "Model",
                dataField: "vehicle_gt_model_name"
            },
            {
                caption: "Month",
                dataField: "month_value"
            },
            {
                caption: "Mileagas",
                dataField: "mileages1"
            }

        ],
        customizeColumns: function (columns) {
            //columns[5].format = { type: "currency", currency: "EUR" };
        },


    });


    /* 
    * warranty grid data source
    * @author Mustafa Zeynel dağlı
    * @since 12/10/2018
    * */
    var warrantyMatrix_grid_datasource = new DevExpress.data.CustomStore({
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

            /*var customerType = window.getSelectedDDslickValueOrDefaultVal("ddslickVehicleGroupsWarranty");
            var terrainType = window.getSelectedDDslickValueOrDefaultVal("ddslickDealVehicleTypeWarranty");
            var repmainType = window.getSelectedDDslickValueOrDefaultVal("ddslickWarrantyType");
            var hydraType = window.getSelectedDDslickValueOrDefaultVal("ddslickWarrantyTerm");
            var vehicleType = window.getSelectedDDslickValueOrDefaultVal("ddslickWarrantyKm");*/

            $.ajax({
                url: '/DefaultPost/DefaultGridPostModel',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillWarrantyMatrixGridx_syswarrantymatrix",
                    pkIdentity: $("#publicKey").val(),
                    project_id: parseInt($("#deal_hidden").deal("getDealID")),
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
    $("#gridContainer_Warranty").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        showBorders: true,
        // dataSource: orders,
        dataSource: warrantyMatrix_grid_datasource,
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

    //----------------------------------grid end-------------------------------------------------


    //----------------------------------dropdowns begin-------------------------------------------------

    /**
    * ddslick vehicle groups (body) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 16/10/2018
    */
    $('#loadingImage_DdslickVehicleGroupsWarranty').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleGroupsWarranty").loadImager('appendImage');
    //var selectedContTerrainTypeBuyBack = false;
    var ajax_DdslickVehicleGroupsWarranty = $('#ajax_DdslickVehicleGroupsWarranty').ajaxCallWidget({
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleGroupsWarranty",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_DdslickVehicleGroupsWarranty.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickVehicleGroupsWarranty').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {
                    /*if (selectedContTerrainTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                    selectedContTerrainTypeBuyBack = true;*/
                    if (selectedData.selectedData.value > 0) {
                        //getDealVehicleTypeDdslick();
                    }
                }
            });
            $("#loadingImage_DdslickVehicleGroupsWarranty").loadImager('removeLoadImage');
        },
    })
    ajax_DdslickVehicleGroupsWarranty.ajaxCallWidget('call');


    /**
   * ddslick deal vehicle type dropdown (aksesuar)
   * @author Mustafa Zeynel Dağlı
   * @since 17/10/2018
   */
    var ddslickDealVehicleTypeWarrantyData = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },
    ];
    $('#loadingImage_DdslickDealVehicleTypeWarranty').loadImager('removeLoadImage');
    $("#loadingImage_DdslickDealVehicleTypeWarranty").loadImager('appendImage');
    //var selectedContRepMainBuyBack = false;
    $('#ddslickDealVehicleTypeWarranty').ddslick({
        //height: 150,
        data: ddslickDealVehicleTypeWarrantyData,
        width: '100%',
        onSelected: function (selectedData) {
            /*if (selectedContRepMainBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            selectedContRepMainBuyBack = true;*/
            if (selectedData.selectedData.value > 0) {
                //$("#gridContainer_BuyBack").dxDataGrid("instance").refresh();

            }
        }
    });
    $("#loadingImage_DdslickDealVehicleTypeWarranty").loadImager('removeLoadImage');


    /**
  * ddslick deal aksesuar type dropdown (aksesuar)
  * @author Mustafa Zeynel Dağlı
  * @since 17/10/2018
  */
    var ddslickDealWarrantyTypeData = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },
    ];
    $('#loadingImage_DdslickWarrantyType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickWarrantyType").loadImager('appendImage');
    //var selectedContRepMainBuyBack = false;
    $('#ddslickWarrantyType').ddslick({
        //height: 150,
        data: ddslickDealWarrantyTypeData,
        width: '100%',
        onSelected: function (selectedData) {
            /*if (selectedContRepMainBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            selectedContRepMainBuyBack = true;*/
            if (selectedData.selectedData.value > 0) {
                //$("#gridContainer_BuyBack").dxDataGrid("instance").refresh();

            }
        }
    });
    $("#loadingImage_DdslickWarrantyType").loadImager('removeLoadImage');


    /**
  * ddslick deal aksesuar options dropdown (aksesuar)
  * @author Mustafa Zeynel Dağlı
  * @since 17/10/2018
  */
    var ddslickDealWarrantyTermData = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },
    ];
    $('#loadingImage_DdslickWarrantyTerm').loadImager('removeLoadImage');
    $("#loadingImage_DdslickWarrantyTerm").loadImager('appendImage');
    //var selectedContRepMainBuyBack = false;
    $('#ddslickWarrantyTerm').ddslick({
        //height: 150,
        data: ddslickDealWarrantyTermData,
        width: '100%',
        onSelected: function (selectedData) {
            /*if (selectedContRepMainBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            selectedContRepMainBuyBack = true;*/
            if (selectedData.selectedData.value > 0) {
                //$("#gridContainer_BuyBack").dxDataGrid("instance").refresh();

            }
        }
    });
    $("#loadingImage_DdslickWarrantyTerm").loadImager('removeLoadImage');

    /**
  * ddslick deal aksesuar options dropdown (aksesuar)
  * @author Mustafa Zeynel Dağlı
  * @since 17/10/2018
  */
    var ddslickDealWarrantyKmData = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },
    ];
    $('#loadingImage_DdslickWarrantyKm').loadImager('removeLoadImage');
    $("#loadingImage_DdslickWarrantyKm").loadImager('appendImage');
    //var selectedContRepMainBuyBack = false;
    $('#ddslickWarrantyKm').ddslick({
        //height: 150,
        data: ddslickDealWarrantyKmData,
        width: '100%',
        onSelected: function (selectedData) {
            /*if (selectedContRepMainBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            selectedContRepMainBuyBack = true;*/
            if (selectedData.selectedData.value > 0) {
                //$("#gridContainer_BuyBack").dxDataGrid("instance").refresh();

            }
        }
    });
    $("#loadingImage_DdslickWarrantyKm").loadImager('removeLoadImage');


    /**
   * ddslick deal vehicle type dropdown function (body)
   * @author Mustafa Zeynel Dağlı
   * @since 16/08/2018
   */
    var getDealVehicleTypeDdslick = function () {
        if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {
            $('#loadingImage_DdslickDealVehicleTypeBody').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeBody").loadImager('appendImage');
            var ddDataVehicleGroupsBody = $('#ddslickVehicleGroupsBody').data("ddslick");
            var ajax_DdslickDealVehicleTypeBody = $('#ajax_DdslickDealVehicleTypeBody').ajaxCallWidget({
                proxy: '/Deal/DdslickGetDealVehicleTypeProxyService',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickDealVehicleTypeBody",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkVehicleGroupsDdList_sysvehiclegroups",
                    pkIdentity: $("#publicKey").val(),
                    project_id: parseInt($("#deal_hidden").deal("getDealID")),
                    vehicle_groups_id: parseInt(ddDataVehicleGroupsBody.selectedData.value)
                })

            });
            ajax_DdslickDealVehicleTypeBody.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickDealVehicleTypeBody').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                            if (selectedData.selectedData.value > 0) {
                                //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                            }
                        }
                    });
                    $("#loadingImage_DdslickDealVehicleTypeBody").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickDealVehicleTypeBody.ajaxCallWidget('call');
        } else {
            /*$('#tab_VehicleType').loadImager('removeLoadImage');
            $('#tab_VehicleType').loadImager('appendImage');*/
            //alert("deal id < 0");
            $(window).warningMessage('resetOnShown');
            $(window).warningMessage('show', "Please select deal",
                "Please select deal");
        }


    };

    //----------------------------------dropdowns end-------------------------------------------------


    //----------------------------------add warranty to deal begin-------------------------------------------------

    /**
     * loading image for add vehicle type process
     * */
    $('#tab_Warranty').loadImager();

    /**
     * addwarranty form body reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetWarrantyAddDealForm = function () {
        $('#addWarrantyForm').validationEngine('hide');
        $('#addWarrantyForm')[0].reset();
        //$('#ddslickDealVehicleTypeBody').ddslick("select", { index: '0' });

    }

    /**
     * add warranty form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addWarrantyForm").validationEngine();

    /**
     * add aksesuar click event handler
     * @author Mustafa Zeynel Dağlı
     * */
    $("#add_warranty").on("click", function (e) {
        e.preventDefault();
        $('#tab_Warranty').loadImager('removeLoadImage');
        $("#tab_Warranty").loadImager('appendImage');

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        if (dealID == null || dealID == "" || dealID <= 0) {
            $(window).warningMessage('resetOnShown');
            $(window).warningMessage('show', "Please select deal",
                "Please select deal");
            $('#tab_Warranty').loadImager('removeLoadImage');
            return false;
        }

        if ($("#addWarrantyForm").validationEngine('validate')) {
            var ddDataVehicleGroups = $('#ddslickVehicleGroupsWarranty').data('ddslick');
            var ddDataVehicleType = $('#ddslickDealVehicleTypeWarranty').data('ddslick');
            var ddDatawarrantyType = $('#ddslickWarrantyType').data('ddslick');
            var ddDataWarrantyTermOptions = $('#ddslickWarrantyTerm').data('ddslick');
            var ddDataAksesuarSuppliers = $('#ddslickWarrantyKm').data('ddslick');
            var rows = $("#gridContainer_Warranty").dxDataGrid('getSelectedRowsData');

            //alert(ddDataVehicleType.selectedData.value);
            if ($("#tagcabin_VehicleWarranties").tagCabin('findSpecificTags', ddDataVehicleType.selectedData.value, 'data-attribute') != true) {
                /*tagBuilderChemicalPropGroup.tagCabin('addTagManuallyDataAttr', selectedItem.value,
                    selectedItem.text,*/
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', "Please select another warranty type",
                    "Please select another warranty type");
                $('#tab_Warranty').loadImager('removeLoadImage');
                return false;
            }

            var ajax = $('#add_warranty').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "tab_Warranty",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                proxy: '/Deal/AddBodyProxyService',
                type: "POST",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkInsertAct_infoprojectwarranties",
                    pkIdentity: $("#publicKey").val(),
                    project_id: dealID,
                    vehicle_group_id: ddDataVehicleGroups.selectedData.value,
                    vehicles_endgroup_id: ddDataVehicleType.selectedData.value,
                    monthsx_id: ddDataWarrantyTermOptions.selectedData.value,
                    warranty_matrix_id: rows[0].id,
                    warranty_type_id : ddDatawarrantyType.selectedData.value,
                    new_price : $("#price_warranty").val()
                })

            });
            ajax.ajaxCallWidget({
                onReset: function (event, data) {
                    resetVehicleTypeAddDealForm();
                },
                onAfterSuccess: function (event, data) {
                    $("#deal_hidden").deal("addVehicleType", { vehicleType: ddDataVehicleType.selectedData.value, count: $("#quantity").val() });
                    $("#tagcabin_Warranties").tagCabin('addTagManuallyDataAttr', ddDataVehicleType.selectedData.value,
                        ddDataVehicleType.selectedData.text + " / " + $("#quantity").val(),

                    );

                    /*var tagBuilderChemicalPropGroup = $('#chemical-property-group-cabin').tagCabin({
                        tagCopy: false,
                        tagDeletable: true,
                        tagDeletableAll: false,
                        tagBox: $('.tag-container-chemical-property-group').find('ul'),
    
                    });*/

                }
            })
            //ajax.ajaxCallWidget('call');

        } else {
            $('#tab_Warranty').loadImager('removeLoadImage');
        }
        return false;
    })

    // add aksesuar reset
    $("#add_warranty_reset").on("click", function (e) {
        e.preventDefault();
        resetWarrantyAddDealForm();
        return false;
    })

    //----------------------------------add aksesuar to deal end-------------------------------------------------

});