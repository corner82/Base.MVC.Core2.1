/*
* Total Number of Employes Form
* @author Gül Özdemir
* @since 14/08/2016
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
    * Total Number of Employes LoadImager
    * @author Gül Özdemir
    * @since 14/08/2016
    */
    //to Total Number of Employes form
    $("#loading-image-tnofemployes").loadImager();
    //to Total Number of Employes form grid loading-image
    $("#loading-image-tnofemployesGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#tnofemployesForm').validationEngine();


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


    $("#gridContainer_tnofemployes").dxDataGrid({

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
            caption: "Total Number of  Employes",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillTNofEmployesForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertTNofEmployes
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/08/2018
 */

    window.insertTNofEmployes = function () {
        $("#loading-image-tnofemployes").loadImager('removeLoadImage');
        $("#loading-image-tnofemployes").loadImager('appendImage');

        var tnofemployes_name = $('#txt-tnofemployes-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_systnofemployes',
                
                name: tnofemployes_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'tnofemployes Ekleme İşlemi Başarısız...',
                    'tnofemployes Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-tnofemployes").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#tnofemployesForm')[0].reset();

                        $("#loading-image-tnofemployes").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'tnofemployes Kayıt İşlemi Başarılı...',
                    'tnofemployes kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-tnofemployes").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'tnofemployes Kayıt İşlemi Başarısız...',
                    'tnofemployes kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_systnofemployes" servis datası boştur!!');
                $("#loading-image-tnofemployes").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'tnofemployes Kayıt İşlemi Başarısız...',
                    'tnofemployes kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_systnofemployes" servis datası boştur!!');
                $("#loading-image-tnofemployes").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-tnofemployes").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#tnofemployesForm')[0].reset();
                        $("#loading-image-tnofemployes").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Marka kaydı yapılmıştır, yeni bir Marka kaydı deneyiniz... ');
                $("#loading-image-tnofemployes").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset tnofemployes Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 13/08/2018
 */

    window.resetTNofEmployesForm = function () {
        $("#loading-image-tnofemployes").loadImager('removeLoadImage');
        $("#loading-image-tnofemployes").loadImager('appendImage');

        $('#tnofemployesForm').validationEngine('hide');
        
        $("#loading-image-tnofemployes").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert tnofemployes Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 14/08/2018
    */

    window.insertTNofEmployesWrapper = function (e) {
        e.preventDefault();

        if ($("#tnofemployesForm").validationEngine('validate')) {

            insertTNofEmployes();
        }
        return false;
    }


    /**
    * Fill tnofemployes form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 14/08/2018
    */

    window.fillTNofEmployesForm = function (data) {
        $("#loading-image-tnofemployes").loadImager('removeLoadImage');
        $("#loading-image-tnofemployes").loadImager('appendImage');

        document.getElementById("txt-tnofemployes-name").value = data.Employee;
    
        $("#loading-image-tnofemployes").loadImager('removeLoadImage');

        return false;
    }
});

