/*
* Reliability Rate Form
* @author Gül Özdemir
* @since 13/08/2016
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
    * Reliability Rate LoadImager
    * @author Gül Özdemir
    * @since 13/08/2016
    */
    //to Reliability Rate form
    $("#loading-image-reliabilityrate").loadImager();
    //to Reliability Rate form grid loading-image
    $("#loading-image-reliabilityrateGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#reliabilityrateForm').validationEngine();


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


    $("#gridContainer_reliabilityrate").dxDataGrid({

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
            caption: "Reliability Rate",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillReliabilityRateForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertReliabilityRate
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 13/08/2018
 */

    window.insertReliabilityrate = function () {
        $("#loading-image-reliabilityrate").loadImager('removeLoadImage');
        $("#loading-image-reliabilityrate").loadImager('appendImage');

        var reliabilityrate_name = $('#txt-reliabilityrate-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysreliabilityrate',
                
                name: reliabilityrate_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'reliabilityrate Ekleme İşlemi Başarısız...',
                    'reliabilityrate Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-reliabilityrate").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#reliabilityrateForm')[0].reset();

                        $("#loading-image-reliabilityrate").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'reliabilityrate Kayıt İşlemi Başarılı...',
                    'reliabilityrate kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-reliabilityrate").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-reliabilityrate").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-reliabilityrate").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-reliabilityrate").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-reliabilityrate").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Ülke Kişi kaydı yapılmıştır, yeni birÜlke kaydı deneyiniz... ');
                $("#loading-image-reliabilityrate").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset Reliability Rate Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 13/08/2018
 */

    window.resetReliabilityRateForm = function () {
        $("#loading-image-reliabilityrate").loadImager('removeLoadImage');
        $("#loading-image-reliabilityrate").loadImager('appendImage');

        $('#reliabilityrateForm').validationEngine('hide');
        
        $("#loading-image-reliabilityrate").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Reliability Rate Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/08/2018
    */

    window.insertReliabilityRateWrapper = function (e) {
        e.preventDefault();

        if ($("#reliabilityrateForm").validationEngine('validate')) {

            insertReliabilityRate();
        }
        return false;
    }


    /**
    * Fill Reliability Rate form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/08/2018
    */

    window.fillReliabilityRateForm = function (data) {
        $("#loading-image-reliabilityrate").loadImager('removeLoadImage');
        $("#loading-image-reliabilityrate").loadImager('appendImage');

        document.getElementById("txt-reliabilityrate-name").value = data.Employee;
    
        $("#loading-image-reliabilityrate").loadImager('removeLoadImage');

        return false;
    }
});

