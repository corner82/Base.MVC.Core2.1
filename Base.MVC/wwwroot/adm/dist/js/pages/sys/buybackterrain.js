/*
* BuybackTerrain Form
* @author Ceydacan Seyrek
* @since 15/08/2018
*/
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Continue')
    });


    /*
    * BuybackTerrain LoadImager
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */
    //to Buyback Terrain form
    $("#loading-image-BuybackTerrain").loadImager();
    //to Buyback Terrain form grid loading-image
    $("#loading-image-BuybackTerrainGrid").loadImager();
   
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


    $("#gridContainer_BuybackTerrain").dxDataGrid({

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
            caption: "Buyback Terrain",
            dataField: "SaleAmount"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillBuybackTerrainForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insert BuybackTerrain
 * @author Ceydacan Seyrek
 * @since 15/08/2018
 */

    window.insertBuybackTerrain = function () {
        $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');
        $("#loading-image-BuybackTerrain").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-country-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysBuybackTerrain',
                
                name: warrantyMileage_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Terrain Ekleme İşlemi Başarısız...',
                    'Buyback Terrain Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#BuybackTerrainForm')[0].reset();

                        $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Buyback Terrain Kayıt İşlemi Başarılı...',
                    'warranty mileage kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Terrain Kayıt İşlemi Başarısız...',
                    'Buyback Terrain kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Terrain Kayıt İşlemi Başarısız...',
                    'Buyback Terrain kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Buyback Terrain kaydı yapılmıştır, yeni bir Buyback Terrain kaydı deneyiniz... ');
                $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset BuybackTerrain Form
 * @author Ceydacan Seyrek
 * @since 15/08/2018
 */

    window.resetBuybackTerrainForm = function () {
        $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');
        $("#loading-image-BuybackTerrain").loadImager('appendImage');

        $('#BuybackTerrainForm').validationEngine('hide');
        
        $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert BuybackTerrain Wrapper
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.insertBuybackTerrainWrapper = function (e) {
        e.preventDefault();

        if ($("#BuybackTerrainForm").validationEngine('validate')) {

            insertBuybackTerrain();
        }
        return false;
    }


    /**
    * Fill BuybackTerrain form
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.fillBuybackTerrainForm = function (data) {
        $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');
        $("#loading-image-BuybackTerrain").loadImager('appendImage');

        document.getElementById("txt-BuybackTerrain-name").value = data.SaleAmount;
    
        $("#loading-image-BuybackTerrain").loadImager('removeLoadImage');

        return false;
    }
});

