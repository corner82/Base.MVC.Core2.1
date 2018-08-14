/*
* Vehicle Model Form
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
    * Vehicle Model LoadImager
    * @author Gül Özdemir
    * @since 14/08/2016
    */
    //to vehiclemodel form
    $("#loading-image-vehiclemodel").loadImager();
    //to vehiclemodel form grid loading-image
    $("#loading-image-vehiclemodelGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#vehiclemodelForm').validationEngine();


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


    $("#gridContainer_vehiclemodel").dxDataGrid({

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
            caption: "Vehicle Model",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillVehicleModelForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertVehicleModel
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/08/2018
 */

    window.insertVehicleModel = function () {
        $("#loading-image-vehiclemodel").loadImager('removeLoadImage');
        $("#loading-image-vehiclemodel").loadImager('appendImage');

        var vehiclemodel_name = $('#txt-vehiclemodel-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysvehiclemodel',
                
                name: vehiclemodel_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'vehiclemodel Ekleme İşlemi Başarısız...',
                    'vehiclemodel Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-vehiclemodel").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#vehiclemodelForm')[0].reset();

                        $("#loading-image-vehiclemodel").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'vehiclemodel Kayıt İşlemi Başarılı...',
                    'vehiclemodel kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-vehiclemodel").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'vehiclemodel Kayıt İşlemi Başarısız...',
                    'vehiclemodel kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysvehiclemodel" servis datası boştur!!');
                $("#loading-image-vehiclemodel").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'vehiclemodel Kayıt İşlemi Başarısız...',
                    'vehiclemodel kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysvehiclemodel" servis datası boştur!!');
                $("#loading-image-vehiclemodel").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-vehiclemodel").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#vehiclemodelForm')[0].reset();
                        $("#loading-image-vehiclemodel").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Marka kaydı yapılmıştır, yeni bir Marka kaydı deneyiniz... ');
                $("#loading-image-vehiclemodel").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset vehiclemodel Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/08/2018
 */

    window.resetVehicleModelForm = function () {
        $("#loading-image-vehiclemodel").loadImager('removeLoadImage');
        $("#loading-image-vehiclemodel").loadImager('appendImage');

        $('#vehiclemodelForm').validationEngine('hide');
        
        $("#loading-image-vehiclemodel").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert VehicleModel Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 14/08/2018
    */

    window.insertVehicleModelWrapper = function (e) {
        e.preventDefault();

        if ($("#vehiclemodelForm").validationEngine('validate')) {

            insertVehicleModel();
        }
        return false;
    }


    /**
    * Fill VehicleModel form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 14/08/2018
    */

    window.fillVehicleModelForm = function (data) {
        $("#loading-image-vehiclemodel").loadImager('removeLoadImage');
        $("#loading-image-vehiclemodel").loadImager('appendImage');

        document.getElementById("txt-vehiclemodel-name").value = data.Employee;
    
        $("#loading-image-vehiclemodel").loadImager('removeLoadImage');

        return false;
    }
});

