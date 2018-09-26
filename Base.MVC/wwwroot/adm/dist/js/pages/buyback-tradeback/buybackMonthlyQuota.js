/*
* Buyback Monthly Quota Form
* @author Ceydacan Seyrek
* @since 17/09/2018
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

    /*
    * Buyback Monthly Quota LoadImager
    * @author Ceydacan Seyrek
    * @since 17/09/2018
    */
    //to Buyback Monthly Quota form
    $("#loadingImage_buybackMonthlyQuota").loadImager();
    $("#loadingImage_DdslickVehicleModel").loadImager();
    $("#loadingImage_DdslickQuotaYear").loadImager();
    $("#loadingImage_DdslickQuotaMonth").loadImager();

    //to Buyback Monthly Quota form grid loading-image
    $("#loadingImage_DdslickBuybackQuotaMonthGrid").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);

    $('#buybackMonthlyQuotaForm').validationEngine();

    //var cbdata_country = [{}];

    //VehicleModel
    //var cbdata_VehicleModel = [
    //    {
    //        text: window.lang.translate('Please select') + "...",
    //        value: 1,
    //        selected: true
    //    },
    //    {
    //        text: "TGS",
    //        value: 2,
    //        selected: false
    //    },
    //    {
    //        text: "CLA",
    //        value: 3,
    //        selected: false
    //    },
    //    {
    //        text: "TGX",
    //        value: 4,
    //        selected: false
    //    }
    //];

    $('#loadingImage_DdslickVehicleModel').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleModel").loadImager('appendImage');

    var ajaxACLResources_VehicleModel = $('#ajax_DdslickVehicleModel').ajaxCallWidget({
        proxy: '/Vehicle/sysvehiclegroups',
        data: {
            url: '1',
            //pk: $("#pk").val()
            dataType: 'json'
        }

    });

    ajaxACLResources_VehicleModel.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleModel').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata_vehicletype) {
            var cbdata = $.parseJSON(cbdata_vehicletype);
            
            //data.splice(0, 1,
            //    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            //);

            $('#ddslickVehicleModel').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        
                    }
                }

             });

            $("#loadingImage_DdslickVehicleModel").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleModel').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('araç model bulunamamıştır...'), window.lang.translate('araç model bulunamamıştır...'));
        },
    })
    ajaxACLResources_VehicleModel.ajaxCallWidget('call');
    //VehicleModel end

    //Quota Year
    var cbdata_quotaYear = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "2018",
            value: 2,
            selected: false
        },
        {
            text: "2019",
            value: 3,
            selected: false
        },
        {
            text: "2020",
            value: 4,
            selected: false
        }
    ];

    $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
    $("#loadingImage_DdslickQuotaYear").loadImager('appendImage');

    var ajaxACLResources_QuotaYear = $('#ajax_DdslickQuotaYear').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_QuotaYear.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickQuotaYear').ddslick({
                //height: 150,
                data: cbdata_quotaYear,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickQuotaYear").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickQuotaYear').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Quota Year bulunamamıştır...'), window.lang.translate('Quota Year  bulunamamıştır...'));
        },
    })
    ajaxACLResources_QuotaYear.ajaxCallWidget('call');
    //Quota Year End

    //Quota Month
    var cbdata_quotaMonth = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "January",
            value: 2,
            selected: false
        },
        {
            text: "February",
            value: 3,
            selected: false
        },
        {
            text: "March",
            value: 4,
            selected: false
        },
        {
            text: "April",
            value: 5,
            selected: false
        },
        {
            text: "May",
            value: 6,
            selected: false
        },
        {
            text: "June",
            value: 7,
            selected: false
        },
        {
            text: "July",
            value: 8,
            selected: false
        },
        {
            text: "August",
            value: 9,
            selected: false
        },
        {
            text: "September",
            value: 10,
            selected: false
        },
        {
            text: "October",
            value: 11,
            selected: false
        },
        {
            text: "November",
            value: 12,
            selected: false
        },
        {
            text: "December",
            value: 13,
            selected: false
        }
    ];

    $('#loadingImage_DdslickQuotaMonth').loadImager('removeLoadImage');
    $("#loadingImage_DdslickQuotaMonth").loadImager('appendImage');

    var ajaxACLResources_QuotaMonth = $('#ajax_DdslickQuotaMonth').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_QuotaMonth.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickQuotaMonth').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickQuotaMonth').ddslick({
                //height: 150,
                data: cbdata_quotaMonth,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickQuotaMonth").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickQuotaMonth').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Quota Month bulunamamıştır...'), window.lang.translate('Quota Month  bulunamamıştır...'));
        },
    })
    ajaxACLResources_QuotaMonth.ajaxCallWidget('call');
    //Quota Month End


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


    $("#gridContainer_BuybackQuotaMonth").dxDataGrid({

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
            fileName: "buybackMonthlyQuota"
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
            caption: window.lang.translate('Vehicle model') + "...",
            dataField: "StoreCity"
        }, {
            caption: window.lang.translate('Quota year') + "...",
            dataField: "StoreState"
        }, {
            caption: window.lang.translate('Quota month') + "...",
            dataField: "Employee"
        }, {
            caption: window.lang.translate('Quota limit') + "...",
            dataField: "OrderNumber"
        }],
        rowPrepared: function (rowElement, rowInfo) {
            if (rowInfo.data.key == 1)
                rowElement.css('background', 'green');
            else if (rowInfo.data.key == 0)
                rowElement.css('background', 'yellow');

        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillBuybackMonthlyQuotaForm(data);
            }
        },
        editingColumnExtensions:
            {
                columnName: 'Active/Passive',
            }
    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
    * Buyback Monthly Quota Form
    * @author Ceydacan Seyrek
    * @since 17/09/2018
    */

    window.insertBuybackMonthlyQuota = function () {
        $("#loadingImage_buybackMonthlyQuota").loadImager('removeLoadImage');
        $("#loadingImage_buybackMonthlyQuota").loadImager('appendImage');

        // var cst_purchaselastupdate = $('#txt-location-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysbbTbQuota',

                name: bbTbMatrix_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Monthly Quota Ekleme İşlemi Başarısız...',
                    'Buyback Monthly Quota Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysbbTbQuota" servis hatası->' + textStatus);
                $("#loadingImage_buybackMonthlyQuota").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#buybackMonthlyQuotaForm')[0].reset();

                        $("#loadingImage_buybackMonthlyQuota").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Buyback Monthly Quota Kayıt işlemi Başarılı...',
                    'Buyback Monthly Quota kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loadingImage_buybackMonthlyQuota").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Monthly Quota Kayıt İşlemi Başarısız...',
                    'Buyback Monthly Quota kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbQuota" servis datası boştur!!');
                $("#loadingImage_buybackMonthlyQuota").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Monthly Quota İşlemi Başarısız...',
                    'Buyback Monthly Quota kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbQuota" servis datası boştur!!');
                $("#loadingImage_buybackMonthlyQuota").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loadingImage_buybackMonthlyQuota").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $("#loading-imagelocation").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Buyback Monthly Quota İşlemi Başarısız...',
                    'Aynı isim ile Buyback Monthly Quota kaydı yapılmıştır, yeni bir Buyback Monthly Quota kaydı deneyiniz... ');
                $("#loadingImage_buybackMonthlyQuota").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
    /**
    * reset Buyback Monthly Quota Form
    * @author Ceydacan Seyrek
    * @since 10/09/2018
    */

    window.resetBuybackQuotaMonthForm = function () {
        $("#loadingImage_buybackMonthlyQuota").loadImager('removeLoadImage');
        $("#loadingImage_buybackMonthlyQuota").loadImager('appendImage');

        $('#buybackTradebackQuotaForm').validationEngine('hide');
        $('#ddslickVehicleModel').ddslick('select', { index: String(0) });
        $('#ddslickQuotaYear').ddslick('select', { index: String(0) });
        $('#ddslickQuotaMonth').ddslick('select', { index: String(0) });

        $("#loadingImage_buybackMonthlyQuota").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Buyback Monthly Quota Form Wrapper
    * @author Ceydacan Seyrek
    * @since 17/09/2018
    */

    window.insertBuybackQuotaMonthWrapper = function (e) {
        e.preventDefault();

        if ($("#buybackMonthlyQuotaForm").validationEngine('validate')) {

            insertBuybackMonthlyQuota();
        }
        return false;
    }


    /**
    * Fill Buyback Monthly Quota Form form
    * @author Ceydacan Seyrek
    * @since 17/09/2018
    */

    window.fillBuybackMonthlyQuotaForm = function (data) {
        $("#loadingImage_buybackMonthlyQuota").loadImager('removeLoadImage');
        $("#loadingImage_buybackMonthlyQuota").loadImager('appendImage');

        document.getElementById("txt-BbQuotaMonth-limit").value = data.SaleAmount;

        $("#loadingImage_buybackMonthlyQuota").loadImager('removeLoadImage');
        $('#ddslickVehicleModel').ddslick('select', { index: 3 });
        $('#ddslickQuotaYear').ddslick('select', { index: 2 });
        $('#ddslickQuotaMonth').ddslick('select', { index: 2 });

        return false;
    }
});

