/*
* vehiclekittype Form
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
    * vehiclekitmodel LoadImager
    * @author Gül Özdemir
    * @since 23/10/2018
    */
    //to vehiclekitmodel form
    $("#loading-image-vehiclekitmodel").loadImager();
    //to ehicle kit-model form grid loading-image
    $("#loading-image-vehiclekitmodelGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#vehiclekitmodelForm').validationEngine();


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


    $("#gridContainer_vehiclekitmodel").dxDataGrid({

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
            caption: "Vehicle Kit Type",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillVehicleKitTypeForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertVehiclekittype
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/08/2018
 */

    window.insertVehicleKitModel = function () {
        $("#loading-image-vehiclekitmodel").loadImager('removeLoadImage');
        $("#loading-image-vehiclekitmodel").loadImager('appendImage');

        var vehiclekitmodel_name = $('#txt-vehiclekitmodel-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysvehiclekittype',
                
                name: vehiclekittype_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'vehiclekittype Ekleme İşlemi Başarısız...',
                    'vehiclekittype Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-vehiclekittype").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#vehiclekittypeForm')[0].reset();

                        $("#loading-image-vehiclekittype").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'vehiclekittype Kayıt İşlemi Başarılı...',
                    'vehiclekittype kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-vehiclekittype").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'vehiclekittype Kayıt İşlemi Başarısız...',
                    'vehiclekittype kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysvehiclekittype" servis datası boştur!!');
                $("#loading-image-vehiclekittype").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'vehiclekittype Kayıt İşlemi Başarısız...',
                    'vehiclekittype kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysvehiclekittype" servis datası boştur!!');
                $("#loading-image-vehiclekittype").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-vehiclekittype").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#vehiclekittypeForm')[0].reset();
                        $("#loading-image-vehiclekittype").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Marka kaydı yapılmıştır, yeni bir Marka kaydı deneyiniz... ');
                $("#loading-image-vehiclekittype").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset vehiclekittype Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/08/2018
 */

    window.resetVehicleKitModelForm = function () {
        $("#loading-image-vehiclekitmodel").loadImager('removeLoadImage');
        $("#loading-image-vehiclekitmodel").loadImager('appendImage');

        $('#vehiclekitmodelForm').validationEngine('hide');
        
        $("#loading-image-vehiclekitmodel").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert vehiclekittype Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 14/08/2018
    */

    window.insertVehicleKitTypeWrapper = function (e) {
        e.preventDefault();

        if ($("#vehiclekitmodelForm").validationEngine('validate')) {

            insertVehicleKitModel();
        }
        return false;
    }


    /**
    * Fill VehicleKitType form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/08/2018
    */

    window.fillVehicleKitModelForm = function (data) {
        $("#loading-image-vehiclekitmodel").loadImager('removeLoadImage');
        $("#loading-image-vehiclekitmodel").loadImager('appendImage');

        document.getElementById("txt-vehiclekitmodel-name").value = data.Employee;
    
        $("#loading-image-vehiclekitmodel").loadImager('removeLoadImage');

        return false;
    }
});

