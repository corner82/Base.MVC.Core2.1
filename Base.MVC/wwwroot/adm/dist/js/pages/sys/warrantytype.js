$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'Ýþleme devam et'
    });

    var langCode = $("#langCode").val();
    //alert(langCode);


    var tab_active = function () {
        //Update & View Mode
        //enabled tabs

        $("a[data-toggle='tab'").prop('disabled', false);
        $("a[data-toggle='tab'").each(function () {
            $(this).attr('href', $(this).prop('data-href')); // restore original href
        });
        $("a[data-toggle='tab'").removeClass('disabled-link');
    }

    var tab_disable = function () {
        //Add new record
        //tablar kapatýlacak

        $("a[data-toggle='tab'").prop('disabled', true);
        $("a[data-toggle='tab'").each(function () {
            $(this).prop('data-href', $(this).attr('href')); // hold you original href
            $(this).attr('href', '#'); // clear href
        });
        $("a[data-toggle='tab'").addClass('disabled-link');

    }

    //tab_disable();
    /*
    * Fx Rate Info insert form validation engine attached to work
    * @author Ceydacan Seyrek
    * @since 08/08/2018
    */
    $('#fxrateInfoForm').validationEngine();
    $('#wrMilInfoForm').validationEngine();


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

    DevExpress.localization.locale("en");


    $("#gridContainer_wrName").dxDataGrid({

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
            mode: "row",
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
            placeholder: "Search..."
        },

        headerFilter: {
            visible: true
        },

        columnChooser: {
            enabled: true,
            mode: "select"
        },

        columns: [{
            allowGrouping: false,
            dataField: "OrderNumber",
            caption: "Invoice Number",
            width: 130
        }, {
            caption: "City",
            dataField: "StoreCity"
        }, {
            caption: "State",
            dataField: "StoreState"
        },
            "Employee", {
            dataField: "OrderDate",
            dataType: "date"
        }, {
            dataField: "SaleAmount",

        }],

        customizeColumns: function (columns) {
            columns[5].format = { type: "currency", currency: "EUR" };
        },

        summary: {
            totalItems: [{
                column: "OrderNumber",
                summaryType: "count"
            }, {
                column: "SaleAmount",
                summaryType: "sum",
                valueFormat: "currency"
            }]
        },

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {

                fillWrNameInfoForm(data);
            }
        }

    });
    $("#gridContainer_mileage").dxDataGrid({

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
            mode: "row",
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
            placeholder: "Search..."
        },

        headerFilter: {
            visible: true
        },

        columnChooser: {
            enabled: true,
            mode: "select"
        },

        columns: [{
            allowGrouping: false,
            dataField: "OrderNumber",
            caption: "Invoice Number",
            width: 130
        }, {
            caption: "City",
            dataField: "StoreCity"
        }, {
            caption: "State",
            dataField: "StoreState"
        },
            "Employee", {
            dataField: "OrderDate",
            dataType: "date"
        }, {
            dataField: "SaleAmount",

        }],

        customizeColumns: function (columns) {
            columns[5].format = { type: "currency", currency: "EUR" };
        },

        summary: {
            totalItems: [{
                column: "OrderNumber",
                summaryType: "count"
            }, {
                column: "SaleAmount",
                summaryType: "sum",
                valueFormat: "currency"
            }]
        },

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {

                fillMilInfoForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
    * insert FxrateInfo Wrapper
    * @returns {Boolean}
    * @since 02/08/2018
    */

    var insertWrNameInfoWrapper = function (e) {
        e.preventDefault();

        if ($("#wrNameInfoForm").validationEngine('validate')) {

            insertwrNameInfo();
        }
        return false;
    }

    var insertWrMilInfoWrapper = function (e) {
        e.preventDefault();

        if ($("#wrMilInfoForm").validationEngine('validate')) {

            insertwrMilInfo();
        }
        return false;
    }

    /**
    * insert FxrateInfo
    * @returns {undefined}
    * @since 02/08/2018
    */

    var insertwrNameInfo = function () {

        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        var cst_name = $('#txt-cst-name').val();

        var ddData_country = $('#dropdownCountry').data('ddslick')
        var country_id = ddData_country.selectedData.value;

        var ddData_city = $('#dropdownCity').data('ddslick')
        var city_id = ddData_city.selectedData.value;

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysCustomerInfo',
                name: cst_name,
                country_id: country_id,
                city_id: city_id,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müþteri Ekleme Ýþlemi Baþarýsýz...',
                    'Müþteri Ekleme Ýþlemi Baþarýsýz..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatasý->' + textStatus);
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#wrNameInfoForm')[0].reset();

                        $("#loading-image-cstInfo").loadImager('removeLoadImage');

                        $("#loading-image-fxrtInfoGrid").loadImager('removeLoadImage');
                        $("#loading-image-fxrtInfoGrid").loadImager('appendImage');

                        $('#gridContainer_wrName').refresh();   //test edilecek!

                        $("#loading-image-fxrtInfoGrid").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Müþteri Kayýt Ýþlemi Baþarýlý...',
                    'Müþteri kayýt iþlemini gerçekleþtirdiniz... ',
                    data);
                $("#loading-image-cstInfo").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müþteri Kayýt Ýþlemi Baþarýsýz...',
                    'Müþteri kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datasý boþtur!!');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müþteri Kayýt Ýþlemi Baþarýsýz...',
                    'Müþteri kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datasý boþtur!!');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#wrNameInfoForm')[0].reset();
                        $("#loading-image-cstInfo").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'ACL Yetki Kayýt Ýþlemi Baþarýsýz...',
                    'Ayný isim ile Müþteri  kaydý yapýlmýþtýr, yeni bir Müþteri kaydý deneyiniz... ');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }

    var insertwrMilInfo = function () {

        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        var cst_name = $('#txt-cst-name').val();

        var ddData_country = $('#dropdownCountry').data('ddslick')
        var country_id = ddData_country.selectedData.value;

        var ddData_city = $('#dropdownCity').data('ddslick')
        var city_id = ddData_city.selectedData.value;

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysCustomerInfo',
                name: cst_name,
                country_id: country_id,
                city_id: city_id,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müþteri Ekleme Ýþlemi Baþarýsýz...',
                    'Müþteri Ekleme Ýþlemi Baþarýsýz..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatasý->' + textStatus);
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#wrMilInfoForm')[0].reset();

                        $("#loading-image-cstInfo").loadImager('removeLoadImage');

                        $("#loading-image-fxrtInfoGrid").loadImager('removeLoadImage');
                        $("#loading-image-fxrtInfoGrid").loadImager('appendImage');

                        $('#gridContainer_mileage').refresh();   //test edilecek!

                        $("#loading-image-fxrtInfoGrid").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Müþteri Kayýt Ýþlemi Baþarýlý...',
                    'Müþteri kayýt iþlemini gerçekleþtirdiniz... ',
                    data);
                $("#loading-image-cstInfo").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müþteri Kayýt Ýþlemi Baþarýsýz...',
                    'Müþteri kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datasý boþtur!!');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müþteri Kayýt Ýþlemi Baþarýsýz...',
                    'Müþteri kayýt iþlemi baþarýsýz, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datasý boþtur!!');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#wrMilInfoForm')[0].reset();
                        $("#loading-image-cstInfo").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'ACL Yetki Kayýt Ýþlemi Baþarýsýz...',
                    'Ayný isim ile Müþteri  kaydý yapýlmýþtýr, yeni bir Müþteri kaydý deneyiniz... ');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }


    /**
    * reset button function for Customer Info insert form
    * @returns null
    * @since 14/07/2016
    */
    var resetCustomerInfoForm = function () {
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        $('#wrNameInfoForm').validationEngine('hide');

        $("#loading-image-cstInfo").loadImager('removeLoadImage');

        //yeni kayda açýk, tablar kapatýlýyor
        tab_disable();

        return false;
    }

    //seçilen satýra göre form doldurma
    var fillWrNameInfoForm = function (data) {
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        document.getElementById("txt-wrt_name").value = data.Employee;

        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        tab_active();

        return false;
    }

    var resetCustomerInfoForm = function () {
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        $('#wrMilInfoForm').validationEngine('hide');

        $("#loading-image-cstInfo").loadImager('removeLoadImage');

        //yeni kayda açýk, tablar kapatýlýyor
       // tab_disable();

        return false;
    }

    //seçilen satýra göre form doldurma
    var fillMilInfoForm = function (data) {
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        document.getElementById("txt-wrt_mil").value = data.Employee;

        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        //tab_active();

        return false;
    }

});

