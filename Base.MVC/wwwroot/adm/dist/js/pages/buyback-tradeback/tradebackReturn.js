/*
* Tradeback Return Form
* @author Ceydacan Seyrek
* @since 24/09/2018
*/
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });

    var expText = "";

/*
* Tradeback Return LoadImager
* @author Ceydacan Seyrek
* @since 24/09/2018
*/
//to Tradeback Return form
    $("#loadingImage_tbReturnInfo").loadImager();
    $("#loadingImage_DdslickReturn").loadImager();


//to Tradeback Return form grid loading-image
    $("#loadingImage_DdslickTradebackReturnDealGrid").loadImager();
    $("#loadingImage_DdslickTradebackVehicleList").loadImager();

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
        //tablar kapatılacak

        $("a[data-toggle='tab'").prop('disabled', true);
        $("a[data-toggle='tab'").each(function () {
            $(this).prop('data-href', $(this).attr('href')); // hold you original href
            $(this).attr('href', '#'); // clear href
        });
        $("a[data-toggle='tab'").addClass('disabled-link');

    }

    tab_disable();

    $('#dealTradebackReturnForm').validationEngine();
    $('#tradebackReturnVehicleInfoForm').validationEngine();

    var langCode = $("#langCode").val();
    //alert(langCode);

    var cbdata_country = [{}];

//Return
    var cbdata_return = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Yes, it will return",
            value: 2,
            selected: false
        },
        {
            text: "No customer wants extension",
            value: 3,
            selected: false
        },
        {
            text: "No, it won’t return",
            value: 4,
            selected: false
        }
    ];

    $('#loadingImage_DdslickReturn').loadImager('removeLoadImage');
    $("#loadingImage_DdslickReturn").loadImager('appendImage');

    var ajaxACLResources_Return = $('#ajax_DdslickReturn').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_Return.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickReturn').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickReturn').ddslick({
                //height: 150,
                data: cbdata_return,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        expText = selectedData.selectedData.text;
                        if (expText == 'No, it won’t return') {
                            document.getElementById("txt-tbreturn-explanation").disabled = false;
                            document.getElementById("txt-tbreturn-file").disabled = true;
                        }
                        else if (expText == 'No customer wants extension') {
                            document.getElementById("txt-tbreturn-explanation").disabled = false;
                            document.getElementById("txt-tbreturn-file").disabled = true;
                        }
                        else if (expText == 'Yes, it will return') {
                            document.getElementById("txt-tbreturn-explanation").disabled = true;
                            document.getElementById("txt-tbreturn-file").disabled = false;
                        }
                        else {
                            document.getElementById("txt-tbreturn-explanation").disabled = true;
                            document.getElementById("txt-tbreturn-file").disabled = true;
                        }
                    }
                }
            });

            $("#loadingImage_DdslickReturn").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickReturn').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Return bulunamamıştır...'), window.lang.translate('Return bulunamamıştır...'));
        },
    })
    ajaxACLResources_Return.ajaxCallWidget('call');
//Return End



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


    $("#gridContainer_tradebackDealList").dxDataGrid({

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
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },

        "export": {
            enabled: true,
            fileName: "tradebackReturn"
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
            caption: window.lang.translate('Deal Number') + "...",
            dataField: "StoreCity"
        }, {
            caption: window.lang.translate('Deal date') + "...",
            dataField: "OrderDate"
        }],
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillTbreturnForm(data);
            }
        }
    });

    $("#gridContainer_tradebackVehicleList").dxDataGrid({

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
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },

        "export": {
            enabled: true,
            fileName: "TradebackVehicle"
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
            caption: window.lang.translate('Deal Number') + "...",
            dataField: "SaleAmount"
        }, {
            caption: window.lang.translate('Deal date') + "...",
                dataField: "OrderDate"
        }, {
            caption: window.lang.translate('Vehicle return date') + "...",
                dataField: "OrderDate"
            }, {
            caption: window.lang.translate('Vehicle') + "...",
                //dataField: "WAGP21ZZ2FT022928"
            data: "WAGP21ZZ2FT022928"
        }, {
            name: 'Vehicle return',
            caption: "Vehicle return",
            //dataField: "active",
            dataType: "boolean"
        }],
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillVehicleTradebackForm(data);
            }
        }
    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


 /**
 * Tradeback Return
 * @author Ceydacan Seyrek
 * @since 10/09/2018
 */

    window.insertTbreturn = function () {
        $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_tbReturnInfo").loadImager('appendImage');

       // var cst_purchaselastupdate = $('#txt-location-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysbbTbInfo',

                name: tbreturn_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Tradeback return Ekleme İşlemi Başarısız...',
                    'Tradeback return Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysbbTbInfo" servis hatası->' + textStatus);
                $("#loadingImage_TbReturnInfo").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#tradebackReturnVehicleInfoForm')[0].reset();

                        $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Tradeback return kayıt işlemi başarılı...',
                    'Tradeback return kayıt işlemini gerçekleştirniz... ',
                    data);
                $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Tradeback return Kayıt İşlemi Başarısız...',
                    'Tradeback return kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbInfo" servis datası boştur!!');
                $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Tradeback return İşlemi Başarısız...',
                    'Tradeback return kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbInfo" servis datası boştur!!');
                $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $("#loading-imagelocation").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Tradeback return İşlemi Başarısız...',
                    'Aynı isim ile Tradeback return  kaydı yapılmıştır, yeni bir Tradeback return kaydı deneyiniz... ');
                $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
/**
* reset Tradeback Return Form
* @author Ceydacan Seyrek
* @since 24/09/2018
*/

    window.resetTbreturnForm = function () {
        $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_tbReturnInfo").loadImager('appendImage');

        $('#tradebackReturnVehicleInfoForm').validationEngine('hide');
        $('#ddslickReturn').ddslick('select', { index: String(0) });

        $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');

        return false;
    }


/**
* insert Tradeback Return Wrapper
* @author Ceydacan Seyrek
* @since 24/09/2018
*/

    window.insertTbreturnWrapper = function (e) {
        e.preventDefault();

        if ($("#tradebackReturnVehicleInfoForm").validationEngine('validate')) {

            insertTbreturn();
        }
        return false;
    }


/**
* Fill Tradeback Return form
* @author Ceydacan Seyrek
* @since 24/09/2018
*/

    window.fillTbreturnForm = function (data) {
        $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_tbReturnInfo").loadImager('appendImage');

        //document.getElementById("txt-Tbreturn-price").value = data.SaleAmount;
        document.getElementById("txt-tbreturn-dealNo").value = data.SaleAmount;
        document.getElementById("txt-tbreturn-dealDate").value = data.OrderDate;
        

        $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');
        $('#ddslickReturn').ddslick('select', { index: 2 });

        tab_active();
        return false;
    }



    window.fillVehicleTradebackForm = function (data) {
        $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_tbReturnInfo").loadImager('appendImage');

        //document.getElementById("txt-tbreturn-price").value = data.SaleAmount;
        //document.getElementById("txt-tbreturn-dealNo").value = data.SaleAmount;
        //document.getElementById("txt-tbreturn - dealDate").value = data.OrderDate;

        $("#loadingImage_tbReturnInfo").loadImager('removeLoadImage');
        $('#ddslickReturn').ddslick('select', { index: 3 });
        document.getElementById("txt-tbreturn-vehicle").value = 'WAGP21ZZ2FT022928';

        tab_active();
        return false;
    }

});

