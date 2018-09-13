/*
* Supplier Form
* @author Gül Özdemir
* @since 13/09/2018
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
    * Supplier LoadImager
    * @author Gül Özdemir
    * @since 13/09/2018
    */
    //to supplier form
    $("#loading-image-supplier").loadImager();
    //to supplier form grid loading-image
    $("#loading-image-supplierGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#supplierForm').validationEngine();


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


    $("#gridContainer_supplier").dxDataGrid({

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
            caption: "Supplier name",
            dataField: "StoreState"
        },{
            caption: "Supplier short name",
            dataField: "StoreCity"
        }
        ],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillSupplierForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertSupplier
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 13/09/2018
 */

    window.insertSupplier = function () {
        $("#loading-image-supplier").loadImager('removeLoadImage');
        $("#loading-image-supplier").loadImager('appendImage');

        var supplier_name = $('#txt-supplier-name').val();
        var supplier_shortname = $('#txt-supplier-shortname').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_syssupplier',
                
                name: supplier_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'supplier Ekleme İşlemi Başarısız...',
                    'supplier Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_syssupplier" servis hatası->' + textStatus);
                $("#loading-image-supplier").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#supplierForm')[0].reset();

                        $("#loading-image-supplier").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Supplier Kayıt İşlemi Başarılı...',
                    'supplier kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-supplier").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'supplier Kayıt İşlemi Başarısız...',
                    'supplier kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysSupplier" servis datası boştur!!');
                $("#loading-image-supplier").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'supplier Kayıt İşlemi Başarısız...',
                    'supplier kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_syssupplier" servis datası boştur!!');
                $("#loading-image-supplier").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-supplier").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#supplierForm')[0].reset();
                        $("#loading-image-supplier").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile supplier kaydı yapılmıştır, yeni bir Marka kaydı deneyiniz... ');
                $("#loading-image-supplier").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset Supplier Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 13/08/2018
 */

    window.resetSupplierForm = function () {
        $("#loading-image-supplier").loadImager('removeLoadImage');
        $("#loading-image-supplier").loadImager('appendImage');

        $('#supplierForm').validationEngine('hide');
        
        $("#loading-image-supplier").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Supplier Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.insertSupplierWrapper = function (e) {
        e.preventDefault();

        if ($("#supplierForm").validationEngine('validate')) {

            insertSupplier();
        }
        return false;
    }


    /**
    * Fill Supplier form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.fillSupplierForm = function (data) {
        $("#loading-image-supplier").loadImager('removeLoadImage');
        $("#loading-image-supplier").loadImager('appendImage');

        document.getElementById("txt-supplier-name").value = data.Employee;
        document.getElementById("txt-supplier-shortname").value = data.Employee;
    
        $("#loading-image-supplier").loadImager('removeLoadImage');

        return false;
    }
});

