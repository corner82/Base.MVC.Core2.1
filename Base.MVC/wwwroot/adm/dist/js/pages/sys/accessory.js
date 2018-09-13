/*
* Accessory Form
* @author Gül Özdemir
* @since 03/09/2018
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
    * Accessory LoadImager
    * @author Gül Özdemir
    * @since 03/09/2018
    */
    //to accessory form
    $("#loading-image-accessory").loadImager();

    $("#loading-image-vehiclemodel").loadImager();
    $("#loading-image-kp").loadImager();
    $("#loading-image-supplier").loadImager();
    $("#loading-image-options").loadImager();
    $("#loading-image-featureaccessoryname").loadImager();

    //to accessory form grid loading-image
    $("#loading-image-accessoryGrid").loadImager();

    //to accessory feature name form
    $("#loading-image-featurename").loadImager();
    //to accessory feature name form grid loading-image
    $("#loading-image-featurenameGrid").loadImager();

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
        //tablar kapatılacak

        $("a[data-toggle='tab'").prop('disabled', true);
        $("a[data-toggle='tab'").each(function () {
            $(this).prop('data-href', $(this).attr('href')); // hold you original href
            $(this).attr('href', '#'); // clear href
        });
        $("a[data-toggle='tab'").addClass('disabled-link');

    }

    tab_disable();

    $('#accessoryForm').validationEngine();
    $('#featurenameForm').validationEngine();

    //CLA, TGM, TGS, VW, XHCV
    var cbdata_model = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "ALL",
            value: 2,
            selected: false
        },
        {
            text: "CLA",
            value: 3,
            selected: false
        },
        {
            text: "TGM",
            value: 4,
            selected: false
        },
        {
            text: "TGS",
            value: 5,
            selected: false
        },
        {
            text: "VW",
            value: 6,
            selected: false
        },
        {
            text: "XHCV",
            value: 7,
            selected: false
        }
    ];

    $('#loading-image-vehiclemodel').loadImager('removeLoadImage');
    $("#loading-image-vehiclemodel").loadImager('appendImage');

    var ajaxACLResources_vehiclemodel = $('#ajaxACL-vehiclemodel').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehiclemodel.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehiclemodel').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownVehicleModel').ddslick({
                //height: 150,
                data: cbdata_model,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 1) {
                    }
                }
            });

            $("#loading-image-vehiclemodel").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehiclemodel').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('vehiclemodel bulunamamıştır...'), window.lang.translate('vehiclemodel  bulunamamıştır...'));
        }
    })
    ajaxACLResources_vehiclemodel.ajaxCallWidget('call');

    //4x2, 4x4, 6x4, 8x4, 6x6, 8x8, 8x4/4
    var cbdata_kp = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "ALL",
            value: 2,
            selected: false
        },
        {
            text: "KP000637",
            value: 3,
            selected: false
        },
        {
            text: "KP000638",
            value: 4,
            selected: false
        },
        {
            text: "KP000639",
            value: 5,
            selected: false
        },
    ];

    $('#loading-image-kp').loadImager('removeLoadImage');
    $("#loading-image-kp").loadImager('appendImage');

    var ajaxACLResources_kp = $('#ajaxACL-kp').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_kp.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-kp').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownKPNo').ddslick({
                //height: 150,
                data: cbdata_kp,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-kp").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-kp').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('KPNo bulunamamıştır...'), window.lang.translate('KpNo  bulunamamıştır...'));
        },
    })
    ajaxACLResources_kp.ajaxCallWidget('call');

    //supplier
    var cbdata_supplier = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "XXXXXXXXXXX",
            value: 2,
            selected: false
        },
        {
            text: "YYYYYYYYYYY",
            value: 3,
            selected: false
        },
        {
            text: "ZZZZZZZZZZZZ",
            value: 4,
            selected: false
        },
    ];

    $('#loading-image-supplier').loadImager('removeLoadImage');
    $("#loading-image-supplier").loadImager('appendImage');

    var ajaxACLResources_supplier = $('#ajaxACL-supplier').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_supplier.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-supplier').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownSupplier').ddslick({
                //height: 150,
                data: cbdata_supplier,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-supplier").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-supplier').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Supplier bulunamamıştır...'), window.lang.translate('Supplier  bulunamamıştır...'));
        },
    })
    ajaxACLResources_supplier.ajaxCallWidget('call');


    //Feature accessory Name (Back office / Salesman)
    //Servisten Name ve Description Alanları dolu gelecek. Biri Backoffice, diğeri Salesman için. 

    var cbdata_featureaccessoryname = [
        {
            text: window.lang.translate('Please select') + "...",
            description : "",
            value: 1,
            selected: true
        },
        {
            text: "Backoffice Accessory Name 1",
            description: "Salesman Accessory Name 1",
            value: 2,
            selected: false
        },
        {
            text: "Backoffice Accessory Name 2",
            description: "Salesman Accessory Name 2",
            value: 3,
            selected: false
        }
    ];

    $('#loading-image-featureaccessoryname').loadImager('removeLoadImage');
    $("#loading-image-featureaccessoryname").loadImager('appendImage');

    var ajaxACLResources_featureaccessoryname = $('#ajaxACL-featureaccessoryname').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_featureaccessoryname.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-featureaccessoryname').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownFeatureAccessoryName').ddslick({
                //height: 150,
                data: cbdata_featureaccessoryname,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-featureaccessoryname").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-featureaccessoryname').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('featureaccessoryname bulunamamıştır...'), window.lang.translate('featureaccessoryname  bulunamamıştır...'));
        },
    })
    ajaxACLResources_featureaccessoryname.ajaxCallWidget('call');

    //options
    var cbdata_options = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Canvas",
            value: 2,
            selected: false
        },
        {
            text: "Concave",
            value: 3,
            selected: false
        },
        {
            text: "Film",
            value: 4,
            selected: false
        },
        {
            text: "Elektro",
            value: 4,
            selected: false
        },
        {
            text: "Gama",
            value: 4,
            selected: false
        },
    ];

    $('#loading-image-options').loadImager('removeLoadImage');
    $("#loading-image-options").loadImager('appendImage');

    var ajaxACLResources_options = $('#ajaxACL-options').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_options.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-options').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownOptions').ddslick({
                //height: 150,
                data: cbdata_options,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-options").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-options').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Options bulunamamıştır...'), window.lang.translate('Supplier  bulunamamıştır...'));
        },
    })
    ajaxACLResources_options.ajaxCallWidget('call');




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


    $("#gridContainer_accessory").dxDataGrid({

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
            fileName: window.lang.translate('Accessory')
        },

        grouping: {
            contextMenuEnabled: true,
            expandMode: "rowClick"
        },

        groupPanel: {
            emptyPanelText: window.lang.translate('Use the context menu of header columns to group data'),
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
            caption: "Accessory",
            dataField: "StoreCity"
            },
            {
            caption: "Accessory 2",
            dataField: "StoreState"
            },
            {
                caption: "Employee",
                dataField: "Employee"
            }
        ],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillAccessoryForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertAccessory
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */

    window.insertAccessory = function () {
        $("#loading-image-accessory").loadImager('removeLoadImage');
        $("#loading-image-accessory").loadImager('appendImage');

        var backoffice_accessory_name = $('#txt-backofficeaccessoryname').val();
        var salesman_accessory_name = $('#txt-salesmanaccessoryname').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysaccessory',
                
                name: accessory_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Accessory Ekleme İşlemi Başarısız...',
                    'Accessory Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysAccessory" servis hatası->' + textStatus);
                $("#loading-image-accessory").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#accessoryForm')[0].reset();

                        $("#loading-image-accessory").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Accessory Kayıt İşlemi Başarılı...',
                    'Accessory kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-accessory").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Accessory Kayıt İşlemi Başarısız...',
                    'Accessory kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysAccessory" servis datası boştur!!');
                $("#loading-image-accessory").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Accessory Kayıt İşlemi Başarısız...',
                    'Accessory kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysAccessory" servis datası boştur!!');
                $("#loading-image-accessory").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-accessory").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#accessoryForm')[0].reset();
                        $("#loading-image-accessory").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile accessory kaydı yapılmıştır, yeni bir accessory kaydı deneyiniz... ');
                $("#loading-image-accessory").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset Accessory Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */

    window.resetAccessoryForm = function () {
        $("#loading-image-accessory").loadImager('removeLoadImage');
        $("#loading-image-accessory").loadImager('appendImage');

        $('#accessoryForm').validationEngine('hide');

        $('#dropdownVehicleModel').ddslick('select', { index: String(0) });
        $('#dropdownKPNo').ddslick('select', { index: String(0) });
        $('#dropdownSupplier').ddslick('select', { index: String(0) });
        $('#dropdownOptions').ddslick('select', { index: String(0) });
        $('#dropdownOnsiteOffsite').ddslick('select', { index: String(0) });
        
        $("#loading-image-accessory").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Accessory Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 03/09/2018
    */

    window.insertAccessoryWrapper = function (e) {
        e.preventDefault();

        if ($("#accessoryForm").validationEngine('validate')) {

            insertAccessory();
        }
        return false;
    }


    /**
    * Fill Accessory form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 03/09/2018
    */

    window.fillAccessoryForm = function (data) {
        $("#loading-image-accessory").loadImager('removeLoadImage');
        $("#loading-image-accessory").loadImager('appendImage');

        
        $('#dropdownVehicleModel').ddslick('select', { index: 1 });
        $('#dropdownKPNo').ddslick('select', { index: 1 });
        $('#dropdownSupplier').ddslick('select', { index: 1 });
        $('#dropdownFeatureName').ddslick('select', { index: 1 });
        $('#dropdownOptions').ddslick('select', { index: 1 });
        
        $("#loading-image-accessory").loadImager('removeLoadImage');

        return false;
    }


    $("#gridContainer_featurename").dxDataGrid({

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
            caption: "Accessory Feature Name (Backoffice)",
            dataField: "StoreState"
        },
        {
            caption: "Accessory Feature Name (Salesman)",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillFeatureNameForm(data);
            }
        }

    });

    function logEvent(eventName) {
        var logList = $("#events ul"),
            newItem = $("<li>", { text: eventName });

        logList.prepend(newItem);
    }


    /**
 * Insert AccessoryFeatureName
 * insertFeatureName
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 13/09/2018
 */

    window.insertFeatureName = function () {
        $("#loading-image-featurename").loadImager('removeLoadImage');
        $("#loading-image-featurename").loadImager('appendImage');

        var featurename_bo = $('#txt-featurename-bo').val();
        var featurename_sm = $('#txt-featurename-sm').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysbrand',

                name: brand_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Accessory Feature Name Ekleme İşlemi Başarısız...',
                    'Accessory Feature Name Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-featurename").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#brandForm')[0].reset();

                        $("#loading-image-featurename").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Brand Kayıt İşlemi Başarılı...',
                    'Brand kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-featurename").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'featurename Kayıt İşlemi Başarısız...',
                    'featurename kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysfeaturename" servis datası boştur!!');
                $("#loading-image-featurename").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'featurename Kayıt İşlemi Başarısız...',
                    'featurename kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysfeaturename" servis datası boştur!!');
                $("#loading-image-featurename").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-featurename").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#featurenameForm')[0].reset();
                        $("#loading-image-featurename").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile featurename kaydı yapılmıştır, yeni bir Marka kaydı deneyiniz... ');
                $("#loading-image-featurename").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
    /**
    * reset Accessory Feature Name Form
    * @returns {undefined}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.resetFeatureNameForm = function () {
        $("#loading-image-featurename").loadImager('removeLoadImage');
        $("#loading-image-featurename").loadImager('appendImage');

        $('#featurenameForm').validationEngine('hide');

        $("#loading-image-featurename").loadImager('removeLoadImage');

        //yeni kayda açık, tablar kapatılıyor
        tab_disable();

        return false;
    }


    /**
    * insert Accessory Feature Name Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.insertFeatureNameWrapper = function (e) {
        e.preventDefault();

        if ($("#featurenameForm").validationEngine('validate')) {

            insertFeatureName();
        }
        return false;
    }


    /**
    * Fill Accessory Feature Name form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.fillFeatureNameForm = function (data) {
        $("#loading-image-featurename").loadImager('removeLoadImage');
        $("#loading-image-featurename").loadImager('appendImage');

        document.getElementById("txt-featurename-bo").value = data.StoreState;
        document.getElementById("txt-featurename-sm").value = data.StoreCity;

        $("#loading-image-featurename").loadImager('removeLoadImage');

        tab_active()

        return false;
    }
});

