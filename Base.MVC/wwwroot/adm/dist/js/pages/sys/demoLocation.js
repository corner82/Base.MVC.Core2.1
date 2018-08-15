/*
* Demo Location Form
* @author Ceydacan Seyrek
* @since 15/08/2018
*/
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazge�',
        actionButtonLabel: '��leme devam et'
    });


    /*
    * demo Location LoadImager
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */
    //to demo Location form
    $("#loading-image-demoLocation").loadImager();
    //to demo Location form grid loading-image
    $("#loading-image-demoLocationGrid").loadImager();

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


    $("#gridContainer_demoLocation").dxDataGrid({

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
            caption: "Demo Location",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                filldemoLocationForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
 * Demo Location
 * @author Ceydacan Seyrek
 * @since 15/08/2018
 */

    window.insertdemoLocation = function () {
        $("#loading-image-demoLocation").loadImager('removeLoadImage');
        $("#loading-image-demoLocation").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-demoLocation-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysdemoLocation',

                name: warrantyMileage_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Demo Location Ekleme ��lemi Ba�ar�s�z...',
                    'Demo Location Ekleme ��lemi Ba�ar�s�z..., sistem y�neticisi ile temasa ge�iniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatas�->' + textStatus);
                $("#loading-image-demoLocation").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#demoLocationForm')[0].reset();

                        $("#loading-image-demoLocation").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Demo Location Kay�t ��lemi Ba�ar�l�...',
                    'Demo Location kay�t i�lemini ger�ekle�tirdiniz... ',
                    data);
                $("#loading-image-demoLocation").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Demo Location Kay�t ��lemi Ba�ar�s�z...',
                    'Demo Location kay�t i�lemi ba�ar�s�z, sistem y�neticisi ile temasa ge�iniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datas� bo�tur!!');
                $("#loading-image-demoLocation").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Demo LocationKay�t ��lemi Ba�ar�s�z...',
                    'Demo Location kay�t i�lemi ba�ar�s�z, sistem y�neticisi ile temasa ge�iniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datas� bo�tur!!');
                $("#loading-image-demoLocation").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-demoLocation").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-demoLocation").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kay�t ��lemi Ba�ar�s�z...',
                    'Ayn� isim ile Demo Location  kayd� yap�lm��t�r, yeni bir Demo Location kayd� deneyiniz... ');
                $("#loading-image-demoLocation").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
    /**
    * reset demoLocation Form
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.resetdemoLocationForm = function () {
        $("#loading-image-demoLocation").loadImager('removeLoadImage');
        $("#loading-image-demoLocation").loadImager('appendImage');

        $('#demoLocationForm').validationEngine('hide');

        $("#loading-image-demoLocation").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert demoLocation Wrapper
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.insertdemoLocationWrapper = function (e) {
        e.preventDefault();

        if ($("#demoLocationForm").validationEngine('validate')) {

            insertdemoLocation();
        }
        return false;
    }


    /**
    * Fill demo Location form
    * @author Ceydacan Seyrek
    * @since 15/08/2018
    */

    window.filldemoLocationForm = function (data) {
        $("#loading-image-demoLocation").loadImager('removeLoadImage');
        $("#loading-image-demoLocation").loadImager('appendImage');

        document.getElementById("txt-demoLocation-name").value = data.StoreCity;

        $("#loading-image-demoLocation").loadImager('removeLoadImage');

        return false;
    }
});

