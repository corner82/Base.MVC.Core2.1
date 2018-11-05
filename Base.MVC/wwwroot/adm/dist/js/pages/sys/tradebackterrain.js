/*
* TradebackTerrain Form
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
    * TradebackTerrain LoadImager
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */
    //to Tradeback Terrain form
    $("#loading-image-TradebackTerrain").loadImager();
    //to Tradeback Terrain form grid loading-image
    $("#loading-image-TradebackTerrainGrid").loadImager();

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


    $("#gridContainer_TradebackTerrain").dxDataGrid({

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
            caption: "Tradeback Terrain",
            dataField: "SaleAmount"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillTradebackTerrainForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
 * insert TradebackTerrain
 * @author Ceydacan Seyrek
 * @since 15/08/2018
 */

    window.insertTradebackTerrain = function () {
        $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');
        $("#loading-image-TradebackTerrain").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-country-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysTradebackTerrain',

                name: warrantyMileage_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Tradeback Terrain Ekleme İşlemi Başarısız...',
                    'Tradeback Terrain Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#TradebackTerrainForm')[0].reset();

                        $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Tradeback Terrain Kayıt İşlemi Başarılı...',
                    'warranty mileage kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Tradeback Terrain Kayıt İşlemi Başarısız...',
                    'Tradeback Terrain kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Tradeback Terrain Kayıt İşlemi Başarısız...',
                    'Tradeback Terrain kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Tradeback Terrain kaydı yapılmıştır, yeni bir Tradeback Terrain kaydı deneyiniz... ');
                $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
    /**
    * reset TradebackTerrain Form
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.resetTradebackTerrainForm = function () {
        $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');
        $("#loading-image-TradebackTerrain").loadImager('appendImage');

        $('#TradebackTerrainForm').validationEngine('hide');

        $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Tradeback Terrain Wrapper
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.insertTradebackTerrainWrapper = function (e) {
        e.preventDefault();

        if ($("#TradebackTerrainForm").validationEngine('validate')) {

            insertTradebackTerrain();
        }
        return false;
    }


    /**
    * Fill TradebackTerrain form
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.fillTradebackTerrainForm = function (data) {
        $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');
        $("#loading-image-TradebackTerrain").loadImager('appendImage');

        document.getElementById("txt-TradebackTerrain-name").value = data.SaleAmount;

        $("#loading-image-TradebackTerrain").loadImager('removeLoadImage');

        return false;
    }
});

