/*
* Buyback Yearly Quota Form
* @author Ceydacan Seyrek
* @since 18/09/2018
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
* Buyback Yearly Quota LoadImager
* @author Ceydacan Seyrek
* @since 18/09/2018
*/
//to Buyback Yearly Quota form
    $("#loadingImage_buybackYearlyQuota").loadImager();
    $("#loadingImage_DdslickQuotaYear").loadImager();

//to Buyback Yearly Quota form grid loading-image
    $("#loadingImage_DdslickBuybackQuotaYearGrid").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);

    var cbdata_country = [{}];

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


    $("#gridContainer_BuybackQuotaYear").dxDataGrid({

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
            fileName: "buybackYearlyQuota"
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
            caption: window.lang.translate('Quota year') + "...",
            dataField: "StoreState"
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
                fillBuybackYearlyQuotaForm(data);
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
 * Buyback Yearly Quota Form
 * @author Ceydacan Seyrek
 * @since 17/09/2018
 */

    window.insertBuybackYearlyQuota = function () {
        $("#loadingImage_buybackYearlyQuota").loadImager('removeLoadImage');
        $("#loadingImage_buybackYearlyQuota").loadImager('appendImage');

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
                dm.dangerMessage('show', 'Buyback Yearly Quota Ekleme İşlemi Başarısız...',
                    'Buyback Yearly Quota Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysbbTbQuota" servis hatası->' + textStatus);
                $("#loadingImage_buybackYearlyQuota").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#buybackYearlyQuotaForm')[0].reset();

                        $("#loadingImage_buybackYearlyQuota").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Buyback Yearly Quota Kayıt işlemi Başarılı...',
                    'Buyback Yearly Quota kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loadingImage_buybackYearlyQuota").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Yearly Quota Kayıt İşlemi Başarısız...',
                    'Buyback Yearly Quota kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbQuota" servis datası boştur!!');
                $("#loadingImage_buybackYearlyQuota").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Buyback Yearly Quota İşlemi Başarısız...',
                    'Buyback Yearly Quota kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysbbTbQuota" servis datası boştur!!');
                $("#loadingImage_buybackYearlyQuota").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loadingImage_buybackYearlyQuota").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $("#loading-imagelocation").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Buyback Yearly Quota İşlemi Başarısız...',
                    'Aynı isim ile Buyback Yearly Quota kaydı yapılmıştır, yeni bir Buyback Yearly Quota kaydı deneyiniz... ');
                $("#loadingImage_buybackYearlyQuota").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
/**
* reset Buyback Yearly Quota Form
* @author Ceydacan Seyrek
* @since 18/09/2018
*/

    window.resetBuybackQuotaYearForm = function () {
        $("#loadingImage_buybackYearlyQuota").loadImager('removeLoadImage');
        $("#loadingImage_buybackYearlyQuota").loadImager('appendImage');

        $('#buybackTradebackQuotaForm').validationEngine('hide');
        $('#ddslickQuotaYear').ddslick('select', { index: String(0) });

        $("#loadingImage_buybackYearlyQuota").loadImager('removeLoadImage');

        return false;
    }


/**
* insert Buyback Yearly Quota Form Wrapper
* @author Ceydacan Seyrek
* @since 18/09/2018
*/

    window.insertBuybackQuotaYearWrapper = function (e) {
        e.preventDefault();

        if ($("#buybackYearlyQuotaForm").validationEngine('validate')) {

            insertBuybackYearlyQuota();
        }
        return false;
    }


/**
* Fill Buyback Yearly Quota Form form
* @author Ceydacan Seyrek
* @since 18/09/2018
*/

    window.fillBuybackYearlyQuotaForm = function (data) {
        $("#loadingImage_buybackYearlyQuota").loadImager('removeLoadImage');
        $("#loadingImage_buybackYearlyQuota").loadImager('appendImage');

        document.getElementById("txt-BbQuotaYear-limit").value = data.SaleAmount;

        $("#loadingImage_buybackYearlyQuota").loadImager('removeLoadImage');
        $('#ddslickQuotaYear').ddslick('select', { index: 2 });

        return false;
    }
});

