/*
* Total Number of Vehicles Form
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
    * Total Number of Vehicles LoadImager
    * @author Gül Özdemir
    * @since 14/08/2016
    */
    //to Total Number of Vehicles form
    $("#loading-image-tnofvehicles").loadImager();
    //to Total Number of Vehicles form grid loading-image
    $("#loading-image-tnofvehiclesGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#tnofvehiclesForm').validationEngine();


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


    $("#gridContainer_tnofvehicles").dxDataGrid({

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
            caption: "Total Number of Vehicles",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillTNofVehiclesForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertTNofVehicles
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/08/2018
 */

    window.insertTNofVehicles = function () {
        $("#loading-image-tnofvehicles").loadImager('removeLoadImage');
        $("#loading-image-tnofvehicles").loadImager('appendImage');

        var tnofvehicles_name = $('#txt-tnofvehicles-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_systnofvehicles',
                
                name: tnofvehicles_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'tnofvehicles Ekleme İşlemi Başarısız...',
                    'tnofvehicles Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_systnofvehicles" servis hatası->' + textStatus);
                $("#loading-image-tnofvehicles").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#tnofvehiclesForm')[0].reset();

                        $("#loading-image-tnofvehicles").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'tnofvehicles Kayıt İşlemi Başarılı...',
                    'tnofvehicles kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-tnofvehicles").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'tnofvehicles Kayıt İşlemi Başarısız...',
                    'tnofvehicles kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_systnofvehicles" servis datası boştur!!');
                $("#loading-image-tnofvehicles").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'tnofvehicles Kayıt İşlemi Başarısız...',
                    'tnofvehicles kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_systnofvehicles" servis datası boştur!!');
                $("#loading-image-tnofvehicles").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-tnofvehicles").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#tnofvehiclesForm')[0].reset();
                        $("#loading-image-tnofvehicles").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile tnofvehicles kaydı yapılmıştır, yeni bir tnofvehicles kaydı deneyiniz... ');
                $("#loading-image-tnofvehicles").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset tnofvehicles Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/08/2018
 */

    window.resetTNofVehiclesForm = function () {
        $("#loading-image-tnofvehicles").loadImager('removeLoadImage');
        $("#loading-image-tnofvehicles").loadImager('appendImage');

        $('#tnofvehiclesForm').validationEngine('hide');
        
        $("#loading-image-tnofvehicles").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert TNofVehicles Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 14/08/2018
    */

    window.insertTNofVehiclesWrapper = function (e) {
        e.preventDefault();

        if ($("#tnofvehiclesForm").validationEngine('validate')) {

            insertTNofVehicles();
        }
        return false;
    }


    /**
    * Fill tnofvehicles form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 14/08/2018
    */

    window.fillTNofVehiclesForm = function (data) {
        $("#loading-image-tnofvehicles").loadImager('removeLoadImage');
        $("#loading-image-tnofvehicles").loadImager('appendImage');

        document.getElementById("txt-tnofvehicles-name").value = data.Employee;
    
        $("#loading-image-tnofvehicles").loadImager('removeLoadImage');

        return false;
    }
});

