$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------
    $('#tab_Aksesuar').loadImager();
    $('#loadingImage_DdslickVehicleGroupsRM').loadImager();
    $('#loadingImage_DdslickVehicleTypeRM').loadImager();
    $('#loadingImage_DdslickDealVehicleTypeRM').loadImager();
    $('#loadingImage_DdslickRMType').loadImager();
    $('#loadingImage_DdslickRMTime').loadImager();
    $('#loadingImage_DdslickRMKm').loadImager();
    

    //----------------------------------loadImager end-------------------------------------------------

   


    /**
     * tab organizer events attached
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $("#deal_hidden").organizeTabs({
        onAftertab_RM: function (e) {

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
            $("#gridContainer_DealRM").dxDataGrid({
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
            $("#gridContainer_RM").dxDataGrid({
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
                        caption: "Vehicle group",
                        dataField: "vehicle_group"
                    },
                    {
                        caption: "Maint.",
                        dataField: "ismaintenance"
                    },
                    {
                        caption: "Config",
                        dataField: "vehicle_config_name"
                    },
                    {
                        caption: "Group name",
                        dataField: "vehicle_group_name"
                    },
                    {
                        caption: "Type",
                        dataField: "warranty_type_name"
                    },

                ],
                customizeColumns: function (columns) {
                    //columns[5].format = { type: "currency", currency: "EUR" };
                },


            });

            //----------------------------------grid end-------------------------------------------------


            $('#loadingImage_DdslickDealVehicleTypeRM').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeRM").loadImager('appendImage');
            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {

                /*var vehicleTypes = $("#deal_hidden").deal("getVehicleTypes");
                if (vehicleTypes.length == 0) {
                    $(window).warningMessage('resetOnShown');
                    $(window).warningMessage('show', window.lang.translate("You must add at least one vehicle type to deal"),
                        window.lang.translate("You must add at least one vehicle type to deal"));
                    return false;
                }*/

                var ajax_DdslickVehicleTypeAksesuar = $('#ajax_DdslickDealVehicleTypeRM').ajaxCallWidget({
                    proxy: '/Deal/DdslickGetDealVehicleTypeProxyService/',
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    noDataFailureText: window.lang.translate("No data returned from service"),
                    loadingImageID: "loadingImage_DdslickDealVehicleTypeRM",
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
                        $("#ddslickDealVehicleTypeRM").ddslick('destroy');
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickDealVehicleTypeRM').ddslick({
                            data: data,
                            width: '100%',
                            onSelected: function (selectedData) {
                            }
                        });
                        $("#loadingImage_DdslickDealVehicleTypeRM").loadImager('removeLoadImage');

                    },
                });
                ajax_DdslickVehicleTypeAksesuar.ajaxCallWidget('call');
            } else {
                /*$('#tab_BuyBack').loadImager('removeLoadImage');
                $('#tab_BuyBack').loadImager('appendImage');*/

                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select deal"),
                    window.lang.translate("Please select deal"));
                $('#loadingImage_DdslickDealVehicleTypeRM').loadImager('removeLoadImage');
            }

            //----------------------------------dropdowns begin-------------------------------------------------

            /**
            * ddslick vehicle groups (body) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 16/10/2018
            */
            $('#loadingImage_DdslickVehicleGroupsRM').loadImager('removeLoadImage');
            $("#loadingImage_DdslickVehicleGroupsRM").loadImager('appendImage');
            var ajax_DdslickVehicleGroupsAksesuar = $('#ajax_DdslickVehicleGroupsRM').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickVehicleGroupsRM",
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
                    $('#ddslickVehicleGroupsRM').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                        }
                    });

                    $("#loadingImage_DdslickVehicleGroupsRM").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickVehicleGroupsAksesuar.ajaxCallWidget('call');


            /**
            * ddslick vehicle groups (body) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 16/10/2018
            */
            $('#loadingImage_DdslickVehicleTypeRM').loadImager('removeLoadImage');
            $("#loadingImage_DdslickVehicleTypeRM").loadImager('appendImage');
            var ajax_Ddslick2 = $('#ajax_DdslickVehicleTypeRM').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickVehicleTypeRM",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkVehicleGroupsDdList_sysvehiclegroups",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_Ddslick2.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickVehicleTypeRM').ddslick({
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                        }
                    });

                    $("#loadingImage_DdslickVehicleTypeRM").loadImager('removeLoadImage');
                },
            })
            ajax_Ddslick2.ajaxCallWidget('call');

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
            $('#loadingImage_DdslickDealVehicleTypeRM').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeRM").loadImager('appendImage');
            $('#ddslickDealVehicleTypeRM').ddslick({
                data: ddslickDealVehicleTypeAksesuarData,
                width: '100%',
                onSelected: function (selectedData) {
                }
            });
            $("#loadingImage_DdslickDealVehicleTypeRM").loadImager('removeLoadImage');


            /**
            * ddslick vehicle groups (body) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 16/10/2018
            */
            $('#loadingImage_DdslickRMType').loadImager('removeLoadImage');
            $("#loadingImage_DdslickRMType").loadImager('appendImage');
            var ajax_Ddslick3 = $('#ajax_DdslickRMType').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickRMType",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkVehicleGroupsDdList_sysvehiclegroups",
                    pkIdentity: $("#publicKey").val()
                })
            });
            ajax_Ddslick3.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickRMType').ddslick({
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                        }
                    });
                    $("#loadingImage_DdslickRMType").loadImager('removeLoadImage');
                },
            })
            ajax_Ddslick3.ajaxCallWidget('call');

            /**
            * ddslick vehicle groups (body) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 16/10/2018
            */
            $('#loadingImage_DdslickRMKm').loadImager('removeLoadImage');
            $("#loadingImage_DdslickRMKm").loadImager('appendImage');
            var ajax_Ddslick4 = $('#ajax_DdslickRMKm').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickRMKm",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkMileagesWarrantyDdList_sysmileages",
                    pkIdentity: $("#publicKey").val()
                })
            });
            ajax_Ddslick4.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickRMKm').ddslick({
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                        }
                    });
                    $("#loadingImage_DdslickRMKm").loadImager('removeLoadImage');
                },
            })
            ajax_Ddslick4.ajaxCallWidget('call');


            /**
            * ddslick vehicle groups (body) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 16/10/2018
            */
            $('#loadingImage_DdslickRMTime').loadImager('removeLoadImage');
            $("#loadingImage_DdslickRMTime").loadImager('appendImage');
            var ajax_Ddslick5 = $('#ajax_DdslickRMTime').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickRMTime",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkRmMonthsDdList_sysmonths",
                    pkIdentity: $("#publicKey").val()
                })
            });
            ajax_Ddslick5.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickRMTime').ddslick({
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                        }
                    });

                    $("#loadingImage_DdslickRMTime").loadImager('removeLoadImage');
                },
            })
            ajax_Ddslick5.ajaxCallWidget('call');

    //----------------------------------dropdowns end-------------------------------------------------


        },
        
    });

    //----------------------------------add aksesuar to deal begin-------------------------------------------------

    /**
     * loading image for add vehicle type process
     * */
    $('#tab_RM').loadImager();

    /**
     * add deal form body reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetAksesuarAddDealForm = function () {
        $('#addRMForm').validationEngine('hide');
        $('#addRMForm')[0].reset();
    }

    /**
     * add vehicle type form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addRMForm").validationEngine();


    /**
     * add accessory proposal click event
     * @author Mustafa Zeynel Dağlı
     * */
    /*$("#add_aksesuar_proposal").on("click", function (e) {
        alert("click found");
        //window.addProposalAksesuarPopUp();
        e.preventDefault();
        return false;
    })*/

    /*$("#add_aksesuar_proposal").click(function (e) {
        alert("click found");
        window.addProposalAksesuarPopUp();
        //e.preventDefault();
        //return false;
    })*/


    /**
     * add aksesuar click event handler
     * @author Mustafa Zeynel Dağlı
     * */
    $("#add_rm").on("click", function (e) {
        e.preventDefault();
        $('#tab_Aksesuar').loadImager('removeLoadImage');
        $("#tab_Aksesuar").loadImager('appendImage');

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        if (dealID == null || dealID == "" || dealID <= 0) {
            $(window).warningMessage('resetOnShown');
            $(window).warningMessage('show', "Please select deal",
                "Please select deal");
            $('#tab_Aksesuar').loadImager('removeLoadImage');
            return false;
        }

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
    $("#add_rm_reset").on("click", function (e) {
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
    window.addRMProposalPopupWrapper = function (e) {
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
    window.openAddProposalRMPopUp = function () {
        BootstrapDialog.show({
            title: window.lang.translate("Add proposal"),
            message: function (dialogRef) {
                var dialogRef = dialogRef;
                var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loadingImage_AddRMProposal" class="box box-primary">\n\
                                                     <form id="rmProposalForm" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Vehicle groups</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div id="ddslickVehicleGroupsRMPopup"></div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Vehicle type</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                    <div id="ddslickDealVehicleTypeRMPopup"></div>\n\
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
                                                                     <input id="quantity_RMPopup" type="text" class="form-control validate[required]" placeholder="Quantity">\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Month</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div id="ddslickRMTimePopup"></div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Km</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div id="ddslickRMKmPopup"></div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Km</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <input type="file" class="form-control " id="file" name="file"  />\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="add_aksesuar_proposal" class="btn btn-primary" type="button" onclick="return addRMProposalPopupWrapper(event);" >\n\
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
                $('#rmProposalForm').validationEngine();
                $('#loadingImage_AddRMProposal').loadImager();


                /**
            * ddslick vehicle groups (body) dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 16/10/2018
            */
               /* $('#loadingImage_DdslickVehicleGroupsRM').loadImager('removeLoadImage');
                $("#loadingImage_DdslickVehicleGroupsRM").loadImager('appendImage');*/
                var ajax_DdslickVehicleGroupsAksesuar = $('#ajax_DdslickVehicleGroupsRM').ajaxCallWidget({
                    proxy: '/DefaultPost/DefaultPostModel',
                    type: "POST",
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_DdslickVehicleGroupsRM",
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
                        $('#ddslickVehicleGroupsRMPopup').ddslick({
                            //height: 150,
                            data: data,
                            width: '100%',
                            onSelected: function (selectedData) {
                            }
                        });

                       // $("#loadingImage_DdslickVehicleGroupsRM").loadImager('removeLoadImage');
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
                    /*$('#loadingImage_DdslickDealVehicleTypeRM').loadImager('removeLoadImage');
                    $("#loadingImage_DdslickDealVehicleTypeRM").loadImager('appendImage');*/
                    $('#ddslickDealVehicleTypeRMPopup').ddslick({
                        data: ddslickDealVehicleTypeAksesuarData,
                        width: '100%',
                        onSelected: function (selectedData) {
                        }
                    });
                    //$("#loadingImage_DdslickDealVehicleTypeRM").loadImager('removeLoadImage');


                /**
                * ddslick vehicle groups (body) dropdown 
                * @author Mustafa Zeynel Dağlı
                * @since 16/10/2018
                */
                    /*$('#loadingImage_DdslickRMKm').loadImager('removeLoadImage');
                    $("#loadingImage_DdslickRMKm").loadImager('appendImage');*/
                    var ajax_Ddslick4 = $('#ajax_DdslickRMKm').ajaxCallWidget({
                        proxy: '/DefaultPost/DefaultPostModel',
                        type: "POST",
                        failureLoadImage: true,
                        //loadingImageID: "loadingImage_DdslickRMKm",
                        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                        noDataFailureText: window.lang.translate("No data returned from service"),
                        data: JSON.stringify({
                            language_code: $("#langCode").val(),
                            pk: "GsZVzEYe50uGgNM",
                            url: "pkMileagesWarrantyDdList_sysmileages",
                            pkIdentity: $("#publicKey").val()
                        })
                    });
                    ajax_Ddslick4.ajaxCallWidget({
                        onSuccess: function (event, data) {
                            var data = $.parseJSON(data);
                            data.splice(0, 0,
                                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                            );
                            $('#ddslickRMKmPopup').ddslick({
                                data: data,
                                width: '100%',
                                onSelected: function (selectedData) {
                                }
                            });

                            //$("#loadingImage_DdslickRMKm").loadImager('removeLoadImage');
                        },
                    })
                    ajax_Ddslick4.ajaxCallWidget('call');


                /**
                * ddslick vehicle groups (body) dropdown 
                * @author Mustafa Zeynel Dağlı
                * @since 16/10/2018
                */
                   /* $('#loadingImage_DdslickRMTime').loadImager('removeLoadImage');
                    $("#loadingImage_DdslickRMTime").loadImager('appendImage');*/
                    var ajax_Ddslick5 = $('#ajax_DdslickRMTime').ajaxCallWidget({
                        proxy: '/DefaultPost/DefaultPostModel',
                        type: "POST",
                        failureLoadImage: true,
                        //loadingImageID: "loadingImage_DdslickRMTime",
                        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                        noDataFailureText: window.lang.translate("No data returned from service"),
                        data: JSON.stringify({
                            language_code: $("#langCode").val(),
                            pk: "GsZVzEYe50uGgNM",
                            url: "pkRmMonthsDdList_sysmonths",
                            pkIdentity: $("#publicKey").val()
                        })
                    });
                    ajax_Ddslick5.ajaxCallWidget({
                        onSuccess: function (event, data) {
                            var data = $.parseJSON(data);
                            data.splice(0, 0,
                                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                            );
                            $('#ddslickRMTimePopup').ddslick({
                                data: data,
                                width: '100%',
                                onSelected: function (selectedData) {
                                }
                            });

                            //$("#loadingImage_DdslickRMTime").loadImager('removeLoadImage');
                        },
                    })
                    ajax_Ddslick5.ajaxCallWidget('call');

    //----------------------------------dropdowns end-------------------------------------------------

            },
        });
    }

    //----------------------------------popup end-------------------------------------------------

});