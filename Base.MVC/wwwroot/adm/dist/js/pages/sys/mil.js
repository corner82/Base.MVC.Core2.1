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
    * Mil LoadImager
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */
    //to mil form
    $("#loading-image-mil").loadImager();

    //to milType form
    $("#loading-image-milType").loadImager();

    //to mil form grid loading-image
    $("#loading-image-milGrid").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);

    $('#milForm').validationEngine();

    var cbdata_milType = [{}];

    var cbdata = [
        {
            text: 'Search...',
            value: 1,
            selected: true
        },
        {
            text: "Warranty",
            value: 2,
            selected: false
        },
        {
            text: "BuyBack",
            value: 3,
            selected: false
        },
        {
            text: "TradeBack",
            value: 4,
            selected: false
        },
        {
            text: "R&M",
            value: 5,
            selected: false
        }
    ];



    $('#loading-image-milType').loadImager('removeLoadImage');
    $("#loading-image-milType").loadImager('appendImage');

    var ajaxACLResources_milType = $('#ajaxACL-milType').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_milType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-milType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownMilType').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-milType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-milType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Country not found...'), window.lang.translate('Country not found...'));
        },
    })
    ajaxACLResources_milType.ajaxCallWidget('call');


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


    $("#gridContainer_mil").dxDataGrid({

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
            caption: "Mil Type",
            dataField: "StoreCity"
        }, {
            caption: "Mil",
            dataField: "StoreState"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillMilForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
 * insert mil
 * @returns {undefined}
 * @author Ceydacan Seyrek
 * @since 14/08/2018
 */

    window.insertmilType = function () {
        $("#loading-image-mil").loadImager('removeLoadImage');
        $("#loading-image-mil").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-milType-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysmilType',

                name: milType_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'mil Ekleme İşlemi Başarısız...',
                    'mil Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-mil").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#modelForm')[0].reset();

                        $("#loading-image-mil").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'mil Kayıt İşlemi Başarılı...',
                    'milType kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-mil").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'mil Kayıt İşlemi Başarısız...',
                    'mil kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-mil").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'mil Kayıt İşlemi Başarısız...',
                    'Mil kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-milType").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-mil").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-mil").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile mil kaydı yapılmıştır, yeni bir mil kaydı deneyiniz... ');
                $("#loading-image-mil").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
    /**
    * reset milType Form
    * @returns {undefined}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.resetMilForm = function () {
        $("#loading-image-mil").loadImager('removeLoadImage');
        $("#loading-image-mil").loadImager('appendImage');

        $('#milForm').validationEngine('hide');
        $('#dropdownMilType').ddslick('select', { index: String(0) });

        $("#loading-image-mil").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert milType Wrapper
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.insertmilTypeWrapper = function (e) {
        e.preventDefault();

        if ($("#milForm").validationEngine('validate')) {

            insertMil();
        }
        return false;
    }


    /**
    * Fill milType form
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.fillMilForm = function (data) {
        $("#loading-image-mil").loadImager('removeLoadImage');
        $("#loading-image-mil").loadImager('appendImage');

        $('#dropdownMilType').ddslick('select', { index: 3 });
        document.getElementById("txt-mil-name").value = data.StoreCity;

        $("#loading-image-mil").loadImager('removeLoadImage');

        return false;
    }
});

