﻿$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Continue')
    });


    /*
    * Terrain LoadImager
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */
    //to Terrain form
    $("#loading-image-Terrain").loadImager();

    //to TerrainType form
    $("#loading-image-TerrainType").loadImager();

    //to Terrain form grid loading-image
    $("#loading-image-TerrainGrid").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);

    $('#TerrainForm').validationEngine();

    var cbdata_TerrainType = [{}];

    var cbdata = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "TradeBack",
            value: 2,
            selected: false
        },
        {
            text: "BuyBack",
            value: 3,
            selected: false
        }
    ];



    $('#loading-image-TerrainType').loadImager('removeLoadImage');
    $("#loading-image-TerrainType").loadImager('appendImage');

    var ajaxACLResources_TerrainType = $('#ajaxACL-TerrainType').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_TerrainType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-TerrainType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownTerrainType').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-TerrainType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-TerrainType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Ülke bulunamamıştır...'), window.lang.translate('Ülke  bulunamamıştır...'));
        },
    })
    ajaxACLResources_TerrainType.ajaxCallWidget('call');


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


    $("#gridContainer_Terrain").dxDataGrid({

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
            caption: window.lang.translate('Terrain type') + "...",
            dataField: "StoreCity"
        }, {
            caption: window.lang.translate('Terrain name') + "...",
            dataField: "StoreState"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillTerrainForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
 * insert Terrain
 * @returns {undefined}
 * @author Ceydacan Seyrek
 * @since 14/08/2018
 */

    window.insertTerrainType = function () {
        $("#loading-image-Terrain").loadImager('removeLoadImage');
        $("#loading-image-Terrain").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-TerrainType-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysTerrainType',

                name: TerrainType_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Terrain Ekleme İşlemi Başarısız...',
                    'Terrain Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-Terrain").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#modelForm')[0].reset();

                        $("#loading-image-Terrain").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Terrain Kayıt İşlemi Başarılı...',
                    'TerrainType kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-Terrain").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Terrain Kayıt İşlemi Başarısız...',
                    'Terrain kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-Terrain").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Terrain Kayıt İşlemi Başarısız...',
                    'Terrain kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-TerrainType").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-Terrain").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-Terrain").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Terrain kaydı yapılmıştır, yeni bir Terrain kaydı deneyiniz... ');
                $("#loading-image-Terrain").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
    /**
    * reset TerrainType Form
    * @returns {undefined}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.resetTerrainForm = function () {
        $("#loading-image-Terrain").loadImager('removeLoadImage');
        $("#loading-image-Terrain").loadImager('appendImage');

        $('#TerrainForm').validationEngine('hide');
        $('#dropdownTerrainType').ddslick('select', { index: String(0) });

        $("#loading-image-Terrain").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert TerrainType Wrapper
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.insertTerrainTypeWrapper = function (e) {
        e.preventDefault();

        if ($("#TerrainForm").validationEngine('validate')) {

            insertTerrain();
        }
        return false;
    }


    /**
    * Fill TerrainType form
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 14/08/2018
    */

    window.fillTerrainForm = function (data) {
        $("#loading-image-Terrain").loadImager('removeLoadImage');
        $("#loading-image-Terrain").loadImager('appendImage');

        $('#dropdownTerrainType').ddslick('select', { index: 2 });
        document.getElementById("txt-Terrain-name").value = data.StoreCity;
        document.getElementById("txt-TerrainValue-name").value = data.StoreCity;

        $("#loading-image-Terrain").loadImager('removeLoadImage');

        return false;
    }
});

