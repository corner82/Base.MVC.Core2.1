/*
* BuybackMonth Form
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
    * BuybackMonth LoadImager
    * @author Ceydacan Seyrek
    * @since 16/08/2018
    */
    //to BuybackMonth form
    $("#loading-image-BuybackMonth").loadImager();
    //to BuybackMonth form grid loading-image
    $("#loading-image-BuybackMonthGrid").loadImager();
   
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


    $("#gridContainer_BuybackMonth").dxDataGrid({

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
            caption: "Buyback Month",
            dataField: "SaleAmount"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillBuybackMonthForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insert BuybackMonth
 * @author Ceydacan Seyrek
 * @since 16/08/2018
 */

    window.insertBuybackMonth = function () {
        $("#loading-image-BuybackMonth").loadImager('removeLoadImage');
        $("#loading-image-BuybackMonth").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-BuybackMonth-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysBuybackMonth',
                
                name: BuybackMonth_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Month Ekleme İşlemi Başarısız...',
                    'Buyback Month Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-BuybackMonth").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#BuybackMonthForm')[0].reset();

                        $("#loading-image-BuybackMonth").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Buyback Month Kayıt İşlemi Başarılı...',
                    'Buyback Month kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-BuybackMonth").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Month Kayıt İşlemi Başarısız...',
                    'Buyback Month kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-BuybackMonth").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Month Kayıt İşlemi Başarısız...',
                    'Buyback Month kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-BuybackMonth").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-BuybackMonth").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#BuybackMonthForm')[0].reset();
                        $("#loading-image-BuybackMonth").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Buyback Month kaydı yapılmıştır, yeni bir Buyback Month kaydı deneyiniz... ');
                $("#loading-image-BuybackMonth").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset BuybackMonth Form
 * @author Ceydacan Seyrek
 * @since 16/08/2018
 */

    window.resetBuybackMonthForm = function () {
        $("#loading-image-BuybackMonth").loadImager('removeLoadImage');
        $("#loading-image-BuybackMonth").loadImager('appendImage');

        $('#BuybackMonthForm').validationEngine('hide');
        
        $("#loading-image-BuybackMonth").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert BuybackMonth Wrapper
    * @author Ceydacan Seyrek
    * @since 16/08/2018
    */

    window.insertBuybackMonthWrapper = function (e) {
        e.preventDefault();

        if ($("#BuybackMonthForm").validationEngine('validate')) {

            insertBuybackMonth();
        }
        return false;
    }


    /**
    * Fill BuybackMonth form
    * @author Ceydacan Seyrek
    * @since 16/08/2018
    */

    window.fillBuybackMonthForm = function (data) {
        $("#loading-image-BuybackMonth").loadImager('removeLoadImage');
        $("#loading-image-BuybackMonth").loadImager('appendImage');

        document.getElementById("txt-BuybackMonth-name").value = data.SaleAmount;
    
        $("#loading-image-BuybackMonth").loadImager('removeLoadImage');

        return false;
    }
});

