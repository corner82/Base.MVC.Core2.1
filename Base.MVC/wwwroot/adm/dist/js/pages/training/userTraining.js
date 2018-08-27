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
    * Training LoadImager
    * @author Ceydacan Seyrek
    * @since 17/08/2018
    */
    //to Training form
    $("#loading-image-Training").loadImager();

    //to City form
    $("#loading-image-City").loadImager();

    //to Training form grid loading-image
    $("#loading-image-TrainingGrid").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);

    $('#TrainingForm').validationEngine();

    var cbdata_City = [{}];

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

    $('#loading-image-City').loadImager('removeLoadImage');
    $("#loading-image-City").loadImager('appendImage');

    var ajaxACLResources_City = $('#ajaxACL-City').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_City.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-City').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamam��t�r...'), window.lang.translate('Servis  bulunamam��t�r...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCity').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-City").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-City').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('�lke bulunamam��t�r...'), window.lang.translate('�lke  bulunamam��t�r...'));
        },
    })
    ajaxACLResources_City.ajaxCallWidget('call');


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


    $("#gridContainer_Training").dxDataGrid({

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
            caption: "City",
            dataField: "StoreCity"
        }, {
                caption: "Training",
            dataField: "StoreState"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillTrainingForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
 * insert Training
 * @returns {undefined}
 * @author Ceydacan Seyrek
 * @since 17/08/2018
 */

    window.insertCity = function () {
        $("#loading-image-Training").loadImager('removeLoadImage');
        $("#loading-image-Training").loadImager('appendImage');

        var cst_purchaselastupdate = $('#txt-City-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysCity',

                name: City_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Training Ekleme ��lemi Ba�ar�s�z...',
                    'Training Ekleme ��lemi Ba�ar�s�z..., sistem y�neticisi ile temasa ge�iniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatas�->' + textStatus);
                $("#loading-image-Training").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#TrainingForm')[0].reset();

                        $("#loading-image-Training").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Training Kay�t ��lemi Ba�ar�l�...',
                    'City kay�t i�lemini ger�ekle�tirdiniz... ',
                    data);
                $("#loading-image-Training").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Training Kay�t ��lemi Ba�ar�s�z...',
                    'Training kay�t i�lemi ba�ar�s�z, sistem y�neticisi ile temasa ge�iniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datas� bo�tur!!');
                $("#loading-image-Training").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Training Kay�t ��lemi Ba�ar�s�z...',
                    'Training kay�t i�lemi ba�ar�s�z, sistem y�neticisi ile temasa ge�iniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datas� bo�tur!!');
                $("#loading-image-City").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-Training").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-Training").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kay�t ��lemi Ba�ar�s�z...',
                    'Ayn� isim ile Training kayd� yap�lm��t�r, yeni bir Training kayd� deneyiniz... ');
                $("#loading-image-Training").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
    /**
    * reset City Form
    * @returns {undefined}
    * @author Ceydacan Seyrek
    * @since 17/08/2018
    */

    window.resetTrainingForm = function () {
        $("#loading-image-Training").loadImager('removeLoadImage');
        $("#loading-image-Training").loadImager('appendImage');

        $('#TrainingForm').validationEngine('hide');
        $('#dropdownCity').ddslick('select', { index: String(0) });

        $("#loading-image-Training").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert City Wrapper
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 17/08/2018
    */

    window.insertCityWrapper = function (e) {
        e.preventDefault();

        if ($("#TrainingForm").validationEngine('validate')) {

            insertTraining();
        }
        return false;
    }


    /**
    * Fill City form
    * @returns {Boolean}
    * @author Ceydacan Seyrek
    * @since 17/08/2018
    */

    window.fillTrainingForm = function (data) {
        $("#loading-image-Training").loadImager('removeLoadImage');
        $("#loading-image-Training").loadImager('appendImage');

        $('#dropdownCity').ddslick('select', { index: 3 });
        document.getElementById("txt-Training-name").value = data.StoreCity;

        $("#loading-image-Training").loadImager('removeLoadImage');

        return false;
    }
});

