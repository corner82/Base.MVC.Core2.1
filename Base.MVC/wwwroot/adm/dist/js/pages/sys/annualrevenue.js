﻿/*
* Annual revenue Form
* @author Gül Özdemir
* @since 15/08/2016
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
    * Annual revenue LoadImager
    * @author Gül Özdemir
    * @since 15/08/2016
    */
    //to annualrevenue form
    $("#loading-image-annualrevenue").loadImager();
    //to annualrevenue form grid loading-image
    $("#loading-image-annualrevenueGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#annualrevenueForm').validationEngine();


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


    $("#gridContainer_annualrevenue").dxDataGrid({

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
            caption: "Annual Revenue",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillAnnualRevenueForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertAnnualRevenue
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 15/08/2018
 */

    window.insertAnnualrevenue = function () {
        $("#loading-image-annualrevenue").loadImager('removeLoadImage');
        $("#loading-image-annualrevenue").loadImager('appendImage');

        var annualrevenue_name = $('#txt-annualrevenue-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysannualrevenue',
                
                name: annualrevenue_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'annualrevenue Ekleme İşlemi Başarısız...',
                    'annualrevenue Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysAnnualrevenue" servis hatası->' + textStatus);
                $("#loading-image-annualrevenue").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#annualrevenueForm')[0].reset();

                        $("#loading-image-annualrevenue").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'annualrevenue Kayıt İşlemi Başarılı...',
                    'annualrevenue kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-annualrevenue").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'annualrevenue Kayıt İşlemi Başarısız...',
                    'annualrevenue kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysannualrevenue" servis datası boştur!!');
                $("#loading-image-annualrevenue").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'annualrevenue Kayıt İşlemi Başarısız...',
                    'annualrevenue kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysAnnualrevenue" servis datası boştur!!');
                $("#loading-image-annualrevenue").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-annualrevenue").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#annualrevenueForm')[0].reset();
                        $("#loading-image-annualrevenue").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile annualrevenue kaydı yapılmıştır, yeni bir annualrevenue kaydı deneyiniz... ');
                $("#loading-image-annualrevenue").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset AnnualRevenue Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 15/08/2018
 */

    window.resetAnnualRevenueForm = function () {
        $("#loading-image-annualrevenue").loadImager('removeLoadImage');
        $("#loading-image-annualrevenue").loadImager('appendImage');

        $('#annualrevenueForm').validationEngine('hide');
        
        $("#loading-image-annualrevenue").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert AnnualRevenue Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 15/08/2018
    */

    window.insertAnnualRevenueWrapper = function (e) {
        e.preventDefault();

        if ($("#annualrevenueForm").validationEngine('validate')) {

            insertAnnualRevenue();
        }
        return false;
    }


    /**
    * Fill AnnualRevenue form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 15/08/2018
    */

    window.fillAnnualRevenueForm = function (data) {
        $("#loading-image-annualrevenue").loadImager('removeLoadImage');
        $("#loading-image-annualrevenue").loadImager('appendImage');

        document.getElementById("txt-annualrevenue-name").value = data.Employee;
    
        $("#loading-image-annualrevenue").loadImager('removeLoadImage');

        return false;
    }
});

