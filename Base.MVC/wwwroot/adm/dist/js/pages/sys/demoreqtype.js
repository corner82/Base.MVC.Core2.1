/*
* Demo Request Type Form
* @author Ceydacan Seyrek
* @since 15/08/2018
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
    * Demo Request Type LoadImager
    * @author Ceydacan Seyrek
    * @since 13/08/2018
    */
    //to Demo Request Type form
    $("#loading-image-DemoReqType").loadImager();
    //to Demo Request Type form grid loading-image
    $("#loading-image-DemoReqTypeGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);

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


    $("#gridContainer_DemoReqType").dxDataGrid({

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
            //allowAdding: true,
            //allowUpdating: true,
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
            caption: "Demo Request Type",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillDemoReqTypeForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * Demo Request Type Mileage
 * @author Ceydacan Seyrek
 * @since 15/08/2018
 */

    window.insertDemoReqType = function () {
        $("#loading-image-DemoReqType").loadImager('removeLoadImage');
        $("#loading-image-DemoReqType").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-country-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysDemoReqType',
                
                name: warrantyMileage_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Demo Request Type Ekleme İşlemi Başarısız...',
                    'Demo Request Type Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-DemoReqType").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#DemoReqTypeForm')[0].reset();

                        $("#loading-image-DemoReqType").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Demo Request Type Kayıt İşlemi Başarılı...',
                    'Demo Request Type kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-DemoReqType").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Demo Request Type Kayıt İşlemi Başarısız...',
                    'Demo Request Type kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-DemoReqType").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Demo Request Type Kayıt İşlemi Başarısız...',
                    'Demo Request Type kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-DemoReqType").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-DemoReqType").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-DemoReqType").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Demo Request Type kaydı yapılmıştır, yeni bir Demo Request Type kaydı deneyiniz... ');
                $("#loading-image-DemoReqType").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset Demo Request Type Form
 * @author Ceydacan Seyrek
 * @since 15/08/2018
 */

    window.resetDemoReqTypeForm = function () {
        $("#loading-image-DemoReqType").loadImager('removeLoadImage');
        $("#loading-image-DemoReqType").loadImager('appendImage');

        $('#DemoReqTypeForm').validationEngine('hide');
        
        $("#loading-image-DemoReqType").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Demo Request Type Wrapper
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.insertDemoReqTypeWrapper = function (e) {
        e.preventDefault();

        if ($("#DemoReqTypeForm").validationEngine('validate')) {

            insertDemoReqType();
        }
        return false;
    }


    /**
    * Fill Demo Request Type form
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.fillDemoReqTypeForm = function (data) {
        $("#loading-image-DemoReqType").loadImager('removeLoadImage');
        $("#loading-image-DemoReqType").loadImager('appendImage');

        document.getElementById("txt-DemoReqType-name").value = data.SaleAmount;
    
        $("#loading-image-DemoReqType").loadImager('removeLoadImage');

        return false;
    }
});

