/*
* Accessory Form
* @author Gül Özdemir
* @since 03/09/2018
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
    * Accessory LoadImager
    * @author Gül Özdemir
    * @since 03/09/2018
    */
    //to accessory form
    $("#loading-image-accessory").loadImager();
    //to accessory form grid loading-image
    $("#loading-image-accessoryGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#accessoryForm').validationEngine();


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


    $("#gridContainer_accessory").dxDataGrid({

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
            fileName: window.lang.translate('Accessory')
        },

        grouping: {
            contextMenuEnabled: true,
            expandMode: "rowClick"
        },

        groupPanel: {
            emptyPanelText: window.lang.translate('Use the context menu of header columns to group data'),
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
            caption: "Accessory",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillAccessoryForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertAccessory
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */

    window.insertAccessory = function () {
        $("#loading-image-accessory").loadImager('removeLoadImage');
        $("#loading-image-accessory").loadImager('appendImage');

        var accessory_name = $('#txt-accessory-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysaccessory',
                
                name: accessory_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Accessory Ekleme İşlemi Başarısız...',
                    'Accessory Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysAccessory" servis hatası->' + textStatus);
                $("#loading-image-accessory").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#accessoryForm')[0].reset();

                        $("#loading-image-accessory").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Accessory Kayıt İşlemi Başarılı...',
                    'Accessory kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-accessory").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Accessory Kayıt İşlemi Başarısız...',
                    'Accessory kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysAccessory" servis datası boştur!!');
                $("#loading-image-accessory").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Accessory Kayıt İşlemi Başarısız...',
                    'Accessory kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysAccessory" servis datası boştur!!');
                $("#loading-image-accessory").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-accessory").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#accessoryForm')[0].reset();
                        $("#loading-image-accessory").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile accessory kaydı yapılmıştır, yeni bir accessory kaydı deneyiniz... ');
                $("#loading-image-accessory").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset Accessory Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */

    window.resetAccessoryForm = function () {
        $("#loading-image-accessory").loadImager('removeLoadImage');
        $("#loading-image-accessory").loadImager('appendImage');

        $('#accessoryForm').validationEngine('hide');
        
        $("#loading-image-accessory").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Accessory Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 03/09/2018
    */

    window.insertAccessoryWrapper = function (e) {
        e.preventDefault();

        if ($("#accessoryForm").validationEngine('validate')) {

            insertAccessory();
        }
        return false;
    }


    /**
    * Fill Accessory form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 03/09/2018
    */

    window.fillAccessoryForm = function (data) {
        $("#loading-image-accessory").loadImager('removeLoadImage');
        $("#loading-image-accessory").loadImager('appendImage');

        document.getElementById("txt-accessory-name").value = data.Employee;
    
        $("#loading-image-accessory").loadImager('removeLoadImage');

        return false;
    }
});

