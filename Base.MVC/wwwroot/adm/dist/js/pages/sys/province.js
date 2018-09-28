
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
    * Province LoadImager
    * @author Gül Özdemir
    * @since 13/08/2016
    */
    //to province form
    $("#loading-image-province").loadImager();

    //to country form
    $("#loading-image-country").loadImager();

    //to province form grid loading-image
    $("#loading-image-provinceGrid").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);

    $('#provinceForm').validationEngine();

    var cbdata_country = [{}];

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



    $('#loading-image-country').loadImager('removeLoadImage');
    $("#loading-image-country").loadImager('appendImage');

    var ajaxACLResources_country = $('#ajaxACL-country').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_country.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-country').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCountry').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-country").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-country').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Ülke bulunamamıştır...'), window.lang.translate('Ülke  bulunamamıştır...'));
        },
    })
    ajaxACLResources_country.ajaxCallWidget('call');


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


    $("#gridContainer_province").dxDataGrid({

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
            caption: "Country",
            dataField: "StoreCity"
        },{
            caption: "Province",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillProvinceForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
 * insertCountry
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 13/08/2018
 */

    window.insertCountry = function () {
        $("#loading-image-province").loadImager('removeLoadImage');
        $("#loading-image-province").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-country-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_syscountry',

                name: country_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Country Ekleme İşlemi Başarısız...',
                    'Country Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-province").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#countryForm')[0].reset();

                        $("#loading-image-province").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Country Kayıt İşlemi Başarılı...',
                    'Country kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-province").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-province").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-provincey").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-province").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-province").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Ülke Kişi kaydı yapılmıştır, yeni birÜlke kaydı deneyiniz... ');
                $("#loading-image-province").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
    /**
    * reset Country Form
    * @returns {undefined}
    * @author Gül Özdemir
    * @since 13/08/2018
    */

    window.resetProvinceForm = function () {
        $("#loading-image-province").loadImager('removeLoadImage');
        $("#loading-image-province").loadImager('appendImage');

        $('#provinceForm').validationEngine('hide');
        $('#dropdownCountry').ddslick('select', { index: String(0) });

        $("#loading-image-province").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Country Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/08/2018
    */

    window.insertCountryWrapper = function (e) {
        e.preventDefault();

        if ($("#provinceForm").validationEngine('validate')) {

            insertProvince();
        }
        return false;
    }


    /**
    * Fill Country form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/08/2018
    */

    window.fillProvinceForm = function (data) {
        $("#loading-image-province").loadImager('removeLoadImage');
        $("#loading-image-province").loadImager('appendImage');

        $('#dropdownCountry').ddslick('select', { index: 3 });
        document.getElementById("txt-province-name").value = data.StoreCity;

        $("#loading-image-province").loadImager('removeLoadImage');

        return false;
    }
});

