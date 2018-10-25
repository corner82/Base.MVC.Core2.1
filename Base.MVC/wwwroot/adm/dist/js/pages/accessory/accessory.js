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
    //to accessory feature name form
    $("#loading-image-accessorynameform").loadImager();
    $("#loading-image-accessory").loadImager();

    $("#loading-image-vehiclemodel").loadImager();
    $("#loading-image-kp").loadImager();
    $("#loading-image-supplier").loadImager();
    $("#loading-image-faccessoryname").loadImager();
    $("#loading-image-options").loadImager();

    $("#loading-image-featurename").loadImager();

    //to accessory feature name form grid loading-image
    $("#loading-image-accessorynameGrid").loadImager();
    //to accessory form grid loading-image
    $("#loading-image-accessoryGrid").loadImager();


    var selectedAccessorynameId = 0;

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

    $('#accessorynameForm').validationEngine();
    $('#accessoryForm').validationEngine();


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

    var cbdata_faccessoryname = [
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

    $('#loading-image-faccessoryname').loadImager('removeLoadImage');
    $("#loading-image-faccessoryname").loadImager('appendImage');

    var ajaxACLResources_faccessoryname = $('#ajaxACL-faccessoryname').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_faccessoryname.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-faccessoryname').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownFAccessoryName').ddslick({
                //height: 150,
                data: cbdata_faccessoryname,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-faccessoryname").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-faccessoryname').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('faccessoryname bulunamamıştır...'), window.lang.translate('faccessoryname  bulunamamıştır...'));
        },
    })
    ajaxACLResources_faccessoryname.ajaxCallWidget('call');

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
/*    var orders = new DevExpress.data.CustomStore({
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
*/
    /**
 * insertAccessory
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */
/*
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
    */
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

    //////////////////////////////////////////////////////////////////////////////////////////////
    /**
    * accessorynameList Refresh
    * @returns 
    * @author Gül Özdemir
    * @since 24/10/2018
    */

    $('#accessorynameList').click(function () {

        /* devexgrid */
        var accessoryname_data = new DevExpress.data.CustomStore({
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
                    url: '/Accessory/AccessoryFeatureGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillAccDeffGridx_sysaccdeff",
                        pkIdentity: $("#publicKey").val(),
                        page: "",
                        rows: "",
                        sort: "",
                        order: "", //args.orderby,
                        skip: args.skip,
                        take: args.take
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data Loading Error");
                    },
                    timeout: 30000
                });

                return deferred.promise();
            },
            remove: function (key) {
                var deferred = $.Deferred();
               
                return $.ajax({
                    url: '/Accessory/DeleteAccessoryFeature',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedAccessorynameId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysaccdeff"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error");
                    },
                    timeout: 30000
                });
            }
        });

        //DevExpress.localization.locale(langCode);

        $(function () {
            $("#gridContainer_accessoryname").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: accessoryname_data,

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
                    fileName: window.lang.translate('AccessoryFeatureList')
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
                OnCellPrepared: function (options) {

                    var fieldData = options.value;
                    fieldHtml = "";

                    fieldHtml = fieldData.value;
                    options.cellElement.html(fieldHtml);

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

                columns: [
                    {
                        caption: window.lang.translate('Active/Passive'),
                        width: 40,
                        alignment: 'center',

                        cellTemplate: function (container, options) {
                            var fieldHtml;
                            var accessoryname_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveAccessoryName(accessoryname_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveAccessoryName(accessoryname_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, {
                        caption: window.lang.translate('Feature Backoffice'),
                        dataField: "name_bo",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Feature Salesman'),
                        dataField: "name_sm",
                        encodeHtml: false
                    }
                ],
                rowPrepared: function (rowElement, rowInfo) {
                    return false;
                    //if (rowInfo.data.key === 1)
                    //    rowElement.css('background', 'green');
                    //else if (rowInfo.data.key === 0)
                    //    rowElement.css('background', 'yellow');

                },

                onSelectionChanged: function (selectedItems) {
                    var data = selectedItems.selectedRowsData[0];
                    if (data) {
                        selectedAccessorynameId = data.id;
                        
                        fillAccessoryNameForm(data);

                    }
                },

                onRowRemoving: function (e) {
                    selectedAccessorynameId = e.key.id;

                },

                onRowRemoved: function (e) {
                    $("#gridContainer_accessoryname").dxDataGrid("instance").refresh();
                },

            });
        });
    })

    $('#accessorynameList').click();

    /**
 * Insert AccessoryFeatureName
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 24/10/2018
 */

    $("#btn-accessoryname-save").on("click", function (e) {
        e.preventDefault();

        if ($("#accessorynameForm").validationEngine('validate')) {

            $("#loading-image-accessorynameform").loadImager('removeLoadImage');
            $("#loading-image-accessorynameform").loadImager('appendImage');

            var accessory_featurename_bo = $('#txt-featurename-bo').val();
            var accessory_featurename_sm = $('#txt-featurename-sm').val();

            var ajax;
            if (selectedAccessorynameId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-accessoryname').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-accessorynameform",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                    proxy: '/Accessory/InsertAccessoryFeature',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertAct_sysaccdeff",
                        name_bo: accessory_featurename_bo,
                        name_sm: accessory_featurename_sm,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_accessoryname").dxDataGrid("instance").refresh();
                        $("#loadingImage_accessorynameform").loadImager('removeLoadImage');
                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-accessoryname').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-accessorynameform",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Accessory/UpdateAccessoryFeature',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedAccessorynameId,
                                url: "pkUpdateAct_sysaccdeff",
                                name_bo: accessory_featurename_bo,
                                name_sm: accessory_featurename_sm,
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_accessoryname").dxDataGrid("instance").refresh();
                                $("#loadingImage_accessorynameform").loadImager('removeLoadImage');
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Accesory Feature is update! Are you sure?', 'Accessory Feature is update! Are you sure?');
            }
        }
        return false;

    })

    /**
    * reset Accessory Feature Name Form
    * @returns {undefined}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.resetAccessoryNameForm = function () {
        $("#loading-image-accessorynameform").loadImager('removeLoadImage');
        $("#loading-image-accessorynameform").loadImager('appendImage');

        selectedAccessorynameId = 0;
        $('#accessorynameForm').validationEngine('hide');

        $("#loading-image-accessorynameform").loadImager('removeLoadImage');

        //yeni kayda açık, tablar kapatılıyor
        tab_disable();

        return false;
    }


    /**
    * Fill Accessory Feature Name form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.fillAccessoryNameForm = function (data) {
        $("#loading-image-accessoryname").loadImager('removeLoadImage');
        $("#loading-image-accessoryname").loadImager('appendImage');

        document.getElementById("txt-featurename-bo").value = data.name_bo;
        document.getElementById("txt-featurename-sm").value = data.name_sm;

        $("#loading-image-accessoryname").loadImager('removeLoadImage');

        tab_active()

        return false;
    }


    window.activepassiveAccessoryName = function (accessoryname_id, active) {
        $("#loading-image-accessorynameGrid").loadImager('removeLoadImage');
        $("#loading-image-accessorynameGrid").loadImager('appendImage');

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassiveaccessorynamelist = $('#ajaxACL-accessorynamelist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-accessorynameGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Accessory/ActivePassiveAccessoryFeature',
            type: "POST",
            data: JSON.stringify({
                id: accessoryname_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysaccdeff"
            }),

        });
        ajax_activepassiveaccessorynamelist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {
            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_accessoryname").dxDataGrid("instance").refresh();
                $("#loading-image-accessorynameGrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassiveaccessorynamelist.ajaxCallWidget('call');

    }
});

