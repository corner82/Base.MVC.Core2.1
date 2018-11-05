/*
* Warranty Type Form
* @author Ceydacan Seyrek
* @since 13/08/2018
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
    * Warranty Type LoadImager
    * @author Ceydacan Seyrek
    * @since 13/08/2018
    */
    //to Warranty Type form
    $("#loading-image-wrType").loadImager();
    //to Warranty Type form grid loading-image
    $("#loading-image-wrTypeGrid").loadImager();

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


    $("#gridContainer_wrType").dxDataGrid({

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
            caption: window.lang.translate('Warranty Type') + "...",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillwrTypeForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
 * insert Warranty Type
 * @author Ceydacan Seyrek
 * @since 13/08/2018
 */

    window.insertwrTypel = function () {
        $("#loading-image-wrType").loadImager('removeLoadImage');
        $("#loading-image-wrType").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-wrType-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_syswrmil',

                name: warrantyType_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Warranty Type Ekleme Ýþlemi Baþarýsýz...',
                    'Warranty Type Ekleme Ýþlemi Baþarýsýz..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatasý->' + textStatus);
                $("#loading-image-wrType").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#wrMilForm')[0].reset();

                        $("#loading-image-wrType").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Warranty Type Kayýt Ýþlemi Baþarýlý...',
                    'Warranty Type kayýt iþlemini gerçekleþtirdiniz... ',
                    data);
                $("#loading-image-wrType").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Warranty Type Kayýt Ýþlemi Baþarýsýz...',
                    'Warranty Type kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datasý boþtur!!');
                $("#loading-image-wrType").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Warranty Type Kayýt Ýþlemi Baþarýsýz...',
                    'Warranty Type kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datasý boþtur!!');
                $("#loading-image-wrType").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-wrMil").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-wrType").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayýt Ýþlemi Baþarýsýz...',
                    'Ayný isim ile Warranty Type kaydý yapýlmýþtýr, yeni bir Warranty Type kaydý deneyiniz... ');
                $("#loading-image-wrType").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
    /**
    * reset warranty Type Form
    * @author Ceydacan Seyrek
    * @since 13/08/2018
    */

    window.resetwrTypeForm = function () {
        $("#loading-image-wrType").loadImager('removeLoadImage');
        $("#loading-image-wrType").loadImager('appendImage');

        $('#wrTypeForm').validationEngine('hide');

        $("#loading-image-wrType").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Warranty Type Wrapper
    * @author Ceydacan Seyrek
    * @since 13/08/2018
    */

    window.insertwrTypeWrapper = function (e) {
        e.preventDefault();

        if ($("#wrTypeForm").validationEngine('validate')) {

            insertwrType();
        }
        return false;
    }


    /**
    * Fill Warranty Type form
    * @author Ceydacan Seyrek
    * @since 13/08/2018
    */

    window.fillwrTypeForm = function (data) {
        $("#loading-image-wrType").loadImager('removeLoadImage');
        $("#loading-image-wrType").loadImager('appendImage');

        document.getElementById("txt-wrType-name").value = data.StoreCity;

        $("#loading-image-wrType").loadImager('removeLoadImage');

        return false;
    }
});

