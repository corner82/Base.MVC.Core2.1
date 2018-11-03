$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------
    $('#tab_Body').loadImager();
    $('#loadingImage_DdslickVehicleGroupsBodyExt').loadImager();
    /**
    * ddslick vehicle type dropdown(buyback) load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickDealVehicleTypeBodyExt').loadImager();
    $("#loadingImage_DdslickBodyTypesExt").loadImager();
    //$("#loadingImage_DdslickBodyOptExt").loadImager();
    $('#loadingImage_DdslickBodyExtrasExt').loadImager();
    $('#loadingImage_DdslickBodySupplierExt').loadImager();
    $('#loadingImage_DdslickBodyDepositExt').loadImager();
    //----------------------------------loadImager end-------------------------------------------------


    /**
     * tab organizer events attached
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $("#deal_hidden").organizeTabs({
        onAftertab_BodyExt: function (e) {


            //----------------------------------dropdowns begin-------------------------------------------------

            /**
            * ddslick vehicle groups (body) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 16/10/2018
            */
            $('#loadingImage_DdslickVehicleGroupsBodyExt').loadImager('removeLoadImage');
            $("#loadingImage_DdslickVehicleGroupsBodyExt").loadImager('appendImage');
            //var selectedContTerrainTypeBuyBack = false;
            var ajax_DdslickVehicleGroupsAksesuar = $('#ajax_DdslickVehicleGroupsBodyExt').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickVehicleGroupsBodyExt",
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
                    $('#ddslickVehicleGroupsBodyExt').ddslick({
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
                    $("#loadingImage_DdslickVehicleGroupsBodyExt").loadImager('removeLoadImage');
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
            $('#loadingImage_DdslickDealVehicleTypeBodyExt').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeBodyExt").loadImager('appendImage');
            //var selectedContRepMainBuyBack = false;
            $('#ddslickDealVehicleTypeBodyExt').ddslick({
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
            $("#loadingImage_DdslickDealVehicleTypeBodyExt").loadImager('removeLoadImage');


            $('#loadingImage_DdslickDealVehicleTypeBodyExt').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeBodyExt").loadImager('appendImage');
            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {

                var vehicleTypes = $("#deal_hidden").deal("getVehicleTypes");
                /*if (vehicleTypes.length == 0) {

                    $(window).warningMessage('resetOnShown');
                    $(window).warningMessage('show', window.lang.translate("You must add at least one vehicle type to deal"),
                        window.lang.translate("You must add at least one vehicle type to deal"));
                    return false;
                }*/

                var ajax_DdslickVehicleTypeBuyBack = $('#ajax_DdslickDealVehicleTypeBodyExt').ajaxCallWidget({
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
                        $("#ddslickDealVehicleTypeBodyExt").ddslick('destroy');
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickDealVehicleTypeBodyExt').ddslick({
                            data: data,
                            width: '100%',
                            onSelected: function (selectedData) {
                                /*if (selectedContVehicleTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                                selectedContVehicleTypeBuyBack = true;
                                if (selectedData.selectedData.value > 0) {
                                }*/
                            }
                        });
                        $("#loadingImage_DdslickDealVehicleTypeBodyExt").loadImager('removeLoadImage');

                    },
                });
                ajax_DdslickVehicleTypeBuyBack.ajaxCallWidget('call');
            } else {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select deal"),
                    window.lang.translate("Please select deal"));
                $('#loadingImage_DdslickDealVehicleTypeBodyExt').loadImager('removeLoadImage');
            }


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
            $('#loadingImage_DdslickBodyTypesExt').loadImager('removeLoadImage');
            $("#loadingImage_DdslickBodyTypesExt").loadImager('appendImage');
            var ajax_DdslickS = $('#ajax_DdslickBodyTypesExt').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                loadingImageID: "loadingImage_DdslickBodyTypesExt",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkBodyFeatureTypesDdList_sysaccbodytypes",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickS.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );

                    $('#ddslickBodyTypesExt').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                            if (selectedData.selectedData.value > 0) {
                                $('#ddslickBodyDepositExt').ddslick('destroy');
                                $('#loadingImage_DdslickBodyDepositExt').loadImager('removeLoadImage');
                                $("#loadingImage_DdslickBodyDepositExt").loadImager('appendImage');
                                var ajax_DdslickS = $('#ajax_DdslickBodyDepositExt').ajaxCallWidget({
                                    proxy: '/DefaultPost/DefaultPostModel',
                                    type: "POST",
                                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                                    noDataFailureText: window.lang.translate("No data returned from service"),
                                    loadingImageID: "loadingImage_DdslickBodyDepositExt",
                                    data: JSON.stringify({
                                        language_code: $("#langCode").val(),
                                        pk: "GsZVzEYe50uGgNM",
                                        url: "pkDepositTypesDdList_sysprojectdeposittypes",
                                        pkIdentity: $("#publicKey").val(),
                                        acc_body_types_id: selectedData.selectedData.value
                                    })
                                });
                                ajax_DdslickS.ajaxCallWidget({
                                    onSuccess: function (event, data) {
                                        var data = $.parseJSON(data);
                                        data.splice(0, 0,
                                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                        );

                                        $('#ddslickBodyDepositExt').ddslick({
                                            //height: 150,
                                            data: data,
                                            width: '100%',
                                        });

                                        $("#loadingImage_DdslickBodyDepositExt").loadImager('removeLoadImage');
                                    },
                                })
                                ajax_DdslickS.ajaxCallWidget('call');
                                //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                            }
                        }
                    });

                    

                    $("#loadingImage_DdslickBodyTypesExt").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickS.ajaxCallWidget('call');


            /**
          * ddslick deal aksesuar options dropdown (aksesuar)
          * @author Mustafa Zeynel Dağlı
          * @since 17/10/2018
          */
            $('#loadingImage_DdslickBodyExtrasExt').loadImager('removeLoadImage');
            $("#loadingImage_DdslickBodyExtrasExt").loadImager('appendImage');
            var ajax_DdslickS = $('#ajax_DdslickBodyExtrasExt').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                loadingImageID: "loadingImage_DdslickBodyExtrasExt",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkAccBodyExtrasDeffDdList_sysaccbodydeff",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickS.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );

                    $('#ddslickBodyExtrasExt').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                    });

                    $("#loadingImage_DdslickBodyExtrasExt").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickS.ajaxCallWidget('call');


            $('#loadingImage_DdslickBodySupplierExt').loadImager('removeLoadImage');
            $("#loadingImage_DdslickBodySupplierExt").loadImager('appendImage');
            var ajax_DdslickS = $('#ajax_DdslickBodySupplierExt').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                loadingImageID: "loadingImage_DdslickBodySupplierExt",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkSupplierLongDdList_syssupplier",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickS.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );

                    $('#ddslickBodySupplierExt').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                            if (selectedData.selectedData.value > 0) {
                                $('#ddslickBodyExtrasExt').ddslick('destroy');
                                $('#loadingImage_DdslickBodyExtrasExt').loadImager('removeLoadImage');
                                $("#loadingImage_DdslickBodyExtrasExt").loadImager('appendImage');
                                var ajax_DdslickS = $('#ajax_DdslickBodyExtrasExt').ajaxCallWidget({
                                    proxy: '/DefaultPost/DefaultPostModel',
                                    type: "POST",
                                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                                    noDataFailureText: window.lang.translate("No data returned from service"),
                                    loadingImageID: "loadingImage_DdslickBodyExtrasExt",
                                    data: JSON.stringify({
                                        language_code: $("#langCode").val(),
                                        pk: "GsZVzEYe50uGgNM",
                                        url: "pkAccBodyExtrasDeffDdList_sysaccbodydeff",
                                        pkIdentity: $("#publicKey").val()
                                        //buraya seçilen id değişkeni gelmeli
                                    })

                                });
                                ajax_DdslickS.ajaxCallWidget({
                                    onSuccess: function (event, data) {
                                        var data = $.parseJSON(data);
                                        data.splice(0, 0,
                                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                        );

                                        $('#ddslickBodyExtrasExt').ddslick({
                                            //height: 150,
                                            data: data,
                                            width: '100%',
                                        });

                                        $("#loadingImage_DdslickBodyExtrasExt").loadImager('removeLoadImage');
                                    },
                                })
                                ajax_DdslickS.ajaxCallWidget('call');
                            }
                        }
                    });

                    $("#loadingImage_DdslickBodySupplierExt").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickS.ajaxCallWidget('call');


            var ddslickDealVehicleTypeAksesuarData = [
                {
                    text: 'Please select',
                    value: 0,
                    selected: true
                },
                {
                    text: 'Yes',
                    value: 0,
                    selected: false
                },
                {
                    text: 'No',
                    value: 1,
                    selected: false
                },
            ];
            $('#loadingImage_DdslickBodyDepositExt').loadImager('removeLoadImage');
            $("#loadingImage_DdslickBodyDepositExt").loadImager('appendImage');
            var ajax_DdslickS = $('#ajax_DdslickBodyDepositExt').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                loadingImageID: "loadingImage_DdslickBodyDepositExt",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDepositTypesDdList_sysprojectdeposittypes",
                    pkIdentity: $("#publicKey").val(),
                    acc_body_types_id : 5
                })
            });
            ajax_DdslickS.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );

                    $('#ddslickBodyDepositExt').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                    });

                    $("#loadingImage_DdslickBodyDepositExt").loadImager('removeLoadImage');
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
                            url: "pkFillProjectVehicleBodyExtrasGridx_infoprojectaccbody",
                            pkIdentity: $("#publicKey").val(),
                            project_id: parseInt($("#deal_hidden").deal("getDealID")),
                            //project_id: parseInt(80),
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
            $("#gridContainer_BodyExt").dxDataGrid({
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
                },
                columns: [
                    {
                        //allowGrouping: false,
                        caption: "Body type",
                        dataField: "body_type_name"
                    },
                    {
                        caption: "Deposit",
                        dataField: "depozit_type_name"
                    },
                    {
                        caption: "Ext. list price",
                        dataField: "extras_list_price"
                    },
                    {
                        caption: "Ext. cost",
                        dataField: "extras_cost"
                    },
                    {
                        caption: "Model",
                        dataField: "model_description"
                    },

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



    //----------------------------------add body to deal begin-------------------------------------------------

    /**
     * add deal form body reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetBodyExtAddDealForm = function () {
        $('#addBodyExtForm').validationEngine('hide');
        $('#addBodyExtForm')[0].reset();
        $('#ddslickDealVehicleTypeBodyExt').ddslick("select", { index: '0' });
    }

    /**
     * add vehicle type form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addBodyExtForm").validationEngine();

    /**
     * add deal click event handler
     * @author Mustafa Zeynel Dağlı
     * @todo deal is js lokal değişkenden alınacak
     * */
    $("#add_body_ext").on("click", function (e) {
        e.preventDefault();
        $('#tab_BodyExt').loadImager('removeLoadImage');
        $("#tab_BodyExt").loadImager('appendImage');

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        /* if (dealID == null || dealID == "" || dealID <= 0) {
             wm.warningMessage('resetOnShown');
             wm.warningMessage('show', "Please select deal",
                 "Please select deal");
             $('#tab_Body').loadImager('removeLoadImage');
             return false;
         }*/

        var ddDataVehicleGroups = $('#ddslickVehicleGroupsBodyExt').data('ddslick');
        if (!ddDataVehicleType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select vehicle group"),
                window.lang.translate("Please select vehicle group"));
            $('#tab_BodyExt').loadImager('removeLoadImage');
            return false;
        }

        var ddDataVehicleType = $('#ddslickDealVehicleTypeBodyExt').data('ddslick');
        /*if (!ddDataVehicleType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                window.lang.translate("Please select vehicle type"));
            $('#tab_BodyExt').loadImager('removeLoadImage');
            return false;
        }*/

        var ddDataBodyTypes = $('#ddslickBodyTypesExt').data('ddslick');
        //var ddDataBodyOpt = $('#ddslickBodyOptExt').data('ddslick');
        var ddDataBodyExt = $('#ddslickBodyExtrasExt').data('ddslick');
        var ddDataBodySupplier = $('#ddslickBodySupplierExt').data('ddslick');
        var ddDataBodyDeposit = $('#ddslickBodyDepositExt').data('ddslick');


        var ajax = $('#add_body_ext').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "tab_BodyExt",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Deal/AddBodyExtrasProxyService',
            type: "POST",
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkInsertActExtras_infoprojectaccbody",
                pkIdentity: $("#publicKey").val(),
                project_id: dealID,
                vehicles_group_id: ddDataVehicleGroups.selectedData.value,
                vehicles_endgroup_id: ddDataVehicleType.selectedData.value,
                body_type_id : ddDataBodyTypes.selectedData.value,
                body_supplier_id : ddDataBodySupplier.selectedData.value,
                depozit_type_id : ddDataBodyDeposit.selectedData.value,
                quantity: $("#quantity_bodyExt").val(),
                list_price : $("#price_listBodyExt").val(),
                new_price: $("#price_newBodyExt").val(),
                body_extras_matrix_id: ddDataBodyExt.selectedData.value,
                
            })

        });
        ajax.ajaxCallWidget({
            onReset: function (event, data) {
                resetVehicleTypeAddDealForm();
            },
            onAfterSuccess: function (event, data) {

            }
        })
        ajax.ajaxCallWidget('call');
        return false;
    })

    // add deal reset
    $("#add_body_ext_reset").on("click", function (e) {
        e.preventDefault();
        resetBodyExtAddDealForm();
        return false;
    })

    //----------------------------------add body to deal end-------------------------------------------------



})