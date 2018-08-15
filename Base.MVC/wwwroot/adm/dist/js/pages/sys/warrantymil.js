/*
* Warranty Mileage Form
* @author Ceydacan Seyrek
* @since 13/08/2018
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
    * warranty mileage LoadImager
    * @author Ceydacan Seyrek
    * @since 13/08/2018
    */
    //to warranty mileage form
    $("#loading-image-wrMil").loadImager();
    //to warranty mileage form grid loading-image
    $("#loading-image-wrMilGrid").loadImager();
   
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


    $("#gridContainer_wrMil").dxDataGrid({

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
            caption: "Warranty Mileage",
            dataField: "SaleAmount"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillwrMilForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertWarranty Mileage
 * @author Ceydacan Seyrek
 * @since 13/08/2018
 */

    window.insertwrMil = function () {
        $("#loading-image-wrMil").loadImager('removeLoadImage');
        $("#loading-image-wrMil").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-country-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_syswrmil',
                
                name: warrantyMileage_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Warranty Mileage Ekleme İşlemi Başarısız...',
                    'Warranty Mileage Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-wrMil").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#wrMilForm')[0].reset();

                        $("#loading-image-wrMil").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Warranty Mileage Kayıt İşlemi Başarılı...',
                    'warranty mileage kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-wrMil").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Warranty MileageKayıt İşlemi Başarısız...',
                    'Warranty Mileage kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-wrMil").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Warranty Mileage Kayıt İşlemi Başarısız...',
                    'Warranty Mileage kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-wrMil").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-wrMil").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-wrMil").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Warranty Mileage kaydı yapılmıştır, yeni bir Warranty Mileage kaydı deneyiniz... ');
                $("#loading-image-wrMil").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset warranty mileage Form
 * @author Ceydacan Seyrek
 * @since 13/08/2018
 */

    window.resetwrMilForm = function () {
        $("#loading-image-wrMil").loadImager('removeLoadImage');
        $("#loading-image-wrMil").loadImager('appendImage');

        $('#wrMilForm').validationEngine('hide');
        
        $("#loading-image-wrMil").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Warranty Mileage Wrapper
    * @author Ceydacan Seyrek
    * @since 13/08/2018
    */

    window.insertwrMilWrapper = function (e) {
        e.preventDefault();

        if ($("#wrMilForm").validationEngine('validate')) {

            insertwrMil();
        }
        return false;
    }


    /**
    * Fill Warranty Mileage form
    * @author Ceydacan Seyrek
    * @since 13/08/2018
    */

    window.fillwrMilForm = function (data) {
        $("#loading-image-wrMil").loadImager('removeLoadImage');
        $("#loading-image-wrMil").loadImager('appendImage');

        document.getElementById("txt-wrMil-name").value = data.SaleAmount;
    
        $("#loading-image-wrMil").loadImager('removeLoadImage');

        return false;
    }
});

