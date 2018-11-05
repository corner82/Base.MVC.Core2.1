/*
* Park Off Type Form
* @author Ceydacan Seyrek
* @since 15/08/2018
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
    * Park Off Type LoadImager
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */
    //to warranty mileage form
    $("#loading-image-parkoff").loadImager();
    //to warranty mileage form grid loading-image
    $("#loading-image-parkoffGrid").loadImager();

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


    $("#gridContainer_parkoff").dxDataGrid({

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
            caption: window.lang.translate('Park off name') + "...",
            dataField: "StoreCity"
        }, {
            caption: window.lang.translate('Park off day') + "...",
            dataField: "SaleAmount"
        }, {
            caption: window.lang.translate('Park off comment') + "...",
            dataField: "StoreState"
            }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillparkoffForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
 * insertPark Off Type
 * @author Ceydacan Seyrek
 * @since 15/08/2018
 */

    window.insertparkoff = function () {
        $("#loading-image-parkoff").loadImager('removeLoadImage');
        $("#loading-image-parkoff").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-country-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysparkoff',

                name: warrantyMileage_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Park Off Type Ekleme Ýþlemi Baþarýsýz...',
                    'Park Off Type Ekleme Ýþlemi Baþarýsýz..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatasý->' + textStatus);
                $("#loading-image-parkoff").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#parkoffForm')[0].reset();

                        $("#loading-image-parkoff").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Park Off Type Kayýt Ýþlemi Baþarýlý...',
                    'Park Off Type kayýt iþlemini gerçekleþtirdiniz... ',
                    data);
                $("#loading-image-parkoff").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Park Off Type Kayýt Ýþlemi Baþarýsýz...',
                    'Park Off Type kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datasý boþtur!!');
                $("#loading-image-parkoff").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Park Off Type Kayýt Ýþlemi Baþarýsýz...',
                    'Park Off Type kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datasý boþtur!!');
                $("#loading-image-parkoff").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-parkoff").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-parkoff").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayýt Ýþlemi Baþarýsýz...',
                    'Ayný isim ile Park Off Type kaydý yapýlmýþtýr, yeni bir Park Off Type kaydý deneyiniz... ');
                $("#loading-image-parkoff").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
    /**
    * reset Park Off Type Form
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.resetparkoffForm = function () {
        $("#loading-image-parkoff").loadImager('removeLoadImage');
        $("#loading-image-parkoff").loadImager('appendImage');

        $('#parkoffForm').validationEngine('hide');

        $("#loading-image-parkoff").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Park Off Type Wrapper
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.insertparkoffWrapper = function (e) {
        e.preventDefault();

        if ($("#parkoffForm").validationEngine('validate')) {

            insertparkoff();
        }
        return false;
    }


    /**
    * Fill Park Off Type form
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.fillparkoffForm = function (data) {
        $("#loading-image-parkoff").loadImager('removeLoadImage');
        $("#loading-image-parkoff").loadImager('appendImage');

        document.getElementById("txt-parkoff-name").value = data.StoreCity;
        document.getElementById("txt-parkoffday-name").value = data.SaleAmount;
        document.getElementById("txt-parkoffcomment-name").value = data.StoreState;

        $("#loading-image-parkoff").loadImager('removeLoadImage');

        return false;
    }
});

