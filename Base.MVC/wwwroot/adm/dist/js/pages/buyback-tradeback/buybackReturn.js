/*
* Buyback Return Form
* @author Ceydacan Seyrek
* @since 10/09/2018
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

    var expText = "";

/*
* Buyback Return LoadImager
* @author Ceydacan Seyrek
* @since 10/09/2018
*/
//to Buyback Return form
    $("#loadingImage_BbReturnInfo").loadImager();
    $("#loadingImage_DdslickReturn").loadImager();


//to Buyback Return form grid loading-image
    $("#loadingImage_DdslickBuybackReturnDealGrid").loadImager();
    $("#loadingImage_DdslickBuybackVehicleList").loadImager();
    $("#loadingImage_DdslickBuybackVehicleAttachmentList").loadImager();

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
        //tablar kapatılacak

        $("a[data-toggle='tab'").prop('disabled', true);
        $("a[data-toggle='tab'").each(function () {
            $(this).prop('data-href', $(this).attr('href')); // hold you original href
            $(this).attr('href', '#'); // clear href
        });
        $("a[data-toggle='tab'").addClass('disabled-link');

    }

    tab_disable();

    $('#dealBuybackReturnForm').validationEngine();
    $('#buybackReturnVehicleInfoForm').validationEngine();

    var langCode = $("#langCode").val();
    //alert(langCode);

    var cbdata_country = [{}];

//Return
    var cbdata_return = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Yes, it will return",
            value: 2,
            selected: false
        },
        {
            text: "No customer wants extension",
            value: 3,
            selected: false
        },
        {
            text: "No, it won’t return",
            value: 4,
            selected: false
        }
    ];

    $('#loadingImage_DdslickReturn').loadImager('removeLoadImage');
    $("#loadingImage_DdslickReturn").loadImager('appendImage');

    var ajaxACLResources_Return = $('#ajax_DdslickReturn').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_Return.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickReturn').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickReturn').ddslick({
                //height: 150,
                data: cbdata_return,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        expText = selectedData.selectedData.text;
                        if (expText == 'No, it won’t return') {
                            document.getElementById("txt-bbreturn-explanation").disabled = false;
                            //document.getElementById("txt-bbreturn-file").disabled = true;
                        }
                        else if (expText == 'No customer wants extension') {
                            document.getElementById("txt-bbreturn-explanation").disabled = false;
                           // document.getElementById("txt-bbreturn-file").disabled = true;
                        }
                        else if (expText == 'Yes, it will return') {
                            document.getElementById("txt-bbreturn-explanation").disabled = true;
                            //document.getElementById("txt-bbreturn-file").disabled = false;
                        }
                        else {
                            document.getElementById("txt-bbreturn-explanation").disabled = true;
                            //document.getElementById("txt-bbreturn-file").disabled = true;
                        }
                    }
                }
            });

            $("#loadingImage_DdslickReturn").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickReturn').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Return bulunamamıştır...'), window.lang.translate('Return bulunamamıştır...'));
        },
    })
    ajaxACLResources_Return.ajaxCallWidget('call');
//Return End



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


    $("#gridContainer_buybackDealList").dxDataGrid({

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
            fileName: "buybackReturn"
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
            caption: window.lang.translate('Deal Number') + "...",
            dataField: "StoreCity"
        }, {
            caption: window.lang.translate('Deal date') + "...",
            dataField: "OrderDate"
        }],
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillBbreturnForm(data);
            }
        }
    });

    $("#gridContainer_buybackVehicleList").dxDataGrid({

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
            fileName: "buybackVehicle"
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
            caption: window.lang.translate('Deal Number') + "...",
            dataField: "SaleAmount"
        }, {
            caption: window.lang.translate('Deal date') + "...",
            dataField: "OrderDate"
        }, {
            caption: window.lang.translate('Vehicle return date') + "...",
            dataField: "OrderDate"
        }, {
            caption: window.lang.translate('Vehicle') + "...",
            //dataField: "WAGP21ZZ2FT022928"
            data: "WAGP21ZZ2FT022928"
        }, {
            caption: "Vehicle return",
            dataField: "OrderDate"
        }],
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillVehicleBuybackForm(data);
            }
        }
    });

    $("#gridContainer_buybackVehicleAttachmentList").dxDataGrid({

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
            fileName: "buybackVehicle"
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
            caption: window.lang.translate('Vehicle') + "...",
                //dataField: "WAGP21ZZ2FT022928"
            data: "WAGP21ZZ2FT022928"
        }, {
            caption: "Attachment",
            //dataField: "active",
            dataField: "StoreCity"
        }],
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                //fillVehicleBuybackForm(data);
            }
        }
    });



 /**
 * Buyback Return
 * @author Ceydacan Seyrek
 * @since 10/09/2018
 */

    window.insertBbreturn = function () {
        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_BbReturnInfo").loadImager('appendImage');

       // var cst_purchaselastupdate = $('#txt-location-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysbbTbInfo',

                name: bbreturn_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback return Ekleme İşlemi Başarısız...',
                    'Buyback return Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysbbTbInfo" servis hatası->' + textStatus);
                $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#buybackReturnVehicleInfoForm')[0].reset();

                        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Buyback return kayıt işlemi başarılı...',
                    'Buyback return kayıt işlemini gerçekleştirniz... ',
                    data);
                $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback return Kayıt İşlemi Başarısız...',
                    'Buyback return kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbInfo" servis datası boştur!!');
                $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback return İşlemi Başarısız...',
                    'Buyback return kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbInfo" servis datası boştur!!');
                $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $("#loading-imagelocation").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Buyback return İşlemi Başarısız...',
                    'Aynı isim ile Buyback return  kaydı yapılmıştır, yeni bir Buyback return kaydı deneyiniz... ');
                $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
/**
* reset Buyback Return Form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.resetBbreturnForm = function () {
        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_BbReturnInfo").loadImager('appendImage');

        $('#buybackReturnVehicleInfoForm').validationEngine('hide');
        $('#ddslickReturn').ddslick('select', { index: String(0) });

        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');

        return false;
    }


/**
* insert Buyback Return Wrapper
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.insertBbreturnWrapper = function (e) {
        e.preventDefault();

        if ($("#buybackReturnVehicleInfoForm").validationEngine('validate')) {

            insertBbreturn();
        }
        return false;
    }


/**
* Fill Buyback Return form
* @author Ceydacan Seyrek
* @since 10/09/2018
*/

    window.fillBbreturnForm = function (data) {
        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_BbReturnInfo").loadImager('appendImage');

        //document.getElementById("txt-bbreturn-price").value = data.SaleAmount;
        document.getElementById("txt-bbreturn-dealNo").value = data.SaleAmount;
        document.getElementById("txt-bbreturn-dealDate").value = data.OrderDate;
        

        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $('#ddslickReturn').ddslick('select', { index: 2 });

        tab_active();
        return false;
    }



    window.fillVehicleBuybackForm = function (data) {
        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $("#loadingImage_BbReturnInfo").loadImager('appendImage');

        //document.getElementById("txt-bbreturn-price").value = data.SaleAmount;
        //document.getElementById("txt-bbreturn-dealNo").value = data.SaleAmount;
        //document.getElementById("txt-bbreturn-dealDate").value = data.OrderDate;

        $("#loadingImage_BbReturnInfo").loadImager('removeLoadImage');
        $('#ddslickReturn').ddslick('select', { index: 3 });
        document.getElementById("txt-bbreturn-vehicle").value = 'WAGP21ZZ2FT022928';

        tab_active();
        return false;
    }

});

