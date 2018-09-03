
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
    $("#loading-image-wrMils").loadImager();
    $("#loading-image-rm").loadImager();

    //to warranty form grid loading-image
    $("#loading-image-warrantyGrid").loadImager();
    var UniqueCode = "";
    var Model = "";
    var Mil1 = "";
    var Mil2 = "";
    var WrType = "";
    var WrRM = "";


    var langCode = $("#langCode").val();
    //alert(langCode);

    var tab_active = function () {
        //Update & View Mode
        //enabled tabs

        $("a[data-toggle='tab'").prop('disabled', false);
        $("a[data-toggle='tab'").each(function () {
            $(this).attr('href', $(this).prop('data-href')); // restore original href
        });
        $("a[data-toggle='tab'").removeClass('disabled-link');
    }

    var tab_disable = function () {
        //Add new record
        //tablar kapatýlacak

        $("a[data-toggle='tab'").prop('disabled', true);
        $("a[data-toggle='tab'").each(function () {
            $(this).prop('data-href', $(this).attr('href')); // hold you original href
            $(this).attr('href', '#'); // clear href
        });
        $("a[data-toggle='tab'").addClass('disabled-link');

    }

    tab_disable();

    $('#warrantyForm').validationEngine();
    $('#warrantyNameForm').validationEngine();

    var cbdata_model = [{}];
    var cbdata_vhmodel = [{}];

    var cbdata = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "TGS",
            value: 2,
            selected: false
        },
        {
            text: "TGX",
            value: 3,
            selected: false
        },
        {
            text: "CLA",
            value: 4,
            selected: false
        }
    ];

    var cbdata2 = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "TGS4X2",
            value: 2,
            selected: false
        },
        {
            text: "CLA6X4",
            value: 3,
            selected: false
        },
        {
            text: "TGX4X4 H/D",
            value: 4,
            selected: false
        }
    ];

    var cbdataWrName = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "TGS Extended Warranties_Combination",
            value: 2,
            selected: false
        },
        {
            text: "CLA Extended Warranties",
            value: 3,
            selected: false
        },
        {
            text: "TGX Extended Warranties_ Extended Scope (Heavy Duty)",
            value: 4,
            selected: false
        }
    ];

    var cbdataWrType = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Driveline",
            value: 2,
            selected: false
        },
        {
            text: "Combination",
            value: 3,
            selected: false
        },
        {
            text: "Entire Vehicle",
            value: 4,
            selected: false
        }
    ];

    var cbdataWrMil = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "24 MONTHS/300 000 KM",
            value: 2,
            selected: false
        },
        {
            text: "48 MONTHS/200 000 KM",
            value: 3,
            selected: false
        },
        {
            text: "36 MONTHS/75 000 KM",
            value: 4,
            selected: false
        }
    ];

    var cbdataWrRM = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Yes",
            value: 2,
            selected: false
        },
        {
            text: "No",
            value: 3,
            selected: false
        },
    ];


    //model
    $('#loading-image-modelName').loadImager('removeLoadImage');
    $("#loading-image-modelName").loadImager('appendImage');

    var ajaxACLResources_modelName = $('#ajaxACL-modelName').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

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
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

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
    $('#loading-image-model').loadImager('removeLoadImage');
    $("#loading-image-model").loadImager('appendImage');

    var ajaxACLResources_model = $('#ajaxACL-model').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_model.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-model').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownModel').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }

            });

            $("#loading-image-model").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-model').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('model bulunamamýþtýr...'), window.lang.translate('model  bulunamamýþtýr...'));
        },
    })
    ajaxACLResources_model.ajaxCallWidget('call');
//Model End

    //Vh model
    $('#loading-image-vhModel').loadImager('removeLoadImage');
    $("#loading-image-vhModel").loadImager('appendImage');

    var ajaxACLResources_vhModel = $('#ajaxACL-vhModel').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

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
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownVhModel').ddslick({
                //height: 150,
                data: cbdata2,
                width: '100%',

                 onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 1) {
                        Model = selectedData.selectedData.text;
                    }
                    else {
                        Model = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = Model + Mil1 + Mil2 + WrType + WrRM;
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

    //wrName 
    $('#loading-image-wrName').loadImager('removeLoadImage');
    $("#loading-image-wrName").loadImager('appendImage');

    var ajaxACLResources_wrName = $('#ajaxACL-wrName').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_wrName.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-wrName').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownWrName').ddslick({
                //height: 150,
                data: cbdataWrName,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-wrName").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-wrName').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('wrName bulunamamýþtýr...'), window.lang.translate('wrName  bulunamamýþtýr...'));
        },
    })
    ajaxACLResources_wrName.ajaxCallWidget('call');
//vh Name End

    //wrType
    $('#loading-image-wrType').loadImager('removeLoadImage');
    $("#loading-image-wrType").loadImager('appendImage');

    var ajaxACLResources_wrType = $('#ajaxACL-wrType').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_wrType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-wrType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownWrType').ddslick({
                //height: 150,
                data: cbdataWrType,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 1) {
                        WrType = selectedData.selectedData.text;
                    }
                    else {
                        WrType = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = Model + Mil1 + Mil2 + WrType + WrRM;
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
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

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
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownWrMil').ddslick({
                //height: 150,
                data: cbdataWrMil,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 1) {
                        Mil1 = selectedData.selectedData.text;
                    }
                    else {
                        Mil1 = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = Model + Mil1 + Mil2 + WrType + WrRM;
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

    //wrMil
    $('#loading-image-wrMils').loadImager('removeLoadImage');
    $("#loading-image-wrMils").loadImager('appendImage');

    var ajaxACLResources_wrMils = $('#ajaxACL-wrMils').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_wrMils.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-wrMils').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownWrMils').ddslick({
                //height: 150,
                data: cbdataWrMil,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 1) {
                        Mil2 = selectedData.selectedData.text;
                    }
                    else {
                        Mil2 = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = Model + Mil1 + Mil2 + WrType + WrRM;
                }
            });

            $("#loading-image-wrMils").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-wrMils').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('wrName bulunamamýþtýr...'), window.lang.translate('wrName  bulunamamýþtýr...'));
        },
    })
    ajaxACLResources_wrMils.ajaxCallWidget('call');
//wrMils End

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
                    if (selectedData.selectedData.value > 1) {
                        WrRM = selectedData.selectedData.text;
                    }
                    else {
                        WrRM = "";
                    }
                    document.getElementById("txt-wrUnique-name").value = Model + Mil1 + Mil2 + WrType + WrRM;
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
//wrMils End

    /* devexgrid */
    var orders = new DevExpress.data.CustomStore({
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
                url: "https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems",
                dataType: "json",
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

        dataSource: orders,

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
            dataField: "StoreState" 
        }, {
            caption: window.lang.translate('Vehicle type name') + "...",
            dataField: "StoreCity" 
        }, {
            caption: window.lang.translate('Vehicle model name') + "...",
            dataField: "StoreState" 
        }, {
            caption: window.lang.translate('Warranty name') + "...",
            dataField: "StoreState" 
        }, {
            caption: window.lang.translate('Warranty price') + "...",
            dataField: "StoreState" 
        }, {
            caption: window.lang.translate('Warranty type') + "...",
            dataField: "StoreState"
        }, {
            caption: window.lang.translate('Warranty mileage(1.)') + "...",
            dataField: "StoreState" 
        }, {
            caption: window.lang.translate('Warranty mileage(2.)') + "...",
            dataField: "StoreState"
        }, {
            caption: window.lang.translate('Repair&maintanance') + "...",
            dataField: "StoreState" 
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

        dataSource: orders,

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
            dataField: "StoreCity"
        }, {
            caption: window.lang.translate('Warranty name') + "...",
            dataField: "StoreState"
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
 * insertmodel
 * @returns {undefined}
 * @author Ceydacan Seyrek
 * @since 14/08/2018
 */

    window.insertmodel = function () {
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
                        $('#customerContactPersonForm')[0].reset();
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
    * reset model Form
    * @returns {undefined}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.resetwarrantyForm = function () {
        $("#loading-image-warranty").loadImager('removeLoadImage');
        $("#loading-image-warranty").loadImager('appendImage');

        $('#warrantyForm').validationEngine('hide');
        $('#dropdownModel').ddslick('select', { index: String(0) });
        $('#dropdownVhModel').ddslick('select', { index: String(0) });
        $('#dropdownWrName').ddslick('select', { index: String(0) });
        $('#dropdownWrType').ddslick('select', { index: String(0) });
        $('#dropdownWrMil').ddslick('select', { index: String(0) });
        $('#dropdownWrMils').ddslick('select', { index: String(0) });
        $('#dropdownRm').ddslick('select', { index: String(0) });
        $("#loading-image-warranty").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert model Wrapper
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.insertmodelWrapper = function (e) {
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

        $('#dropdownModel').ddslick('select', { index: 3 });
        $('#dropdownVhModel').ddslick('select', { index: 3 });
        $('#dropdownWrName').ddslick('select', { index: 2 });
        $('#dropdownWrType').ddslick('select', { index: 3 });
        $('#dropdownWrMil').ddslick('select', { index: 2 });
        $('#dropdownWrMils').ddslick('select', { index: 3 });
        $('#dropdownRm').ddslick('select', { index: 2 });
        document.getElementById("txt-wrPrice-name").value = data.SaleAmount;

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
        $('#dropdownModelName').ddslick('select', { index: String(0) });

        $("#loading-image-warrantyName").loadImager('removeLoadImage');

        tab_disable();
        return false;
    }


    /**
    * insert model Wrapper
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.insertmodelNameWrapper = function (e) {
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

        $('#dropdownModelName').ddslick('select', { index: 3 });
        document.getElementById("txt-wrName-name").value = data.StoreCity;

        $("#loading-image-warrantyName").loadImager('removeLoadImage');

        tab_active();
        return false;
    }
});

