$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'Ýþleme devam et'
    });

    /*
    * datepicker format
    * @author Ceydacan Seyrek
    * @since 08/08/2018
    */
    $('#end-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#start-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });
    /*
    * Fxrate LoadImager
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */
    //to Fxrate form
    $("#loading-image-Fxrate").loadImager();

    //to Fxrate form grid loading-image
    $("#loading-image-FxrateGrid").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);

    $('#FxrateForm').validationEngine();


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


    $("#gridContainer_Fxrate").dxDataGrid({

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
            caption: window.lang.translate('Fxrate start date') + "...",
            dataField: "OrderDate"
        }, {
            caption: window.lang.translate('Fxrate end date') + "...",
            dataField: "OrderDate"
        }, {
            caption: window.lang.translate('Fxrate') + "...",
            dataField: "SaleAmount"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillFxrateForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
 * insert Fxrate
 * @returns {undefined}
 * @author Ceydacan Seyrek
 * @since 14/08/2018
 */

    window.insertFxrateType = function () {
        $("#loading-image-Fxrate").loadImager('removeLoadImage');
        $("#loading-image-Fxrate").loadImager('appendImage');

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysFxrate',

                name: Fxrate_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Fxrate Ekleme Ýþlemi Baþarýsýz...',
                    'Fxrate Ekleme Ýþlemi Baþarýsýz..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatasý->' + textStatus);
                $("#loading-image-Fxrate").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#modelForm')[0].reset();

                        $("#loading-image-Fxrate").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Fxrate Kayýt Ýþlemi Baþarýlý...',
                    'Fxrate kayýt iþlemini gerçekleþtirdiniz... ',
                    data);
                $("#loading-image-Fxrate").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Fxrate Kayýt Ýþlemi Baþarýsýz...',
                    'Fxrate kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datasý boþtur!!');
                $("#loading-image-Fxrate").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Fxrate Kayýt Ýþlemi Baþarýsýz...',
                    'Fxrate kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datasý boþtur!!');
                $("#loading-image-Fxrate").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-Fxrate").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $("#loading-image-Fxrate").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayýt Ýþlemi Baþarýsýz...',
                    'Ayný isim ile Fxrate kaydý yapýlmýþtýr, yeni bir Fxrate kaydý deneyiniz... ');
                $("#loading-image-Fxrate").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
    /**
    * reset Fxrate Form
    * @returns {undefined}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.resetFxrateForm = function () {
        $("#loading-image-Fxrate").loadImager('removeLoadImage');
        $("#loading-image-Fxrate").loadImager('appendImage');

        $('#FxrateForm').validationEngine('hide');

        $("#loading-image-Fxrate").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Fxrate Wrapper
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.insertFxrateWrapper = function (e) {
        e.preventDefault();

        if ($("#FxrateForm").validationEngine('validate')) {

            insertFxrate();
        }
        return false;
    }


    /**
    * Fill Fxrate form
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.fillFxrateForm = function (data) {
        $("#loading-image-Fxrate").loadImager('removeLoadImage');
        $("#loading-image-Fxrate").loadImager('appendImage');

        document.getElementById("start-datepicker").value = data.OrderDate;
        document.getElementById("end-datepicker").value = data.OrderDate;
        document.getElementById("txt-fxrate-name").value = data.SaleAmount;
        

        $("#loading-image-Fxrate").loadImager('removeLoadImage');

        return false;
    }
});

