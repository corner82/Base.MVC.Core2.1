
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'Ýþleme devam et'
    });


    /*
    * warranty LoadImager
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */
    //to warranty form
    $("#loading-image-warranty").loadImager();
    $("#loading-image-warrantyName").loadImager();
    $("#loading-image-modelName").loadImager();

    //to model form
    $("#loading-image-model").loadImager();
    $("#loading-image-vhModel").loadImager();
    $("#loading-image-wrName").loadImager();
    $("#loading-image-wrType").loadImager();
    $("#loading-image-wrMil").loadImager();
    $("#loading-image-wrMonth").loadImager();
    $("#loading-image-rm").loadImager();

    //to warranty form grid loading-image
    $("#loading-image-warrantyGrid").loadImager();
    $("#loading-image-warrantyNameGrid").loadImager();

    var UniqueCode = "";
    var VhType = "";
    var Model = "";
    var ModelId = "";
    var Mil1 = "";
    var Mil2 = "";
    var WrType = "";
    var WrRM = "";
    var VhTypeId = ""; 

    var langCode = $("#langCode").val();
   

    var tabOrganizer = $("#warranty_tab").organizeTabs({ tabID: "warranty_tab" });

    $("#warranty_tab").organizeTabs('disableAllTabs');


    $('#warrantyForm').validationEngine();
    $('#warrantyNameForm').validationEngine();

    var cbdataWrRM = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 3,
            selected: true
        },
        {
            text: "Yes",
            value: 1,
            selected: false
        },
        {
            text: "No",
            value: 0,
            selected: false
        },
    ];

    //model
    $('#loading-image-modelName').loadImager('removeLoadImage');
    $("#loading-image-modelName").loadImager('appendImage');

    var ajaxACLResources_modelName = $('#ajaxACL-modelName').ajaxCallWidget({
        proxy: '/Warranty/SysVehicleGroups',
        type: 'POST'
    });

    ajaxACLResources_modelName.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-modelName').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
        },
        onSuccess: function (event, cbdata_vehicletype) {
            //var data = $.parseJSON(cbdata);
            var cbdata = $.parseJSON(cbdata_vehicletype);
            cbdata.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownModelName').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }

            });

            $("#loading-image-modelName").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-modelName').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('model bulunamamýþtýr...'), window.lang.translate('model  bulunamamýþtýr...'));
        },
    })
    ajaxACLResources_modelName.ajaxCallWidget('call');
//Model End

    //Vh model
    $('#loading-image-vhModel').loadImager('removeLoadImage');
    $("#loading-image-vhModel").loadImager('appendImage');

    var ajaxACLResources_vhModel = $('#ajaxACL-vhModel').ajaxCallWidget({
        proxy: '/Warranty/SysVehicleConfigTypes',
        type: 'POST'
    });

    ajaxACLResources_vhModel.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vhModel').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
        },
        onSuccess: function (event, cbdata_vehicleModel) {
            //var data = $.parseJSON(cbdata);
            var cbdataVm = $.parseJSON(cbdata_vehicleModel);
            cbdataVm.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownVhModel').ddslick({
                //height: 150,
                data: cbdataVm,
                width: '100%',

                 onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        Model = selectedData.selectedData.text;
                        
                    }
                    else {
                        Model = "";
                    }
                     document.getElementById("txt-wrUnique-name").value = VhType + Model + Mil1 + Mil2 + WrType + WrRM;
                }
            });

            $("#loading-image-vhModel").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vhModel').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('whModel bulunamamýþtýr...'), window.lang.translate('whModel  bulunamamýþtýr...'));
        },
    })
    ajaxACLResources_vhModel.ajaxCallWidget('call');


    //wrType
    $('#loading-image-wrType').loadImager('removeLoadImage');
    $("#loading-image-wrType").loadImager('appendImage');

    var ajaxACLResources_wrType = $('#ajaxACL-wrType').ajaxCallWidget({
        proxy: '/Warranty/SysWarrantyTypes',
        type: 'POST'
    });

    ajaxACLResources_wrType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-wrType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...' ), window.lang.translate('Servis  bulunamamýþtýr...'));
        },
        onSuccess: function (event, cbdata_wrType) {
            //var data = $.parseJSON(cbdata);
            var cbdataWrType = $.parseJSON(cbdata_wrType);
            cbdataWrType.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownWrType').ddslick({
                //height: 150,
                data: cbdataWrType,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        WrType = selectedData.selectedData.text;
                    }
                    else {
                        WrType = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = VhType + Model + Mil1 + Mil2 + WrType + WrRM;
                }
            });

            $("#loading-image-wrType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-wrType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('wrName bulunamamýþtýr...'), window.lang.translate('wrName  bulunamamýþtýr...'));
        },
    })
    ajaxACLResources_wrType.ajaxCallWidget('call');
//wrType End

    //wrMil
    $('#loading-image-wrMil').loadImager('removeLoadImage');
    $("#loading-image-wrMil").loadImager('appendImage');

    var ajaxACLResources_wrMil = $('#ajaxACL-wrMil').ajaxCallWidget({
        proxy: '/Warranty/SysMileages',
        type: 'POST'
    });

    ajaxACLResources_wrMil.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-wrMil').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
        },
        onSuccess: function (event, cbdata_wrMil) {
            //var data = $.parseJSON(cbdata);
            var cbdata_wrMil = $.parseJSON(cbdata_wrMil);
            cbdata_wrMil.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownWrMil').ddslick({
                //height: 150,
                data: cbdata_wrMil,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        Mil1 = selectedData.selectedData.text + "KM";
                    }
                    else {
                        Mil1 = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = VhType + Model + Mil1 + Mil2 + WrType + WrRM;
                }
            });

            $("#loading-image-wrMil").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-wrMil').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('wrName bulunamamýþtýr...'), window.lang.translate('wrName  bulunamamýþtýr...'));
        },
    })
    ajaxACLResources_wrMil.ajaxCallWidget('call');
//wrMil End

    //wrMonth
    $('#loading-image-wrMonth').loadImager('removeLoadImage');
    $("#loading-image-wrMonth").loadImager('appendImage');

    var ajaxACLResources_wrMonth = $('#ajaxACL-wrMonth').ajaxCallWidget({
        proxy: '/Warranty/SysMonths',
        type: 'POST'
    });

    ajaxACLResources_wrMonth.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-wrMonth').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
        },
        onSuccess: function (event, cbdata_wrMonth) {
            //var data = $.parseJSON(cbdata);
            var cbdata_wrMonth = $.parseJSON(cbdata_wrMonth);
            cbdata_wrMonth.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownWrMonth').ddslick({
                //height: 150,
                data: cbdata_wrMonth,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        Mil2 = selectedData.selectedData.text + "MONTHS";
                    }
                    else {
                        Mil2 = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = VhType + Model + Mil1 + Mil2 + WrType + WrRM;
                }
            });

            $("#loading-image-wrMonth").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-wrMonth').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('wrName bulunamamýþtýr...'), window.lang.translate('wrName  bulunamamýþtýr...'));
        },
    })
    ajaxACLResources_wrMonth.ajaxCallWidget('call');
//wrMonth End

    //rm
    $('#loading-image-rm').loadImager('removeLoadImage');
    $("#loading-image-rm").loadImager('appendImage');

    var ajaxACLResources_rm = $('#ajaxACL-rm').ajaxCallWidget({
        proxy: '/Sys/SysYesNo',
        type: 'POST'
    });

    ajaxACLResources_rm.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-rm').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
        },
        onSuccess: function(event, dataWrRM) {
            //var data = $.parseJSON(cbdata);
            var cbdataWrRM = $.parseJSON(dataWrRM);
            cbdataWrRM.splice(2, 2,
                { text: window.lang.translate('Please select'), value: 2, selected: true, description: "" }
            );
            $('#dropdownRm').ddslick({
                //height: 150,
                data: cbdataWrRM,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value <2) {
                        WrRM = selectedData.selectedData.text;
                    }
                    else {
                        WrRM = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = VhType + Model + Mil1 + Mil2 + WrType + WrRM;
                }
            });

            $("#loading-image-rm").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-rm').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('wrName bulunamamýþtýr...'), window.lang.translate('wrName  bulunamamýþtýr...'));
        },
    })
    ajaxACLResources_rm.ajaxCallWidget('call');
//rm End

    /* devexgrid */
    DevExpress.localization.locale(langCode);


    //warranty name   wrNameListRefresh
    $('#wrNameListRefresh').click(function() {
    var wrname = new DevExpress.data.CustomStore({
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
                url: '/Warranty/SysWarrantiesGrid',
                dataType: "json",
                type: 'POST',
                data: args,
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data Loading Error");
                },
                timeout: 15000
            });

            return deferred.promise();
        }
    });

    $("#gridContainer_warrantyName").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: wrname,
        columnHidingEnabled: true,
        selection: {
            mode: "single"
        },
        hoverStateEnabled: true,
        editing: {
            //mode: "batch"
            mode: "form",
            //allowAdding: true,
            //allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: window.lang.translate('Warranty name')
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
        OnCellPrepared: function (options) {

            var fieldData = options.value;
            fieldHtml = "";

            fieldHtml = fieldData.value;
            options.cellElement.html(fieldHtml);

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
            placeholder: window.lang.translate('Search') + "...",
        },
        headerFilter: {
            visible: true
        },
        columnChooser: {
            enabled: true,
            mode: "select"
        },
        columns: [{
            caption: window.lang.translate('Vehicle model name') + "...",
            encodeHtml: false,
            dataField: "vehicle_group_name"
        }, {
            caption: window.lang.translate('Warranty name') + "...",
            encodeHtml: false,
            dataField: "name"
        }, {
            caption: window.lang.translate('Active/Pasive'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var wrName_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveWrName(wrName_id);
                        dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveWrName(wrName_id);
                        dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                    }).appendTo(container);
                }
            }
            //dataField: "active"
        }],

        onSelectionChanged: function(selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillwarrantyNameForm(data);
            }
        },
        onRowRemoving: function (e) {
            //e.cancel = true;
            //Confirmasyon ile silme düzenlenecek...
            var wrInfo_id = e.key.id;
            deleteWrInfo(wrInfo_id);

        },
        onRowRemoved: function (e) {

        },
    });
    });

    $('#warrantyListRefresh').click(function() {
    //warranty matrix  warrantyListRefresh
    var wrmatrix = new DevExpress.data.CustomStore({
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
                url: '/Warranty/SysWarrantiesTypeGrid',
                dataType: "json",
                type: 'POST',
                data: args,
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data Loading Error");
                },
                timeout: 15000
            });

            return deferred.promise();
        }
    });

    $("#gridContainer_warranty").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: wrmatrix,
        columnHidingEnabled: true,
        selection: {
            mode: "single"
        },
        hoverStateEnabled: true,
        editing: {
            //mode: "batch"
            mode: "form",
            //allowAdding: true,
            //allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: window.lang.translate('Warranty information')
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
        OnCellPrepared: function (options) {

            var fieldData = options.value;
            fieldHtml = "";

            fieldHtml = fieldData.value;
            options.cellElement.html(fieldHtml);

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
            placeholder: window.lang.translate('Search') + "...",
        },
        headerFilter: {
            visible: true
        },
        columnChooser: {
            enabled: true,
            mode: "select"
        },
        columnWidth: {
            autoWidth: false 
        },
        columns: [{
            caption: window.lang.translate('Warranty unique code') + "...",
            encodeHtml: false,
            dataField: "unique_code"
        }, {
            caption: window.lang.translate('Vehicle type name') + "...",
            encodeHtml: false,
            dataField: "vehicle_group" 
        }, {
            caption: window.lang.translate('Vehicle model name') + "...",
            encodeHtml: false,
            dataField: "vehicle_config_name"
        }, {
            caption: window.lang.translate('Warranty name') + "...",
            encodeHtml: false,
            dataField: "vehicle_group_name"
        }, {
            caption: window.lang.translate('Warranty price') + "...",
            encodeHtml: false,
            dataField: "price_in_euros"
        }, {
            caption: window.lang.translate('Warranty type') + "...",
            encodeHtml: false,
            dataField: "warranty_type_name"
        }, {
            caption: window.lang.translate('Warranty mileage') + "...",
            encodeHtml: false,
            dataField: "mileages1"
        }, {  
            caption: window.lang.translate('Warranty month') + "...",
            encodeHtml: false,
            dataField: "month_value"
        }, {
            caption: window.lang.translate('Repair&maintenance') + "...",
            encodeHtml: false,
            dataField: "maintenance" 
        }, {
            caption: window.lang.translate('Active/Pasive'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var wrMatrix_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveWrMatrix(wrMatrix_id);
                        dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveWrMatrix(wrMatrix_id);
                        dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                    }).appendTo(container);
                }
            }
            //dataField: "active"
        }],
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillwarrantyForm(data);
            }
        },
        onRowRemoving: function (e) {
            //e.cancel = true;
            //Confirmasyon ile silme düzenlenecek...
            var wrMatrix_id = e.key.id;
            deleteWrMatrix(wrMatrix_id);

        },
        onRowRemoved: function (e) {

        },
    });
    });

    $('#wrNameListRefresh').click();
    $('#warrantyListRefresh').click();

/////////////////////////Warranty Info//////////////////////////////

    /**
 * insertwarranty
 * @returns {undefined}
 * @author Ceydacan Seyrek
 * @since 14/08/2018
 */
    $("#btn-warrantyInfo-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#warrantyNameForm").validationEngine('validate')) {
            // window.insertwarranty = function () {
            $("#loading-image-warranty").loadImager('removeLoadImage');
            $("#loading-image-warranty").loadImager('appendImage');

            //var cst_purchaselastupdate = $('#txt-model-name').val();
            var warranty_id = warrantyNameId;

            var ddDataWrConfigId = $('#dropdownVhModel').data('ddslick');
            var vehicle_config_type_id = ddDataWrConfigId.selectedData.value;

            var ddDataWrMonthId = $('#dropdownWrMonth').data('ddslick');
            var months1_id = ddDataWrMonthId.selectedData.value;

            var ddDataWrMilId = $('#dropdownWrMil').data('ddslick');
            var mileages1_id = ddDataWrMilId.selectedData.value;

            var ddDataWrTypeId = $('#dropdownWrType').data('ddslick');
            var warranty_types_id = ddDataWrTypeId.selectedData.value;

            var ddDataIsmaintenance = $('#dropdownRm').data('ddslick');
            var ismaintenance = ddDataIsmaintenance.selectedData.value;

            var unique_code = $('#txt-wrUnique-name').val();
            var price_in_euros = $('#txt-wrPrice-name').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syswarrantymatrix
            //& warranty_id=1 
            //& vehicle_config_type_id=8
            //& months1_id=22
            //& mileages1_id=5 
            //& warranty_types_id=1 
            //& ismaintenance=1 
            //& unique_code=asdasdasd 
            //& price_in_euros=56 
            //& pk=GsZVzEYe50uGgNM
            var ajax_InsertWarrantyInfo = $('#ajaxACL-insertwarrantyName').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loading-image-warranty",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                proxy: '/Warranty/AddWarrantyInfo',
                type: 'POST',
                data: JSON.stringify({
                    url: "pkInsertAct_syswarrantymatrix",
                    warranty_id: warranty_id,
                    vehicle_config_type_id: vehicle_config_type_id,
                    months1_id : months1_id,
                    mileages1_id: mileages1_id,
                    warranty_types_id : warranty_types_id,
                    ismaintenance : ismaintenance,
                    unique_code : unique_code,
                    price_in_euros : price_in_euros,
                    pk : "GsZVzEYe50uGgNM"
                })
            });
            ajax_InsertWarrantyInfo.ajaxCallWidget({
                onReset: function (event, data) {
                    resetwarrantyForm();
                },
            })
            ajax_InsertWarrantyInfo.ajaxCallWidget('call');
            return false;
        }
    })


/**
* reset model Form
* @returns {undefined}
* @author Ceydacan Seyrek
* @since 14/08/2018
*/

    window.resetwarrantyForm = function (data) {
        $("#loading-image-warranty").loadImager('removeLoadImage');
        $("#loading-image-warranty").loadImager('appendImage');

        $('#warrantyForm').validationEngine('hide');
        //$('#dropdownModel').ddslick('select', { index: String(0) });
        $('#dropdownVhModel').ddslick('select', { index: String(0) });
        //$('#dropdownWrName').ddslick('select', { index: String(0) });
        $('#dropdownWrType').ddslick('select', { index: String(0) });
        $('#dropdownWrMil').ddslick('select', { index: String(0) });
        $('#dropdownWrMonth').ddslick('select', { index: String(0) });
        $('#dropdownRm').ddslick('select', { index: String(0) });
        $("#loading-image-warranty").loadImager('removeLoadImage');
        
        $("#warranty_tab").organizeTabs('activatePrevTab');
        $("#warranty_tab").organizeTabs('disableAllTabs');
        return false;
    }

/**
* Fill model form
* @returns {Boolean}
* @author Ceydacan Seyrek
* @since 14/08/2018
*/

    window.fillwarrantyForm = function (data) {
        $("#loading-image-warranty").loadImager('removeLoadImage');
        $("#loading-image-warranty").loadImager('appendImage');

        //$('#dropdownModel').ddslick('select', { index: data.vehicle_group_id });
        $('#dropdownVhModel').ddslick('selectByValue',
            {
                index: '' + data.vehicle_config_type_id + '',
                text: '' + data.vehicle_config_name + ''
            }
        );
        //$('#dropdownWrName').ddslick('select', { index: data.id });
        $('#dropdownWrType').ddslick('selectByValue',
            {
                index: '' + data.warranty_types_id + '',
                text: '' + data.warranty_type_name + ''
            }
        );
        $('#dropdownWrMil').ddslick('selectByValue',
            {
                index: '' + data.mileages1_id + '',
                text: '' + data.maintenance + ''
            }
        );
        $('#dropdownWrMonth').ddslick('selectByValue',
            {
                index: '' + data.months1_id + '',
                text: '' + data.month_value + ''
            }
        );
        $('#dropdownRm').ddslick('selectByValue',
            {
                index: '' + data.ismaintenance + '',
                text: '' + data.maintenance + ''
            }
        );
        document.getElementById("txt-wrPrice-name").value = data.price_in_euros;
        document.getElementById("txt-wrName-VhType").value = data.vehicle_group;
        document.getElementById("txt-wrName-WrName").value = data.vehicle_group_name;
        document.getElementById("txt-wrUnique-name").value = data.vehicle_group + data.vehicle_config_name + Mil1 + Mil2 + WrType + WrRM;
        $("#loading-image-warranty").loadImager('removeLoadImage');
        return false;
    }


/////////////////////////Warranty Name//////////////////////////////
    /**
   * insert traning name
   * @returns {undefined}
   * @since 29/08/2018
   */
    $("#btn-warrantyName-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#warrantyNameForm").validationEngine('validate')) {
            //window.insertwarrantyName = function () {

            $("#loading-image-warrantyName").loadImager('removeLoadImage');
            $("#loading-image-warrantyName").loadImager('appendImage');

            var ddData = $('#dropdownModelName').data('ddslick');
            var vehicle_group_id = ddData.selectedData.value;

            var warrantyName = $('#txt-wrName-name').val();

            // http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkInsertAct_syswarranties&name=dennee&vehicle_group_id=8&pk=GsZVzEYe50uGgNM
            var ajax_InsertWarrantyName = $('#ajaxACL-insertwarrantyName').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loading-image-warrantyName",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                proxy: '/Warranty/AddWarrantyName',
                type: 'POST',
                data: JSON.stringify({
                    url: "pkInsertAct_syswarranties",
                    name: warrantyName,
                    vehicle_group_id: vehicle_group_id,
                    pk: "GsZVzEYe50uGgNM"
                })
            });
            ajax_InsertWarrantyName.ajaxCallWidget({
                onReset: function (event, data) {
                    resetwarrantyNameForm();
                },
            })
            ajax_InsertWarrantyName.ajaxCallWidget('call');
            return false;
        }
    })

/**
* Fill model form
* @returns {Boolean}
* @author Ceydacan Seyrek
* @since 14/08/2018
*/
var warrantyNameId = "";
    window.fillwarrantyNameForm = function (data) {
        $("#loading-image-warrantyName").loadImager('removeLoadImage');
        $("#loading-image-warrantyName").loadImager('appendImage');

        $('#dropdownModelName').ddslick('selectByValue',
            {
                index: '' + data.vehicle_group_id + '',
                text: '' + data.name + ''
            }
        );
        document.getElementById("txt-wrName-name").value = data.name;
        document.getElementById("txt-wrName-VhType").value = data.vehicle_group_name;
        document.getElementById("txt-wrName-WrName").value = data.name;

        $("#loading-image-warrantyName").loadImager('removeLoadImage');

        warrantyNameId = data.id;
        VhType = data.vehicle_group_name;
        $("#warranty_tab").organizeTabs('enableAllTabs');
        //tab_active();
        return false;
    }

/**
* reset model Form
* @returns {undefined}
* @author Ceydacan Seyrek
* @since 14/08/2018
*/
    $("#btn-warrantyName-clear").on("click", function (e) {
        e.preventDefault();
        resetwarrantyNameForm();
        return false;
    })

    var resetwarrantyNameForm = function () {
        $("#loading-image-warrantyName").loadImager('removeLoadImage');
        $("#loading-image-warrantyName").loadImager('appendImage');

        $('#warrantyNameForm')[0].reset();
        $('#warrantyNameForm').validationEngine('hide');
        $('#dropdownModelName').ddslick('select', { index: String(0) });

        $("#loading-image-warrantyName").loadImager('removeLoadImage');

        //tab_disable();
        return false;
    }

//ActivePasive Warranty Name

    window.activepasiveWrName = function (wrName_id) {
        $("#loading-image-warrantyNameGrid").loadImager('removeLoadImage');
        $("#loading-image-warrantyNameGrid").loadImager('appendImage');

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syswarranties&id=29&pk=GsZVzEYe50uGgNM

        var ajax_activepasiveWrNamelist = $('#ajaxACL-wrNameList').ajaxCallWidget({
            proxy: '/Warranty/SysActivePasiveWrName',
            data: JSON.stringify({
                id: wrName_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syswarranties"
            }),
            type: "POST"

        });

        ajax_activepasiveWrNamelist.ajaxCallWidget({
            onError: function (event, textStatus, errorThrown) {

                $(window).dangerMessage({
                    onShown: function () {
                        $('#loading-image-warrantyNameGrid').loadImager('removeLoadImage');
                    }
                });
                $(window).dangerMessage('show', window.lang.translate('yyyyyyyyyyyyyyyy...'), window.lang.translate('yyyyyyyyyyyyyyyyyyyy...'));
            },
            onSuccess: function (event, mydata) {
                //var data = $.parseJSON(mydata);

                //grid refresh
                $('#wrNameListRefresh').click();
                //$('#branchdealerList').click();
                //$("#gridContainer_trainingName").dxDataGrid("instance").refresh();

                //$("#loading-image-trNameGrid").loadImager('removeLoadImage');
                //$(window).successMessage('show', window.lang.translate('Active/Pasive Ok.'), window.lang.translate('Active/Pasive Ok.'));

            },
            onErrorDataNull: function (event, data) {
                console.log("Error : " + event + " -data :" + data);
                $(window).dangerMessage({
                    onShown: function () {
                        $('#loading-image-warrantyNameGrid').loadImager('removeLoadImage');
                    }
                });
                $(window).dangerMessage('show', window.lang.translate('xxxxxxxxxxx'), window.lang.translate('xxxxxxxxxxxxxxxxxx...'));
            },
        })
        ajax_activepasiveWrNamelist.ajaxCallWidget('call');
    }

//Warranty Name Delete
    window.deleteWrInfo = function (wrInfo_id) {
        $("#loading-image-warrantyNameGrid").loadImager('removeLoadImage');
        $("#loading-image-warrantyNameGrid").loadImager('appendImage');

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_syswarranties&id=9&pk=GsZVzEYe50uGgNM

        var ajax_deleteWrInfo = $('#ajaxACL-wrNameList').ajaxCallWidget({
            proxy: '/Warranty/SysDeleteWrName',
            data: JSON.stringify({
                id: wrInfo_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkDeletedAct_syswarranties"
            }),
            type: "POST"

        });

        ajax_deleteWrInfo.ajaxCallWidget({
            onError: function (event, textStatus, errorThrown) {

                $(window).dangerMessage({
                    onShown: function () {
                        $('#loading-image-warrantyNameGrid').loadImager('removeLoadImage');
                    }
                });
                $(window).dangerMessage('show', window.lang.translate('yyyyyyyyyyyyyyyy...'), window.lang.translate('yyyyyyyyyyyyyyyyyyyy...'));
            },
            onSuccess: function (event, mydata) {
                //var data = $.parseJSON(mydata);

                //grid refresh
                //$('#branchdealerList').click();
                $('#trListRefresh').click();
                //$("#gridContainer_branch").dxDataGrid("instance").refresh();

                $("#loading-image-warrantyNameGrid").loadImager('removeLoadImage');
            },
            onErrorDataNull: function (event, data) {
                console.log("Error : " + event + " -data :" + data);
                $(window).dangerMessage({
                    onShown: function () {
                        $('#loading-image-warrantyNameGrid').loadImager('removeLoadImage');
                    }
                });
                $(window).dangerMessage('show', window.lang.translate('xxxxxxxxxxx'), window.lang.translate('xxxxxxxxxxxxxxxxxx...'));
            },
        })
        ajax_deleteWrInfo.ajaxCallWidget('call');

    }
});

