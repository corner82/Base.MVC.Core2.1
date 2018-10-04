/*
* Brand Form
* @author Gül Özdemir
* @since 13/08/2016
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
    * Brand LoadImager
    * @author Gül Özdemir
    * @since 13/08/2016
    */
    //to brand form
    $("#loading-image-brand").loadImager();
    //to brand form grid loading-image
    $("#loading-image-brandGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#brandForm').validationEngine();


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


    $("#gridContainer_brand").dxDataGrid({

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
            caption: "Brand",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillBrandForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertBrand
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 13/08/2018
 */

    window.insertBrand = function () {
        $("#loading-image-brand").loadImager('removeLoadImage');
        $("#loading-image-brand").loadImager('appendImage');

        var brand_name = $('#txt-brand-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysbrand',
                
                name: brand_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Brand Ekleme İşlemi Başarısız...',
                    'Brand Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-brand").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#brandForm')[0].reset();

                        $("#loading-image-brand").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Brand Kayıt İşlemi Başarılı...',
                    'Brand kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-brand").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Brand Kayıt İşlemi Başarısız...',
                    'Brand kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysBrand" servis datası boştur!!');
                $("#loading-image-brand").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Brand Kayıt İşlemi Başarısız...',
                    'Brand kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysBrand" servis datası boştur!!');
                $("#loading-image-brand").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-brand").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#brandForm')[0].reset();
                        $("#loading-image-brand").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Marka kaydı yapılmıştır, yeni bir Marka kaydı deneyiniz... ');
                $("#loading-image-brand").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset Brand Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 13/08/2018
 */

    window.resetBrandForm = function () {
        $("#loading-image-brand").loadImager('removeLoadImage');
        $("#loading-image-brand").loadImager('appendImage');

        $('#brandForm').validationEngine('hide');
        
        $("#loading-image-brand").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Brand Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/08/2018
    */

    window.insertBrandWrapper = function (e) {
        e.preventDefault();

        if ($("#brandForm").validationEngine('validate')) {

            insertBrand();
        }
        return false;
    }


    /**
    * Fill Brand form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/08/2018
    */

    window.fillBrandForm = function (data) {
        $("#loading-image-brand").loadImager('removeLoadImage');
        $("#loading-image-brand").loadImager('appendImage');

        document.getElementById("txt-brand-name").value = data.Employee;
    
        $("#loading-image-brand").loadImager('removeLoadImage');

        return false;
    }
});

