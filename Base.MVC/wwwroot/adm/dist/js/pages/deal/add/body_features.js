﻿$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------
    $('#tab_BodyFea').loadImager();
    $('#loadingImage_DdslickVehicleGroupsBodyFea').loadImager();
    /**
    * ddslick vehicle type dropdown(buyback) load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickDealVehicleTypeBodyFea').loadImager();
    $("#loadingImage_DdslickBodyTypesFea").loadImager();
    //$("#loadingImage_DdslickBodyOptFea").loadImager();
    $('#loadingImage_DdslickBodyFeaturesFea').loadImager();
    $('#loadingImage_DdslickBodySupplierFea').loadImager();
    $('#loadingImage_DdslickBodyDepositFea').loadImager();
    //----------------------------------loadImager end-------------------------------------------------


    /**
     * tab organizer events attached
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $("#deal_hidden").organizeTabs({
        onAftertab_BodyFea: function (e) {


            //----------------------------------dropdowns begin-------------------------------------------------

            /**
            * ddslick vehicle groups (body) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 16/10/2018
            */
            $('#loadingImage_DdslickVehicleGroupsBodyFea').loadImager('removeLoadImage');
            $("#loadingImage_DdslickVehicleGroupsBodyFea").loadImager('appendImage');
            //var selectedContTerrainTypeBuyBack = false;
            var ajax_DdslickVehicleGroupsAksesuar = $('#ajax_DdslickVehicleGroupsBodyFea').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickVehicleGroupsBodyFea",
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
                    $('#ddslickVehicleGroupsBodyFea').ddslick({
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
                    $("#loadingImage_DdslickVehicleGroupsBodyFea").loadImager('removeLoadImage');
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
            $('#loadingImage_DdslickDealVehicleTypeBodyFea').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeBodyFea").loadImager('appendImage');
            //var selectedContRepMainBuyBack = false;
            $('#ddslickDealVehicleTypeBodyFea').ddslick({
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
            $("#loadingImage_DdslickDealVehicleTypeBodyFea").loadImager('removeLoadImage');


            $('#loadingImage_DdslickDealVehicleTypeBodyFea').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeBodyFea").loadImager('appendImage');
            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {

                var vehicleTypes = $("#deal_hidden").deal("getVehicleTypes");
                /*if (vehicleTypes.length == 0) {

                    $(window).warningMessage('resetOnShown');
                    $(window).warningMessage('show', window.lang.translate("You must add at least one vehicle type to deal"),
                        window.lang.translate("You must add at least one vehicle type to deal"));
                    return false;
                }*/

                var ajax_DdslickVehicleTypeBuyBack = $('#ajax_DdslickDealVehicleTypeBodyFea').ajaxCallWidget({
                    proxy: '/Deal/DdslickGetDealVehicleTypeProxyService/',
                    transactionFailureText: window.lang.translate("Service URL not found, please report error(pkProjectVehicleModelsTradeDdList_infoprojectbuybacks)"),
                    noDataFailureText: window.lang.translate("No data returned from service(pkProjectVehicleModelsTradeDdList_infoprojectbuybacks)"),
                    loadingImageID: "loadingImage_DdslickDealVehicleTypeBodyFea",
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
                        $("#ddslickDealVehicleTypeBodyFea").ddslick('destroy');
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickDealVehicleTypeBodyFea').ddslick({
                            data: data,
                            width: '100%',
                            onSelected: function (selectedData) {
                                /*if (selectedContVehicleTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                                selectedContVehicleTypeBuyBack = true;
                                if (selectedData.selectedData.value > 0) {
                                }*/
                            }
                        });
                        $("#loadingImage_DdslickDealVehicleTypeBodyFea").loadImager('removeLoadImage');

                    },
                });
                ajax_DdslickVehicleTypeBuyBack.ajaxCallWidget('call');
            } else {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select deal"),
                    window.lang.translate("Please select deal"));
                $('#loadingImage_DdslickDealVehicleTypeBodyFea').loadImager('removeLoadImage');
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
            $('#loadingImage_DdslickBodyTypesFea').loadImager('removeLoadImage');
            $("#loadingImage_DdslickBodyTypesFea").loadImager('appendImage');
            var ajax_DdslickS = $('#ajax_DdslickBodyTypesFea').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                transactionFailureText: window.lang.translate("Service URL not found, please report error(pkBodyFeatureTypesDdList_sysaccbodytypes)"),
                noDataFailureText: window.lang.translate("No data returned from service(pkBodyFeatureTypesDdList_sysaccbodytypes)"),
                loadingImageID: "loadingImage_DdslickBodyTypesFea",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkBodyFeatureTypesDdList_sysaccbodytypes",
                    pkIdentity: $("#publicKey").val(),
                    supplier_id : 1
                })

            });
            ajax_DdslickS.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );

                    $('#ddslickBodyTypesFea').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                            if (selectedData.selectedData.value > 0) {
                                $('#ddslickBodyDepositFea').ddslick('destroy');
                                $('#loadingImage_DdslickBodyDepositFea').loadImager('removeLoadImage');
                                $("#loadingImage_DdslickBodyDepositFea").loadImager('appendImage');
                                var ajax_DdslickS = $('#ajax_DdslickBodyDepositFea').ajaxCallWidget({
                                    proxy: '/DefaultPost/DefaultPostModel',
                                    type: "POST",
                                    transactionFailureText: window.lang.translate("Service URL not found, please report error(pkDepositTypesDdList_sysprojectdeposittypes)"),
                                    noDataFailureText: window.lang.translate("No data returned from service(pkDepositTypesDdList_sysprojectdeposittypes)"),
                                    loadingImageID: "loadingImage_DdslickBodyDepositFea",
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

                                        $('#ddslickBodyDepositFea').ddslick({
                                            //height: 150,
                                            data: data,
                                            width: '100%',
                                        });

                                        $("#loadingImage_DdslickBodyDepositFea").loadImager('removeLoadImage');
                                    },
                                })
                                ajax_DdslickS.ajaxCallWidget('call');
                                //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                            }
                        }
                    });

                    $("#loadingImage_DdslickBodyTypesFea").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickS.ajaxCallWidget('call');

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
           /* $('#loadingImage_DdslickBodyOptFea').loadImager('removeLoadImage');
            $("#loadingImage_DdslickBodyOptFea").loadImager('appendImage');
            var ajax_DdslickS = $('#ajax_DdslickBodyOptFea').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                loadingImageID: "loadingImage_DdslickBodyOptFea",
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

                    $('#ddslickBodyOptFea').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                    });

                    $("#loadingImage_DdslickBodyOptFea").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickS.ajaxCallWidget('call');*/

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
            $('#loadingImage_DdslickBodyFeaturesFea').loadImager('removeLoadImage');
            $("#loadingImage_DdslickBodyFeaturesFea").loadImager('appendImage');
            var ajax_DdslickS = $('#ajax_DdslickBodyFeaturesFea').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                transactionFailureText: window.lang.translate("Service URL not found, please report error(pkAccBodyFeatureDdList_sysaccbodymatrix)"),
                noDataFailureText: window.lang.translate("No data returned from service(pkAccBodyFeatureDdList_sysaccbodymatrix)"),
                loadingImageID: "loadingImage_DdslickBodyFeaturesFea",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkAccBodyFeatureDdList_sysaccbodymatrix",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickS.ajaxCallWidget({
                onSuccess: function (event, data) {
                    //alert('data length>0');
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );

                    $('#ddslickBodyFeaturesFea').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                    });
                    $("#loadingImage_DdslickBodyFeaturesFea").loadImager('removeLoadImage');
                },
                onErrorDataNull: function (event, data) {
                    //alert('data length==0');
                    var defaultData = [
                        {
                            text: 'Please select',
                            value: 0,
                            selected: true
                        },
                    ]
                    $('#ddslickBodyFeaturesFea').ddslick({
                        //height: 150,
                        data: defaultData,
                        width: '100%',
                    });
                    $("#loadingImage_DdslickBodyFeaturesFea").loadImager('removeLoadImage');
                }
                
            })
            ajax_DdslickS.ajaxCallWidget('call');


            $('#loadingImage_DdslickBodySupplierFea').loadImager('removeLoadImage');
            $("#loadingImage_DdslickBodySupplierFea").loadImager('appendImage');
            var ajax_DdslickS = $('#ajax_DdslickBodySupplierFea').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                transactionFailureText: window.lang.translate("Service URL not found, please report error(pkSupplierLongDdList_syssupplier)"),
                noDataFailureText: window.lang.translate("No data returned from service(pkSupplierLongDdList_syssupplier)"),
                loadingImageID: "loadingImage_DdslickBodySupplierFea",
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

                    $('#ddslickBodySupplierFea').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                            if (selectedData.selectedData.value > 0) {
                                $('#ddslickBodyFeaturesFea').ddslick('destroy');
                                $('#loadingImage_DdslickBodyFeaturesFea').loadImager('removeLoadImage');
                                $("#loadingImage_DdslickBodyFeaturesFea").loadImager('appendImage');
                                var ajax_DdslickS = $('#ajax_DdslickBodyFeaturesFea').ajaxCallWidget({
                                    proxy: '/DefaultPost/DefaultPostModel',
                                    type: "POST",
                                    transactionFailureText: window.lang.translate("Service URL not found, please report error(pkAccBodyFeatureDdList_sysaccbodymatrix)"),
                                    noDataFailureText: window.lang.translate("No data returned from service(pkAccBodyFeatureDdList_sysaccbodymatrix)"),
                                    loadingImageID: "loadingImage_DdslickBodyFeaturesFea",
                                    data: JSON.stringify({
                                        language_code: $("#langCode").val(),
                                        pk: "GsZVzEYe50uGgNM",
                                        url: "pkAccBodyFeatureDdList_sysaccbodymatrix",
                                        pkIdentity: $("#publicKey").val(),
                                        supplier_id: selectedData.selectedData.value
                                    })

                                });
                                ajax_DdslickS.ajaxCallWidget({
                                    onSuccess: function (event, data) {
                                        //alert('data length>0');
                                        var data = $.parseJSON(data);
                                        data.splice(0, 0,
                                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                        );

                                        $('#ddslickBodyFeaturesFea').ddslick({
                                            //height: 150,
                                            data: data,
                                            width: '100%',
                                        });
                                        $("#loadingImage_DdslickBodyFeaturesFea").loadImager('removeLoadImage');
                                    },
                                    onErrorDataNull: function (event, data) {
                                        //alert('data length==0');
                                        var defaultData = [
                                            {
                                                text: 'Please select',
                                                value: 0,
                                                selected: true
                                            },
                                        ]
                                        $('#ddslickBodyFeaturesFea').ddslick({
                                            //height: 150,
                                            data: defaultData,
                                            width: '100%',
                                        });
                                        $("#loadingImage_DdslickBodyFeaturesFea").loadImager('removeLoadImage');
                                    }

                                })
                                ajax_DdslickS.ajaxCallWidget('call');
                            }
                        }
                    });

                    $("#loadingImage_DdslickBodySupplierFea").loadImager('removeLoadImage');
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
            $('#loadingImage_DdslickBodyDepositFea').loadImager('removeLoadImage');
            $("#loadingImage_DdslickBodyDepositFea").loadImager('appendImage');
            var ajax_DdslickS = $('#ajax_DdslickBodyDepositFea').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                transactionFailureText: window.lang.translate("Service URL not found, please report error(pkDepositTypesDdList_sysprojectdeposittypes)"),
                noDataFailureText: window.lang.translate("No data returned from service(pkDepositTypesDdList_sysprojectdeposittypes)"),
                loadingImageID: "loadingImage_DdslickBodyDepositFea",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDepositTypesDdList_sysprojectdeposittypes",
                    pkIdentity: $("#publicKey").val(),
                    acc_body_types_id: 5
                })

            });
            ajax_DdslickS.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );

                    $('#ddslickBodyDepositFea').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                    });

                    $("#loadingImage_DdslickBodyDepositFea").loadImager('removeLoadImage');
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
                        transactionFailureText: window.lang.translate("Service URL not found, please report error(pkVehicleGroupsDdList_sysvehiclegroups)"),
                        noDataFailureText: window.lang.translate("No data returned from service(pkVehicleGroupsDdList_sysvehiclegroups)"),
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
                            url: "pkFillProjectVehicleBodyFeatureGridx_infoprojectaccbody",
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
            $("#gridContainer_BodyFea").dxDataGrid({
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
                        caption: "Vehicle",
                        dataField: "vehicle_description"
                    },
                    {
                        caption: "Supplier",
                        dataField: "supplier_name"
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

        },

    });


    //----------------------------------add body to deal begin-------------------------------------------------

    /**
     * add deal form body reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetBodyFeaAddDealForm = function () {
        $('#addBodyFeaForm').validationEngine('hide');
        $('#addBodyFeaForm')[0].reset();
        $('#ddslickDealVehicleTypeBodyFea').ddslick("select", { index: '0' });
        $('#ddslickVehicleGroupsBodyFea').ddslick("select", { index: '0' });
        $('#ddslickBodyDepositFea').ddslick("select", { index: '0' });
        $('#ddslickBodySupplierFea').ddslick("select", { index: '0' });
        $('#ddslickBodyTypesFea').ddslick("select", { index: '0' });
    }

    /**
     * add vehicle type form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addBodyFeaForm").validationEngine();

    /**
     * add deal click event handler
     * @author Mustafa Zeynel Dağlı
     * @todo deal is js lokal değişkenden alınacak
     * */
    $("#add_body_fea").on("click", function (e) {
        e.preventDefault();
        $('#tab_BodyFea').loadImager('removeLoadImage');
        $("#tab_BodyFea").loadImager('appendImage');

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

        var ddDataVehicleGroups = $('#ddslickVehicleGroupsBodyFea').data('ddslick');
        if (!ddDataVehicleGroups.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select vehicle group"),
                window.lang.translate("Please select vehicle group"));
            $('#tab_BodyFea').loadImager('removeLoadImage');
            return false;
        }

        var ddDataVehicleType = $('#ddslickDealVehicleTypeBodyFea').data('ddslick');
        /*if (!ddDataVehicleType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                window.lang.translate("Please select vehicle type"));
            $('#tab_BodyFea').loadImager('removeLoadImage');
            return false;
        }*/

        var ddDataBodyTypes = $('#ddslickBodyTypesFea').data('ddslick');
        var ddDataBodyOpt = $('#ddslickBodyOptFea').data('ddslick');
        var ddDataBodyExt = $('#ddslickBodyFeaturesFea').data('ddslick');
        var ddDataBodySupplier = $('#ddslickBodySupplierFea').data('ddslick');
        var ddDataBodyDeposit = $('#ddslickBodyDepositFea').data('ddslick');

        var ajax = $('#add_body_fea').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "tab_BodyFea",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error(pkInsertActFeatures_infoprojectaccbody)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data(pkInsertActFeatures_infoprojectaccbody)"),
            proxy: '/Deal/AddBodyExtrasProxyService',
            type: "POST",
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkInsertActFeatures_infoprojectaccbody",
                pkIdentity: $("#publicKey").val(),
                project_id: dealID,
                vehicles_group_id: ddDataVehicleGroups.selectedData.value,
                vehicles_endgroup_id: ddDataVehicleType.selectedData.value,
                body_type_id: ddDataBodyTypes.selectedData.value,
                body_supplier_id: ddDataBodySupplier.selectedData.value,
                depozit_type_id: ddDataBodyDeposit.selectedData.value,
                quantity: $("#quantity_bodyFea").val(),
                list_price: $("#price_listBodyFea").val(),
                new_price: $("#price_newBodyFea").val(),
                body_features_matrix_id: ddDataBodyExt.selectedData.value,
            })

        });
        ajax.ajaxCallWidget({
            onReset: function (event, data) {
                resetBodyFeaAddDealForm();
            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_BodyFea").dxDataGrid('instance').refresh();
            }
        })
        ajax.ajaxCallWidget('call');
        return false;
    })

    // add deal reset
    $("#add_body_fea_reset").on("click", function (e) {
        e.preventDefault();
        resetBodyFeaAddDealForm();
        return false;
    })

    //----------------------------------add body to deal end-------------------------------------------------


})