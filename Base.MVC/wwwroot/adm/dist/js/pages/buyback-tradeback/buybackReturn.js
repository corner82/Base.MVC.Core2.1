/*
* Buyback Tradeback Matrix Form
* @author Ceydacan Seyrek
* @since 10/09/2018
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
* Buyback Tradeback Matrix LoadImager
* @author Ceydacan Seyrek
* @since 10/09/2018
*/
//to Buyback Tradeback Matrix form
    $("#loadingImage_bbTbInfo").loadImager();
    $("#loadingImage_DdslickReturn").loadImager();


//to Buyback Tradeback Matrix form grid loading-image
    $("#loadingImage_DdslickBuybackReturnDealGrid").loadImager();
    $("#loadingImage_DdslickBuybackVehicleList").loadImager();

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

    $('#dealBuybackReturnForm').validationEngine();
    $('#buybackTradebackInfoForm').validationEngine();

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
            text: "Yes",
            value: 2,
            selected: false
        },
        {
            text: "No",
            value: 3,
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
                        if (expText == 'No') {
                            document.getElementById("txt-BbTbMatrix-explanation").disabled = false;
                            document.getElementById("txt-BbTbMatrix-file").disabled = true;
                        }
                        else if (expText == 'Yes') {
                            document.getElementById("txt-BbTbMatrix-explanation").disabled = true;
                            document.getElementById("txt-BbTbMatrix-file").disabled = false;
                        }
                        else {
                            document.getElementById("txt-BbTbMatrix-explanation").disabled = true;
                            document.getElementById("txt-BbTbMatrix-file").disabled = true;
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


    $("#gridContainer_buybackDealList").dxDataGrid({

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
            fileName: "buybacktradebackMatrix"
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
        rowPrepared: function (rowElement, rowInfo) {
            if (rowInfo.data.key == 1)
                rowElement.css('background', 'green');
            else if (rowInfo.data.key == 0)
                rowElement.css('background', 'yellow');

        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillbbTbMatrixForm(data);
            }
        }
    });

    $("#gridContainer_buybackVehicleList").dxDataGrid({

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
            fileName: "buybacktradebackMatrix"
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
        }, {
            caption: window.lang.translate('Vehicle return date') + "...",
                dataField: "OrderDate"
        }, {
            name: 'Vehicle return',
            caption: "Vehicle return",
            //dataField: "active",
            dataType: "boolean"
        }],
        rowPrepared: function (rowElement, rowInfo) {
            if (rowInfo.data.key == 1)
                rowElement.css('background', 'green');
            else if (rowInfo.data.key == 0)
                rowElement.css('background', 'yellow');

        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillVehicleBuybackForm(data);
            }
        }
    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


 /**
 * Buyback Tradeback Matrix
 * @author Ceydacan Seyrek
 * @since 10/09/2018
 */

    window.insertbbTbMatrix = function () {
        $("#loadingImage_bbTbInfo").loadImager('removeLoadImage');
        $("#loadingImage_bbTbInfo").loadImager('appendImage');

       // var cst_purchaselastupdate = $('#txt-location-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysbbTbInfo',

                name: bbTbMatrix_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Tradeback Matrix Ekleme İşlemi Başarısız...',
                    'Buyback Tradeback Matrix Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysbbTbInfo" servis hatası->' + textStatus);
                $("#loadingImage_bbTbInfo").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#buybackTradebackInfoForm')[0].reset();

                        $("#loadingImage_bbTbInfo").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Buyback Tradeback Matrix Kay�t ��lemi Ba�ar�l�...',
                    'Buyback Tradeback Matrix kay�t i�lemini ger�ekle�tirdiniz... ',
                    data);
                $("#loadingImage_bbTbInfo").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Tradeback Matrix Kayıt İşlemi Başarısız...',
                    'Buyback Tradeback Matrix kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbInfo" servis datası boştur!!');
                $("#loadingImage_bbTbInfo").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Tradeback Matrix İşlemi Başarısız...',
                    'Buyback Tradeback Matrix kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbInfo" servis datası boştur!!');
                $("#loadingImage_bbTbInfo").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loadingImage_bbTbInfo").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $("#loading-imagelocation").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Buyback Tradeback Matrix İşlemi Başarısız...',
                    'Aynı isim ile Buyback Tradeback Matrix  kaydı yapılmıştır, yeni bir Buyback Tradeback Matrix kaydı deneyiniz... ');
                $("#loadingImage_bbTbInfo").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
/**
* reset Buyback Tradeback Matrix Form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.resetBbTbMatrixForm = function () {
        $("#loadingImage_bbTbInfo").loadImager('removeLoadImage');
        $("#loadingImage_bbTbInfo").loadImager('appendImage');

        $('#buybackTradebackInfoForm').validationEngine('hide');
        $('#ddslickReturn').ddslick('select', { index: String(0) });

        $("#loadingImage_bbTbInfo").loadImager('removeLoadImage');

        return false;
    }


/**
* insert Buyback Tradeback Matrix Wrapper
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.insertBbTbMatrixWrapper = function (e) {
        e.preventDefault();

        if ($("#buybackTradebackInfoForm").validationEngine('validate')) {

            insertBbTbMatrix();
        }
        return false;
    }


/**
* Fill Buyback Tradeback Matrix form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.fillbbTbMatrixForm = function (data) {
        $("#loadingImage_bbTbInfo").loadImager('removeLoadImage');
        $("#loadingImage_bbTbInfo").loadImager('appendImage');

        //document.getElementById("txt-BbTbMatrix-price").value = data.SaleAmount;
        document.getElementById("txt-bbreturn-dealNo").value = data.SaleAmount;
        document.getElementById("txt-bbreturn-dealDate").value = data.OrderDate;
        document.getElementById("txt-bbreturn-vehicle").value = 'WAGP21ZZ2FT022928';

        $("#loadingImage_bbTbInfo").loadImager('removeLoadImage');
        $('#ddslickReturn').ddslick('select', { index: 2 });

        tab_active();
        return false;
    }



    window.fillVehicleBuybackForm = function (data) {
        //$("#loadingImage_bbTbInfo").loadImager('removeLoadImage');
        //$("#loadingImage_bbTbInfo").loadImager('appendImage');

        //document.getElementById("txt-BbTbMatrix-price").value = data.SaleAmount;
        //document.getElementById("txt-bbreturn-dealNo").value = data.SaleAmount;
        //document.getElementById("txt-bbreturn-dealDate").value = data.OrderDate;

        //$("#loadingImage_bbTbInfo").loadImager('removeLoadImage');
        //$('#ddslickReturn').ddslick('select', { index: 4 });

        tab_active();
        return false;
    }
});

