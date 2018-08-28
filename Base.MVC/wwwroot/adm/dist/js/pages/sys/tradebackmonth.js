﻿/*
* TradebackMonth Form
* @author Ceydacan Seyrek
* @since 16/08/2018
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


    /*
    * TradebackMonth LoadImager
    * @author Ceydacan Seyrek
    * @since 16/08/2018
    */
    //to TradebackMonth form
    $("#loading-image-TradebackMonth").loadImager();
    //to TradebackMonth form grid loading-image
    $("#loading-image-TradebackMonthGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);

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


    $("#gridContainer_TradebackMonth").dxDataGrid({

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
            caption: "Tradeback Month",
            dataField: "SaleAmount"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillTradebackMonthForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insert TradebackMonth
 * @author Ceydacan Seyrek
 * @since 16/08/2018
 */

    window.insertTradebackMonth = function () {
        $("#loading-image-TradebackMonth").loadImager('removeLoadImage');
        $("#loading-image-TradebackMonth").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-TradebackMonth-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysTradebackMonth',
                
                name: TradebackMonth_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Tradeback Month Ekleme İşlemi Başarısız...',
                    'Tradeback Month Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-TradebackMonth").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#TradebackMonthForm')[0].reset();

                        $("#loading-image-TradebackMonth").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Tradeback Month Kayıt İşlemi Başarılı...',
                    'Tradeback Month kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-TradebackMonth").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Tradeback Month Kayıt İşlemi Başarısız...',
                    'Tradeback Month kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-TradebackMonth").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Tradeback Month Kayıt İşlemi Başarısız...',
                    'Tradeback Month kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-TradebackMonth").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-TradebackMonth").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#TradebackMonthForm')[0].reset();
                        $("#loading-image-TradebackMonth").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Tradeback Month kaydı yapılmıştır, yeni bir Tradeback Month kaydı deneyiniz... ');
                $("#loading-image-TradebackMonth").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset TradebackMonth Form
 * @author Ceydacan Seyrek
 * @since 16/08/2018
 */

    window.resetTradebackMonthForm = function () {
        $("#loading-image-TradebackMonth").loadImager('removeLoadImage');
        $("#loading-image-TradebackMonth").loadImager('appendImage');

        $('#TradebackMonthForm').validationEngine('hide');
        
        $("#loading-image-TradebackMonth").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert TradebackMonth Wrapper
    * @author Ceydacan Seyrek
    * @since 16/08/2018
    */

    window.insertTradebackMonthWrapper = function (e) {
        e.preventDefault();

        if ($("#TradebackMonthForm").validationEngine('validate')) {

            insertBuybackMonth();
        }
        return false;
    }


    /**
    * Fill TradebackMonth form
    * @author Ceydacan Seyrek
    * @since 16/08/2018
    */

    window.fillTradebackMonthForm = function (data) {
        $("#loading-image-TradebackMonth").loadImager('removeLoadImage');
        $("#loading-image-TradebackMonth").loadImager('appendImage');

        document.getElementById("txt-TradebackMonth-name").value = data.SaleAmount;
    
        $("#loading-image-TradebackMonth").loadImager('removeLoadImage');

        return false;
    }
});
