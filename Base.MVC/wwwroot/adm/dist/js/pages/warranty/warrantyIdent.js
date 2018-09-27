
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

    var cbdata_model = [{}];
    var cbdata_vhmodel = [{}];

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


//model
//    $('#loading-image-model').loadImager('removeLoadImage');
//    $("#loading-image-model").loadImager('appendImage');

//    $('#loading-image-wrName').loadImager('removeLoadImage');
//    $("#loading-image-wrName").loadImager('appendImage');

//    var ajaxACLResources_model = $('#ajaxACL-model').ajaxCallWidget({
//        proxy: '/Warranty/Sysvehiclegroups',
//        data: {
//            url: '1',
//            //pk: $("#pk").val()
//            dataType: 'json'
//        }

//    });

//    ajaxACLResources_model.ajaxCallWidget({
//        onError: function (event, textStatus, errorThrown) {

//            dm.dangerMessage({
//                onShown: function () {
//                    $('#loading-image-model').loadImager('removeLoadImage');
//                }
//            });
//            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
//        },
//        onSuccess: function (event, cbdata_vehicletype) {
//            //var data = $.parseJSON(cbdata);
//            var cbdata_vehicletype = $.parseJSON(cbdata_vehicletype);
//            cbdata_vehicletype.splice(0, 0,
//                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
//            );
//            $('#dropdownModel').ddslick({
//                //height: 150,
//                data: cbdata_vehicletype,
//                width: '100%',

//                onSelected: function (selectedData) {
//                            //$('#dropdownWrName').ddslick('select', { index: String(0) });
//                    if (selectedData.selectedData.value > 0) {
//                        VhType = selectedData.selectedData.text;
//                        //VhTypeId = "vehicle_group_id=2";
//                        ModelId = selectedData.selectedData.value;

//                       //wrname
//                        $('#loading-image-wrName').loadImager('removeLoadImage');
//                        $("#loading-image-wrName").loadImager('appendImage');
//                        var ajaxACLResources_wrName = $('#ajaxACL-wrName').ajaxCallWidget({
//                            proxy: '/Warranty/SysWarrantyNameFilter',//'/Warranty/Syswarranties',
//                            headers: {
//                                "vehicle_group_id": ModelId//"vehicle_group_id=" + ModelId
//                            },
//                            type: 'POST',
//                        });

//                        ajaxACLResources_wrName.ajaxCallWidget({
//                            onError: function (event, textStatus, errorThrown) {

//                                dm.dangerMessage({
//                                    onShown: function () {
//                                        $('#loading-image-wrName').loadImager('removeLoadImage');
//                                    }
//                                });
//                                dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
//                            },
//                            onSuccess: function (event, cbdata_wrName) {
//                                //var data = $.parseJSON(cbdata);
//                                var cbdataWrName = $.parseJSON(cbdata_wrName);
//                                cbdataWrName.splice(0, 0,
//                                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
//                                );
//                                $('#dropdownWrName').ddslick({
//                                    //height: 150,
//                                    data: cbdataWrName,
//                                    width: '100%',

//                                    onSelected: function (selectedData) {
//                                        if (selectedData.selectedData.value > 0) {

//                                        }
//                                    }
//                                });

//                                $("#loading-image-wrName").loadImager('removeLoadImage');
//                            },
//                            onErrorDataNull: function (event, data) {
//                                console.log("Error : " + event + " -data :" + data);
//                                dm.dangerMessage({
//                                    onShown: function () {
//                                        $('#loading-image-wrName').loadImager('removeLoadImage');
//                                    }
//                                });
//                                dm.dangerMessage('show', window.lang.translate('wrName bulunamamýþtýr...'), window.lang.translate('wrName  bulunamamýþtýr...'));
//                            },
//                        })
//                        ajaxACLResources_wrName.ajaxCallWidget('call');
////vh Name End
//                    }
//                    else {
//                        VhType = "";
//                    }
//                    document.getElementById("txt-wrUnique-name").value = VhType + Model + Mil1 + Mil2 + WrType + WrRM;
//                }
//            });

//            $("#loading-image-model").loadImager('removeLoadImage');
//        },
//        onErrorDataNull: function (event, data) {
//            console.log("Error : " + event + " -data :" + data);
//            dm.dangerMessage({
//                onShown: function () {
//                    $('#loading-image-model').loadImager('removeLoadImage');
//                }
//            });
//            dm.dangerMessage('show', window.lang.translate('model bulunamamýþtýr...'), window.lang.translate('model  bulunamamýþtýr...'));
//        },
//    })
//    ajaxACLResources_model.ajaxCallWidget('call');
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


//vh Model End

//    //wrName 
//    $('#loading-image-wrName').loadImager('removeLoadImage');
//    $("#loading-image-wrName").loadImager('appendImage');

//    var ajaxACLResources_wrName = $('#ajaxACL-wrName').ajaxCallWidget({
//        proxy: '/Warranty/SysWarrantyNameFilter',//'/Warranty/Syswarranties',
//        //data: {

//        //    //test : "test string",
//        //}
//        type: 'POST',
//        data: JSON.stringify(ModelId)
//    });

//    ajaxACLResources_wrName.ajaxCallWidget({
//        onError: function (event, textStatus, errorThrown) {

//            dm.dangerMessage({
//                onShown: function () {
//                    $('#loading-image-wrName').loadImager('removeLoadImage');
//                }
//            });
//            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
//        },
//        onSuccess: function (event, cbdata_wrName) {
//            //var data = $.parseJSON(cbdata);
//            var cbdataWrName = $.parseJSON(cbdata_wrName);
//            cbdataWrName.splice(0, 0,
//                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
//            );
//            $('#dropdownWrName').ddslick({
//                //height: 150,
//                data: cbdataWrName,
//                width: '100%',

//                onSelected: function (selectedData) {
//                    if (selectedData.selectedData.value > 0) {

//                    }
//                }
//            });

//            $("#loading-image-wrName").loadImager('removeLoadImage');
//        },
//        onErrorDataNull: function (event, data) {
//            console.log("Error : " + event + " -data :" + data);
//            dm.dangerMessage({
//                onShown: function () {
//                    $('#loading-image-wrName').loadImager('removeLoadImage');
//                }
//            });
//            dm.dangerMessage('show', window.lang.translate('wrName bulunamamýþtýr...'), window.lang.translate('wrName  bulunamamýþtýr...'));
//        },
//    })
//    ajaxACLResources_wrName.ajaxCallWidget('call');
////vh Name End

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
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

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
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

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
    //warranty name
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
                timeout: 5000
            });

            return deferred.promise();
        }
    });

    //warranty matrix
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
                timeout: 5000
            });

            return deferred.promise();
        }
    });

    DevExpress.localization.locale(langCode);


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
            caption: window.lang.translate('Warranty unique code') + "...",
            dataField: "name"
        }, {
            caption: window.lang.translate('Vehicle type name') + "...",
            dataField: "vehicle_group" 
        }, {
            caption: window.lang.translate('Vehicle model name') + "...",
            dataField: "vehicle_config_name"
        }, {
            caption: window.lang.translate('Warranty name') + "...",
            dataField: "vehicle_group_name"
        }, {
            caption: window.lang.translate('Warranty price') + "...",
            dataField: "price_in_euros"
        }, {
            caption: window.lang.translate('Warranty type') + "...",
            dataField: "warranty_type_name"
        }, {
            caption: window.lang.translate('Warranty mileage') + "...",
            dataField: "ismaintenance"
        }, {  
            caption: window.lang.translate('Warranty month') + "...",
            dataField: "month_value"
        }, {
            caption: window.lang.translate('Repair&maintenance') + "...",
            dataField: "maintenance" 
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillwarrantyForm(data);
            }
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
            dataField: "vehicle_group_name"//"StoreCity"
        }, {
            caption: window.lang.translate('Warranty name') + "...",
            dataField: "name"//"StoreState"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillwarrantyNameForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }



    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab

        if (target == "#tab_1") {
            //alert("#tab_1");
        }
        if (target == "#tab_2") {
            // grid refresh olmasý gerektiði için kullanýldý.
            $(gridContainer_warranty).dxDataGrid("updateDimensions");
            //alert("#tab_2");
        }
    });

    /**
 * insertwarranty
 * @returns {undefined}
 * @author Ceydacan Seyrek
 * @since 14/08/2018
 */

    window.insertwarranty = function () {
        $("#loading-image-warranty").loadImager('removeLoadImage');
        $("#loading-image-warranty").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-model-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysmodel',

                name: model_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Garanti Ekleme Ýþlemi Baþarýsýz...',
                    'Garanti Ekleme Ýþlemi Baþarýsýz..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatasý->' + textStatus);
                $("#loading-image-warranty").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#modelForm')[0].reset();

                        $("#loading-image-warranty").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Garanti Kayýt Ýþlemi Baþarýlý...',
                    'Garanti kayýt iþlemini gerçekleþtirdiniz... ',
                    data);
                $("#loading-image-warranty").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Garanti Kayýt Ýþlemi Baþarýsýz...',
                    'Garanti kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datasý boþtur!!');
                $("#loading-image-warranty").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Garanti Kayýt Ýþlemi Baþarýsýz...',
                    'Garanti kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datasý boþtur!!');
                $("#loading-image-model").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-warranty").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#warrantyForm')[0].reset();
                        $("#loading-image-warranty").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayýt Ýþlemi Baþarýsýz...',
                    'Ayný isim ile Garanti kaydý yapýlmýþtýr, yeni bir Garanti kaydý deneyiniz... ');
                $("#loading-image-warranty").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }

 /**
 * insertwarrantyName
 * @returns {undefined}
 * @author Ceydacan Seyrek
 * @since 14/08/2018
 */

    window.insertwarrantyName = function () {
        $("#loading-image-warrantyName").loadImager('removeLoadImage');
        $("#loading-image-warrantyName").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-model-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysmodel',

                name: model_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Garanti Ekleme Ýþlemi Baþarýsýz...',
                    'Garanti Ekleme Ýþlemi Baþarýsýz..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatasý->' + textStatus);
                $("#loading-image-warrantyName").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#modelForm')[0].reset();

                        $("#loading-image-warrantyName").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Garanti Kayýt Ýþlemi Baþarýlý...',
                    'Garanti kayýt iþlemini gerçekleþtirdiniz... ',
                    data);
                $("#loading-image-warrantyName").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Garanti Kayýt Ýþlemi Baþarýsýz...',
                    'Garanti kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datasý boþtur!!');
                $("#loading-image-warrantyName").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Garanti Kayýt Ýþlemi Baþarýsýz...',
                    'Garanti kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datasý boþtur!!');
                $("#loading-image-warrantyName").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-warrantyName").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#warrantyNameForm')[0].reset();
                        $("#loading-image-warrantyName").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayýt Ýþlemi Baþarýsýz...',
                    'Ayný isim ile Garanti kaydý yapýlmýþtýr, yeni bir Garanti kaydý deneyiniz... ');
                $("#loading-image-warrantyName").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }


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
    * insert warranty Wrapper
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.insertwarrantyWrapper = function (e) {
        e.preventDefault();

        if ($("#warrantyForm").validationEngine('validate')) {

            insertwarranty();
        }
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
        $('#dropdownVhModel').ddslick('select', { index: data.vehicle_config_type_id });
        //$('#dropdownWrName').ddslick('select', { index: data.id });
        $('#dropdownWrType').ddslick('select', { index: data.warranty_types_id });
        $('#dropdownWrMil').ddslick('select', { index: 1 });//data.mileages1_id
        $('#dropdownWrMonth').ddslick('select', { index: 1 });//data.months1_id 
        $('#dropdownRm').ddslick('select', { index: 1 }); //data.ismaintenance
        document.getElementById("txt-wrPrice-name").value = data.price_in_euros;
        document.getElementById("txt-wrName-VhType").value = data.vehicle_group;
        document.getElementById("txt-wrName-WrName").value = data.vehicle_group_name;
        document.getElementById("txt-wrUnique-name").value = data.vehicle_group + data.vehicle_config_name + Mil1 + Mil2 + WrType + WrRM;
        $("#loading-image-warranty").loadImager('removeLoadImage');
        return false;
    }

    /**
  * reset model Form
  * @returns {undefined}
  * @author Ceydacan Seyrek
  * @since 14/08/2018
  */

    window.resetwarrantyNameForm = function () {
        $("#loading-image-warrantyName").loadImager('removeLoadImage');
        $("#loading-image-warrantyName").loadImager('appendImage');

        $('#warrantyNameForm').validationEngine('hide');
        //$('#dropdownModelName').ddslick('select', { index: String(0) });

        $("#loading-image-warrantyName").loadImager('removeLoadImage');

        //tab_disable();
        return false;
    }


    /**
    * insert warranty name Wrapper
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */


    window.insertwarrantyNameWrapper = function (e) {
        e.preventDefault();

        if ($("#warrantyNameForm").validationEngine('validate')) {

            insertwarrantyName();
        }
        return false;
    }


    /**
    * Fill model form
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.fillwarrantyNameForm = function (data) {
        $("#loading-image-warrantyName").loadImager('removeLoadImage');
        $("#loading-image-warrantyName").loadImager('appendImage');

        $('#dropdownModelName').ddslick('select', { index: data.vehicle_group_id  });
        document.getElementById("txt-wrName-name").value = data.name;
        document.getElementById("txt-wrName-VhType").value = data.vehicle_group_name;
        document.getElementById("txt-wrName-WrName").value = data.name;

        $("#loading-image-warrantyName").loadImager('removeLoadImage');

        VhType = data.vehicle_group_name;
        $("#warranty_tab").organizeTabs('enableAllTabs');
        //tab_active();
        return false;
    }
});

