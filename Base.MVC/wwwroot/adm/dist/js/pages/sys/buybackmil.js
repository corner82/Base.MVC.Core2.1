﻿/*
* BuybackMil Form
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
    * BuybackMil LoadImager
    * @author Ceydacan Seyrek
    * @since 16/08/2018
    */
    //to BuybackMil form
    $("#loading-image-BuybackMil").loadImager();
    //to BuybackMil form grid loading-image
    $("#loading-image-BuybackMilGrid").loadImager();
   
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


    $("#gridContainer_BuybackMil").dxDataGrid({

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
            caption: "Buyback Mileage",
            dataField: "SaleAmount"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillBuybackMilForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insert BuybackMil
 * @author Ceydacan Seyrek
 * @since 16/08/2018
 */

    window.insertBuybackMil = function () {
        $("#loading-image-BuybackMil").loadImager('removeLoadImage');
        $("#loading-image-BuybackMil").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-BuybackMil-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysBuybackMil',
                
                name: warrantyMileage_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Mileage Ekleme İşlemi Başarısız...',
                    'Buyback Mileage Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-BuybackMil").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#BuybackMilForm')[0].reset();

                        $("#loading-image-BuybackMil").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Buyback Mileage Kayıt İşlemi Başarılı...',
                    'Buyback Mileage kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-BuybackMil").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Mileage Kayıt İşlemi Başarısız...',
                    'Buyback Mileage kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-BuybackMil").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Mileage Kayıt İşlemi Başarısız...',
                    'Buyback Mileage kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-BuybackMil").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-BuybackMil").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-BuybackMil").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Buyback Mileage kaydı yapılmıştır, yeni bir Buyback Mileage kaydı deneyiniz... ');
                $("#loading-image-BuybackMil").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset BuybackMil Form
 * @author Ceydacan Seyrek
 * @since 16/08/2018
 */

    window.resetBuybackMilForm = function () {
        $("#loading-image-BuybackMil").loadImager('removeLoadImage');
        $("#loading-image-BuybackMil").loadImager('appendImage');

        $('#BuybackMilForm').validationEngine('hide');
        
        $("#loading-image-BuybackMil").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert BuybackMil Wrapper
    * @author Ceydacan Seyrek
    * @since 16/08/2018
    */

    window.insertBuybackMilWrapper = function (e) {
        e.preventDefault();

        if ($("#BuybackMilForm").validationEngine('validate')) {

            insertBuybackMil();
        }
        return false;
    }


    /**
    * Fill BuybackMil form
    * @author Ceydacan Seyrek
    * @since 16/08/2018
    */

    window.fillBuybackMilForm = function (data) {
        $("#loading-image-BuybackMil").loadImager('removeLoadImage');
        $("#loading-image-BuybackMil").loadImager('appendImage');

        document.getElementById("txt-BuybackMil-name").value = data.SaleAmount;
    
        $("#loading-image-BuybackMil").loadImager('removeLoadImage');

        return false;
    }
});

