/*
* Segment Form
* @author Gül Özdemir
* @since 14/08/2016
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
    * Segment LoadImager
    * @author Gül Özdemir
    * @since 14/08/2016
    */
    //to segment form
    $("#loading-image-segment").loadImager();
    //to segment form grid loading-image
    $("#loading-image-segmentGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);
    

    $('#segmentForm').validationEngine();


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


    $("#gridContainer_segment").dxDataGrid({

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
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillSegmentForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertSegment
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/08/2018
 */

    window.insertSegment = function () {
        $("#loading-image-segment").loadImager('removeLoadImage');
        $("#loading-image-segment").loadImager('appendImage');

        var segment_name = $('#txt-segment-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_syssegment',
                
                name: segment_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Segment Ekleme İşlemi Başarısız...',
                    'Segment Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-segment").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#segmentForm')[0].reset();

                        $("#loading-image-segment").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Segment Kayıt İşlemi Başarılı...',
                    'Segment kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-segment").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Segment Kayıt İşlemi Başarısız...',
                    'Segment kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysSegment" servis datası boştur!!');
                $("#loading-image-segment").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Segment Kayıt İşlemi Başarısız...',
                    'Segment kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysSegment" servis datası boştur!!');
                $("#loading-image-segment").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-segment").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#SegmentForm')[0].reset();
                        $("#loading-image-segment").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile segment Kişi kaydı yapılmıştır, yeni bir segment kaydı deneyiniz... ');
                $("#loading-image-segment").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset Segment Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/08/2018
 */

    window.resetSegmentForm = function () {
        $("#loading-image-segment").loadImager('removeLoadImage');
        $("#loading-image-segment").loadImager('appendImage');

        $('#segmentForm').validationEngine('hide');
        
        $("#loading-image-segment").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Segment Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 14/08/2018
    */

    window.insertSegmentWrapper = function (e) {
        e.preventDefault();

        if ($("#segmentForm").validationEngine('validate')) {

            insertSegment();
        }
        return false;
    }


    /**
    * Fill Segment form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 14/08/2018
    */

    window.fillSegmentForm = function (data) {
        $("#loading-image-segment").loadImager('removeLoadImage');
        $("#loading-image-segment").loadImager('appendImage');

        document.getElementById("txt-segment-name").value = data.Employee;
    
        $("#loading-image-segment").loadImager('removeLoadImage');
       
        return false;
    }
});

