$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------

    /**
     * loading image for add vehicle type process
     * */
    $('#tab_VehicleType').loadImager();

    /**
    * ddslick vehicle type dropdown load imager
    * @author Mustafa Zeynel Dağlı
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickVehicleType').loadImager();
    //----------------------------------loadImager end-------------------------------------------------


    /**
     * tab organizer events attached
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $("#deal_hidden").organizeTabs({
        onAftertab_VehicleType: function (e) {

            var dealID = null;
            if ($("#deal_hidden").deal()) {
                dealID = $("#deal_hidden").deal("getDealID");
            }
            /*if (dealID == null || dealID == "" || dealID <= 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', "Please select deal",
                    "Please select deal");
                $('#tab_VehicleType').loadImager('removeLoadImage');
                return false;
            }*/

            //Vehicle type tab form elements begin

            /**
            * ddslick vehicle type dropdown 
            * @author Mustafa Zeynel Dağlı
            * @since 15/08/2018
            */
            $('#loadingImage_DdslickVehicleType').loadImager('removeLoadImage');
            $("#loadingImage_DdslickVehicleType").loadImager('appendImage');
            var ajax_DdslickVehicleType = $('#ajax_DdslickVehicleType').ajaxCallWidget({
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                loadingImageID: "loadingImage_DdslickVehicleType",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkVehiclesEndgroupsCostDdList_sysvehiclesendgroups",
                    pkIdentity: $("#publicKey").val()
                })

            });
            ajax_DdslickVehicleType.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickVehicleType').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                            if (selectedData.selectedData.value > 0) {
                                //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                            }
                        }
                    });
                    $("#loadingImage_DdslickVehicleType").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickVehicleType.ajaxCallWidget('call');

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

                    $.ajax({
                        url: '/DefaultPost/DefaultGridPostModel',
                        dataType: "json",
                        data: JSON.stringify({
                            language_code: $("#langCode").val(),
                            pk: "GsZVzEYe50uGgNM",
                            url: "pkFillProjectVehicleModelsGridx_infoprojectvehiclemodels",
                            pkIdentity: $("#publicKey").val(),
                            project_id: parseInt(dealID),
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
            $("#gridContainer_VehicleTypeDeal").dxDataGrid({
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
                    
                },
                columns: [
                    {
                        //allowGrouping: false,
                        caption: "Name",
                        dataField: "tag_name"
                    },
                    {
                        caption: "Vehicle model",
                        dataField: "vehicle_gt_model_name"
                    },
                    {
                        caption: "Quantity",
                        dataField: "quantity"
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
                                openUpdateVehicleTypePopUp({
                                    tagName: data.tag_name,
                                    delivery_date: data.delivery_date,
                                    quantity: data.quantity,
                                    vehicle_gt_model_id : data.vehicle_gt_model_id,
                                    vehicle_gt_model_name: data.vehicle_gt_model_name,
                                    id : data.id
                                });
                            }).appendTo(container);
                        }
                    }

                ],
                customizeColumns: function (columns) {
                    //columns[5].format = { type: "currency", currency: "EUR" };
                },

            });

        },
       
        
    });

    //----------------------------------add vehicle type to deal begin-------------------------------------------------


    var updateVehicleTypePopUp = function (data) {

    }

    /**
     * add deal form vehicle type reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetVehicleTypeAddDealForm = function () {
        $('#addVehicleTypeForm').validationEngine('hide');
        $('#addVehicleTypeForm')[0].reset();
        $('#ddslickVehicleType').ddslick("select", { index: '0' });
    }

    /**
     * add vehicle type form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addVehicleTypeForm").validationEngine();

    /**
     * add deal click event handler
     * @author Mustafa Zeynel Dağlı
     * @todo deal is js lokal değişkenden alınacak
     * */
    $("#add_vehicleType").on("click", function (e) {
        e.preventDefault();
        $('#tab_VehicleType').loadImager('removeLoadImage');
        $("#tab_VehicleType").loadImager('appendImage');

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        /*if (dealID == null || dealID == "" || dealID <= 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', "Please select deal",
                "Please select deal");
            $('#tab_VehicleType').loadImager('removeLoadImage');
            return false;
        }*/

        var ddDataVehicleType = $('#ddslickVehicleType').data('ddslick');
        if (!ddDataVehicleType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                window.lang.translate("Please select vehicle type"));
            $('#tab_VehicleType').loadImager('removeLoadImage');
            return false;
        }

        //alert(ddDataVehicleType.selectedData.value);
        if ($("#tagcabin_DealVehicles").tagCabin('findSpecificTags', ddDataVehicleType.selectedData.value, 'data-attribute') != true) {
            /*tagBuilderChemicalPropGroup.tagCabin('addTagManuallyDataAttr', selectedItem.value,
                selectedItem.text,*/
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', "Please select another vehicle type",
                "Please select another vehicle type");
            $('#tab_VehicleType').loadImager('removeLoadImage');
            return false;
        }

        var ajax = $('#add_vehicleType').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "tab_VehicleType",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Deal/AddVehicleTypeProxyService',
            type: "POST",
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkInsertAct_infoprojectvehiclemodels",
                pkIdentity: $("#publicKey").val(),
                project_id: parseInt(dealID),
                is_house_deal: 0,
                vehicle_gt_model_id: ddDataVehicleType.selectedData.value,
                quantity: $("#quantity_vehicleType").val(),
                delivery_date: "10/10/2018",
            })

        });
        ajax.ajaxCallWidget({
            onReset: function (event, data) {
                resetVehicleTypeAddDealForm();
            },
            onAfterSuccess: function (event, data) {
                $("#deal_hidden").deal("addVehicleType", { vehicleType: ddDataVehicleType.selectedData.value, count: $("#quantity").val() });
                $("#tagcabin_DealVehicles").tagCabin('addTagManuallyDataAttr', ddDataVehicleType.selectedData.value,
                    ddDataVehicleType.selectedData.text + " / " + $("#quantity_vehicleType").val(),

                );

                /*var tagBuilderChemicalPropGroup = $('#chemical-property-group-cabin').tagCabin({
                    tagCopy: false,
                    tagDeletable: true,
                    tagDeletableAll: false,
                    tagBox: $('.tag-container-chemical-property-group').find('ul'),

                });*/

                console.log($("#deal_hidden").deal("option", "dealID"));
            }
        })
        ajax.ajaxCallWidget('call');
        return false;
    })

    // add deal reset
    $("#add_vehicleType_reset").on("click", function (e) {
        e.preventDefault();
        resetDealAddForm();
        return false;
    })

    //----------------------------------add vehicle type to deal end-------------------------------------------------

    //----------------------------------popup begin-------------------------------------------------

    /**
     * add accessory proposal popup insert wrapper
     * @author Mustafa Zeynel Dağlı
     * @since 17/10/2018
     * */
    window.updateVehicleTypePopupWrapper = function (e) {
        //alert("popup submit click");

        e.preventDefault();
        if ($("#vehiceTypeFormPopup").validationEngine('validate')) {
            $('#loadingImage_UpdateVehicleType').loadImager('removeLoadImage');
            $("#loadingImage_UpdateVehicleType").loadImager('appendImage');

            var dealID = null;
            if ($("#deal_hidden").deal()) {
                dealID = $("#deal_hidden").deal("getDealID");
            }
            /*if (dealID == null || dealID == "" || dealID <= 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', "Please select deal",
                    "Please select deal");
                $('#tab_VehicleType').loadImager('removeLoadImage');
                return false;
            }*/

            var ddDataVehicleType = $('#ddslickVehicleTypePopup').data('ddslick');
            if (!ddDataVehicleType.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                    window.lang.translate("Please select vehicle type"));
                $('#loadingImage_UpdateVehicleType').loadImager('removeLoadImage');
                return false;
            }

            var ajax = $('#update_vehicleTypePoupup').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loadingImage_UpdateVehicleType",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                proxy: '/Deal/AddVehicleTypeProxyService',
                type: "POST",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkUpdateAct_infoprojectvehiclemodels",
                    pkIdentity: $("#publicKey").val(),
                    project_id: parseInt(dealID),
                    vehicle_gt_model_id: ddDataVehicleType.selectedData.value,
                    quantity: $("#quantity_vehicleTypePopup").val(),
                    delivery_date: $("#date_vehicleTypePopup").val(),
                    id: parseInt($("#deal_vehicle_type_id").val())
                })

            });
            ajax.ajaxCallWidget({
                onReset: function (event, data) {
                    //resetVehicleTypeAddDealForm();
                },
                onAfterSuccess: function (event, data) {
                }
            })
            ajax.ajaxCallWidget('call');
            return false;
        }
         else {
            //alert('test mest 2');
        }
        return false;
    }

    /**
     * add accessory proposal popup window opener
     * @author Mustafa Zeynel Dağlı
     * @since 17/10/2018
     * */
    window.openUpdateVehicleTypePopUp = function (data) {
        //console.log(data);
        var rowData = data;
        BootstrapDialog.show({
            title: window.lang.translate("Update"),
            message: function (dialogRef) {
                var dialogRef = dialogRef;
                var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loadingImage_UpdateVehicleType" class="box box-primary">\n\
                                                     <form id="vehiceTypeFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="deal_vehicle_type_id" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Vehicle groups</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group" id="ajax_DdslickVehicleTypePopup">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div id="ddslickVehicleTypePopup"></div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Date</label>\n\
                                                             <div id="loadingImage_DdslickVehicleTypePopup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <input id="date_vehicleTypePopup" class="datepicker form-control" data-date-format="mm/dd/yyyy">\n\
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
                                                                     <input id="quantity_vehicleTypePopup" type="text" class="form-control" placeholder="total count">\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="update_vehicleTypePoupup" class="btn btn-primary" type="button" onclick="return updateVehicleTypePopupWrapper(event);" >\n\
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
                $('#vehicleTypeFormPopup').validationEngine();
                $('#loadingImage_UpdateVehicleType').loadImager();
                $('#loadingImage_DdslickVehicleTypePopup').loadImager();

                // vehicle type date picker
                $('#date_vehicleTypePopup').datepicker({
                    format: 'mm/dd/yyyy',
                    startDate: '-1d'
                });

                $('#date_vehicleTypePopup').val(data.delivery_date);
                $("#quantity_vehicleTypePopup").val(data.quantity);
                $("#deal_vehicle_type_id").val(rowData.id);

                /**
                * ddslick vehicle type dropdown 
                * @author Mustafa Zeynel Dağlı
                * @since 15/08/2018
                */
                $('#loadingImage_DdslickVehicleTypePopup').loadImager('removeLoadImage');
                $("#loadingImage_DdslickVehicleTypePopup").loadImager('appendImage');
                var ajax_DdslickVehicleType = $('#ajax_DdslickVehicleTypePopup').ajaxCallWidget({
                    proxy: '/DefaultPost/DefaultPostModel',
                    type: "POST",
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    noDataFailureText: window.lang.translate("No data returned from service"),
                    loadingImageID: "loadingImage_DdslickVehicleTypePopup",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkVehiclesEndgroupsCostDdList_sysvehiclesendgroups",
                        pkIdentity: $("#publicKey").val()
                    })

                });
                ajax_DdslickVehicleType.ajaxCallWidget({
                    onSuccess: function (event, data) {
                        var data = $.parseJSON(data);
                        data.splice(0, 0,
                            { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                        );
                        $('#ddslickVehicleTypePopup').ddslick({
                            //height: 150,
                            data: data,
                            width: '100%',
                            onSelected: function (selectedData) {
                                if (selectedData.selectedData.value > 0) {
                                    //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                                }
                            }
                        });
                        $('#ddslickVehicleTypePopup').ddslick('selectByValue',
                            {
                                index: parseInt(rowData.vehicle_gt_model_id) ,
                                text: '' + rowData.vehicle_gt_model_name + ''
                            }
                        );
                        
                        $("#loadingImage_DdslickVehicleTypePopup").loadImager('removeLoadImage');
                    },
                    onAfterSuccess: function (event, data) {
                        alert('onafter succ');
                        $('#ddslickVehicleTypePopup').ddslick('selectByValue',
                            {
                                index: '' + data.vehicle_gt_model_id + '',
                                text: '' + data.vehicle_gt_model_name + ''
                            }
                        );
                    },
                })
                ajax_DdslickVehicleType.ajaxCallWidget('call');

                //----------------------------------dropdowns end-------------------------------------------------

            },
        });
    }

    //----------------------------------popup end-------------------------------------------------


});