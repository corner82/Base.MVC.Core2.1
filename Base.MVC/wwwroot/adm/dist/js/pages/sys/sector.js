
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
    * Sector LoadImager
    * @author Gül Özdemir
    * @since 13/08/2016
    */
    //to sector form
    $("#loading-image-sector").loadImager();

    //to segment form
    $("#loading-image-segment").loadImager();

    //to state form grid loading-image
    $("#loading-image-sectorGrid").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);

    $('#sectorForm').validationEngine();

    var cbdata_segment = [{}];

    var cbdata = [
        {
            text: 'Search...',
            value: 1,
            selected: true
        },
        {
            text: "South Africa",
            value: 2,
            selected: false
        },
        {
            text: "Turkey",
            value: 3,
            selected: false
        },
        {
            text: "Germany",
            value: 4,
            selected: false
        }
    ];



    $('#loading-image-segment').loadImager('removeLoadImage');
    $("#loading-image-segment").loadImager('appendImage');

    var ajaxACLResources_segment = $('#ajaxACL-segment').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_segment.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-segment').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownSegment').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-segment").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-segment').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Segment bulunamamıştır...'), window.lang.translate('Segment  bulunamamıştır...'));
        },
    })
    ajaxACLResources_segment.ajaxCallWidget('call');


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


    $("#gridContainer_sector").dxDataGrid({

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
            caption: "Segment",
            dataField: "StoreCity"
        },{
            caption: "Sector",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillStateForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
 * insertSector
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/08/2018
 */

    window.insertSector = function () {
        $("#loading-image-sector").loadImager('removeLoadImage');
        $("#loading-image-sector").loadImager('appendImage');

        var sector_name = $('#txt-sector-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_syscountry',

                name: sector_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Sector Ekleme İşlemi Başarısız...',
                    'Sector Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysSector" servis hatası->' + textStatus);
                $("#loading-image-sector").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#sectorForm')[0].reset();

                        $("#loading-image-sector").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Sector Kayıt İşlemi Başarılı...',
                    'Sector kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-sector").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Sector Kayıt İşlemi Başarısız...',
                    'Sector kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysSector" servis datası boştur!!');
                $("#loading-image-sector").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Sector Kayıt İşlemi Başarısız...',
                    'Sector kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysSector" servis datası boştur!!');
                $("#loading-image-sector").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-sector").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#sectorForm')[0].reset();
                        $("#loading-image-sector").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Sector kaydı yapılmıştır, yeni bir Sector kaydı deneyiniz... ');
                $("#loading-image-sector").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
    /**
    * reset Sector Form
    * @returns {undefined}
    * @author Gül Özdemir
    * @since 14/08/2018
    */

    window.resetSectorForm = function () {
        $("#loading-image-sector").loadImager('removeLoadImage');
        $("#loading-image-sector").loadImager('appendImage');

        $('#sectorForm').validationEngine('hide');
        $('#dropdownSegment').ddslick('select', { index: String(0) });

        $("#loading-image-sector").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Sector Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 14/08/2018
    */

    window.insertSectorWrapper = function (e) {
        e.preventDefault();

        if ($("#sectorForm").validationEngine('validate')) {

            insertState();
        }
        return false;
    }


    /**
    * Fill sector form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 14/08/2018
    */

    window.fillStateForm = function (data) {
        $("#loading-image-sector").loadImager('removeLoadImage');
        $("#loading-image-sector").loadImager('appendImage');

        $('#dropdownSector').ddslick('select', { index: 3 });
        document.getElementById("txt-sector-name").value = data.sector_name;

        $("#loading-image-sector").loadImager('removeLoadImage');

        return false;
    }
});

