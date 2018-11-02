$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------
    $('#tab_Aksesuar').loadImager();
    $('#loadingImage_DdslickVehicleGroupsAksesuar').loadImager();
    $('#loadingImage_DdslickDealVehicleTypeAksesuar').loadImager();
    $('#loadingImage_DdslickAksesuarType').loadImager();
    $('#loadingImage_DdslickAksesuarOptions').loadImager();
    $('#loadingImage_DdslickAksesuarSuppliers').loadImager();
    //----------------------------------loadImager end-------------------------------------------------

    //----------------------------------tagcabin begin-------------------------------------------------
    var tagdataAksessuarlar = [{ "id": "120", "text": "TGS-26-4406X4BLS-LX-ALU-EL / 12 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "73", "privilege_name_eng": "Assign Consultant" } },
    { "id": "41", "text": "TGS-26-4406X4BLS-LX-ALU-ELX / 10 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "45", "privilege_name_eng": "You can list the database \/*table*\/." } },
    { "id": "47", "text": "TGS-16-4406X4BLS-LX-ALU-EL /8 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "51", "privilege_name_eng": "Menu Active \/  Passive" } },
    { "id": "46", "text": "TGS-26-5406X4BLS-LX-ALU-EL / 4 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "44", "privilege_name_eng": "Menu \/*Insert*\/" } },
    { "id": "48", "text": "TGX-26-5406X4BLS-LX-ALU-EL / 2 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "49", "privilege_name_eng": "Menu Update" } },
    { "id": "49", "text": "TGV-26-5406X4BLS-LX-ALU-EL / 1 piece", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "50", "privilege_name_eng": "Menu\/* delete*\/" } }];
    var tagBuilderAksesuarlar = $('#tagcabin_VehicleAksesuarlar').tagCabin({
        tagCopy: true,
        tagDeletable: true,
        tagDeletableAll: false,
        tagBox: $('.tag-container-aksesuarlar').find('ul'),
        //dataMapper: {attributes : Array('role_id', 'resource_id', 'privilege_id')}
        //dataMapper: Array('role_id', 'resource_id', 'privilege_id')

    });
    //var testArr = ['text', 'value'];
    tagBuilderAksesuarlar.tagCabin('addTags', JSON.stringify(tagdataAksessuarlar)/*, testArr*/);
    //----------------------------------tagcabin end-------------------------------------------------


    /**
     * tab organizer events attached
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $("#deal_hidden").organizeTabs({
        onAftertab_Aksesuar: function (e) {


            //----------------------------------dropdowns begin-------------------------------------------------

            /**
            * ddslick vehicle groups (body) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 16/10/2018
            */
            $('#loadingImage_DdslickVehicleGroupsAksesuar').loadImager('removeLoadImage');
            $("#loadingImage_DdslickVehicleGroupsAksesuar").loadImager('appendImage');
            //var selectedContTerrainTypeBuyBack = false;
            var ajax_DdslickVehicleGroupsAksesuar = $('#ajax_DdslickVehicleGroupsAksesuar').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickVehicleGroupsAksesuar",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkVehicleGroupsDdList_sysvehiclegroups",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickVehicleGroupsAksesuar.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickVehicleGroupsAksesuar').ddslick({
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

                    $("#loadingImage_DdslickVehicleGroupsAksesuar").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickVehicleGroupsAksesuar.ajaxCallWidget('call');


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
            $('#loadingImage_DdslickDealVehicleTypeAksesuar').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeAksesuar").loadImager('appendImage');
            //var selectedContRepMainBuyBack = false;
            $('#ddslickDealVehicleTypeAksesuar').ddslick({
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
            $("#loadingImage_DdslickDealVehicleTypeAksesuar").loadImager('removeLoadImage');


            /**
          * ddslick deal aksesuar type dropdown (aksesuar)
          * @author Mustafa Zeynel Dağlı
          * @since 17/10/2018
          */
            var ddslickDealAksesuarTypeData = [
                {
                    text: 'Please select',
                    value: 0,
                    selected: true
                },
            ];
            $('#loadingImage_DdslickAksesuarType').loadImager('removeLoadImage');
            $("#loadingImage_DdslickAksesuarType").loadImager('appendImage');
            var ajax_DdslickAksesuarT = $('#ajax_DdslickAksesuarType').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickAksesuarType",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkAccDeffSalesmanDdList_sysaccdeff",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickAksesuarT.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickAksesuarType').ddslick({
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

                    $("#loadingImage_DdslickAksesuarType").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickAksesuarT.ajaxCallWidget('call');



            /**
          * ddslick deal aksesuar options dropdown (aksesuar)
          * @author Mustafa Zeynel Dağlı
          * @since 17/10/2018
          */
            var ddslickDealAksesuarOptionsData = [
                {
                    text: 'Please select',
                    value: 0,
                    selected: true
                },
            ];
            $('#loadingImage_DdslickAksesuarOptions').loadImager('removeLoadImage');
            $("#loadingImage_DdslickAksesuarOptions").loadImager('appendImage');
            var ajax_DdslickAksesuarO = $('#ajax_DdslickAksesuarOptions').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickAksesuarType",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkAccessoryOptionsDdList_sysaccessoryoptions",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickAksesuarO.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickAksesuarOptions').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                        }
                    });

                    $("#loadingImage_DdslickAksesuarOptions").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickAksesuarO.ajaxCallWidget('call');



            /**
          * ddslick deal aksesuar options dropdown (aksesuar)
          * @author Mustafa Zeynel Dağlı
          * @since 17/10/2018
          */
            var ddslickDealAksesuarSuppliersData = [
                {
                    text: 'Please select',
                    value: 0,
                    selected: true
                },
            ];
            $('#loadingImage_DdslickAksesuarSuppliers').loadImager('removeLoadImage');
            $("#loadingImage_DdslickAksesuarSuppliers").loadImager('appendImage');
            var ajax_DdslickS = $('#ajax_DdslickAksesuarSuppliers').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                loadingImageID: "loadingImage_DdslickAksesuarSuppliers",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkCustomerDdList_infocustomer",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickS.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );

                    $('#ddslickAksesuarSuppliers').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                    });

                    $("#loadingImage_DdslickAksesuarSuppliers").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickS.ajaxCallWidget('call');

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


            //----------------------------------grid begin-------------------------------------------------

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
                            url: "pkFillProjectVehicleAccGridx_infoprojectacc",
                            pkIdentity: $("#publicKey").val(),
                            //project_id: parseInt($("#deal_hidden").deal("getDealID")),
                            project_id : parseInt(80),
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
            $("#gridContainer_Aksesuar").dxDataGrid({
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
                        caption: "Option",
                        dataField: "option_name"
                    },
                    {
                        caption: "Supplier",
                        dataField: "supplier_name"
                    },
                    {
                        caption: "tag name",
                        dataField: "tag_name"
                    },
                    {
                        caption: "model name",
                        dataField: "vehicle_gt_model_name"
                    },
                    {
                        caption: "Other brand name",
                        dataField: "other_acc_brand"
                    },
                    {
                        caption: window.lang.translate('Update'),
                        width: 40,
                        alignment: 'center',

                        cellTemplate: function (container, options) {
                            var fieldHtml;
                            var vehicle_id = options.data.id;
                            var data = options.data;
                            $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                openUpdateAksesuarPopUp({
                                    deal_acc_oldvalue: data.deal_acc_oldvalue,
                                    deal_acc_newvalue: data.deal_acc_newvalue,
                                    quantity: data.quantity,
                                    list_price : data.list_price,
                                    deal_acc_newvalue : data.deal_acc_newvalue,
                                    option_name : data.option_name,
                                    acc_option_id : data.acc_option_id,
                                    acc_supplier_id : data.acc_supplier_id,
                                    supplier_name : data.supplier_name,
                                    vehicle_gt_model_name : data.vehicle_gt_model_name,
                                    vehicle_gt_model_id : data.vehicle_gt_model_id,
                                    id: data.id
                                });
                            }).appendTo(container);
                        }
                    }

                ],
                customizeColumns: function (columns) {
                    //columns[5].format = { type: "currency", currency: "EUR" };
                },


            });

            //----------------------------------grid end-------------------------------------------------


            $('#loadingImage_DdslickDealVehicleTypeAksesuar').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeAksesuar").loadImager('appendImage');
            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {

                var vehicleTypes = $("#deal_hidden").deal("getVehicleTypes");
                /*if (vehicleTypes.length == 0) {
                    $(window).warningMessage('resetOnShown');
                    $(window).warningMessage('show', window.lang.translate("You must add at least one vehicle type to deal"),
                        window.lang.translate("You must add at least one vehicle type to deal"));
                    return false;
                }*/

                var ajax_DdslickVehicleTypeAksesuar = $('#ajax_DdslickDealVehicleTypeAksesuar').ajaxCallWidget({
                    proxy: '/Deal/DdslickGetDealVehicleTypeProxyService/',
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    noDataFailureText: window.lang.translate("No data returned from service"),
                    loadingImageID: "loadingImage_DdslickDealVehicleTypeAksesuar",
                    data: JSON.stringify({
                        url: "pkProjectVehicleModelsDdList_infoprojectvehiclemodels",
                        //url: "pkProjectVehicleModelsTradeDdList_infoprojectbuybacks",
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        project_id: $("#deal_hidden").deal("getDealID"),
                        //project_id: 1,
                        pkIdentity: $("#publicKey").val(),
                    }),
                    type: 'POST'
                });
                //var selectedContVehicleTypeBuyBack = false;
                ajax_DdslickVehicleTypeAksesuar.ajaxCallWidget({
                    onSuccess: function (event, data) {
                        $("#ddslickDealVehicleTypeAksesuar").ddslick('destroy');
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickDealVehicleTypeAksesuar').ddslick({
                            data: data,
                            width: '100%',
                            onSelected: function (selectedData) {
                                /*if (selectedContVehicleTypeBuyBack == true) $("#gridContainer_Aksesuar").dxDataGrid("instance").refresh();
                                selectedContVehicleTypeBuyBack = true;
                                if (selectedData.selectedData.value > 0) {
                                }*/
                            }
                        });
                        $("#loadingImage_DdslickDealVehicleTypeAksesuar").loadImager('removeLoadImage');

                    },
                });
                ajax_DdslickVehicleTypeAksesuar.ajaxCallWidget('call');
            } else {

                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select deal"),
                    window.lang.translate("Please select deal"));
                $('#loadingImage_DdslickDealVehicleTypeAksesuar').loadImager('removeLoadImage');
            }
        },
        
    });


    //----------------------------------add aksesuar to deal begin-------------------------------------------------

    /**
     * loading image for add vehicle type process
     * */
    $('#tab_Aksesuar').loadImager();

    /**
     * add deal form body reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetAksesuarAddDealForm = function () {
        $('#addAksesuarForm').validationEngine('hide');
        $('#addAksesuarForm')[0].reset();
    }

    /**
     * add vehicle type form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addAksesuarForm").validationEngine();

    /**
     * add aksesuar click event handler
     * @author Mustafa Zeynel Dağlı
     * */
    $("#add_aksesuar").on("click", function (e) {
        e.preventDefault();
        $('#tab_Aksesuar').loadImager('removeLoadImage');
        $("#tab_Aksesuar").loadImager('appendImage');

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        /*if (dealID == null || dealID == "" || dealID <= 0) {
            $(window).warningMessage('resetOnShown');
            $(window).warningMessage('show', "Please select deal",
                "Please select deal");
            $('#tab_Aksesuar').loadImager('removeLoadImage');
            return false;
        }*/

        if ($("#addAksesuarForm").validationEngine('validate')) {
            var ddDataVehicleGroups = $('#ddslickVehicleGroupsAksesuar').data('ddslick');
            var ddDataVehicleType = $('#ddslickDealVehicleTypeAksesuar').data('ddslick');
            var ddDataAksesuarType = $('#ddslickAksesuarType').data('ddslick');
            var ddDataAksesuarOptions = $('#ddslickAksesuarOptions').data('ddslick');
            var ddDataAksesuarSuppliers = $('#ddslickAksesuarSuppliers').data('ddslick');
            
            var ajax = $('#add_aksesuar').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "tab_Aksesuar",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                proxy: '/Deal/AddAksesuarProxyService',
                type: "POST",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkInsertAct_infoprojectacc",
                    pkIdentity: $("#publicKey").val(),
                    project_id: dealID,
                    //project_id: 1,
                    vehicles_group_id: parseInt(ddDataVehicleGroups.selectedData.value),
                    vehicle_gt_model_id: parseInt(ddDataVehicleType.selectedData.value),
                    acc_option_id: parseInt(ddDataAksesuarOptions.selectedData.value),
                    acc_supplier_id: parseInt(ddDataAksesuarSuppliers.selectedData.value),
                    accessories_matrix_id: 1,
                    deal_acc_newvalue: $("#aksesuar_new_price").val(),
                    quantity: $("#quantity").val(),
                })

            });
            ajax.ajaxCallWidget({
                onReset: function (event, data) {
                    resetAksesuarAddDealForm();
                },
                onAfterSuccess: function (event, data) {
                    $("#gridContainer_Aksesuar").dxDataGrid("instance").refresh();
                }
            })
            ajax.ajaxCallWidget('call');

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

    //----------------------------------add aksesuar to deal end-------------------------------------------------


    //----------------------------------popup begin-------------------------------------------------

    /**
     * add accessory proposal popup insert wrapper
     * @author Mustafa Zeynel Dağlı
     * @since 17/10/2018
     * */
    window.addAksesuarProposalPopupWrapper = function (e) {
        //alert("popup submit click");

        if ($("#aksesuarProposalForm").validationEngine('validate')) {
            alert('test mest 1');
        } else {
            alert('test mest 2');
        }
        e.preventDefault();
        return false;
    }

    /**
     * add accessory proposal popup window opener
     * @author Mustafa Zeynel Dağlı
     * @since 17/10/2018
     * */
    window.openAddProposalAksesuarPopUp = function () {
        BootstrapDialog.show({
            title: window.lang.translate("Add proposal"),
            message: function (dialogRef) {
                var dialogRef = dialogRef;
                var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loadingImage_AddAksesuarProposal" class="box box-primary">\n\
                                                     <form id="aksesuarProposalForm" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Accesory name</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="accesoryName_popup" id="accesoryName_popup" placeholder=""></textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Brand</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="brandName_popup" id="brandName_popup" placeholder=""></textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Supplier</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="supplierName_popup" id="supplierName_popup" placeholder=""></textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="add_aksesuar_proposal" class="btn btn-primary" type="button" onclick="return addAksesuarProposalPopupWrapper(event);" >\n\
                                                                 <i class="fa fa-save"></i> Add proposal </button>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                 </form>\n\
                                             </div>\n\
                                         </div>\n\
                                     </div>');
                return $message;
            },
            type: BootstrapDialog.TYPE_PRIMARY,
            onshow: function (dialogRef) {
                
            },
            onshown: function () {
                $('#aksesuarProposalForm').validationEngine();
                $('#loadingImage_AddAksesuarProposal').loadImager();
                //$('#loadingImage_AddAksesuarProposal').loadImager("appendImage");

            },
            onhide: function () {
                //alert('onhide popup');

            },
        });
    }

    //----------------------------------popup begin-------------------------------------------------

    /**
     * add accessory proposal popup insert wrapper
     * @author Mustafa Zeynel Dağlı
     * @since 17/10/2018
     * */
    window.updateAksesuarPopupWrapper = function (e) {

        e.preventDefault();
        $('#loadingImage_UpdateAksesuar').loadImager('removeLoadImage');
        $("#loadingImage_UpdateAksesuar").loadImager('appendImage');

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        /*if (dealID == null || dealID == "" || dealID <= 0) {
            $(window).warningMessage('resetOnShown');
            $(window).warningMessage('show', "Please select deal",
                "Please select deal");
            $('#tab_Aksesuar').loadImager('removeLoadImage');
            return false;
        }*/

        if ($("#aksesuarFormPopup").validationEngine('validate')) {
            var ddDataVehicleGroups = $('#ddslickVehicleGroupsAksesuarPopup').data('ddslick');
            var ddDataVehicleType = $('#ddslickDealVehicleTypeAksesuarPopup').data('ddslick');
            var ddDataAksesuarType = $('#ddslickAksesuarTypePopup').data('ddslick');
            var ddDataAksesuarOptions = $('#ddslickAksesuarOptionsPopup').data('ddslick');
            var ddDataAksesuarSuppliers = $('#ddslickAksesuarSuppliersPopup').data('ddslick');

            var ajax = $('#update_aksesuarPoupup').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loadingImage_UpdateAksesuar",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                proxy: '/Deal/AddAksesuarProxyService',
                type: "POST",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkUpdateAct_infoprojectacc",
                    pkIdentity: $("#publicKey").val(),
                    project_id: dealID,
                    //project_id: 1,
                    vehicles_group_id: parseInt(ddDataVehicleGroups.selectedData.value),
                    vehicle_gt_model_id: parseInt(ddDataVehicleType.selectedData.value),
                    acc_option_id: parseInt(ddDataAksesuarOptions.selectedData.value),
                    acc_supplier_id: parseInt(ddDataAksesuarSuppliers.selectedData.value),
                    accessories_matrix_id: 1,
                    deal_acc_newvalue: $("#aksesuar_new_price").val(),
                    quantity: $("#quantity_aksesuarPopup").val(),
                    id: parseInt($("#deal_aksesuar_id").val()),

                })

            });
            ajax.ajaxCallWidget({
                onReset: function (event, data) {
                    //resetAksesuarAddDealForm();
                },
                onAfterSuccess: function (event, data) {
                }
            })
            ajax.ajaxCallWidget('call');

        } else {
            $('#loadingImage_UpdateAksesuar').loadImager('removeLoadImage');
        }


        return false;
    }

    /**
     * add accessory proposal popup window opener
     * @author Mustafa Zeynel Dağlı
     * @since 17/10/2018
     * */
    window.openUpdateAksesuarPopUp = function (data) {
        //console.log(data);
        var rowData = data;
        BootstrapDialog.show({
            title: window.lang.translate("Update"),
            message: function (dialogRef) {
                var dialogRef = dialogRef;
                var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loadingImage_UpdateAksesuar" class="box box-primary">\n\
                                                     <form id="aksesuarFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="deal_aksesuar_id" name="deal_aksesuar_id"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Vehicle group</label>\n\
                                                             <div id="loadingImage_DdslickVehicleGroupsAksesuarPopup" class="col-sm-10">\n\
                                                                 <div class="input-group" id="ajax_DdslickVehicleGroupsAksesuarPopup">\n\
                                                                     <div class="input-group-addon" id="ajax_DdslickVehicleGroupsAksesuarPopup">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div id="ddslickVehicleGroupsAksesuarPopup"></div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Vehicle type</label>\n\
                                                             <div id="loadingImage_DdslickDealVehicleTypeAksesuarPopup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon" id="ajax_DdslickDealVehicleTypeAksesuarPopup">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div id="ddslickDealVehicleTypeAksesuarPopup"></div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Terrain</label>\n\
                                                             <div id="loadingImage_DdslickAksesuarTypePopup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon" id="ajax_DdslickAksesuarTypePopup">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div id="ddslickAksesuarTypePopup"></div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Options</label>\n\
                                                             <div id="loadingImage_DdslickAksesuarOptionsPopup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon" id="ajax_DdslickAksesuarOptionsPopup">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div id="ddslickAksesuarOptionsPopup"></div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Suppliers</label>\n\
                                                             <div id="loadingImage_DdslickAksesuarSuppliersPopup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon" id="ajax_DdslickAksesuarSuppliersPopup">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div id="ddslickAksesuarSuppliersPopup"></div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Quantity</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <input id="quantity_aksesuarPopup" type="text" class="form-control" placeholder="Quantity">\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Old price</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <input id="aksesuar_old_pricePopup" type="text" class="form-control" placeholder="Old price">\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Price</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <input id="aksesuar_new_pricePopup" type="text" class="form-control" placeholder="Price">\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="update_aksesuarPoupup" class="btn btn-primary" type="button" onclick="return updateAksesuarPopupWrapper(event);" >\n\
                                                                 <i class="fa fa-save"></i> Update </button>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                 </form>\n\
                                             </div>\n\
                                         </div>\n\
                                     </div>');
                return $message;
            },
            type: BootstrapDialog.TYPE_PRIMARY,
            onshow: function (dialogRef) {
            },
            onshown: function () {
                $('#aksesuarFormPopup').validationEngine();
                $('#loadingImage_UpdateAksesuar').loadImager();
                $('#loadingImage_DdslickVehicleGroupsAksesuarPopup').loadImager();
                $('#loadingImage_DdslickDealVehicleTypeAksesuarPopup').loadImager();
                $('#loadingImage_DdslickAksesuarTypePopup').loadImager();
                $('#loadingImage_DdslickAksesuarOptionsPopup').loadImager();
                $('#loadingImage_DdslickAksesuarSuppliersPopup').loadImager();


                $("#quantity_aksesuarPopup").val(rowData.quantity);
                $("#aksesuar_old_pricePopup").val(rowData.deal_acc_oldvalue);
                $("#aksesuar_new_pricePopup").val(rowData.deal_acc_newvalue);
                $("#deal_aksesuar_id").val(rowData.id);

                //BuyBack tab form elements begin

                /**
                * ddslick vehicle groups (body) dropdown 
                * @author Mustafa Zeynel Dağlı
                * @since 16/10/2018
                */
                $('#loadingImage_DdslickVehicleGroupsAksesuarPopup').loadImager('removeLoadImage');
                $("#loadingImage_DdslickVehicleGroupsAksesuarPopup").loadImager('appendImage');
                //var selectedContTerrainTypeBuyBack = false;
                var ajax_DdslickVehicleGroupsAksesuar = $('#ajax_DdslickVehicleGroupsAksesuarPopup').ajaxCallWidget({
                    proxy: '/DefaultPost/DefaultPostModel',
                    type: "POST",
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_DdslickVehicleGroupsAksesuarPopup",
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    noDataFailureText: window.lang.translate("No data returned from service"),
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkVehicleGroupsDdList_sysvehiclegroups",
                        pkIdentity: $("#publicKey").val()
                    })

                });
                ajax_DdslickVehicleGroupsAksesuar.ajaxCallWidget({
                    onSuccess: function (event, data) {
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickVehicleGroupsAksesuarPopup').ddslick({
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
                        /*$('#ddslickVehicleGroupsAksesuarPopup').ddslick('selectByValue',
                            {
                                index: parseInt(rowData.vehicles_trade_id),
                                text: '' + rowData.vehicles_trade_name + ''
                            }
                        );*/
                        $("#loadingImage_DdslickVehicleGroupsAksesuarPopup").loadImager('removeLoadImage');
                    },
                })
                ajax_DdslickVehicleGroupsAksesuar.ajaxCallWidget('call');


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
                $('#loadingImage_DdslickDealVehicleTypeAksesuarPopup').loadImager('removeLoadImage');
                $("#loadingImage_DdslickDealVehicleTypeAksesuarPopup").loadImager('appendImage');
                //var selectedContRepMainBuyBack = false;
                $('#ddslickDealVehicleTypeAksesuarPopup').ddslick({
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
                /*$('#ddslickDealVehicleTypeAksesuarPopup').ddslick('selectByValue',
                    {
                        index: parseInt(rowData.vehicle_gt_model_id),
                        text: '' + rowData.vehicle_gt_model_name + ''
                    }
                );*/
                $("#loadingImage_DdslickDealVehicleTypeAksesuarPopup").loadImager('removeLoadImage');


                /**
              * ddslick deal aksesuar type dropdown (aksesuar)
              * @author Mustafa Zeynel Dağlı
              * @since 17/10/2018
              */
                var ddslickDealAksesuarTypeData = [
                    {
                        text: 'Please select',
                        value: 0,
                        selected: true
                    },
                ];
                $('#loadingImage_DdslickAksesuarTypePopup').loadImager('removeLoadImage');
                $("#loadingImage_DdslickAksesuarTypePopup").loadImager('appendImage');
                var ajax_DdslickAksesuarT = $('#ajax_DdslickAksesuarTypePopup').ajaxCallWidget({
                    proxy: '/DefaultPost/DefaultPostModel',
                    type: "POST",
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_DdslickAksesuarTypePopup",
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    noDataFailureText: window.lang.translate("No data returned from service"),
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkAccDeffSalesmanDdList_sysaccdeff",
                        pkIdentity: $("#publicKey").val()
                    })

                });
                ajax_DdslickAksesuarT.ajaxCallWidget({
                    onSuccess: function (event, data) {
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickAksesuarTypePopup').ddslick({
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
                        /*$('#ddslickAksesuarTypePopup').ddslick('selectByValue',
                            {
                                index: parseInt(rowData.vehicle_gt_model_id),
                                text: '' + rowData.vehicle_gt_model_name + ''
                            }
                        );*/
                        $("#loadingImage_DdslickAksesuarTypePopup").loadImager('removeLoadImage');
                    },
                })
                ajax_DdslickAksesuarT.ajaxCallWidget('call');



                /**
              * ddslick deal aksesuar options dropdown (aksesuar)
              * @author Mustafa Zeynel Dağlı
              * @since 17/10/2018
              */
                var ddslickDealAksesuarOptionsData = [
                    {
                        text: 'Please select',
                        value: 0,
                        selected: true
                    },
                ];
                $('#loadingImage_DdslickAksesuarOptionsPopup').loadImager('removeLoadImage');
                $("#loadingImage_DdslickAksesuarOptionsPopup").loadImager('appendImage');
                var ajax_DdslickAksesuarO = $('#ajax_DdslickAksesuarOptionsPopup').ajaxCallWidget({
                    proxy: '/DefaultPost/DefaultPostModel',
                    type: "POST",
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_DdslickAksesuarTypePopup",
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    noDataFailureText: window.lang.translate("No data returned from service"),
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkAccessoryOptionsDdList_sysaccessoryoptions",
                        pkIdentity: $("#publicKey").val()
                    })

                });
                ajax_DdslickAksesuarO.ajaxCallWidget({
                    onSuccess: function (event, data) {
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickAksesuarOptionsPopup').ddslick({
                            //height: 150,
                            data: data,
                            width: '100%',
                            onSelected: function (selectedData) {
                            }
                        });
                        $('#ddslickAksesuarOptionsPopup').ddslick('selectByValue',
                            {
                                index: parseInt(rowData.acc_option_id),
                                text: '' + rowData.option_name + ''
                            }
                        );
                        $("#loadingImage_DdslickAksesuarOptionsPopup").loadImager('removeLoadImage');
                    },
                })
                ajax_DdslickAksesuarO.ajaxCallWidget('call');



                /**
              * ddslick deal aksesuar options dropdown (aksesuar)
              * @author Mustafa Zeynel Dağlı
              * @since 17/10/2018
              */
                var ddslickDealAksesuarSuppliersData = [
                    {
                        text: 'Please select',
                        value: 0,
                        selected: true
                    },
                ];
                $('#loadingImage_DdslickAksesuarSuppliersPopup').loadImager('removeLoadImage');
                $("#loadingImage_DdslickAksesuarSuppliersPopup").loadImager('appendImage');
                var ajax_DdslickS = $('#ajax_DdslickAksesuarSuppliersPopup').ajaxCallWidget({
                    proxy: '/DefaultPost/DefaultPostModel',
                    type: "POST",
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    noDataFailureText: window.lang.translate("No data returned from service"),
                    loadingImageID: "loadingImage_DdslickAksesuarSuppliersPopup",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkCustomerDdList_infocustomer",
                        pkIdentity: $("#publicKey").val()
                    })

                });
                ajax_DdslickS.ajaxCallWidget({
                    onSuccess: function (event, data) {
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );

                        $('#ddslickAksesuarSuppliersPopup').ddslick({
                            //height: 150,
                            data: data,
                            width: '100%',
                        });
                        /*$('#ddslickAksesuarSuppliersPopup').ddslick('selectByValue',
                            {
                                index: parseInt(rowData.acc_supplier_id),
                                text: '' + rowData.supplier_name + ''
                            }
                        );*/
                        $("#loadingImage_DdslickAksesuarSuppliersPopup").loadImager('removeLoadImage');
                    },
                })
                ajax_DdslickS.ajaxCallWidget('call');


                $('#loadingImage_DdslickDealVehicleTypeAksesuarPopup').loadImager('removeLoadImage');
                $("#loadingImage_DdslickDealVehicleTypeAksesuarPopup").loadImager('appendImage');
                if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {
                    var vehicleTypes = $("#deal_hidden").deal("getVehicleTypes");
                    /*if (vehicleTypes.length == 0) {
                        $(window).warningMessage('resetOnShown');
                        $(window).warningMessage('show', window.lang.translate("You must add at least one vehicle type to deal"),
                            window.lang.translate("You must add at least one vehicle type to deal"));
                        return false;
                    }*/
                    var ajax_DdslickVehicleTypeAksesuar = $('#ajax_DdslickDealVehicleTypeAksesuarPopup').ajaxCallWidget({
                        proxy: '/Deal/DdslickGetDealVehicleTypeProxyService/',
                        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                        noDataFailureText: window.lang.translate("No data returned from service"),
                        loadingImageID: "loadingImage_DdslickDealVehicleTypeAksesuarPopup",
                        data: JSON.stringify({
                            url: "pkProjectVehicleModelsDdList_infoprojectvehiclemodels",
                            //url: "pkProjectVehicleModelsTradeDdList_infoprojectbuybacks",
                            language_code: $("#langCode").val(),
                            pk: "GsZVzEYe50uGgNM",
                            project_id: $("#deal_hidden").deal("getDealID"),
                            //project_id: 1,
                            pkIdentity: $("#publicKey").val(),
                        }),
                        type: 'POST'
                    });
                    //var selectedContVehicleTypeBuyBack = false;
                    ajax_DdslickVehicleTypeAksesuar.ajaxCallWidget({
                        onSuccess: function (event, data) {
                            $("#ddslickDealVehicleTypeAksesuarPopup").ddslick('destroy');
                            var data = $.parseJSON(data);
                            data.splice(0, 0,
                                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                            );
                            $('#ddslickDealVehicleTypeAksesuarPopup').ddslick({
                                data: data,
                                width: '100%',
                                onSelected: function (selectedData) {
                                    /*if (selectedContVehicleTypeBuyBack == true) $("#gridContainer_Aksesuar").dxDataGrid("instance").refresh();
                                    selectedContVehicleTypeBuyBack = true;
                                    if (selectedData.selectedData.value > 0) {
                                    }*/
                                }
                            });
                            $("#loadingImage_DdslickDealVehicleTypeAksesuarPopup").loadImager('removeLoadImage');

                        },
                    });
                    ajax_DdslickVehicleTypeAksesuar.ajaxCallWidget('call');
                } else {

                    $(window).warningMessage('resetOnShown');
                    $(window).warningMessage('show', window.lang.translate("Please select deal"),
                        window.lang.translate("Please select deal"));
                    $('#loadingImage_DdslickDealVehicleTypeAksesuarPopup').loadImager('removeLoadImage');
                }


                //BuyBack tab form elements end

                //----------------------------------dropdowns end-------------------------------------------------

            },
        });
    }

    //----------------------------------popup end-------------------------------------------------

});