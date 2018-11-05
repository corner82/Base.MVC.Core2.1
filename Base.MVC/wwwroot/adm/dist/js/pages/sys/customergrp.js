/*
* Customer Group Definition Form
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
    * Customer Group LoadImager
    * @author Gül Özdemir
    * @since 13/08/2016
    */
    //to country form
    $("#loading-image-customergrp").loadImager();
    //to country form grid loading-image
    $("#loading-image-customergrpGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#customergrpForm').validationEngine();


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


    $("#gridContainer_customergrp").dxDataGrid({

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
            caption: "Customer Group",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillCustomergrpForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertCustomergrp
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 13/08/2018
 */

    window.insertCustomergrp = function () {
        $("#loading-image-customergrp").loadImager('removeLoadImage');
        $("#loading-image-customergrp").loadImager('appendImage');

        var customergrp_name = $('#txt-customergrp-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_syscountry',
                
                name: customergrp_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'CustomerGrou Ekleme İşlemi Başarısız...',
                    'Country Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerGroup" servis hatası->' + textStatus);
                $("#loading-image-customergrp").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#customergrpForm')[0].reset();

                        $("#loading-image-customergrp").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'customergrp Kayıt İşlemi Başarılı...',
                    'customergrp kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-customergrp").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'customergrp Kayıt İşlemi Başarısız...',
                    'customergrp kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_syscustomergrp" servis datası boştur!!');
                $("#loading-image-customergrp").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-customergrp").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-customergrp").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customergrpForm')[0].reset();
                        $("#loading-image-customergrp").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Ülke Kişi kaydı yapılmıştır, yeni birÜlke kaydı deneyiniz... ');
                $("#loading-image-customergrp").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset Customer Group Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 13/08/2018
 */

    window.resetCustomergrpForm = function () {
        $("#loading-image-customergrp").loadImager('removeLoadImage');
        $("#loading-image-customergrp").loadImager('appendImage');

        $('#customergrpForm').validationEngine('hide');
        
        $("#loading-image-customergrp").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Customer Group Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/08/2018
    */

    window.insertCustomergrpWrapper = function (e) {
        //e.preventDefault();

        if ($("#customergrpForm").validationEngine('validate')) {

            insertCustomergrp();
        }
        return false;
    }


    /**
    * Fill Customer Group form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/08/2018
    */

    window.fillCustomergrpForm = function (data) {
        $("#loading-image-customergrp").loadImager('removeLoadImage');
        $("#loading-image-customergrp").loadImager('appendImage');

        document.getElementById("txt-customergrp-name").value = data.Employee;
    
        $("#loading-image-customergrp").loadImager('removeLoadImage');

        return false;
    }
});

